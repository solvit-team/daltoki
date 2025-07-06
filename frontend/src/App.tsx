import "./App.css";
import TranslationArea from "./components/TranslationArea";
import WordList from "./components/WordList";
import Header from "./components/Header";
import Character from "./components/Character";
import { Toaster } from "sonner";
import { useState } from "react";

interface TranslationResult {
  word: string;
  part_of_speech: string;
  usage: string;
  sitelen_pona: string;
  multilingual_translations: Record<string, string>;
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("ko");
  const [translationResults, setTranslationResults] = useState<
    TranslationResult[]
  >([]);

  const handleInputChange = (text: string) => {
    console.log("Input changed:", text);
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleTranslationUpdate = (results: TranslationResult[]) => {
    setTranslationResults(results);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto bg-gray-50 min-h-screen">
        <Header
          language={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
        <main className="flex flex-col gap-5 p-6 ">
          <Character
            message={
              translationResults.length > 0
                ? translationResults.map((r) => r.sitelen_pona).join(" ")
                : undefined
            }
          />
          <TranslationArea
            onInputChange={handleInputChange}
            selectedLanguage={selectedLanguage}
            onTranslationUpdate={handleTranslationUpdate}
          />
          <WordList
            translationResults={translationResults}
            selectedLanguage={selectedLanguage}
          />
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
