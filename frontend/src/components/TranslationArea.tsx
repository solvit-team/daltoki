import React, { useState, useEffect } from "react";
import { ClipboardCopy } from "lucide-react";
import { toast } from "sonner";

interface TranslationResult {
  word: string;
  part_of_speech: string;
  usage: string;
  sitelen_pona: string;
  multilingual_translations: Record<string, string>;
}

interface TranslationAreaProps {
  onInputChange?: (text: string) => void;
  onCopy?: () => void;
  placeholder?: string;
  selectedLanguage?: string;
  onTranslationUpdate?: (results: TranslationResult[]) => void;
}

const TranslationArea: React.FC<TranslationAreaProps> = ({
  onInputChange,
  onCopy,
  placeholder = "Type the Sitelen Lasina",
  selectedLanguage = "korean",
  onTranslationUpdate,
}) => {
  const [inputText, setInputText] = useState("");
  const [translationResults, setTranslationResults] = useState<
    TranslationResult[]
  >([]);

  const fetchTranslation = async (text: string) => {
    if (!text.trim()) {
      setTranslationResults([]);
      onTranslationUpdate?.([]);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/translations/translate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTranslationResults(data.translations);
        onTranslationUpdate?.(data.translations);
      }
    } catch (error) {
      console.error("Translation error:", error);
      toast("번역 중 오류가 발생했습니다");
    }
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setInputText(value);
    onInputChange?.(value);

    await fetchTranslation(value);
  };

  useEffect(() => {
    if (inputText.trim()) {
      fetchTranslation(inputText);
    }
  }, [selectedLanguage]);

  const handleCopy = () => {
    if (inputText) {
      navigator.clipboard.writeText(inputText);
      toast("텍스트가 클립보드에 복사되었습니다");
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
              <button
                onClick={handleCopy}
                className="w-4 h-4 flex items-center justify-center"
              >
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
