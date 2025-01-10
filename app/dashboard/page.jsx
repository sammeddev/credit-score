import React from "react";
import CreditScoreHeader from "@/components/CreditScore/components/CreditScoreHeader";
import CreditSidebar from "@/components/CreditScore/components/CreditSidebar";
import CreditRightSection from "@/components/CreditScore/CreditRightSection";

const Page = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center space-y-6 pt-8">
      <CreditScoreHeader />

      <div className="flex w-full items-start justify-start md:space-x-6">
        <CreditSidebar />
        <CreditRightSection />
      </div>
    </div>
  );
};

export default Page;
