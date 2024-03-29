import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';

import RepositoryList from './components/RepositoryList';
import LanguageFilter from './filter/LanguageFilter';
import Header from './components/Header';
import OAuthModal from './components/OAuthModal';

import { store } from './utils/localStorage';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('');
  const [isSignIn, setSignIn] = useState(false);

  const changeLanguageHandler = (language) => {
    setCurrentLanguage((prev) => (prev === language ? '' : language));
  };

  useEffect(() => {
    if (store.getLocalStorage('gh-token')) {
      setSignIn(true);
      return;
    }

    const code = window.location.href.split('?code=')[1];
    if (code) {
      fetch(`${process.env.REACT_APP_OAUTH_PROXY_URL}/authenticate?code=${code}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.token) {
            window.history.replaceState(null, null, window.location.pathname);
            store.saveLocalStorage('gh-token', res.token);
            setSignIn(true);
          }
          /**
           * @todo  Show unauthorized modal
           *
           */
        })
        .catch((e) => console.log(e));
    }
  }, []);

  return (
    <>
      {!isSignIn &&
        ReactDOM.createPortal(
          <OAuthModal clientId={process.env.REACT_APP_CLIENT_ID} />,
          document.getElementById('modal-root')
        )}
      <Header />
      <div className="max-w-[800px] mx-auto my-0 z-0">
        <LanguageFilter onChangeLanguage={changeLanguageHandler} language={currentLanguage} />
        <RepositoryList language={currentLanguage}></RepositoryList>
      </div>
    </>
  );
};

export default App;
