import React from "react";

const ReferBanner = () => {
  return (
    <div className="w-full space-y-4 rounded-[20px] border border-[#2AA0E0] bg-[#EEF9FF] p-4 pb-0 text-center shadow">
      <h1 className="text-2xl font-semibold text-black">Refer Your Friends</h1>
      <p className="text-sm text-black">
        Help your friends check their credit score for free! Share your referral
        link and spread financial awareness.
      </p>
      {/* Know More Button */}
      <button
        style={{
          background:
            "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
        }}
        className="mx-auto flex max-w-[130px] items-center gap-2 rounded-lg border-[#58C4FF] px-4 py-2 text-sm text-white hover:bg-[#CCEFFF]"
      >
        Refer Now
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M16.15 13H5q-.425 0-.713-.288T4 12q0-.425.288-.713T5 11h11.15L13.3 8.15q-.3-.3-.288-.7t.288-.7q.3-.3.713-.313t.712.288L19.3 11.3q.15.15.213.325t.062.375q0 .2-.063.375t-.212.325l-4.575 4.575q-.3.3-.712.288t-.713-.313q-.275-.3-.288-.7t.288-.7L16.15 13Z"
          />
        </svg>
      </button>
      {/* <div className="relative"> */}
      <div className="">
        <img src="/credit-score/refer.svg" alt="refer-img" />
      </div>
      {/* </div> */}
    </div>
  );
};

export default ReferBanner;
