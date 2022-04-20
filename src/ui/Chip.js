const Chip = (props) => {
  const isButton = props.onClick ? true : false;
  return (
    <span
      className={`inline-block rounded-full py-1 px-4 ${props.className} ${
        isButton ? 'cursor-pointer' : ''
      }`}
      style={{ ...props.style }}
      onClick={props.onClick}
    >
      {props.children}
    </span>
  );
};

export default Chip;
