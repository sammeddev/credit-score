import React from "react";

const CreditScoreHeader = () => {
  return (
    <div className="shadow-shadowCommon flex w-full items-center justify-between rounded-xl bg-white px-4 py-2">
      <div>
        <img
          src="/credit-score/buddy-score.svg"
          className="h-[60px] w-[80px]"
        />
      </div>
      <button className="flex">
        <img src="/credit-score/logout.svg" className="h-[25px] w-[25px]" />
      </button>
    </div>
  );
};

export default CreditScoreHeader;
