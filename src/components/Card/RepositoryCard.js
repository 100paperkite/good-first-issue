const RepositoryCard = (props) => {
  return (
    <article className="flex shrink-0 items-center">
      <a className="basis-9/12" href={props.html_url}>
        {props.title}
      </a>
      <span className="basis-1/12"></span>
      <span className="basis-1/12 text-xl">{props.comments}</span>
    </article>
  );
};

export default RepositoryCard;
