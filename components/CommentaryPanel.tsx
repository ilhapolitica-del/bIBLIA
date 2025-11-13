import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { CommentaryState } from '../types';

interface CommentaryPanelProps {
  commentary: CommentaryState;
}

export const CommentaryPanel: React.FC<CommentaryPanelProps> = ({ commentary }) => {
  if (!commentary.isLoading && !commentary.content && !commentary.error) return null;

  return (
    <div className="mt-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-paper-100 dark:bg-slate-800/50 border-t-4 border-gold-500 rounded-lg p-6 shadow-lg relative overflow-hidden">
        
        {/* Decorative watermark */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-5 pointer-events-none text-slate-900 dark:text-white">
           <BookOpen size={120} />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="text-gold-600 dark:text-gold-400" size={20} />
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper-50">
            Comentário Teológico
          </h3>
        </div>

        {commentary.isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            <p className="text-sm text-slate-500 mt-4 italic">Consultando a Tradição e o Magistério...</p>
          </div>
        ) : commentary.error ? (
          <div className="text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900">
            {commentary.error}
          </div>
        ) : (
          <div className="prose prose-stone dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-base text-justify">
              {commentary.content}
            </p>
            <div className="mt-4 pt-4 border-t border-gold-500/20 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center">
              <span>Fiel ao Magistério da Igreja Católica</span>
              <span className="font-display text-gold-600 dark:text-gold-400">Verbum Dei AI</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};