"use client";
import React from "react";
import CreditScoreBanner from "./components/CreditScoreBanner";
import WrapperWithHeader from "./components/CardWrapperWithHeader";
import OfferCard from "./components/OfferCard";
import CreditCard from "./components/CreditCard";
import ReportInsights from "./components/ReportInsights";
import FaqSection from "../Common/FaqSection";
import CreditScoreFAQ from "@/mock/CreditScoreFAQ";

const CreditRightSection = () => {
  const preApproverdOffers = [
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
    {
      color: "#AE285D",
      amount: "5 Lakhs",
      tenure: "5 Years",
      interestRate: "13",
      emi: "11,377",
    },
  ];
  const ccOffers = [
    {
      img: "/credit-score/credit-card2.png",
    },
    {
      img: "/credit-score/credit-card2.png",
    },
    {
      img: "/credit-score/credit-card2.png",
    },
    {
      img: "/credit-score/credit-card2.png",
    },
  ];
  const insightsData = [
    {
      imageSrc: "/credit-score/insights1.png",
      imageAlt: "insights-img",
      title: "Credit Utilisation",
      impact: "High Impact",
      value: "15%",
      subtitle: "Utilised",
      status: "Excellent",
      color: "#217A00",
    },
    {
      imageSrc: "/credit-score/insights1.png",
      imageAlt: "insights-img",
      title: "Credit Utilisation",
      impact: "High Impact",
      value: "100%",
      subtitle: "One Time Payment",
      status: "Excellent",
      color: "#217A00",
    },
    {
      imageSrc: "/credit-score/insights1.png",
      imageAlt: "insights-img-2",
      title: "Payment History",
      impact: "Very High Impact",
      value: "100%",
      subtitle: "On Time",
      status: "Average",
      color: "#FF8800",
    },
    {
      imageSrc: "/credit-score/insights1.png",
      imageAlt: "insights-img-2",
      title: "Payment History",
      impact: "Very High Impact",
      value: "10%",
      subtitle: "Due",
      status: "Poor",
      color: "#E70003",
    },
  ];
  return (
    <div className="w-full">
      {/* Credit Score Banner */}
      <div className="flex w-full flex-col items-center justify-between rounded-xl bg-white p-4 shadow-shadowCommon md:flex-row md:items-start md:space-x-6">
        <CreditScoreBanner />
      </div>

      {/* Pre Approverd Offers Cards */}
      <WrapperWithHeader headerText={"Pre Approved Offers"}>
        <OfferCard data={preApproverdOffers} />
      </WrapperWithHeader>

      {/* Credit Card Offers Cards */}
      <WrapperWithHeader headerText={"Pre Approved Offers"}>
        <CreditCard data={ccOffers} />
      </WrapperWithHeader>

      <WrapperWithHeader headerText={"Credit Score FAQ"}>
        <ReportInsights insightsData={insightsData} />
      </WrapperWithHeader>

      {/* FAQ section */}
      <WrapperWithHeader headerText={"Credit Score FAQ"}>
        <FaqSection faqData={CreditScoreFAQ} />
      </WrapperWithHeader>
    </div>
  );
};

export default CreditRightSection;
