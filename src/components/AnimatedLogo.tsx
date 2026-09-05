'use client';

import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeContext';
import { useCosmetics } from './CosmeticsContext';
import { getLogoSrc, type LogoFontMode } from './logoAssets';

interface AnimatedLogoProps {
  alt: string;
  wrapperClassName: string;
  gap?: number;
}

const BLUR_DURATION_MS = 500;
// Wall-clock cap rather than a frame count: rAF delivery isn't guaranteed at
// 60fps (throttled/background tabs, slow devices), so a frame-count cap can
// take far longer than intended in practice. This guarantees each phase
// settles within ~2s of real time no matter how fast frames actually arrive.
const MAX_PHASE_DURATION_MS = 2000;

/**
 * A single animated cell in the pixel-dissolve grid. Adapted from React Bits'
 * PixelCard hover effect: instead of a fixed palette, the color is sampled
 * straight from the logo artwork, and appear/disappear are driven by a
 * one-shot logo swap instead of pointer enter/leave.
 *
 * sizeStep is bounded away from 0 on purpose: PixelCard runs as an endless
 * hover loop, so a pixel that grows imperceptibly slowly is harmless there.
 * Here the transition only resolves once every pixel is idle, so a single
 * near-zero sizeStep would stall the whole thing forever on a big grid.
 */
class LogoPixel {
  x: number;
  y: number;
  color: string;
  size: number;
  sizeStep: number;
  maxSize: number;
  delay: number;
  counter = 0;
  counterStep: number;
  isIdle = false;
  private gap: number;

  constructor(x: number, y: number, color: string, delay: number, gap: number, canvasSize: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.gap = gap;
    this.size = 0;
    this.sizeStep = 0.15 + Math.random() * 0.35;
    const minSize = 0.5;
    const maxSizeInteger = Math.max(1, gap - 1);
    this.maxSize = Math.random() * (maxSizeInteger - minSize) + minSize;
    this.delay = delay;
    this.counterStep = Math.random() * 4 + canvasSize * 0.01;
  }

  appear(ctx: CanvasRenderingContext2D) {
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size < this.maxSize) {
      this.size = Math.min(this.maxSize, this.size + this.sizeStep);
    } else {
      this.isIdle = true;
    }
    this.draw(ctx);
  }

  disappear(ctx: CanvasRenderingContext2D) {
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size = Math.max(0, this.size - 0.35);
    this.draw(ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.size <= 0) return;
    const offset = (this.gap - this.size) / 2;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + offset, this.y + offset, this.size, this.size);
  }
}

function loadHTMLImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

