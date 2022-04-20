import { useEffect, useState, useRef } from 'react';

import Repository from './Repository';
import { searchIssueByLanguage } from '../utils/graphql-query';
import { fetchGraphQL, cleanGraphQLResponse } from '../utils/graphql';
import { store } from '../utils/localStorage';
import Spinner from '../ui/Spinner';

const RepositoryList = ({ language }) => {
  const lastRef = useRef(null);
  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const token = store.getLocalStorage('gh-token');

  // TODO: Refactor this
  useEffect(() => {
    if (!token) {
      return;
    }

    setIssues([]);

    let isCanceled = false;
    let prevCursor = null;

    const fetchIssues = async () => {
      setLoading(true);
      let {
        data: {
          search: {
            edges: issues,
            pageInfo: { endCursor, hasNextPage },
          },
        },
      } = await fetchGraphQL(
        'https://api.github.com/graphql',
        { Authorization: `bearer ${token}` },
        searchIssueByLanguage({
          pageInfo: { after: prevCursor },
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
        setIssues((prevIssues) => [...prevIssues, ...issues]);
        if (hasNextPage) {
          prevCursor = endCursor;
        }
      }
    };

    fetchIssues();

    const observer = new IntersectionObserver(
      async (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          fetchIssues();
        }
      },
      { rootMargin: '20px', threshold: 0.5 }
    );

    if (lastRef.current) {
      observer.observe(lastRef.current);
    }

    // cancel if component unmount
    return () => {
      observer.disconnect();
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
      {repositories &&
        repositories
          .sort((repository) => -repository.number)
          .map((repository) => (
            <Repository
              {...repository}
              language={language}
              key={repository.id}
              recentIssue={issues.filter((issue) => issue.repository.id === repository.id)[0]}
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
