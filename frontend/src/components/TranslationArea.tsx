import React, { useState } from 'react';
import { ClipboardCopy } from 'lucide-react';

interface TranslationAreaProps {
  onInputChange?: (text: string) => void;
  onCopy?: () => void;
  placeholder?: string;
}

const TranslationArea: React.FC<TranslationAreaProps> = ({
  onInputChange,
  onCopy,
  placeholder = "Type the Sitelen Lasina"
}) => {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputText(value);
    onInputChange?.(value);
  };

  const handleCopy = () => {
    if (inputText) {
      navigator.clipboard.writeText(inputText);
      onCopy?.();
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white border border-black rounded-lg overflow-hidden">
        <div className="flex flex-col p-4 gap-2.5">
          <textarea
            value={inputText}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full h-20 text-sm font-normal resize-none outline-none placeholder-gray-400 text-black"
          />
          {inputText && (
            <div className="flex justify-end items-center">
              <button onClick={handleCopy} className="w-4 h-4 flex items-center justify-center">
                <ClipboardCopy size={16} strokeWidth={1.5} color="black" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranslationArea;