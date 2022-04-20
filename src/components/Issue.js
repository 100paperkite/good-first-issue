import { dateDiff } from '../utils/datediff';
import { FaRegCommentAlt } from 'react-icons/fa';

const IssueCard = ({ publishedAt, number, url, titleHTML, labels, comments: { totalCount } }) => {
  const publishedAtTime = Date.parse(publishedAt);

  return (
    <article className="flex shrink-0 gap-2 p-2 bg-white border-dashed border-t ">
      <span className=" text-gray-400 text-right items-top">#{number}</span>

      <div className="flex-auto">
        <div className="inline">
          <a className="font-bold text-sm sm:text-base hover:opacity-70 duration-75" href={url}>
            <span dangerouslySetInnerHTML={{ __html: titleHTML }} />
          </a>
          <span className="px-1">
            {labels &&
              labels.map(({ name, color }) => (
                <span
                  className="text-xs font-bold mx-1 brightness-75 inline-block"
                  style={{ color: `#${color}` }}
                  key={name}
                >
                  #{name}
                </span>
              ))}
          </span>
        </div>

        <div className="flex gap-4 mt-2 text-xs">
          <span className="text-gray-500">opened {dateDiff(publishedAtTime)}</span>
        </div>
      </div>
      {totalCount > 0 && (
        <div className="shrink-0 flex items-start font-bold text-gray-600">
          <FaRegCommentAlt size={16} className="align-bottom mt-1.5 mr-1" />
          <span>{totalCount}</span>
        </div>
      )}
    </article>
  );
};

export default IssueCard;
