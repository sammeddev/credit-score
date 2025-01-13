"use client";
import React from "react";
import CreditScoreBanner from "./components/CreditScoreBanner";
import OfferCard from "./components/OfferCard";

const CreditRightSection = () => {
  const offers = [
    {
      color: "#233A8A",
      amount: "5 Lakhs",
      tenure: "5 Years",
      interestRate: "13",
      emi: "11,377",
    },
    {
      color: "#9C3A3B",
      amount: "5 Lakhs",
      tenure: "5 Years",
      interestRate: "13",
      emi: "11,377",
    },
    {
      color: "#AE285D",
      amount: "5 Lakhs",
      tenure: "5 Years",
      interestRate: "13",
      emi: "11,377",
    },
  ];
  return (
    <div>
      {/* Credit Score Banner */}
      <div className="flex w-full flex-col items-center justify-between rounded-xl bg-white p-4 shadow-shadowCommon">
        <CreditScoreBanner />
      </div>

      {/* Offers Card */}
      <div className="my-5 w-full w-full overflow-hidden rounded-lg">
        {/* Header Curve */}
        <div className="font-500 flex h-[80px] w-full items-center justify-start bg-[url('/credit-score/curve-bg.png')] bg-no-repeat px-6 text-[25px] text-white">
          Pre Approved Offers
        </div>
        <div className="flex items-center justify-around space-x-5 rounded-r-lg border p-4 shadow">
          {offers.map((offer, index) => (
            <OfferCard
              key={index}
              color={offer.color}
              amount={offer.amount}
              tenure={offer.tenure}
              interestRate={offer.interestRate}
              emi={offer.emi}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditRightSection;
