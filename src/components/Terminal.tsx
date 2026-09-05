'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { useCosmetics } from './CosmeticsContext';
import { useTheme } from './ThemeContext';
import { useProjectsFilter } from './Projects/ProjectsFilterContext';
import { COMMANDS, parseInput, type CommandContext, type CommandOutput } from './terminalCommands';

type TerminalLine = {
  id: number;
  value: string;
  type: 'input' | 'output' | 'error';
};

type MatrixColumn = { left: number; duration: number; delay: number; text: string };

const MATRIX_CHARS = '01アイウエオカキクケコJMDEVJUANMA'.split('');
const MATRIX_COLUMNS = 16;
const MATRIX_DURATION_MS = 2500;

function randomColumnText(length: number) {
  return Array.from({ length }, () => MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]).join('\n');
}

function buildMatrixColumns(): MatrixColumn[] {
  return Array.from({ length: MATRIX_COLUMNS }, (_, i) => ({
    left: (i / MATRIX_COLUMNS) * 100,
    duration: 1.6 + Math.random() * 1.2,
    delay: Math.random() * 0.8,
    text: randomColumnText(10),
  }));
}

function toLines(output: CommandOutput): string[] {
  if (!output) return [];
  return Array.isArray(output) ? output : [output];
}

export function Terminal() {
  const cosmetics = useCosmetics();
  const { theme, toggleTheme } = useTheme();
  const { setActiveFilter } = useProjectsFilter();
  const [value, setValue] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, value: 'Welcome. Type /help to see available commands.', type: 'output' },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const [matrixColumns, setMatrixColumns] = useState<MatrixColumn[]>([]);

  const nextId = useRef(1);
  const historyRef = useRef<HTMLDivElement>(null);
  const matrixTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    return () => {
      if (matrixTimeout.current) clearTimeout(matrixTimeout.current);
    };
  }, []);

  function triggerMatrix() {
    if (matrixTimeout.current) clearTimeout(matrixTimeout.current);
    setMatrixColumns(buildMatrixColumns());
    setMatrixActive(true);
    matrixTimeout.current = setTimeout(() => setMatrixActive(false), MATRIX_DURATION_MS);
  }

  function executeCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const raw = value.trim();
    if (!raw) return;

    const commandLabel = raw.toLowerCase();
    const parsed = parseInput(raw);

    if (parsed.name === 'clear' || parsed.name === 'cls') {
      setLines([]);
      setValue('');
      return;
    }

    const command = COMMANDS[parsed.name];
    const inputLine: TerminalLine = { id: nextId.current++, value: commandLabel, type: 'input' };

    if (!command) {
      setLines((current) => [
        ...current,
        inputLine,
        { id: nextId.current++, value: `Command not found: ${commandLabel}`, type: 'error' },
      ]);
      setValue('');
      return;
    }

    const ctx: CommandContext = {
      cosmetics,
      theme,
      toggleTheme,
      scrollToSection: (id) => document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' }),
      triggerMatrix,
      setProjectFilter: setActiveFilter,
    };

    const outputLines = toLines(command.run(parsed, ctx));

    setLines((current) => [
      ...current,
      inputLine,
      ...outputLines.map((text) => ({ id: nextId.current++, value: text, type: 'output' as const })),
    ]);

    setValue('');
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-[#07111f] shadow-xl shadow-black/20">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-slate-400">
          juanma@portfolio:~
        </span>
      </div>

      <div ref={historyRef} className="max-h-80 space-y-1 overflow-y-auto p-4 font-mono text-sm">
        {lines.map((line) => (
          <p
            key={line.id}
            className={`whitespace-pre-wrap ${
              line.type === 'input'
                ? 'text-sky-300'
                : line.type === 'error'
                  ? 'text-red-300'
                  : 'text-slate-300'
            }`}
          >
            {line.type === 'input' ? '> ' : ''}
            {line.value}
          </p>
        ))}

        <form onSubmit={executeCommand} className="flex items-center gap-2">
          <span className="text-emerald-400">{'>'}</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
            placeholder="Type /help to see what you can do..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>

      {matrixActive && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          {matrixColumns.map((column, i) => (
            <span
              key={i}
              className="matrix-column"
              style={{
                left: `${column.left}%`,
                animationDuration: `${column.duration}s`,
                animationDelay: `${column.delay}s`,
              }}
            >
              {column.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
