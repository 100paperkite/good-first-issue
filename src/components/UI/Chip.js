const Chip = (props) => {
  return (
    <button className={`border rounded-3xl py-1 px-4 ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Chip;
