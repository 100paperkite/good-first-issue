import { useState, useRef, useCallback, useMemo } from 'react';
import { VscRepoForked } from 'react-icons/vsc';
import { FiStar } from 'react-icons/fi';

import Chip from '../ui/Chip';
import Issue from './Issue';
import IssueList from './IssueList';

import { store } from '../utils/localStorage';
import { GitHubApi } from '../utils/github-api/graphql';

const Repository = ({
  url,
  name,
  forkCount,
  stargazerCount,
  descriptionHTML,
  languages: { edges: languages },
  owner: { login: owner },
  recentIssue,
}) => {
  const nextCursorRef = useRef(null);
  const [issues, setIssues] = useState([recentIssue]);
  const [isLoadEnded, setLoadEnded] = useState(false);

  const token = store.getLocalStorage('gh-token');
  const api = useMemo(() => new GitHubApi(token), [token]);

  const getIssues = useCallback(async () => {
    const {
      data: issues,
      nextCursor,
      hasNextPage,
    } = await api.searchIssues({
      count: process.env.REACT_APP_ISSUES_PER_REPO_PAGE,
      from: nextCursorRef.current,
      queryParams: {
        repo: `${owner}/${name}`,
        sort: 'created-desc',
      },
    });
    setIssues((prevIssues) => {
      if (!nextCursorRef.current) {
        return issues;
      }
      return [...prevIssues, ...issues];
    });
    setLoadEnded(!hasNextPage);
    nextCursorRef.current = nextCursor;
  }, [api, owner, name]);

  return (
    <article className="p-4 shadow-gray-200 shadow-xl rounded-2xl border border-gray-100 gap-3 bg-white">
      <div className="px-2 mb-2 flex shrink-0 items-start">
        <h2 className="flex-auto text-base sm:text-xl">
          <a href={url} className="hover:opacity-70 duration-75">
            <span>{owner}</span>
            <span className="mx-1">/</span>
            <span className="font-bold">{name}</span>
          </a>
        </h2>
        <div className="flex shrink-0 justify-end">
          <span className="ml-2">
            <VscRepoForked size={20} className="inline-block mr-0.5" />
            <span className="font-bold text-gray-600 text-sm">{forkCount}</span>
          </span>
          <span className="ml-2">
            <FiStar size={20} className="inline-block mr-0.5" />
            <span className="font-bold text-gray-600 text-sm">{stargazerCount}</span>
          </span>
        </div>
      </div>
      <p
        className="p-2 text-gray-700 text-sm"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      <div className="px-2 mt-2 mb-3 flex gap-2 flex-wrap">
        {languages &&
          languages.map(({ node: { color, name } }) => (
            <Chip
              className={`text-xs px-2 font-semibold`}
              style={{ color, backgroundColor: `${color}15` }}
              key={name}
            >
              <span className="brightness-[.85]">{name}</span>
            </Chip>
          ))}
      </div>
      {issues && (
        <IssueList repo={{ owner, name }} onloadBtnClick={getIssues} isLoadEnded={isLoadEnded}>
          {issues && issues.map(({ node: issue }) => <Issue key={issue.id} {...issue} />)}
        </IssueList>
      )}
    </article>
  );
};

export default Repository;
