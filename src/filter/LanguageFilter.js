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

const LanguageFilter = (props) => {
  return (
    <div className="flex flex-wrap gap-2 py-4 px-3 justify-center">
      {languages.map((language) => (
        <Chip
          key={language}
          className={`text-sm sm:text-base font-semibold border ${
            props.language === language ? `bg-gray-200` : 'bg-white'
          }`}
          onClick={() => props.onChangeLanguage(language)}
        >
          {language}
        </Chip>
      ))}
    </div>
  );
};

export default LanguageFilter;
