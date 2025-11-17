import React, { useState, useEffect } from 'react';
import { FilePenLine, Save } from 'lucide-react';

interface NotePanelProps {
  noteText: string;
  onSaveNote: (newText: string) => void;
}

export const NotePanel: React.FC<NotePanelProps> = ({ noteText, onSaveNote }) => {
  const [text, setText] = useState(noteText);
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    setText(noteText);
    setIsSaved(true);
  }, [noteText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    onSaveNote(text);
    setIsSaved(true);
  };

  return (
    <div className="mt-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-700">
      <div className="bg-white dark:bg-slate-800/40 border border-stone-200 dark:border-slate-700 rounded-lg overflow-hidden shadow-sm">
        <div className="w-full px-6 py-4 flex items-center gap-2 bg-stone-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
          <FilePenLine size={18} className="text-gold-600 dark:text-gold-500" />
          <h3 className="font-display font-bold text-sm uppercase tracking-wide">
            Minhas Anotações
          </h3>
        </div>
        <div className="p-4 border-t border-stone-100 dark:border-slate-700/50">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Escreva suas reflexões sobre esta passagem..."
            className="w-full h-32 p-3 bg-paper-50 dark:bg-slate-900/50 rounded-md border border-stone-300 dark:border-slate-600 focus:ring-2 focus:ring-gold-500 focus:outline-none font-serif text-slate-800 dark:text-slate-200"
          />
          <div className="mt-3 flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className="flex items-center gap-2 px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white dark:text-slate-900 text-sm font-bold rounded-md transition-colors disabled:bg-slate-300 dark:disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              <span>{isSaved ? 'Salvo' : 'Salvar Anotação'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
