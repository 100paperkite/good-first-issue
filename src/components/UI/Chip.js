const Chip = (props) => {
  return (
    <button
      className={`rounded-3xl py-1 px-4 ${props.className}`}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Chip;
