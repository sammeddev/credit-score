import React from "react";

const CreditScoreBanner = () => {
  return (
    <div>
      <div className="flex w-full flex-col items-start justify-between space-y-6 lg:flex-row lg:space-y-0">
        {/* Left */}
        <div className="flex-1 text-center lg:text-left">
          <img
            src="/credit-score/credit-meter-2.svg"
            alt="credit-meter-icon"
            className="mx-auto"
          />

          {/* Refresh Button */}
          <button className="bottom-0 right-0 mx-auto mb-4 flex items-center gap-2 rounded-md bg-[#F3F3F3] px-4 py-1 text-sm text-black hover:bg-[#e3e3e1]">
            <img
              src="/credit-score/refresh.png"
              className="h-[18px] w-[18px]"
            />
            Refresh Now
          </button>
        </div>

        {/* Right */}
        <div className="flex-1 text-center lg:text-left">
          <div className="space-y-2">
            <p className="text-2xl font-semibold text-[#44ADE9]">
              <span>Hey Rakesh,</span> <br />
              here’s your Credit Score for Dec’24
            </p>

            <p className="text-xl font-semibold text-black">
              Why Check Your Credit Score Before Your Loan Journey?
            </p>

            <p className="text-md leading-relaxed text-black">
              Checking your credit score helps you get pre-approvals, better
              terms, instant approvals, and further fix errors too.
            </p>
          </div>
        </div>
      </div>

      {/* Buttons Div */}
      <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
        {/* Download Report Button */}
        <button
          style={{
            background:
              "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
          }}
          className="mx-auto flex items-center gap-2 rounded-lg px-4 py-2 text-xl font-semibold text-white hover:bg-[#CCEFFF]"
        >
          Download Report
          <img src="/credit-score/download.png" className="h-[20px] w-[20px]" />
        </button>

        {/* Credit History Button */}
        <button className="mx-auto flex items-center gap-2 rounded-lg bg-[#EAF7FF] px-4 py-2 text-xl font-semibold text-[#000ADD] hover:bg-[#CCEFFF]">
          <img src="/credit-score/arrow.png" className="h-[25px] w-[25px]" />{" "}
          Credit History
        </button>
      </div>
    </div>
  );
};

export default CreditScoreBanner;
