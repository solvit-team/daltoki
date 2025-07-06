export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "fr", name: "French", nativeName: "Français" },
  { code: "de", name: "German", nativeName: "Deutsch" },
  { code: "eo", name: "Esperanto", nativeName: "Esperanto" },
  { code: "ko", name: "Korean", nativeName: "한국어" },
];

export const getLanguageByCode = (code: string): Language | undefined => {
  return LANGUAGES.find((lang) => lang.code === code);
};

export const getLanguageDisplayName = (code: string): string => {
  const language = getLanguageByCode(code);
  return language?.nativeName || "한국어";
};
