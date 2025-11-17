import React, { useState } from 'react';
import { Search, ChevronDown, Book, Settings2, Globe } from 'lucide-react';
import { CATHOLIC_BOOKS, BIBLE_TRANSLATIONS } from '../constants';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  selectedBook: string;
  onBookChange: (book: string) => void;
  selectedTranslation: string;
  onTranslationChange: (translation: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onSearch,
  selectedBook,
  onBookChange,
  selectedTranslation,
  onTranslationChange
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const books = Object.keys(CATHOLIC_BOOKS);
  const translations = Object.entries(BIBLE_TRANSLATIONS);

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative group flex flex-col items-stretch shadow-xl rounded-lg">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 -z-10"></div>
        
        {/* Input Container */}
        <div className="relative flex-grow flex items-stretch bg-white dark:bg-slate-800 rounded-t-lg border-y border-l border-r border-stone-200 dark:border-slate-700 overflow-hidden">
          {/* Book Filter Dropdown */}
          <div className="relative h-full flex items-center border-r border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900/50 min-w-[140px] sm:min-w-[180px]">
            <div className="absolute left-3 text-gold-600 dark:text-gold-500 pointer-events-none z-10">
              <Book size={16} />
            </div>
            <select 
              value={selectedBook}
              onChange={(e) => onBookChange(e.target.value)}
              className="w-full h-full pl-9 pr-8 py-4 bg-transparent text-sm font-display font-bold text-slate-700 dark:text-slate-200 outline-none appearance-none cursor-pointer hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors truncate"
            >
              <option value="">Todos os Livros</option>
              {books.map((book) => (
                <option key={book} value={book}>{book}</option>
              ))}
            </select>
            <div className="absolute right-2 text-slate-400 pointer-events-none">
              <ChevronDown size={14} />
            </div>
          </div>

          {/* Text Input */}
          <div className="flex-grow flex items-center relative">
            <div className="absolute left-4 text-gold-600 dark:text-gold-500">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar... (ex: 'Caridade')"
              className="w-full pl-12 pr-4 py-4 bg-transparent text-lg outline-none text-slate-800 dark:text-paper-50 placeholder-slate-400 dark:placeholder-slate-500 font-serif"
            />
          </div>

          {/* Search Button */}
          <button 
            onClick={onSearch}
            type="button"
            className="px-6 bg-gold-500 hover:bg-gold-600 text-white dark:text-slate-900 font-display font-bold tracking-wide uppercase text-sm transition-colors border-y border-r border-gold-600 dark:border-gold-500 flex items-center justify-center active:bg-gold-700 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Pesquisar</span>
            <span className="sm:hidden"><Search size={20} /></span>
          </button>
        </div>
        
        {/* Advanced Search Section */}
        <div className="bg-paper-50 dark:bg-slate-800/50 border-x border-b border-stone-200 dark:border-slate-700 rounded-b-lg">
           <button onClick={() => setShowAdvanced(!showAdvanced)} className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-500 hover:text-gold-600 dark:text-slate-400 dark:hover:text-gold-400 transition-colors">
              <Settings2 size={12} />
              Busca Avançada
              <ChevronDown size={12} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
           </button>
           {showAdvanced && (
             <div className="p-4 border-t border-stone-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="flex items-center gap-4">
                  <span className="flex items-center gap-2 text-base font-semibold text-slate-700 dark:text-slate-200 min-w-max">
                    <Globe size={16} className="text-gold-600 dark:text-gold-500" />
                    Tradução:
                  </span>
                  <select
                    value={selectedTranslation}
                    onChange={(e) => onTranslationChange(e.target.value)}
                    className="w-full p-2 bg-white dark:bg-slate-700 border border-stone-300 dark:border-slate-600 rounded-md text-base text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-gold-500"
                  >
                    {translations.map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </select>
                </label>
             </div>
           )}
        </div>

      </div>
      
      <div className="text-center mt-3 text-sm text-slate-500 dark:text-slate-400 italic">
        "A palavra de Deus é viva e eficaz." (Hb 4,12)
      </div>
    </div>
  );
};