async function sampleImage(src: string, width: number, height: number): Promise<ImageData> {
  const img = await loadHTMLImage(src);
  const offscreen = document.createElement('canvas');
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext('2d');
  if (!ctx) throw new Error('2D context unavailable');
  ctx.drawImage(img, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}

const BACKGROUND_MATCH_THRESHOLD = 24;

// Samples each cell's center (rather than its corner). The logo SVGs export
// with an opaque background rect baked in that matches the page background
// (not real transparency), so an alpha check alone can't isolate the
// letterforms — cells are also compared against the artwork's own corner
// color (its background fill) and skipped when they match it.
function buildPixels(data: ImageData, width: number, height: number, gap: number): LogoPixel[] {
  const pixels: LogoPixel[] = [];
  const canvasSize = width + height;
  const half = gap / 2;
  const bgR = data.data[0];
  const bgG = data.data[1];
  const bgB = data.data[2];

  for (let x = 0; x < width; x += gap) {
    for (let y = 0; y < height; y += gap) {
      const cx = Math.min(width - 1, Math.floor(x + half));
      const cy = Math.min(height - 1, Math.floor(y + half));
      const i = (cy * width + cx) * 4;
      const alpha = data.data[i + 3];
      if (alpha < 96) continue;
      const r = data.data[i];
      const g = data.data[i + 1];
      const b = data.data[i + 2];
      const dr = r - bgR;
      const dg = g - bgG;
      const db = b - bgB;
      if (Math.sqrt(dr * dr + dg * dg + db * db) < BACKGROUND_MATCH_THRESHOLD) continue;
      const dx = x - width / 2;
      const dy = y - height / 2;
      const delay = Math.sqrt(dx * dx + dy * dy);
      pixels.push(new LogoPixel(x, y, `rgb(${r},${g},${b})`, delay, gap, canvasSize));
    }
  }
  return pixels;
}

/**
 * Renders the portfolio logo. The swap animation depends on the mode being
 * entered:
 *   - entering 'pixel' (the `/pixel` command)  -> canvas pixel-dissolve
 *   - entering 'serif' (the `/serif` command)  -> soft blur cross-fade
 *   - entering 'normal' (the `/reset` command) -> plain instant swap
 * A theme toggle alone (no mode change) also stays a plain instant swap.
 */
export function AnimatedLogo({ alt, wrapperClassName, gap = 3 }: AnimatedLogoProps) {
  const { theme } = useTheme();
  const { logoFontMode } = useCosmetics();
  const targetSrc = getLogoSrc(logoFontMode, theme);

  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevModeRef = useRef<LogoFontMode>(logoFontMode);
  const prevSrcRef = useRef<StaticImageData>(targetSrc);
  const rafRef = useRef<number | undefined>(undefined);
  const generationRef = useRef(0);
  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const mountedRef = useRef(true);

  const [transitioning, setTransitioning] = useState(false);
  const [blurPhase, setBlurPhase] = useState<'idle' | 'start' | 'animating'>('idle');
  const [blurGhostSrc, setBlurGhostSrc] = useState<StaticImageData | null>(null);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
      if (blurTimeoutRef.current !== undefined) clearTimeout(blurTimeoutRef.current);
    };
  }, []);

  async function runPixelDissolve(oldSrc: StaticImageData, newSrc: StaticImageData) {
    if (blurTimeoutRef.current !== undefined) clearTimeout(blurTimeoutRef.current);
    setBlurPhase('idle');
    setBlurGhostSrc(null);

    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const rect = wrap.getBoundingClientRect();
    const width = Math.max(1, Math.round(rect.width));
    const height = Math.max(1, Math.round(rect.height));
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let oldData: ImageData;
    let newData: ImageData;
    try {
      [oldData, newData] = await Promise.all([
        sampleImage(oldSrc.src, width, height),
        sampleImage(newSrc.src, width, height),
      ]);
    } catch {
      return;
    }

    if (!mountedRef.current) return;

    const myGen = ++generationRef.current;
    const isCurrent = () => mountedRef.current && myGen === generationRef.current;

    canvas.width = width;
    canvas.height = height;

    const outPixels = buildPixels(oldData, width, height, gap);
    outPixels.forEach((pixel) => {
      pixel.size = pixel.maxSize;
    });
    const inPixels = buildPixels(newData, width, height, gap);

    setTransitioning(true);

    const runPhase = (pixels: LogoPixel[], mode: 'appear' | 'disappear', onDone: () => void) => {
      const startedAt = performance.now();
      const step = () => {
        if (!isCurrent()) return;
        ctx.clearRect(0, 0, width, height);
        let allIdle = true;
        for (const pixel of pixels) {
          if (mode === 'appear') pixel.appear(ctx);
          else pixel.disappear(ctx);
          if (!pixel.isIdle) allIdle = false;
        }
        if (allIdle || performance.now() - startedAt >= MAX_PHASE_DURATION_MS) {
          onDone();
        } else {
          rafRef.current = requestAnimationFrame(step);
        }
      };
      step();
    };

    runPhase(outPixels, 'disappear', () => {
      if (!isCurrent()) return;
      runPhase(inPixels, 'appear', () => {
        if (!isCurrent()) return;
        ctx.clearRect(0, 0, width, height);
        setTransitioning(false);
      });
    });
  }

  function runReset() {
    generationRef.current += 1;
    if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    if (blurTimeoutRef.current !== undefined) clearTimeout(blurTimeoutRef.current);
    const canvas = canvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => {
      setTransitioning(false);
      setBlurPhase('idle');
      setBlurGhostSrc(null);
    });
  }

  function runBlurTransition(oldSrc: StaticImageData) {
    generationRef.current += 1;
    setTransitioning(false);
    const canvas = canvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

    if (blurTimeoutRef.current !== undefined) clearTimeout(blurTimeoutRef.current);

    setBlurGhostSrc(oldSrc);
    setBlurPhase('start');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!mountedRef.current) return;
        setBlurPhase('animating');
      });
    });
    blurTimeoutRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      setBlurPhase('idle');
      setBlurGhostSrc(null);
    }, BLUR_DURATION_MS + 50);
  }

  useEffect(() => {
    const prevMode = prevModeRef.current;
    const prevSrc = prevSrcRef.current;
    prevModeRef.current = logoFontMode;
    prevSrcRef.current = targetSrc;

    if (prevMode === logoFontMode || prevSrc === targetSrc) return;

    // /reset always forces a clean, plain state — even if a dissolve or blur
    // from a previous command was still in flight.
    if (logoFontMode === 'normal') {
      runReset();
      return;
    }

    const reducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    if (logoFontMode === 'pixel') {
      void runPixelDissolve(prevSrc, targetSrc);
    } else if (logoFontMode === 'serif') {
      runBlurTransition(prevSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoFontMode, theme]);

  return (
    <div ref={wrapRef} className={`relative ${wrapperClassName}`}>
      <Image
        src={targetSrc}
        alt={alt}
        className={`h-full w-full object-contain transition duration-500 ease-out ${
          transitioning
            ? 'opacity-0'
            : blurPhase === 'start'
              ? 'opacity-0 blur-sm'
              : 'opacity-100 blur-none'
        }`}
      />
      {blurGhostSrc && (
        <Image
          src={blurGhostSrc}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-contain transition duration-500 ease-out ${
            blurPhase === 'animating' ? 'opacity-0 blur-sm' : 'opacity-100 blur-none'
          }`}
        />
      )}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
    </div>
  );
}
