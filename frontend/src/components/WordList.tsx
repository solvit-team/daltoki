import React from "react";
import type { Word } from "../types/word";
import { getLanguageDisplayName } from "../types/language";

interface TranslationResult {
  word: string;
  part_of_speech: string;
  usage: string;
  sitelen_pona: string;
  multilingual_translations: Record<string, string>;
}

interface WordListProps {
  words?: Word[];
  translationResults?: TranslationResult[];
  selectedLanguage?: string;
}

const WordList: React.FC<WordListProps> = ({
  words = [],
  translationResults = [],
  selectedLanguage = "korean",
}) => {
  const getUsageColor = (usage: string) => {
    switch (usage) {
      case "core":
        return "bg-green-400"; // #34D399
      case "common":
        return "bg-sky-400"; // #38BDF9
      case "obscure":
        return "bg-fuchsia-400"; // #E979F9
      default:
        return "bg-gray-400";
    }
  };

  const displayWords =
    translationResults.length > 0 ? translationResults : words;

  return (
    <div className="flex flex-col gap-2.5">
      {displayWords.map((item, index) => (
        <div key={index} className="bg-white rounded-lg px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-2 h-2 rounded-full ${
                "usage" in item
                  ? getUsageColor(item.usage)
                  : getUsageColor((item as Word).usage)
              }`}
            ></div>
            <span className="text-black font-normal text-sm flex-1">
              {"word" in item ? item.word : (item as Word).word}
            </span>
            <span className="text-black font-normal text-sm">
              {"multilingual_translations" in item
                ? item.multilingual_translations[selectedLanguage] || item.multilingual_translations["korean"] || "No translation"
                : (item as Word).meaning}
            </span>
            {"part_of_speech" in item && (
              <span className="text-gray-500 text-xs">
                ({item.part_of_speech})
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;
