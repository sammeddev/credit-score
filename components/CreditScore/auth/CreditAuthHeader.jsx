"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

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

  // LogoutModal component
  const LogoutModal = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative m-2 w-full max-w-md rounded-3xl bg-white p-8">
          <div className="text-center">
            <h2 className="mb-4 text-lg font-semibold text-black">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-10">
              <button
                onClick={handleLogout}
                className="w-[80px] rounded-xl p-1 text-[18px] font-bold text-white"
                style={{
                  background:
                    "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
                }}
              >
                Yes
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="hover:gray-500 w-[80px] rounded-xl bg-gray-300 p-1 text-[18px] font-bold text-white"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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

        {isModalOpen && <LogoutModal />}
      </div>
    </header>
  );
};

export default CreditAuthHeader;
