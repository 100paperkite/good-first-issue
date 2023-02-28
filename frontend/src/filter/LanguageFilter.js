import { useCallback } from 'react';
import Chip from '../ui/Chip';

// temp
const languages = [
  'javascript',
  'java',
  'python',
  'ruby',
  'php',
  'c++',
  'c#',
  'go',
  'swift',
  'kotlin',
  'lua',
  'typescript',
  'c',
  'rust',
];

const LanguageFilter = ({ language: currentLanguage, onChangeLanguage }) => {
  const handleChangeLanguage = useCallback(
    (event) => {
      const { textContent: language } = event.target;
      if (language && languages.includes(language)) {
        onChangeLanguage(language);
      }
    },
    [onChangeLanguage]
  );

  return (
    <div className="flex flex-wrap gap-2 py-4 px-3 justify-center" onClick={handleChangeLanguage}>
      {languages.map((language) => (
        <Chip
          key={language}
          className={`text-sm sm:text-base font-semibold border cursor-pointer ${
            currentLanguage === language ? `bg-gray-200` : 'bg-white'
          }`}
        >
          {language}
        </Chip>
      ))}
    </div>
  );
};

export default LanguageFilter;
