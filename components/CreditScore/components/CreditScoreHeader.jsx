"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LogoutModal from "../../Common/LogoutModal";

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

      {isModalOpen && (
        <LogoutModal
          handleLogout={handleLogout}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default CreditScoreHeader;
