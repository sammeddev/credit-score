"use client";
import React from "react";

const OfferCard = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => {
        const { color, amount, tenure, interestRate, emi } = item;
        return (
          <>
            <div
              className="w-[280px] overflow-hidden rounded-[20px] border bg-white shadow-md"
              style={{
                borderColor: color,
                boxShadow: "10px 10px 30px rgba(0, 0, 0, 0.3)",
              }}
              key={index}
            >
              {/* Top Blue Background with Image */}
              <div
                className="flex justify-center rounded-t-lg p-4"
                style={{
                  background: `linear-gradient(to right, ${color} 50%, ${color} 10%, white 130%)`,
                }}
              >
                <img src="/credit-score/prefer.png" alt="Dummy" />
              </div>

              {/* Card Content */}
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
    </>
  );
};

export default OfferCard;
