"use client";
import React from "react";

const CreditAuthHeader = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white text-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-8 py-3">
        <img
          src="/credit-score/buddy-score.svg"
          className="h-[60px] w-[80px]"
        />

        {/* Right-aligned Logout Button */}
        <button
          onClick={() => alert("Logging out...")} // Replace with actual logout logic
          className="flex"
        >
          <span className="pe-1 text-[#58C4FF]">Sign in</span>
          <img src="/credit-score/signIn.png" className="h-[25px] w-[25px]" />
        </button>
      </div>
    </header>
  );
};

export default CreditAuthHeader;
