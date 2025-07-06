import React from 'react';

interface TokiPonaTextProps {
  text: Array<{ word: string; color: string }>;
}

const TokiPonaText: React.FC<TokiPonaTextProps> = ({ text }) => {
  return (
    <p className="text-lg">
      {text.map((item, index) => (
        <span key={index} className={`${item.color} ${item.color.includes('font-semibold') ? '' : 'font-semibold'}`}>
          {item.word}
          {index < text.length - 1 && ' '}
        </span>
      ))}
    </p>
  );
};

export default TokiPonaText;