import React from 'react';

const Chip = ({ className, style, onClick, children }) => {
  return (
    <span
      className={`inline-block rounded-full py-1 px-4 ${className}`}
      style={{ ...style }}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

export default React.memo(Chip);
