import { useEffect, useState } from 'react';

import RepositoryCard from './RepositoryCard';
import { searchIssueByLanguage } from '../../utils/graphql-query';
import { fetchGraphQL } from '../../utils/graphql';
import { store } from '../../utils/localStorage';

const RepositoryCardList = (props) => {
  const { language: currentLanguage } = props;
  const [issues, setIssues] = useState([]);

  const token = store.getLocalStorage('gh-token');

  useEffect(() => {
    if (!token) return;

    // get from github api
    fetchGraphQL(
      'https://api.github.com/graphql',
      {
        Authorization: `bearer ${token}`,
      },
      searchIssueByLanguage(currentLanguage, 'created', process.env.REACT_APP_ISSUES_PER_PAGE)
    )
      .then(({ data: { search: issues } }) => {
        issues = issues.filter((issue) => Object.keys(issue).length);
        issues = issues.filter(
          (issue) => issue.repository.stargazerCount >= process.env.REACT_APP_ISSUES_MIN_STARS
        );
        setIssues(issues);
      })
      .catch((e) => console.log(e));
  }, [currentLanguage, token]);

  const uniqueRepositories = (repositories) => {
    return repositories.filter((repo, index, self) => {
      return self.findIndex((t) => t.id === repo.id) === index;
    });
  };

  const repositories = uniqueRepositories(issues.map((issue) => issue.repository));

  return (
    <div className="flex flex-col p-3 gap-2">
      {repositories &&
        repositories
          .sort((repository) => -repository.number)
          .map((repository) => (
            <RepositoryCard
              {...repository}
              language={currentLanguage}
              key={repository.id}
              issues={issues.filter((issue) => issue.repository.id === repository.id)}
            />
          ))}
    </div>
  );
};

export default RepositoryCardList;
