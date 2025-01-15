"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LogoutModal from "../../Common/LogoutModal";

const CreditAuthHeader = ({ isLoggedIn, setFormState }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setIsModalOpen(false);
    toast.success("Successfully logged out.");
    setTimeout(() => {
      sessionStorage.removeItem("u_data");
      setFormState(() => ({
        isUserAuthSuccess: false,
        userConsent: true,
      }));
    }, 1000);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white text-white shadow-md">
      <div className="mx-auto flex items-center justify-between px-8 py-3">
        <img
          src="/credit-score/buddy-score.svg"
          className="h-[60px] w-[80px]"
        />

        {/* Right-aligned Logout Button */}
        {isLoggedIn && (
          <button
            onClick={() => setIsModalOpen(true)} // Replace with actual logout logic
            className="flex"
          >
            <img src="/credit-score/logout.svg" className="h-[25px] w-[25px]" />
          </button>
        )}

        {/*  <button
            onClick={() => alert("Logging out...")} // Replace with actual logout logic
            className="flex"
          >
            <span className="pe-1 text-[#58C4FF]">Sign in</span>
            <img src="/credit-score/signIn.png" className="h-[25px] w-[25px]" />
          </button> */}

        {isModalOpen && (
          <LogoutModal
            handleLogout={handleLogout}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </header>
  );
};

export default CreditAuthHeader;
