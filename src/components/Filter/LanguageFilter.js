import Chip from '../UI/Chip';

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
  'objective-c',
  'typescript',
  'assembly',
  'html',
  'css',
  'scss',
  'c',
  'rust',
];

const LanguageFilter = (props) => {
  return (
    <div className="flex flex-wrap gap-2 py-4 px-3">
      {languages.map((language) => (
        <Chip
          key={language}
          className={props.language === language ? `bg-gray-300` : ''}
          onClick={() => props.onChangeLanguage(language)}
        >
          {language}
        </Chip>
      ))}
    </div>
  );
};

export default LanguageFilter;
