import React, { useState } from "react";

const FaqSection = ({ faqData, heading }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const renderIcon = (index) => {
    return (
      <>
        {openIndex !== index ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 256 256"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            >
              <circle cx="128" cy="128" r="112" />
              <path d="M 80,128 H 176" />
              <path d="M 128,80 v 96" />
            </g>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 256 256"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="16"
            >
              <circle cx="128" cy="128" r="112" />
              <path d="M 80,128 H 176" />
            </g>
          </svg>
        )}
      </>
    );
  };

  // If faqData is empty, don't render the FAQ section
  if (!faqData || faqData.length === 0) {
    return null;
  }

  return (
    <div className="mx-auto w-full rounded-r-lg border p-4">
      {/* Faq */}
      {faqData.map((item, index) => (
        <div key={index} className="bg-white py-2">
          <button
            onClick={() => toggleFAQ(index)}
            className="flex w-full items-center justify-between rounded-lg bg-white px-2 py-1 text-left shadow focus:outline-none"
          >
            <span className="text-xl font-semibold lg:text-2xl">
              {item.question}
            </span>
            <span className="flex items-center justify-center rounded-full bg-[#47b6f2] text-center text-3xl font-semibold text-white">
              {renderIcon(index)}
            </span>
          </button>
          <div
            className={`overflow-hidden shadow transition-[max-height] duration-300 ${
              openIndex === index ? "max-h-[200px]" : "max-h-0"
            }`}
          >
            <div
              className="p-4 text-gray-900"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqSection;
