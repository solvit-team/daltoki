import React from 'react';
import type { Word } from '../types/word';

interface WordListProps {
  words: Word[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
  const getUsageColor = (usage: string) => {
    switch (usage) {
      case 'core':
        return 'bg-green-400'; // #34D399
      case 'common':
        return 'bg-sky-400'; // #38BDF9
      case 'obscure':
        return 'bg-fuchsia-400'; // #E979F9
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-2">
      {words.map((word, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${getUsageColor(word.usage)}`}></div>
            <span className="text-black font-normal text-sm flex-1">{word.word}</span>
            <span className="text-black font-normal text-sm">{word.meaning}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;