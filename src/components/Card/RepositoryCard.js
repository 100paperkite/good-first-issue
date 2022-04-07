import Chip from '../UI/Chip';

const RepositoryCard = (props) => {
  return (
    <article className="p-3 bg-gray-50 border-2 rounded-2xl gap-2">
      <div className="p-2 flex shrink-0 items-center">
        <span className="basis-9/12 text-xl font-bold">
          <a href={props.url}>
            {props.owner.login} / {props.name}
          </a>
        </span>
        <span className="basis-1/12">{props.forkCount}</span>
        <span className="basis-1/12 text-base">{props.stargazerCount}</span>
      </div>
      <p className="p-2">{props.description}</p>
      <div className="px-2 mt-2 flex gap-2">
        {props.languages &&
          props.languages.map(({ color, name }) => (
            <Chip
              className={`text-xs px-2 font-bold`}
              style={{ color: `${color}`, backgroundColor: `${color}15` }}
              key={name}
            >
              {name}
            </Chip>
          ))}
      </div>
    </article>
  );
};

export default RepositoryCard;
