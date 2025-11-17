import React from 'react';
import { BibleVerse, HighlightColor } from '../types';
import { Book, ChevronRight } from 'lucide-react';
import { HighlightPalette } from './HighlightPalette';

interface SearchResultCardProps {
  verse: BibleVerse;
  isSelected: boolean;
  onSelect: (verse: BibleVerse) => void;
  searchQuery: string;
  isPrimary?: boolean;
  isReadingMode?: boolean;
  highlightColor?: HighlightColor;
  onHighlight: (verse: BibleVerse, color: HighlightColor | 'none') => void;
}

const highlightClasses: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-300/60 dark:bg-yellow-400/30',
  green: 'bg-green-300/60 dark:bg-green-400/30',
  blue: 'bg-blue-300/60 dark:bg-blue-400/30',
  pink: 'bg-pink-300/60 dark:bg-pink-400/30',
};

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ 
  verse, 
  isSelected, 
  onSelect, 
  searchQuery, 
  isPrimary, 
  isReadingMode,
  highlightColor,
  onHighlight
}) => {
  
  // Highlight search terms
  const highlightText = (text: string, query: string) => {
    if (!query || query.length < 2) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? 
            <span key={i} className="bg-gold-200 dark:bg-gold-600/40 rounded px-0.5 text-slate-900 dark:text-white font-semibold">{part}</span> : 
            part
        )}
      </>
    );
  };

  const verseTextContent = isReadingMode ? verse.text : highlightText(verse.text, searchQuery);
  const currentHighlightClass = highlightColor ? highlightClasses[highlightColor] : '';

  if (isReadingMode) {
    return (
      <div 
        onClick={() => onSelect(verse)}
        className={`
          py-4 border-b border-paper-200 dark:border-slate-800 transition-colors duration-300 rounded-md
          ${isSelected ? 'bg-paper-100 dark:bg-slate-800/50' : 'bg-transparent'}
          ${currentHighlightClass}
        `}
      >
        <div className="flex items-center gap-2 text-base font-bold tracking-wider uppercase text-gold-600 dark:text-gold-500 font-display mb-3">
          <Book size={16} />
          <span>{verse.book} {verse.chapter}, {verse.verse}</span>
        </div>
        <p className="font-serif text-xl sm:text-2xl text-slate-900 dark:text-slate-100 leading-relaxed sm:leading-loose">
          {verse.text}
        </p>
        {isSelected && (
          <div className="mt-4 pl-2">
            <HighlightPalette onSelectColor={(color) => onHighlight(verse, color)} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      onClick={() => onSelect(verse)}
      className={`
        group relative p-6 rounded-lg border transition-all duration-300 cursor-pointer
        ${currentHighlightClass}
        ${isSelected 
          ? 'bg-white dark:bg-slate-800 border-gold-500 shadow-lg ring-2 ring-gold-500' 
          : isPrimary
          ? `border-gold-500/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:border-gold-500 ${!highlightColor ? 'bg-paper-100/50 dark:bg-slate-800/60' : ''}`
          : `border-transparent hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm hover:border-stone-200 dark:hover:border-slate-700 ${!highlightColor ? 'bg-paper-50 dark:bg-slate-800/40' : ''}`
        }
      `}
    >
      {isPrimary && !isSelected && (
        <div className="absolute top-2 right-2 text-xs font-bold uppercase tracking-wider bg-gold-500 text-white dark:text-slate-900 px-2 py-0.5 rounded-full font-display z-10">
            Principal
        </div>
      )}

      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-gold-600 dark:text-gold-500 font-display">
          <Book size={14} />
          <span>{verse.book} {verse.chapter}, {verse.verse}</span>
        </div>
        {isSelected && <div className="text-gold-600 dark:text-gold-400 animate-pulse text-xs font-bold">Visualizando</div>}
      </div>
      
      <p className="text-lg text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
        {verseTextContent}
      </p>

      {isSelected && (
        <div className="mt-4 pt-4 border-t border-gold-500/20">
          <HighlightPalette onSelectColor={(color) => onHighlight(verse, color)} />
        </div>
      )}

      {!isSelected && (
        <div className="mt-4 flex items-center text-xs text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Ler interpretação católica</span>
          <ChevronRight size={14} className="ml-1" />
        </div>
      )}
    </div>
  );
};