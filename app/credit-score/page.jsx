"use client";
import React, { useEffect, useState } from "react";
import CreditAuth from "../../components/CreditScore/auth/CreditAuth";
import Loader from "@/components/Common/Loader";
import CreditAuthHeader from "@/components/CreditScore/auth/CreditAuthHeader";
import CheckCreditScroreForm from "@/components/CreditScore/CheckCreditScroreForm";
import toast from "react-hot-toast";
import { userSearch } from "@/api/user";
import { useUserContext } from "@/utils/UserContext";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const { userSearchData, setUserSearchData } = useUserContext();

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

  useEffect(() => {
    const userToken = sessionStorage.getItem("_token");
    if (userToken) {
      verifyUsers(userToken);
    }
  }, []);

  // Verify Users function
  const verifyUsers = async (userToken) => {
    setLoading(true);
    if (!userToken) {
      toast.error("User token is not available.");
      return;
    }

    try {
      // Construct the payload
      const payload = new URLSearchParams({
        platform: "",
        utm: "",
        utm_source: "",
        user_token: userToken,
      });

      // Make OTP verification API call
      const response = await userSearch(payload);

      // Set user data in userData context
      setUserSearchData(response.data);

      if (response.status === "failure") {
        toast.error(
          response?.message ?? "In user search an unexpected error occurred.",
        );
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "In user search an unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
          userSearchData={userSearchData}
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
