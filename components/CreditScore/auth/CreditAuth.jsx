"use client";
import React, { useState } from "react";
import CreditAuthHeader from "./CreditAuthHeader";
import InputTwo from "@/components/Common/InputTwo";
import { useFormValidation } from "@/hooks/useValidation";
import FaqSection from "@/components/Common/FaqSection";
import CreditScoreFAQ from "@/mock/CreditScoreFAQ";
import CreditOtpValidation from "./CreditOtpValidation";

const CreditAuth = () => {
  const fields = ["fullName", "email", "mobileNumber"];
  const [formState, setFormState] = useState({
    mobile: "",
    isValid: true,
    showOtpInput: false,
    isEditable: true,
    verifyOtp: false,
    errorMessage: "",
    isTransitioning: false,
    showNextBtn: false,
    userConsentCheck: true,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  // Handle form field change
  const handleChange = (field) => async (e) => {
    const value = e.target.value;
    setValue(field, value);
    trigger(field);
  };

  // Toogle user consent
  const toggleUserConsent = () => {
    setFormState((prev) => ({
      ...prev,
      userConsentCheck: !formState.userConsentCheck,
    }));
  };

  // Form submission
  const onSubmit = (data) => {
    // const payload = new URLSearchParams({
    //   mobile_no: mobile,
    //   coloumn_name: "email",
    //   coloumn_value: data.email,
    // });

    console.log("data", data);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const Modal = ({ isOpen, closeModal }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-full max-w-sm rounded-lg bg-white p-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          {/* OTP Validation */}
          <CreditOtpValidation
            utmSource={""}
            utmMedium={""}
            platform={""}
            mobile={""}
            verifyOtp={""}
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

            <div className="mt-[20px] max-w-[450px]">
              <form className="space-y-5">
                <InputTwo
                  type="text"
                  placeholder="Full Name"
                  value={watch("fullName")}
                  onChange={handleChange("fullName")}
                  error={errors.fullName?.message}
                />
                <InputTwo
                  type="text"
                  placeholder="Email ID"
                  value={watch("email") || ""}
                  onChange={handleChange("email")}
                  error={errors.email?.message}
                />
                <InputTwo
                  type="number"
                  placeholder="Mobile Number"
                  value={watch("mobileNumber") || ""}
                  onChange={handleChange("mobileNumber")}
                  maxLength={10}
                  error={errors.mobileNumber?.message}
                />
                {/* Consent */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="user_consent"
                    checked={formState.userConsentCheck}
                    onChange={toggleUserConsent}
                    className="size-5 rounded-md border-2 border-gray-300 transition-all duration-200 ease-in-out focus:outline-none"
                  />
                  <label className="text-xs text-black" htmlFor="user_consent">
                    I hereby appoint Buddy Loan as my authorised representative
                    to receive my credit information from Experian (bureau) on
                    an ongoing basis until the purpose of Pulling the Bureau
                    Score to push the lead to the lending partner associated
                    with Buddy Loan ("End Use Purpose") is satisfied or expiry
                    of 6 months from the date the consent is collected;
                    {/* <a
                      href="https://www.buddyloan.com/terms-and-conditions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-1 font-semibold text-bl-blue no-underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and
                    <a
                      href="https://www.buddyloan.com/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ps-1 font-semibold text-bl-blue no-underline"
                    >
                      Privacy Policy
                    </a> */}
                  </label>
                </div>
                {/* Get OTP Button */}
                <button
                  type="button"
                  onClick={openModal}
                  className="w-full rounded-xl p-1 text-[28px] font-bold text-white shadow-[0px_4.06px_4.06px_-2.03px_rgba(0,0,0,0.48)]"
                  style={{
                    background:
                      "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
                  }}
                >
                  Get OTP
                </button>
              </form>

              <Modal isOpen={isModalOpen} closeModal={closeModal} />

              <div className="py-4">
                <div className="flex items-center justify-start py-1">
                  <span className="pe-2">
                    <img
                      src="/credit-score/credit-small.png"
                      alt="Credit Meter"
                      //   className="h-4 w-8" // Add dimensions to control size if necessary
                    />
                  </span>
                  <div className="text-sm text-black">
                    Your data is protected by encryption methods
                  </div>
                </div>

                <div className="flex items-center justify-start">
                  <span className="pe-2">
                    <img
                      src="/credit-score/security-icon.png"
                      alt="Credit Meter"
                      //   className="h-4 w-8" // Add dimensions to control size if necessary
                    />
                  </span>
                  <div className="text-sm text-black">
                    No effect to your credit score{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex-1 text-center text-white">
            <div className="mt-[40px] flex flex-col items-start justify-start space-y-6">
              {/* Credit Scrore Meter */}
              <div>
                <img src="/credit-score/credit-meter.svg" alt="Credit Meter" />
              </div>

              {/* Credit Features */}
              <div>
                <img
                  src="/credit-score/credit-features.svg"
                  alt="Credit Meter"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-10 text-center">
          <span className="inline-block cursor-pointer hover:underline">
            About Us
          </span>
          <span className="mx-2">|</span>
          <span className="inline-block cursor-pointer hover:underline">
            Privacy Policy
          </span>
          <span className="mx-2">|</span>
          <span className="inline-block cursor-pointer hover:underline">
            Terms & Conditions
          </span>
        </div>
      </div>

      <div className="container mx-auto p-6 pt-10 text-center text-justify">
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

      <div className="container mx-auto p-6">
        <FaqSection faqData={CreditScoreFAQ} heading={"Credit Score FAQ"} />
      </div>
    </div>
  );
};

export default CreditAuth;
