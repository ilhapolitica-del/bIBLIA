import React, { useState } from 'react';
import { Link, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import { CrossReference } from '../types';

interface CrossReferencesPanelProps {
  references: CrossReference[] | null;
  isLoading: boolean;
}

export const CrossReferencesPanel: React.FC<CrossReferencesPanelProps> = ({ references, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if nothing has been initiated
  if (!isLoading && !references) return null;

  return (
    <div className="mt-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="bg-white dark:bg-slate-800/40 border border-stone-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 flex items-center justify-between bg-stone-50 dark:bg-slate-800 hover:bg-stone-100 dark:hover:bg-slate-750 transition-colors"
        >
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <Link size={18} className="text-gold-600 dark:text-gold-500" />
            <h3 className="font-display font-bold text-sm uppercase tracking-wide">
              Referências Cruzadas & Conexões
            </h3>
          </div>
          <div className="text-slate-400">
            {isLoading ? (
              <Loader2 size={18} className="animate-spin text-gold-500" />
            ) : (
              isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />
            )}
          </div>
        </button>

        {(isOpen || isLoading) && (
          <div className={`
            border-t border-stone-100 dark:border-slate-700/50 
            transition-all duration-300 ease-in-out
            ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}
          `}>
            <div className="p-6 space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                   {[1, 2, 3].map((i) => (
                     <div key={i} className="animate-pulse">
                       <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2"></div>
                       <div className="h-12 bg-slate-100 dark:bg-slate-800 rounded w-full"></div>
                     </div>
                   ))}
                </div>
              ) : (
                references?.map((ref, idx) => (
                  <div key={idx} className="relative pl-4 border-l-2 border-gold-300 dark:border-gold-700/50">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-display font-bold text-gold-700 dark:text-gold-500 text-sm">
                        {ref.reference}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 italic font-serif text-sm mb-2">
                      "{ref.text}"
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 bg-paper-50 dark:bg-slate-900/50 p-2 rounded">
                      <span className="font-semibold">Conexão:</span> {ref.reason}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};