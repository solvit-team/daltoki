import './App.css';
import TranslationArea from './components/TranslationArea';
import WordList from './components/WordList';
import Header from './components/Header';
import Character from './components/Character';
import type { Word } from './types/word';
import { Toaster } from 'sonner'

function App() {
  const words: Word[] = [
    { word: 'toki', meaning: '말', usage: 'core' },
    { word: 'pona', meaning: '언어', usage: 'common' },
    { word: 'li', meaning: '구분자', usage: 'obscure' },
    { word: 'sona', meaning: '좋다', usage: 'core' }
  ];

  const handleInputChange = (text: string) => {
    console.log('Input changed:', text);
  };

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto bg-gray-50 min-h-screen">
        <Header />
        <main className="flex flex-col gap-5 p-6 ">
          <Character />
          <TranslationArea onInputChange={handleInputChange}/>
          <WordList words={words} />
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
