export enum Language {
  RU = 'ru',
  EN = 'en',
}

export const LanguageArray = Object.values(Language);

export const languageMap: Record<Language, string> = {
  [Language.RU]: 'Русский',
  [Language.EN]: 'English',
};
