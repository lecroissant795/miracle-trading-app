import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKeys } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  isChanging: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('EN');
  const [isChanging, setIsChanging] = useState(false);

  const setLanguage = (lang: Language) => {
    if (lang === language) return;
    setIsChanging(true);
    setTimeout(() => {
      setLanguageState(lang);
      setTimeout(() => setIsChanging(false), 300);
    }, 150);
  };

  const value = {
    language,
    setLanguage,
    t: translations[language],
    isChanging
  };

  return (
    <LanguageContext.Provider value={value}>
      <div className={`transition-opacity duration-300 ${isChanging ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
