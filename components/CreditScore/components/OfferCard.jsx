"use client";
import React, { useRef } from "react";

const OfferCard = ({ data }) => {
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
    <>
      <div className="w-full rounded-r-lg border shadow">
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide flex w-full flex-row items-center justify-around space-x-4 overflow-hidden overflow-x-auto scroll-smooth py-8 pe-4 ps-4 lg:space-x-5 lg:space-y-0"
        >
          {data?.map((item, index) => {
            const { color, amount, tenure, interestRate, emi } = item;
            return (
              <>
                <div
                  className="card font-poppins hover:scale-103 w-full max-w-full flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] border transition-all transition-transform duration-300 lg:max-w-[302px]"
                  style={{
                    borderColor: color,
                    boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.3)",
                  }}
                  key={index}
                >
                  <div
                    className="flex justify-center rounded-t-lg p-4"
                    style={{
                      background: `linear-gradient(to right, ${color} 50%, ${color} 10%, white 130%)`,
                    }}
                  >
                    <img src="/credit-score/prefer.png" alt="Dummy" />
                  </div>

                  <div className="p-6 text-center">
                    <h2 className="text-5xl font-bold" style={{ color: color }}>
                      ₹{amount}
                    </h2>
                    <div
                      className="mt-4 flex items-center justify-between rounded-md border px-4 py-1"
                      style={{ borderColor: color }}
                    >
                      <div className="space-y-[2px]">
                        <p className="text-xs text-gray-600">Tenure</p>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: color }}
                        >
                          {tenure}
                        </p>
                      </div>
                      <div
                        className="h-6 border-l"
                        style={{ borderColor: color }}
                      ></div>
                      <div className="space-y-[2px]">
                        <p className="text-xs text-gray-600">Interest Rate</p>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: color }}
                        >
                          {interestRate}%
                        </p>
                      </div>
                      <div
                        className="h-6 border-l"
                        style={{ borderColor: color }}
                      ></div>
                      <div className="space-y-[2px]">
                        <p className="text-xs text-gray-600">EMI</p>
                        <p
                          className="text-xs font-semibold"
                          style={{ color: color }}
                        >
                          ₹{emi}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 space-y-2 text-start text-sm text-gray-700">
                      <li>+ Quick Approval</li>
                      <li>+ Minimal Documentation</li>
                      <li>+ Low-Interest Rates</li>
                      <li>+ Flexible Repayment Tenure</li>
                    </ul>
                    <button
                      className="mx-auto mt-6 flex items-center justify-center gap-1 rounded-[8px] border px-4 py-1 text-sm text-white transition hover:border-gray-500"
                      style={{
                        background: `linear-gradient(to right, ${color} 50%, ${color} 10%, white 130%)`,
                      }}
                    >
                      Apply Now
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="-5 -5 24 24"
                      >
                        <path
                          fill="white"
                          d="m10.586 5.657l-3.95-3.95A1 1 0 0 1 8.05.293l5.657 5.657a.997.997 0 0 1 0 1.414L8.05 13.021a1 1 0 1 1-1.414-1.414l3.95-3.95H1a1 1 0 1 1 0-2h9.586z"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* Footer bg color */}
                  <div
                    className="flex h-[22px] justify-center"
                    style={{
                      background: `linear-gradient(to right, ${color} 50%, ${color} 10%, white 130%)`,
                    }}
                  ></div>
                </div>
              </>
            );
          })}
        </div>
        {/* Next & Prev Buttons */}
        <div className="mt-[-10px] flex items-center justify-between px-4 pb-4">
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
    </>
  );
};

export default OfferCard;
