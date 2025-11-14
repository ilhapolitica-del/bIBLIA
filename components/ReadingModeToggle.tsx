import React from 'react';
import { BookText, X } from 'lucide-react';

interface ReadingModeToggleProps {
  isReadingMode: boolean;
  onToggle: () => void;
}

export const ReadingModeToggle: React.FC<ReadingModeToggleProps> = ({ isReadingMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-500 hover:bg-gold-600 text-white dark:text-slate-900 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-paper-50 dark:focus:ring-offset-slate-900 focus:ring-gold-500"
      aria-label={isReadingMode ? "Sair do modo leitura" : "Entrar no modo leitura"}
    >
      <span className="sr-only">{isReadingMode ? "Sair do modo leitura" : "Entrar no modo leitura"}</span>
      {isReadingMode ? <X size={28} strokeWidth={2.5} /> : <BookText size={28} />}
    </button>
  );
};
