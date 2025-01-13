"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreditScoreHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    setIsModalOpen(false);
    toast.success("Successfully logged out.");
    setTimeout(() => {
      sessionStorage.removeItem("u_data");
      router.push("/credit-score");
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
    <div className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 shadow-shadowCommon">
      <div>
        <img
          src="/credit-score/buddy-score.svg"
          className="h-[60px] w-[80px]"
        />
      </div>
      <button className="flex">
        <img
          src="/credit-score/logout.svg"
          className="h-[25px] w-[25px]"
          onClick={() => setIsModalOpen(true)}
        />
      </button>

      {isModalOpen && <LogoutModal />}
    </div>
  );
};

export default CreditScoreHeader;
