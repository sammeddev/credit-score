"use client";
import React, { useEffect, useState } from "react";
import CreditAuthHeader from "./CreditAuthHeader";
import InputTwo from "@/components/Common/InputTwo";
import { useFormValidation } from "@/hooks/useValidation";
import FaqSection from "@/components/Common/FaqSection";
import CreditScoreFAQ from "@/mock/CreditScoreFAQ";
import CreditOtpValidation from "./CreditOtpValidation";

const CreditAuth = () => {
  // Form fields and state
  const fields = ["fullName", "email", "mobileNumber"];
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    userConsent: true,
    isModalOpen: false,
    verifyOtp: false,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  useEffect(() => {
    // Retrieve data from sessionStorage on component mount
    const storedData = sessionStorage.getItem("u_data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((field) => {
        updateFormField(field, parsedData[field]);
      });
    }
  }, []);

  // Function to update a specific field in the form state
  const updateFormField = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setValue(field, value);
  };

  // Handle form field changes
  const handleChange = (field) => async (e) => {
    const value = e.target.value;
    setValue(field, value); // Update form validation state
    trigger(field); // Trigger field validation

    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Toggle user consent checkbox
  const toggleUserConsent = () => {
    setFormState((prev) => ({
      ...prev,
      userConsent: !prev.userConsent,
    }));
  };

  // Manage consent error message
  useEffect(() => {
    setErrorMsg(
      formState.userConsent ? "" : "Please select consent to proceed",
    );
  }, [formState.userConsent]);

  const onSubmit = (data) => {
    console.log("Submitted data:", data);

    const updatedState = {
      ...formState,
      isModalOpen: true,
    };

    // Store the updated state in sessionStorage
    sessionStorage.setItem("u_data", JSON.stringify(updatedState));

    // Update the formState
    setFormState((prev) => ({
      ...prev,
      isModalOpen: true,
      verifyOtp: true,
    }));
  };

  // OTP Modal component
  const OTPModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative m-2 w-full max-w-md rounded-3xl bg-white p-8">
          <CreditOtpValidation
            utmSource=""
            utmMedium=""
            platform=""
            mobile={formState?.mobileNumber}
            verifyOtp={formState?.verifyOtp}
            setFormState={setFormState}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <CreditAuthHeader />
      <div className="min-h-full bg-[url('/credit-score/gredient-bg.svg')] bg-cover bg-center p-4">
        <div className="container mx-auto mt-[100px] flex flex-col gap-4 lg:flex-row">
          {/* Left Section */}
          <div className="flex-1 p-2 text-white">
            <h1 className="py-2 text-[42px] font-semibold text-black">
              Check Free Credit Score Today!
            </h1>
            <p className="py-2 text-[18px] text-[#645A5A]">
              Get Detailed Credit Report Insights & Customized Loan Offers!
            </p>

            <form
              className="mt-[20px] max-w-[450px] space-y-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Full Name */}
              <InputTwo
                type="text"
                placeholder="Full Name"
                value={watch("fullName") || formState.fullName}
                onChange={handleChange("fullName")}
                error={errors.fullName?.message}
              />

              {/* Email */}
              <InputTwo
                type="text"
                placeholder="Email ID"
                value={watch("email") || formState.email}
                onChange={handleChange("email")}
                error={errors.email?.message}
              />

              {/* Mobile Number */}
              <InputTwo
                type="number"
                placeholder="Mobile Number"
                value={watch("mobileNumber") || formState.mobileNumber}
                onChange={handleChange("mobileNumber")}
                maxLength={10}
                error={errors.mobileNumber?.message}
              />

              {/* Consent */}
              <div className="flex items-start space-x-2 pb-2">
                <input
                  type="checkbox"
                  id="user_consent"
                  checked={formState.userConsent}
                  onChange={toggleUserConsent}
                  className="size-5 rounded-md border-2 border-gray-300 transition-all duration-200 ease-in-out focus:outline-none"
                />
                <label className="text-xs text-black" htmlFor="user_consent">
                  I hereby appoint Buddy Loan as my authorised representative to
                  receive my credit information from Experian (bureau) on an
                  ongoing basis until the purpose of Pulling the Bureau Score to
                  push the lead to the lending partner associated with Buddy
                  Loan ("End Use Purpose") is satisfied or expiry of 6 months
                  from the date the consent is collected; whichever is{" "}
                </label>
              </div>

              {/* Consent Error */}
              {errorMsg && (
                <span className="text-sm text-red-500">{errorMsg}</span>
              )}

              {/* Get OTP Button */}
              <button
                type="submit"
                className={`w-full rounded-xl p-1 text-[28px] font-bold text-white ${
                  formState.userConsent ? "" : "cursor-not-allowed opacity-50"
                }`}
                style={{
                  background: formState.userConsent
                    ? "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)"
                    : "gray",
                }}
                disabled={!formState.userConsent}
              >
                Get OTP
              </button>
            </form>

            <OTPModal isOpen={formState?.isModalOpen} />
          </div>

          {/* Right Section */}
          <div className="relative flex-1 text-center text-white">
            <div className="mt-[40px] flex flex-col items-start space-y-6">
              <img src="/credit-score/credit-meter.svg" alt="Credit Meter" />
              <img
                src="/credit-score/credit-features.svg"
                alt="Credit Features"
              />
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="pt-10 text-center">
          <span className="cursor-pointer hover:underline">About Us</span>
          <span className="mx-2">|</span>
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="mx-2">|</span>
          <span className="cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </div>
      </div>

      {/* Credit Score Information */}
      <div className="container mx-auto p-6 text-justify">
        <p className="py-2">
          Everything You Need to Know About Your Credit Score! Your credit score
          is a crucial factor that can open doors to various financial
          opportunities and help you secure the loan amount you desire. It is a
          three-digit numerical expression that represents a summary of your
          credit history. The credit score is derived from the information in
          your credit report, which includes details of your borrowing history,
          repayment behaviour, and credit utilization. The credit score scale
          typically ranges from 300 to 900, with a higher score indicating
          better creditworthiness and a lower risk for lenders. Importance of
          Credit Score Lenders and financial institutions use your credit score
          as a key factor in assessing your creditworthiness when you apply for
          loans, credit cards, or other forms of credit. A good credit score,
          typically above 670, can significantly increase your chances of
          qualifying for loans, credit cards, and mortgages. With a good credit
          score, you also have a better chance of securing larger loan amounts
          and enjoying lower interest rates. You can check your credit score for
          free from Buddy Score. It provides a quick and easy way to obtain your
          credit score evaluation report. By taking control of your credit
          score, you can open doors to better financial opportunities. Whether
          you're planning to apply for a personal loan, car loan, or credit
          card, having a solid credit score will give you the confidence to
          negotiate favourable terms and secure the best possible financial
          outcomes.
        </p>
        <p className="py-2">
          Everything You Need to Know About Your Credit Score! Your credit score
          is a crucial factor that can open doors to various financial
          opportunities and help you secure the loan amount you desire. It is a
          three-digit numerical expression that represents a summary of your
          credit history. The credit score is derived from the information in
          your credit report, which includes details of your borrowing history,
          repayment behaviour, and credit utilization. The credit score scale
          typically ranges from 300 to 900, with a higher score indicating
          better creditworthiness and a lower risk for lenders. Importance of
          Credit Score Lenders and financial institutions use your credit score
          as a key factor in assessing your creditworthiness when you apply for
          loans, credit cards, or other forms of credit. A good credit score,
          typically above 670, can significantly increase your chances of
          qualifying for loans, credit cards, and mortgages. With a good credit
          score, you also have a better chance of securing larger loan amounts
          and enjoying lower interest rates. You can check your credit score for
          free from Buddy Score. It provides a quick and easy way to obtain your
          credit score evaluation report. By taking control of your credit
          score, you can open doors to better financial opportunities. Whether
          you're planning to apply for a personal loan, car loan, or credit
          card, having a solid credit score will give you the confidence to
          negotiate favourable terms and secure the best possible financial
          outcomes.
        </p>
        <p className="py-2">
          Everything You Need to Know About Your Credit Score! Your credit score
          is a crucial factor that can open doors to various financial
          opportunities and help you secure the loan amount you desire. It is a
          three-digit numerical expression that represents a summary of your
          credit history. The credit score is derived from the information in
          your credit report, which includes details of your borrowing history,
          repayment behaviour, and credit utilization. The credit score scale
          typically ranges from 300 to 900, with a higher score indicating
          better creditworthiness and a lower risk for lenders. Importance of
          Credit Score Lenders and financial institutions use your credit score
          as a key factor in assessing your creditworthiness when you apply for
          loans, credit cards, or other forms of credit. A good credit score,
          typically above 670, can significantly increase your chances of
          qualifying for loans, credit cards, and mortgages. With a good credit
          score, you also have a better chance of securing larger loan amounts
          and enjoying lower interest rates. You can check your credit score for
          free from Buddy Score. It provides a quick and easy way to obtain your
          credit score evaluation report. By taking control of your credit
          score, you can open doors to better financial opportunities. Whether
          you're planning to apply for a personal loan, car loan, or credit
          card, having a solid credit score will give you the confidence to
          negotiate favourable terms and secure the best possible financial
          outcomes.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto p-6">
        <FaqSection faqData={CreditScoreFAQ} heading="Credit Score FAQ" />
      </div>
    </div>
  );
};

export default CreditAuth;
