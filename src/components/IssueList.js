import React, { useCallback, useState } from 'react';

import Spinner from '../ui/Spinner';

const IssueList = ({ children, onloadBtnClick, isLoadEnded }) => {
  const [isLoading, setLoading] = useState(false);

  const loadingHandler = useCallback(async () => {
    setLoading(true);
    await onloadBtnClick();
    setLoading(false);
  }, [onloadBtnClick]);

  return (
    <>
      {children}
      <div className="flex justify-center mt-3 ">
        {isLoading ? (
          <Spinner />
        ) : (
          !isLoadEnded && (
            <button
              type="button"
              className="text-sm text-gray-500 rounded-full border px-3 py-1"
              onClick={loadingHandler}
            >
              Load more issues
            </button>
          )
        )}
      </div>
    </>
  );
};

export default React.memo(IssueList);
