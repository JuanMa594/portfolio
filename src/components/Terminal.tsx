"use client";

import { FormEvent, useState } from "react";

type TerminalLine = {
  id: number;
  value: string;
  type: "input" | "output" | "error";
};

const responses: Record<string, string> = {
  "/help": "Commands: /help, /about, /projects, /matrix, /pixel, /clear",
  "/about": "Frontend developer focused on polished digital experiences.",
  "/projects": "Scrolling to projects...",
  "/matrix": "Matrix visualizer activated.",
  "/pixel": "Pixel mode activated.",
};

export function Terminal() {
  const [value, setValue] = useState("");
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 1,
      value: "Welcome. Type /help to see available commands.",
      type: "output",
    },
  ]);

  function executeCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = value.trim().toLowerCase();

    if (!command) return;

    if (command === "/clear") {
      setLines([]);
      setValue("");
      return;
    }

    const response = responses[command] ?? `Command not found: ${command}`;

    setLines((current) => [
      ...current,
      { id: Date.now(), value: command, type: "input" },
      {
        id: Date.now() + 1,
        value: response,
        type: responses[command] ? "output" : "error",
      },
    ]);

    if (command === "/projects") {
      document.querySelector("#projects")?.scrollIntoView({
        behavior: "smooth",
      });
    }

    setValue("");
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-[#07111f] shadow-xl shadow-black/20">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 font-mono text-xs text-slate-400">
          juanma@portfolio:~
        </span>
      </div>

      <div className="min-h-44 space-y-2 p-4 font-mono text-sm">
        {lines.map((line) => (
          <p
            key={line.id}
            className={
              line.type === "input"
                ? "text-sky-300"
                : line.type === "error"
                  ? "text-red-300"
                  : "text-slate-300"
            }
          >
            {line.type === "input" ? "> " : ""}
            {line.value}
          </p>
        ))}

        <form onSubmit={executeCommand} className="flex items-center gap-2">
          <span className="text-emerald-400">{">"}</span>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </div>
  );
}