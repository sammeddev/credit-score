import React from "react";
import ReferBanner from "./ReferBanner";

const ReportInsights = ({ insightsData }) => {
  return (
    <div className="flex items-start justify-between space-x-4 rounded-r-lg border p-4">
      <div className="w-full space-y-4">
        {insightsData.map((insight, index) => {
          const { title, impact, value, subtitle, status, color } = insight;
          return (
            <div
              key={index}
              className="shadow-cardShadow flex flex-col items-start justify-between gap-4 rounded-md px-6 py-4 sm:flex-row sm:items-center"
            >
              {/* 1st Section */}
              <div className="flex w-full gap-3">
                <span>
                  <img
                    src="/credit-score/insights1.png"
                    alt="insights-img"
                    className="mt-[2px] h-[32px] w-[32px]"
                  />
                </span>
                <div className="flex flex-col items-start justify-start space-y-1">
                  <h2 className="text-xl font-semibold text-black">{title}</h2>
                  <span className="rounded-sm bg-gray-100 px-1 text-xs">
                    {impact}
                  </span>
                </div>
              </div>

              {/* 2nd & 3rd Section */}
              <div className="flex w-full items-center justify-between">
                {/* 2rd Section */}
                <div className="flex flex-col text-center">
                  <h2 className="text-2xl font-bold text-black">{value}</h2>
                  <span className="mt-[-2px] rounded-sm px-1 text-sm">
                    {subtitle}
                  </span>
                </div>

                {/* 3rd Section */}
                <div className="flex flex-col items-start justify-start space-y-2">
                  <h2
                    className="flex items-center justify-center gap-2 text-xl font-semibold"
                    style={{ color: color }}
                  >
                    {status}

                    {status === "Poor" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 1600 1536"
                      >
                        <path
                          fill="currentColor"
                          d="M256 320q0 26-19 45t-45 19q-27 0-45.5-19T128 320q0-27 18.5-45.5T192 256q26 0 45 18.5t19 45.5zm160 512V192q0-26-19-45t-45-19H64q-26 0-45 19T0 192v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149q-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22t10 18q18 37 27 57t19 58.5t10 76.5q0 24-.5 39t-5 45t-12 50t-24 45t-40 40.5t-60 26T992 1536q-26 0-45-19q-20-20-34-50t-19.5-52t-12.5-61q-9-42-13.5-60.5T850 1245t-31-48q-33-33-101-120q-49-64-101-121t-76-59q-25-2-43-20.5T480 833V192q0-26 19-44.5t45-19.5q35-1 158-44q77-26 120.5-39.5t121.5-29T1088 0h129q133 2 197 78q58 69 49 181q39 37 54 94q17 61 0 117q46 61 43 137q0 32-15 76z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 1600 1536"
                        style={{ transition: "transform 0.3s, color 0.3s" }}
                      >
                        <path
                          fill="currentColor"
                          d="M256 1216q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5T192 1280q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19H64q-26 0-45-19t-19-45V704q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149q15 44 15 76q3 76-43 137q17 56 0 117q-15 57-54 94q9 112-49 181q-64 76-197 78h-129q-66 0-144-15.5t-121.5-29T702 1452q-123-43-158-44q-26-1-45-19.5t-19-44.5V703q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120q18-18 31-48t17.5-48.5T881 182q7-39 12.5-61T913 69t34-50q19-19 45-19q46 0 82.5 10.5t60 26t40 40.5t24 45t12 50t5 45t.5 39q0 38-9.5 76t-19 60t-27.5 56q-3 6-10 18t-11 22t-8 24h277q78 0 135 57t57 135z"
                        />
                      </svg>
                    )}
                  </h2>
                  {/* Know More Button */}
                  <button
                    style={{
                      background:
                        "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
                    }}
                    className="mx-auto flex max-w-[130px] items-center gap-2 rounded-lg border-[#58C4FF] px-4 py-1 text-sm text-white hover:bg-[#CCEFFF]"
                  >
                    Know More
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
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden max-w-[260px] lg:block">
        <ReferBanner />
      </div>
    </div>
  );
};

export default ReportInsights;
