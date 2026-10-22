import { Terminal } from './Terminal';
import { HeroLogo } from './HeroLogo';
import { DownloadCvButton } from './DownloadCvButton';

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-12 px-5 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div>
        <p className="mb-4 font-mono text-sm text-accent">
          {"// Software Developer"}
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
          I&apos;m <span className="text-ink">JuanMa<span className="text-accent">.</span></span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
          Software & Automation developer
        </p>

        <div className="mt-10">
          <Terminal />
        </div>

        <DownloadCvButton className="mt-6" />
      </div>

      <HeroLogo />
    </section>
  );
}
