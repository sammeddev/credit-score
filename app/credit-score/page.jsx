"use client";
import React, { useEffect, useState } from "react";
import CreditAuth from "../../components/CreditScore/auth/CreditAuth";
import Loader from "@/components/Common/Loader";
import CreditAuthHeader from "@/components/CreditScore/auth/CreditAuthHeader";
import CheckCreditScroreForm from "@/components/CreditScore/CheckCreditScroreForm";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    userConsent: true,
    isModalOpen: false,
    verifyOtp: false,
    isUserAuthSuccess: false,
  });

  // Simulate a condition check (e.g., API call, authentication check)
  useEffect(() => {
    const simulateCheck = setTimeout(() => {
      setIsChecking(false); // Set to false once the check is complete
    }, 1000); // Simulate a delay (e.g., 1 second)

    return () => clearTimeout(simulateCheck);
  }, []);

  if (isChecking) {
    return (
      <div>
        {/* Header */}
        <CreditAuthHeader />
        {/* Loader */}
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <CreditAuthHeader
        isLoggedIn={formState?.isUserAuthSuccess}
        setFormState={setFormState}
      />

      {/* Content */}
      {loading ? (
        <Loader />
      ) : formState?.isUserAuthSuccess ? (
        <CheckCreditScroreForm
          formState={formState}
          setFormState={setFormState}
          setLoading={setLoading}
        />
      ) : (
        <CreditAuth
          formState={formState}
          setFormState={setFormState}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Page;
