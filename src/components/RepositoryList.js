import { useEffect, useState } from 'react';

import RepositoryCard from './Repository';
import { searchIssueByLanguage } from '../utils/graphql-query';
import { fetchGraphQL, cleanGraphQLResponse } from '../utils/graphql';
import { store } from '../utils/localStorage';
import Spinner from '../ui/Spinner';

const RepositoryCardList = ({ language }) => {
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const token = store.getLocalStorage('gh-token');

  useEffect(() => {
    if (!token) return;

    let isCanceled = false;
    setLoading(true);

    // fetch issues
    (async () => {
      let {
        data: {
          search: { edges: issues },
        },
      } = await fetchGraphQL(
        'https://api.github.com/graphql',
        {
          Authorization: `bearer ${token}`,
        },
        searchIssueByLanguage({
          language,
          count: process.env.REACT_APP_ISSUES_PER_PAGE,
        })
      );
      issues = Object.values(cleanGraphQLResponse(issues));
      issues = issues.filter((issue) => Object.keys(issue).length);
      issues = issues.filter(
        (issue) => issue.repository.stargazerCount >= process.env.REACT_APP_ISSUES_MIN_STARS
      );

      if (!isCanceled) {
        setLoading(false);
        setIssues(issues);
      }
    })();

    // cancel if component unmount
    return () => {
      isCanceled = true;
    };
  }, [language, token]);

  const uniqueRepositories = (repositories) => {
    return repositories.filter((repo, index, self) => {
      return self.findIndex((t) => t.id === repo.id) === index;
    });
  };

  const repositories = uniqueRepositories(issues.map((issue) => issue.repository));
  return (
    <div className="flex flex-col p-3 gap-2">
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <Spinner />
        </div>
      ) : (
        repositories &&
        repositories
          .sort((repository) => -repository.number)
          .map((repository) => (
            <RepositoryCard
              {...repository}
              language={language}
              key={repository.id}
              recentIssue={issues.filter((issue) => issue.repository.id === repository.id)[0]}
            />
          ))
      )}
    </div>
  );
};

export default RepositoryCardList;
