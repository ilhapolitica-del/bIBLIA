import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="relative group flex items-stretch shadow-xl rounded-lg">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 -z-10"></div>
        
        {/* Input Container */}
        <div className="relative flex-grow flex items-center bg-white dark:bg-slate-800 rounded-l-lg border-y border-l border-stone-200 dark:border-slate-700 overflow-hidden">
          <div className="pl-4 text-gold-600 dark:text-gold-500">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar... (ex: 'Gen 3,15-20' ou 'Caridade')"
            className="w-full p-4 bg-transparent text-lg outline-none text-slate-800 dark:text-paper-50 placeholder-slate-400 dark:placeholder-slate-500 font-serif"
          />
        </div>

        {/* Search Button */}
        <button 
          onClick={onSearch}
          type="button"
          className="px-6 bg-gold-500 hover:bg-gold-600 text-white dark:text-slate-900 font-display font-bold tracking-wide uppercase text-sm rounded-r-lg transition-colors border-y border-r border-gold-600 dark:border-gold-500 flex items-center justify-center active:bg-gold-700"
        >
          Pesquisar
        </button>
      </div>
      
      <div className="text-center mt-3 text-sm text-slate-500 dark:text-slate-400 italic">
        "A palavra de Deus é viva e eficaz." (Hb 4,12)
      </div>
    </div>
  );
};