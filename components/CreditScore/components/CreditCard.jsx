"use client";
import React, { useRef } from "react";

const CreditCard = ({ data }) => {
  const scrollContainerRef = useRef(null);

  const scrollToCard = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = container.querySelector(".card")?.offsetWidth || 0;
      const scrollAmount =
        direction === "next" ? cardWidth + 16 : -cardWidth - 16;

      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="rounded-r-lg border">
      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex w-full flex-row items-center justify-around space-x-4 overflow-hidden overflow-x-auto scroll-smooth py-6 pe-4 ps-4 lg:space-x-5 lg:space-y-0"
      >
        {data?.map((item, index) => {
          const { img } = item;
          return (
            <div className="card font-poppins hover:scale-103 w-full max-w-full flex-shrink-0 cursor-pointer rounded-[20px]  transition-transform  duration-300 lg:max-w-[302px]">
              <img src={img} className="h-full w-[360px]" key={index} />
            </div>
          );
        })}
      </div>
      {/* Next & Prev Buttons */}
      <div className="mt-[-20px] flex items-center justify-between px-4 pb-4">
        <button
          onClick={() => scrollToCard("prev")}
          className="cursor-pointer rounded p-1 hover:bg-blue-200"
        >
          <img
            className="h-[25px] w-[25px] "
            src="/credit-score/previous.png"
            alt="previous-btn"
          />
        </button>
        <button
          onClick={() => scrollToCard("next")}
          className="cursor-pointer rounded p-1 hover:bg-blue-200"
        >
          <img
            className="h-[25px] w-[25px] "
            src="/credit-score/next.png"
            alt="previous-btn"
          />
        </button>
      </div>
    </div>
  );
};

export default CreditCard;
