"use client";
import React from "react";
import CreditScoreHeader from "@/components/CreditScore/components/CreditScoreHeader";
import CreditSidebar from "@/components/CreditScore/components/CreditSidebar";
import CreditRightSection from "@/components/CreditScore/CreditRightSection";

const Page = () => {
  return (
    <div className="mx-auto w-full max-w-screen-xl px-4 pt-8">
      <div className="container mx-auto space-y-6">
        <CreditScoreHeader />

        <div className="flex w-full items-start justify-start md:space-x-6">
          <div className="w-[350px]">
            <CreditSidebar />
          </div>
          <div className="w-full">
            <CreditRightSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
