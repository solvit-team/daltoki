export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  { code: "korean", name: "Korean", nativeName: "한국어" },
  { code: "english", name: "English", nativeName: "English" },
  { code: "chinese", name: "Chinese", nativeName: "中文" },
  { code: "japanese", name: "Japanese", nativeName: "日本語" },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return LANGUAGES.find((lang) => lang.code === code);
};

export const getLanguageDisplayName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language?.nativeName || "한국어";
};
