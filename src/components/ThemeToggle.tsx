import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-xl bg-surface hover:bg-surface-hover border border-border border-border transition-colors flex items-center justify-center text-text-muted hover:text-text-main"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 dark:hidden block" />
      <Moon className="h-5 w-5 hidden dark:block" />
    </button>
  );
}
