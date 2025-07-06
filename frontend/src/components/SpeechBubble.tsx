import React from 'react';

interface SpeechBubbleProps {
  text: string;
  onCopy?: () => void;
  onDownload?: () => void;
}

const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  text,
  onCopy,
  onDownload
}) => {
  return (
    <div className="w-80 bg-white">
      <div className="flex flex-col">
        <div className="bg-white bg-opacity-70 px-4 py-4 text-center">
          <p className="text-black text-sm font-normal">{text}</p>
        </div>
        <div className="bg-white bg-opacity-70 px-4 py-0 flex justify-end items-center gap-2.5 h-10">
          <button
            onClick={onCopy}
            className="w-4.5 h-4.5 flex items-center justify-center"
          >
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0H3V3H0V15H12.75V3H9V0Z"
                stroke="black"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M3 0H9V3"
                stroke="black"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M5.25 6H8.25V12"
                stroke="black"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </button>
          <button
            onClick={onDownload}
            className="w-4.5 h-4.5 flex items-center justify-center"
          >
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 2.25V11.25M4.5 11.25L1.5 8.25M4.5 11.25L7.5 8.25"
                stroke="black"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeechBubble;