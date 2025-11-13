import React from 'react';
import { Moon, Sun, Cross } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold-500/20 bg-paper-50/95 dark:bg-slate-900/95 backdrop-blur transition-colors duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-crimson-800 dark:text-gold-500">
            <Cross size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-paper-50 font-display">
              Verbum Dei
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Palavra e Comentário Católico
            </p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gold-500/10 text-slate-600 dark:text-gold-400 transition-colors"
          aria-label="Alternar tema"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};