"use client";
import { useState } from "react";
import ReferBanner from "./ReferBanner";

// Sidebar component
const CreditSidebar = () => {
  const [collapsedSections, setCollapsedSections] = useState({});

  // Toggle collapsible sections
  const toggleSection = (index) => {
    setCollapsedSections((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const items = [
    { label: "Home", icon: "/credit-score/home.png", alt: "home-icon" },
    {
      label: "My Profile",
      icon: "/credit-score/profile.png",
      alt: "profile-icon",
    },
    {
      label: "Credit Report",
      icon: "/credit-score/credit-report.png",
      alt: "report-icon",
      children: [
        { label: "View Report", icon: "🔍" },
        { label: "Download Report", icon: "⬇️" },
      ],
    },
    {
      label: "Report Insight",
      icon: "/credit-score/insights.png",
      alt: "insites-icon",
      children: [
        { label: "View Report", icon: "🔍" },
        { label: "Download Report", icon: "⬇️" },
      ],
    },
    {
      label: "Offers",
      icon: "/credit-score/offers.png",
      alt: "offers-icon",
      children: [
        { label: "Loan Offers", icon: "💰" },
        { label: "Credit Cards", icon: "💳" },
      ],
    },
    {
      label: "Credit Cards",
      icon: "/credit-score/credit-card.png",
      alt: "credit-icon",
    },
    {
      label: "Insurance",
      icon: "/credit-score/insurance.png",
      alt: "insurance-icon",
    },
    { label: "FAQs", icon: "/credit-score/faq.png", alt: "faq-icon" },
  ];

  return (
    <div className="w-full space-y-4">
      <div className="hidden rounded-xl bg-white p-4 shadow-shadowCommon md:block">
        <ul>
          {items.map((item, index) => (
            <li key={index} className="mb-4">
              {/* Main item with optional collapsibility */}
              <div
                className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-gray-100"
                onClick={() => item.children && toggleSection(index)}
              >
                <div className="flex items-center">
                  <span className="mr-3">
                    <img
                      src={item.icon}
                      alt={item.alt}
                      className="h-[20px] w-[20px]"
                    />
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.children && (
                  <span>
                    <img
                      src="/credit-score/down-arrow.png"
                      className={`h-[20px] w-[20px] transition-transform duration-300 ${
                        collapsedSections[index] ? "rotate-180" : "rotate-0"
                      }`}
                      alt="arrow"
                    />
                  </span>
                )}
              </div>

              {/* Collapsible content */}
              {item.children && collapsedSections[index] && (
                <ul className="ml-6 mt-2 space-y-2">
                  {item.children.map((child, childIndex) => (
                    <li
                      key={childIndex}
                      className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100"
                    >
                      <span className="mr-3">{child.icon}</span>
                      <span>{child.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Experien Logo */}
        <div className="flex items-center justify-center text-center">
          <img src="/credit-score/pwd-icon.png" alt="experian-logo" />
        </div>
      </div>

      <div className="hidden max-w-[300px]  lg:block">
        <ReferBanner />
      </div>
    </div>
  );
};

export default CreditSidebar;
