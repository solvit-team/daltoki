import React from "react";

interface TranslationResult {
  word: string;
  usage: string;
  sitelen_pona: string;
  multilingual_translations: Record<string, string>;
}

interface WordListProps {
  translationResults?: TranslationResult[];
  selectedLanguage?: string;
}

const WordList: React.FC<WordListProps> = ({
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

  const displayWords = translationResults.filter((result, index, self) =>
    index === self.findIndex((r) => r.word === result.word)
  );

  return (
    <div className="flex flex-col gap-2.5">
      {displayWords.map((item, index) => (
        <div key={index} className="bg-white rounded-lg px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-2 h-2 rounded-full ${getUsageColor(item.usage)}`}
            ></div>
            <span className="text-black font-normal text-sm flex-1">
              {item.word}
            </span>
            <span className="text-black font-normal text-sm">
              {item.multilingual_translations[selectedLanguage] ||
                item.multilingual_translations["korean"] ||
                "No translation"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WordList;
