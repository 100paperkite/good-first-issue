import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import Repository from './Repository';
import { GitHubApi } from '../utils/github-api/graphql';
import { store } from '../utils/localStorage';
import Spinner from '../ui/Spinner';

const RepositoryList = ({ language }) => {
  const lastRef = useRef(null);
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const token = store.getLocalStorage('gh-token');
  const api = useMemo(() => new GitHubApi(token), [token]);

  // TODO: Refactor this
  useEffect(() => {
    setIssues([]);

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          getIssues();
        }
      },
      { rootMargin: '20px', threshold: 0.5 }
    );

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    let isCanceled = false;
    let nextCursor = null;

    const getIssues = async () => {
      setLoading(true);

      let { data: issues, nextCursor: _nextCursor } = await api.searchIssuesWithRepo({
        count: process.env.REACT_APP_ISSUES_PER_PAGE,
        from: nextCursor,
        queryParams: {
          language,
          sort: 'created-desc',
        },
      });

      issues = issues.filter(
        ({ node }) =>
          node && node.repository?.stargazerCount >= process.env.REACT_APP_ISSUES_MIN_STARS
      );

      if (!isCanceled) {
        setLoading(false);
        setIssues((prevIssues) => [...prevIssues, ...issues]);
      }

      nextCursor = _nextCursor;
    };
    getIssues();
    return () => {
      observer.disconnect();
      isCanceled = true;
    };
  }, [language, api]);

  const uniqueRepositories = useCallback((repositories) => {
    return repositories.filter((repo, index, self) => {
      return self.findIndex((t) => t.id === repo.id) === index;
    });
  }, []);

  const repositories = uniqueRepositories(issues.map(({ node }) => node.repository));

  return (
    <div className="flex flex-col p-3 gap-2">
      {repositories &&
        repositories
          .sort((repository) => -repository.number)
          .map((repository) => (
            <Repository
              {...repository}
              language={language}
              key={repository.id}
              recentIssue={issues.filter(({ node }) => node.repository.id === repository.id)[0]}
            />
          ))}
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <Spinner />
        </div>
      ) : (
        ''
      )}
      <div ref={lastRef} />
    </div>
  );
};

export default RepositoryList;
