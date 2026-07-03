type NavbarProps = {
  theme: "light" | "dark";
  onToggleTheme: () => void;
};

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6">
      <a
        href="#home"
        className="font-display text-xl font-bold tracking-tight text-ink"
      >
        JM<span className="text-accent">.</span>
      </a>

      <nav className="hidden rounded-full border border-ink/10 bg-surface/70 p-1 shadow-sm backdrop-blur md:flex">
        {["Home", "Projects", "Experience", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-ink/5 hover:text-ink"
          >
            {item}
          </a>
        ))}
      </nav>

      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Cambiar tema"
        className="flex items-center gap-2 rounded-full border border-ink/10 bg-surface px-3 py-2 text-sm font-medium text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-accent/40"
      >
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            theme === "dark" ? "bg-accent" : "bg-amber-400"
          }`}
        />
        {theme === "dark" ? "Dark" : "Light"}
      </button>
    </header>
  );
}