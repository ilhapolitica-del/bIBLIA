import React from 'react';
import { Paintbrush, X } from 'lucide-react';
import { HighlightColor } from '../types';

interface HighlightPaletteProps {
  onSelectColor: (color: HighlightColor | 'none') => void;
}

const colors: HighlightColor[] = ['yellow', 'green', 'blue', 'pink'];

const colorClasses: Record<HighlightColor, string> = {
  yellow: 'bg-yellow-400 ring-yellow-500',
  green: 'bg-green-400 ring-green-500',
  blue: 'bg-blue-400 ring-blue-500',
  pink: 'bg-pink-400 ring-pink-500',
};

export const HighlightPalette: React.FC<HighlightPaletteProps> = ({ onSelectColor }) => {
  return (
    <div className="flex items-center gap-4 p-2 rounded-lg bg-paper-100 dark:bg-slate-800/50 border border-paper-200 dark:border-slate-700/50">
      <div className="flex items-center gap-1">
        <Paintbrush size={14} className="text-slate-500 dark:text-slate-400" />
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 mr-2">Marcar:</span>
      </div>
      <div className="flex items-center gap-2">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            aria-label={`Marcar com a cor ${color}`}
            className={`w-6 h-6 rounded-full ${colorClasses[color]} transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-800`}
          />
        ))}
        <button
          onClick={() => onSelectColor('none')}
          aria-label="Remover marcação"
          className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
