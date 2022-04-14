import { VscRepoForked } from 'react-icons/vsc';
import { FiStar } from 'react-icons/fi';

import Chip from '../UI/Chip';
import Issue from './IssueCard';

const RepositoryCard = ({
  url,
  name,
  forkCount,
  stargazerCount,
  descriptionHTML,
  languages,
  owner: { login },
  recentIssue,
}) => {
  return (
    <article className="p-4 shadow-gray-200 shadow-xl rounded-2xl border border-gray-100 gap-3 bg-white">
      <div className="px-2 mb-2 flex shrink-0 items-start">
        <span className="flex-auto text-base sm:text-xl font-bold">
          <a href={url} className="hover:opacity-70 duration-75">
            {login}/{name}
          </a>
        </span>
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
          languages.map(({ color, name }) => (
            <Chip
              className={`text-xs px-2 font-bold`}
              style={{ color, backgroundColor: `${color}15` }}
              key={name}
            >
              <span className="brightness-[.85]">{name}</span>
            </Chip>
          ))}
      </div>
      {recentIssue && <Issue key={recentIssue.id} {...recentIssue}></Issue>}
    </article>
  );
};

export default RepositoryCard;
