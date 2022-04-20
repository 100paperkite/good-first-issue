const Spinner = ({ className, style }) => {
  return (
    <div
      className={`border-blue-400 border-r-transparent animate-spin inline-block w-8 h-8 border-4 rounded-full ${className}`}
      role="status"
      style={{ ...style }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;
