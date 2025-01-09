import React from "react";
import CreditScoreBanner from "./components/CreditScoreBanner";

const CreditRightSection = () => {
  return (
    <div className="shadow-shadowCommon flex w-full items-center justify-between rounded-xl bg-white p-4">
      <CreditScoreBanner />
    </div>
  );
};

export default CreditRightSection;
