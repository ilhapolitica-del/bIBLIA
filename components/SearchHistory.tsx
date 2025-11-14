import React from 'react';
import { History, Trash2 } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSearch, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 -mt-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <History size={14} />
            <span>Recentes</span>
          </div>
          <button 
            onClick={onClear}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
            aria-label="Limpar histórico"
          >
            <Trash2 size={12} />
            Limpar
          </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, index) => (
          <button
            key={index}
            onClick={() => onSearch(item)}
            className="px-3 py-1 bg-paper-100 dark:bg-slate-800 border border-stone-200 dark:border-slate-700/50 hover:border-gold-400 dark:hover:border-gold-600 rounded-full text-sm text-slate-600 dark:text-slate-300 transition-all shadow-sm hover:shadow-md"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};