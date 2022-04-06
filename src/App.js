import { useState } from 'react';
import './App';
import CardList from './components/Card/CardList';
import LanguageFilter from './components/Filter/LanguageFilter';
import Header from './components/Header';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('javascript');

  const changeLanguageHandler = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <>
      <Header />
      <div>
        <LanguageFilter onChangeLanguage={changeLanguageHandler} language={currentLanguage} />
        <CardList language={currentLanguage}></CardList>
      </div>
    </>
  );
};

export default App;
