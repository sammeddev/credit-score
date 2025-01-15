"use client";
import React, { useEffect, useState } from "react";
import InputTwo from "@/components/Common/InputTwo";
import { useFormValidation } from "@/hooks/useValidation";
import FaqSection from "@/components/Common/FaqSection";
import CreditScoreFAQ from "@/mock/CreditScoreFAQ";
import CreditOtpValidation from "./CreditOtpValidation";
import CreditScroreInfo from "../CreditScroreInfo";
import CONSTANTS from "@/utils/constants";
import toast from "react-hot-toast";
import { encryptData64 } from "@/utils/cryptoUtils64";
import { sendSMS } from "@/api/user";

const CreditAuth = ({ formState, setFormState, setLoading }) => {
  // Form fields and state
  const fields = ["fullName", "email", "mobileNumber"];
  const [errorMsg, setErrorMsg] = useState("");
  const [animate, setAnimate] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

  useEffect(() => {
    setLoading(true);
    // Retrieve data from sessionStorage on component mount
    const storedData = sessionStorage.getItem(CONSTANTS.STORAGE_KEYS.USER_AUTH);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      Object.keys(parsedData).forEach((field) => {
        updateFormField(field, parsedData[field]);
      });
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const showToast = (message, type = "error") => {
    toast[type](message);
  };

  // Mobile Number Validation
  const validateMobile = (number) => {
    return (
      CONSTANTS.MOBILE_REGEX.test(number) &&
      !CONSTANTS.INVALID_NUMBERS.includes(number)
    );
  };

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

  // Session Storage Operations
  const saveToSession = async (mobile) => {
    const encrypted = await encryptData64(mobile);
    sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.MOBILE, encrypted);
    return encrypted;
  };

  // Response Handlers
  const handleSendSmsResponse = (response, mobile) => {
    if (response?.status === "success" && response?.HTTPStatus === 200) {
      showToast("OTP sent successfully", "success");
      handleSuccessfulOtpSend(mobile);
      return;
    }

    const isFailure = response?.status === "failure";
    if (isFailure) {
      showToast(response.msg);
      sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.HASERROR, true);
    }
  };

  const handleSuccessfulOtpSend = (mobile) => {
    const updatedState = {
      ...formState,
      isModalOpen: true,
      mobileNumber: mobile,
    };

    // Update the formState
    setFormState((prev) => ({
      ...prev,
      isModalOpen: true,
      verifyOtp: true,
      mobileNumber: mobile,
    }));

    // set otp timer start from begining
    sessionStorage.setItem("otpTimerStart", "");

    // Store the updated state in sessionStorage
    sessionStorage.setItem(
      CONSTANTS.STORAGE_KEYS.USER_AUTH,
      JSON.stringify(updatedState),
    );
    sessionStorage.setItem(CONSTANTS.STORAGE_KEYS.HASERROR, false);
  };

  // API Integration
  const sendOtp = async (mobile) => {
    try {
      const encryptedMobile = await saveToSession(mobile);
      const payload = new URLSearchParams({
        mobile: encryptedMobile,
        utm: "homepgbanappnowbtn",
        platform: "Nweb",
      });

      const response = await sendSMS(payload);
      handleSendSmsResponse(response?.data, mobile);
    } catch (error) {
      showToast("Error sending OTP");
    }
  };

  const onSubmit = async (data) => {
    if (validateMobile(data?.mobileNumber)) {
      await sendOtp(data.mobileNumber);
    } else {
      showToast("Invalid mobile number.");
    }
  };

  // OTP Modal
  const OTPModal = ({ isOpen }) => {
    useEffect(() => {
      if (isOpen) {
        setAnimate(true);
      } else {
        setAnimate(false);
      }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300">
        <div
          className={`relative m-2 w-full max-w-md rounded-3xl bg-white p-8 transition-all duration-300 ${
            animate ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
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
    <>
      <div className="min-h-full bg-[url('/credit-score/gredient-bg.svg')] bg-cover bg-center p-4">
        <div className="container mx-auto mt-[100px] flex flex-col-reverse gap-4 md:ps-8 lg:flex-row">
          <>
            {/* Left Section */}
            <div className="flex-1 p-2 text-white">
              <h1 className="py-2 text-[38px] font-semibold text-black">
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
                    I hereby appoint Buddy Loan as my authorised representative
                    to receive my credit information from Experian (bureau) on
                    an ongoing basis until the purpose of Pulling the Bureau
                    Score to push the lead to the lending partner associated
                    with Buddy Loan (&quot;End Use Purpose&quot;) is satisfied
                    or expiry of 6 months from the date the consent is
                    collected; whichever is
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

                {/* Features img on mobile view */}
                <div className="py-5">
                  <img
                    src="/credit-score/credit-features.svg"
                    alt="Credit Features"
                    className="block md:hidden"
                  />
                </div>
              </form>

              <OTPModal isOpen={formState?.isModalOpen} data={formState} />
            </div>

            {/* Right Section */}
            <div className="relative flex-1 text-center text-white">
              <div className="flex flex-col items-start space-y-6 md:mt-[40px]">
                <img src="/credit-score/credit-meter.svg" alt="Credit Meter" />
                <img
                  src="/credit-score/credit-features.svg"
                  alt="Credit Features"
                  className="hidden md:block"
                />
              </div>
            </div>
          </>
        </div>

        {/* Footer Links */}
        <div className="pt-2 text-center">
          <span className="cursor-pointer hover:underline">About Us</span>
          <span className="mx-2">|</span>
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="mx-2">|</span>
          <span className="cursor-pointer hover:underline">
            *Terms & Conditions
          </span>
        </div>
      </div>

      {/* Credit Score Information */}
      <CreditScroreInfo />

      {/* FAQ Section */}
      <div className="container mx-auto p-6">
        <FaqSection faqData={CreditScoreFAQ} heading="Credit Score FAQ" />
      </div>
    </>
  );
};

export default CreditAuth;
