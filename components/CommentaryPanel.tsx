import React from 'react';
import { BookOpen, Sparkles, Scroll, User } from 'lucide-react';
import { CommentaryState } from '../types';

interface CommentaryPanelProps {
  commentary: CommentaryState;
}

export const CommentaryPanel: React.FC<CommentaryPanelProps> = ({ commentary }) => {
  if (!commentary.isLoading && !commentary.content && !commentary.error) return null;

  return (
    <div className="mt-8 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-paper-100 dark:bg-slate-800/50 border-t-4 border-gold-500 rounded-lg shadow-lg relative overflow-hidden">
        
        {/* Decorative watermark */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-5 pointer-events-none text-slate-900 dark:text-white">
           <BookOpen size={120} />
        </div>

        {commentary.isLoading ? (
          <div className="p-6 space-y-3 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="text-gold-600 dark:text-gold-400" size={20} />
              <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
            </div>
            <p className="text-sm text-slate-500 mt-4 italic">Consultando a Tradição e os Santos Padres...</p>
          </div>
        ) : commentary.error ? (
          <div className="p-6 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded border border-red-100 dark:border-red-900">
            {commentary.error}
          </div>
        ) : (
          <>
            {/* Theological Section */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-gold-600 dark:text-gold-400" size={20} />
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-paper-50">
                  Comentário Teológico
                </h3>
              </div>
              <div className="prose prose-stone dark:prose-invert max-w-none">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-lg text-justify">
                  {commentary.content?.theological}
                </p>
              </div>
            </div>

            {/* Patristic Section */}
            <div className="bg-white/50 dark:bg-slate-900/30 p-6 pt-4 border-t border-gold-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Scroll className="text-crimson-800 dark:text-gold-500" size={20} />
                <h3 className="font-display font-bold text-lg text-crimson-900 dark:text-gold-100">
                  Voz da Tradição
                </h3>
              </div>
              
              <div className="relative pl-4 border-l-4 border-crimson-800 dark:border-gold-600">
                <p className="text-slate-700 dark:text-slate-300 italic font-serif text-lg text-justify leading-relaxed mb-2">
                  "{commentary.content?.patristic}"
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-crimson-900 dark:text-gold-400 mt-2 font-display uppercase tracking-wide">
                  <User size={14} />
                  <span>{commentary.content?.patristicSource}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/50 text-xs text-slate-500 dark:text-slate-400 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
              <span>Fiel ao Magistério da Igreja Católica</span>
              <span className="font-display text-gold-600 dark:text-gold-400">Verbum Dei AI</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};