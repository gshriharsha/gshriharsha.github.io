const STORAGE_KEY = "theme";

type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function getPreferredTheme(): Theme {
  return (
    getStoredTheme() ??
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );
}

function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore storage errors (e.g. private mode)
  }
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }));
}

function toggleTheme(): Theme {
  const next: Theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function initThemeToggle(buttonSelector: string): void {
  const button = document.querySelector<HTMLButtonElement>(buttonSelector);
  if (!button) return;
  const sync = () => {
    const current =
      (document.documentElement.dataset.theme as Theme) ?? "light";
    button.setAttribute("aria-pressed", String(current === "dark"));
    button.setAttribute(
      "aria-label",
      current === "dark" ? "Switch to light theme" : "Switch to dark theme",
    );
  };
  sync();
  button.addEventListener("click", () => {
    toggleTheme();
    sync();
  });
  document.addEventListener("themechange", sync);
}
