import React from 'react';
import { BibleVerse } from '../types';
import { Book, ChevronRight } from 'lucide-react';

interface SearchResultCardProps {
  verse: BibleVerse;
  isSelected: boolean;
  onSelect: (verse: BibleVerse) => void;
  searchQuery: string;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ verse, isSelected, onSelect, searchQuery }) => {
  
  // Highlight search terms
  const highlightText = (text: string, query: string) => {
    if (!query || query.length < 2) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={i} className="bg-gold-200 dark:bg-gold-600/40 rounded px-0.5 text-slate-900 dark:text-white font-semibold">{part}</span> : 
            part
        )}
      </span>
    );
  };

  return (
    <div 
      onClick={() => onSelect(verse)}
      className={`
        group relative p-6 rounded-lg border transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'bg-white dark:bg-slate-800 border-gold-500 shadow-md ring-1 ring-gold-500' 
          : 'bg-paper-50 dark:bg-slate-800/40 border-transparent hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:border-stone-200 dark:hover:border-slate-700'
        }
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-gold-600 dark:text-gold-500 font-display">
          <Book size={14} />
          <span>{verse.book} {verse.chapter}, {verse.verse}</span>
        </div>
        {isSelected && <div className="text-gold-600 dark:text-gold-400 animate-pulse text-xs font-bold">Visualizando</div>}
      </div>
      
      <p className="text-lg text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
        {highlightText(verse.text, searchQuery)}
      </p>

      <div className="mt-4 flex items-center text-xs text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Ler interpretação católica</span>
        <ChevronRight size={14} className="ml-1" />
      </div>
    </div>
  );
};