import React from 'react';
import { X, Bookmark, Trash2, FileText, Scroll, User, Sparkles, BookOpen } from 'lucide-react';
import { SavedCommentary } from '../types';

interface SavedCommentariesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedItems: SavedCommentary[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export const SavedCommentariesModal: React.FC<SavedCommentariesModalProps> = ({
  isOpen,
  onClose,
  savedItems,
  onDelete,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-paper-100 dark:bg-slate-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-paper-200 dark:border-slate-800 flex-shrink-0">
          <h2 className="text-xl font-display font-bold flex items-center gap-3 text-slate-800 dark:text-paper-50">
            <Bookmark className="text-gold-500" />
            Comentários Salvos
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto p-6">
          {savedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 dark:text-slate-400">
              <FileText size={48} className="mb-4" />
              <h3 className="font-bold text-lg mb-1">Nenhum comentário salvo</h3>
              <p>Clique no ícone de marcador em um comentário para salvá-lo aqui.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedItems.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border border-paper-200 dark:border-slate-700/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-display font-bold text-crimson-900 dark:text-gold-500 text-lg">
                        {item.verse.book} {item.verse.chapter}, {item.verse.verse}
                      </h3>
                      <p className="font-serif text-slate-600 dark:text-slate-300 italic mb-3">
                        "{item.verse.text}"
                      </p>
                    </div>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="p-2 rounded-full hover:bg-red-100/50 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-600 dark:hover:text-red-400"
                      aria-label="Deletar comentário"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="mt-2 pt-3 border-t border-paper-200 dark:border-slate-700 space-y-4">
                    {item.content.theological && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          <Sparkles size={16} className="text-gold-600 dark:text-gold-400" />
                          <span>Comentário Teológico</span>
                        </div>
                        <p className="font-serif text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.content.theological}</p>
                      </div>
                    )}
                    {item.content.patristic && (
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          <Scroll size={16} className="text-crimson-800 dark:text-gold-500" />
                          <span>Voz da Tradição: <span className="font-bold">{item.content.patristicSource}</span></span>
                        </div>
                        <p className="font-serif text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">"{item.content.patristic}"</p>
                      </div>
                    )}
                    {item.content.jerusalem && (
                       <div>
                        <div className="flex items-center gap-2 mb-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                          <BookOpen size={16} className="text-crimson-800 dark:text-gold-500" />
                          <span>Nota da Bíblia de Jerusalém</span>
                        </div>
                        <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-2">
                          Gerado no estilo histórico-crítico.
                        </p>
                        <p className="font-serif text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.content.jerusalem}</p>
                      </div>
                    )}
                  </div>
                   <p className="text-right text-xs text-slate-400 dark:text-slate-500 mt-3">
                     Salvo em: {new Date(item.savedAt).toLocaleDateString('pt-BR')}
                   </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {savedItems.length > 0 && (
          <div className="p-4 border-t border-paper-200 dark:border-slate-800 flex justify-end flex-shrink-0 bg-paper-50 dark:bg-slate-900/50">
            <button 
              onClick={onClearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-600/10 text-red-700 dark:text-red-400 dark:bg-red-500/10 hover:bg-red-600/20 text-sm font-bold rounded-md transition-colors"
            >
              <Trash2 size={14} />
              Limpar Tudo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};