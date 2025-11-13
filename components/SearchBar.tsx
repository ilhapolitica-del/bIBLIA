import React from 'react';
import { Search, ChevronDown, Book } from 'lucide-react';
import { CATHOLIC_BOOKS } from '../constants';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  selectedBook: string;
  onBookChange: (book: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChange, 
  onSearch,
  selectedBook,
  onBookChange
}) => {
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const books = Object.keys(CATHOLIC_BOOKS);

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="relative group flex items-stretch shadow-xl rounded-lg">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-1000 -z-10"></div>
        
        {/* Input Container */}
        <div className="relative flex-grow flex items-center bg-white dark:bg-slate-800 rounded-l-lg border-y border-l border-stone-200 dark:border-slate-700 overflow-hidden">
          
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
        </div>

        {/* Search Button */}
        <button 
          onClick={onSearch}
          type="button"
          className="px-6 bg-gold-500 hover:bg-gold-600 text-white dark:text-slate-900 font-display font-bold tracking-wide uppercase text-sm rounded-r-lg transition-colors border-y border-r border-gold-600 dark:border-gold-500 flex items-center justify-center active:bg-gold-700 whitespace-nowrap"
        >
          <span className="hidden sm:inline">Pesquisar</span>
          <span className="sm:hidden"><Search size={20} /></span>
        </button>
      </div>
      
      <div className="text-center mt-3 text-sm text-slate-500 dark:text-slate-400 italic">
        "A palavra de Deus é viva e eficaz." (Hb 4,12)
      </div>
    </div>
  );
};