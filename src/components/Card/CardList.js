import { useEffect, useState } from 'react';

import RepositoryCard from './RepositoryCard';
import { searchIssueByLanguageQuery } from '../../utils/graphql-query';
import { fetchGraphQL } from '../../utils/graphql';
import { store } from '../../utils/localStroage';

const CardList = (props) => {
  const { language: currentLanguage } = props;
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const cachedRepositories = store.getLocalStorage(`repos-${currentLanguage}`);
    const { value: GITHUB_ACCESS_TOKEN } = store.getLocalStorage('gh-access-token');

    if (cachedRepositories) {
      setRepositories(cachedRepositories);
    } else {
      // get from github api
      fetchGraphQL(
        'https://api.github.com/graphql',
        {
          Authorization: `bearer ${GITHUB_ACCESS_TOKEN}`,
        },
        searchIssueByLanguageQuery(currentLanguage, 'created', 10)
      )
        .then(({ data: { search } }) => {
          console.log(search);
          const repositories = uniqueRepositories(search.map((issue) => issue.repository));

          setRepositories(repositories);

          store.saveLocalStorage(`issues-${currentLanguage}`, search);
          store.saveLocalStorage(`repos-${currentLanguage}`, repositories);
        })
        .catch((e) => console.log(e));
    }
  }, [currentLanguage]);

  const uniqueRepositories = (repositories) => {
    return repositories.filter(
      (repo, index, self) => self.findIndex((t) => t.id === repo.id) === index
    );
  };

  return (
    <div className="flex flex-col p-3 gap-2">
      {repositories &&
        repositories.map((repository) => <RepositoryCard {...repository} key={repository.id} />)}
    </div>
  );
};

export default CardList;
