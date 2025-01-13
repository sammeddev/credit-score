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
      <div className="flex w-full flex-col items-center justify-between rounded-xl bg-white p-4 shadow-shadowCommon md:flex-row md:items-start md:space-x-6">
        <CreditScoreBanner />
      </div>

      {/* Offers Card */}
      <div className="my-5 w-full overflow-hidden rounded-lg">
        {/* Header Curve */}
        <div
          className="relative inline-block bg-[#4ab0ff] px-[20px] py-2 pe-[80px] text-center text-lg font-bold text-white lg:py-4 lg:pe-[130px] lg:text-[32px]"
          style={{
            clipPath: "polygon(0 0, 70% 0, 85% 100%, 0 100%)",
          }}
        >
          Pre Approved Offers
        </div>

        <div className="flex flex-col items-center justify-around space-y-5 rounded-r-lg border p-4 shadow lg:flex-row lg:space-x-5 lg:space-y-0">
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
