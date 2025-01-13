import React from "react";

const WrapperWithHeader = ({ headerText, children }) => {
  return (
    <div className="my-5 w-full overflow-hidden rounded-lg">
      {/* Header Section */}
      <div
        className="relative inline-block bg-[#4ab0ff] px-[20px] py-2 pe-[80px] text-center text-lg font-bold text-white lg:py-4 lg:pe-[130px] lg:text-[32px]"
        style={{
          clipPath: "polygon(0 0, 70% 0, 85% 100%, 0 100%)",
        }}
      >
        {headerText}
      </div>
      {/* Content Section */}
      <div className="flex flex-col items-center justify-around space-y-5 rounded-r-lg border p-4 shadow lg:flex-row lg:space-x-5 lg:space-y-0">
        {children}
      </div>
    </div>
  );
};

export default WrapperWithHeader;
