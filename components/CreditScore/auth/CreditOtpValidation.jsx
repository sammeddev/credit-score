"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { resendOTP, userSearch, verifyOTP } from "../../../api/user";
import { decryptData64, encryptData64 } from "@/utils/cryptoUtils64";
import { useUserContext } from "../../../utils/UserContext";
import OtpTimerTwo from "./OtpTimerTwo";

const CreditOtpValidation = ({
  totalDigits = 4,
  utmSource,
  utmMedium,
  platform,
  mobile,
  verifyOtp,
  setFormState,
}) => {
  // Local states
  const [state, setState] = useState({
    loading: false,
    message: "",
    canVerifyOtp: false,
    enteredOtp: "",
    encryptedMobile: "",
  });
  const [otpValues, setOtpValues] = useState(Array(totalDigits).fill(""));
  const inputRefs = useRef([]);
  const { setUserSearchData } = useUserContext();

  useEffect(() => {
    const getEncryptedMobile = async (mobile) => {
      const encryptedMobile = await encryptData64(mobile);
      setState((prev) => ({ ...prev, encryptedMobile: encryptedMobile }));
    };
    getEncryptedMobile(mobile);
  }, []);

  // Focus the first input on component mount
  useEffect(() => {
    if (inputRefs.current[0]) inputRefs.current[0].focus();
  }, []);

  // Update message state with an icon based on success or failure
  const updateMessage = (text, isSuccess = false) => {
    const icon = isSuccess ? "✅" : "❌";
    setState((prev) => ({ ...prev, message: `${icon} ${text}` }));
  };

  // Handle OTP verification logic
  const handleOtpVerification = async (enteredOtp) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      // Prepare payload for OTP verification request
      const payload = new URLSearchParams({
        mobile_no: mobile,
        mobile_otp: enteredOtp,
        platform,
        utm: utmMedium,
        utm_source: utmSource,
        user_consent: 2,
      });

      // Make OTP verification API call
      const response = await verifyOTP(payload);
      handleVerificationResponse(response?.data); // Handle response from API
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      updateMessage(errorMessage); // Show error message if request fails
      toast.error(errorMessage); //error toast
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle OTP verification response
  const handleVerificationResponse = (response) => {
    if (response?.status === "success" && response?.message === "OTP Match") {
      sessionStorage.setItem("_token", response?.user_token);
      updateMessage(response?.message, true);
      toast.success(response?.message); // sucess toast
      verifyUsers(response?.user_token);

      // Update the form state to reflect that the modal is open
      setTimeout(() => {
        setFormState((prev) => {
          const updatedState = {
            ...prev,
            isModalOpen: false,
            isUserAuthSuccess: true,
          };

          // Store the updated state in sessionStorage
          sessionStorage.setItem("u_data", JSON.stringify(updatedState));

          return updatedState;
        });
      }, 1000);
      return;
    }

    // Handle specific failure cases like OTP limit exceeded
    if (response?.status === "failure" && response?.HTTPStatus === 405) {
      updateMessage(response.message);
      toast.error(response?.message); // error toast
      setState((prev) => ({ ...prev, canVerifyOtp: false }));
      return;
    }

    updateMessage(`${response?.message}`);
    toast.error(response?.message); // error toast
  };

  // Handle OTP input change
  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (!/^[0-9]?$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Move focus to the next input if value is entered
    if (value && index < totalDigits - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if OTP is complete
    if (newOtpValues.every((digit) => digit !== "")) {
      const enteredOtp = newOtpValues.join("");
      setState((prev) => ({
        ...prev,
        canVerifyOtp: true,
        enteredOtp: enteredOtp,
      }));
    } else {
      setState((prev) => ({
        ...prev,
        canVerifyOtp: false,
      }));
    }
  };

  // Handle key events (e.g., Backspace)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle Verify OTP
  const handleVerifyOTP = (e) => {
    e.preventDefault();
    handleOtpVerification(state?.enteredOtp);
  };

  // Resend OTP handler
  const reSendOtp = async () => {
    setState((prev) => ({
      ...prev,
      loading: true,
    }));

    try {
      // Prepare payload for OTP verification request
      const payload = new URLSearchParams({
        mobile: state?.encryptedMobile,
        utm: "homepgbanappnowbtn",
        platform: "Nweb",
      });

      // Make OTP verification API call
      const response = await resendOTP(payload);

      if (response.data.status === "success") {
        toast.success("OTP sent successfully.");
      }

      if (response.data.status === "failure") {
        updateMessage(response.data.message, false);
        toast.error(response.data.message);
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";
      updateMessage(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // Verify Users function
  const verifyUsers = async (userToken) => {
    if (!userToken) {
      updateMessage("User token is not available.", false);
      return;
    }

    try {
      // Construct the payload
      const payload = new URLSearchParams({
        platform: platform,
        utm: utmMedium,
        utm_source: utmSource,
        user_token: userToken,
      });

      // Make OTP verification API call
      const response = await userSearch(payload);
      // Set user data in userData context
      setUserSearchData(response);

      if (response.status === "failure") {
        updateMessage(
          response.message ?? "In user search an unexpected error occurred.",
          false,
        );
      }
      sessionStorage.setItem("journey", 1);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        "In user search an unexpected error occurred.";
      updateMessage(errorMessage);
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  // useEffect(() => {
  //   // Exit early if userData is empty or undefined
  //   if (!userData || userData === "") return;

  //   if (userData && userData.loan_status_30 === 0) {
  //     // here user can take new journey
  //     setUserId(userData.id);
  //     setStartUserNewJourney(true);
  //     setShowOfferPage(false);
  //     const data = {
  //       userId: userData.id,
  //       StartUserNewJourney: startUserNewJourney,
  //       ShowOfferPage: showOfferPage,
  //     };
  //     // Store the JSON data in sessionStorage
  //     sessionStorage.setItem("u_stat_bdl", JSON.stringify(data));

  //     router.push("/apply-loan-online/user-journey");
  //   } else {
  //     setUserId(userData.id);
  //     setStartUserNewJourney(false);
  //     setShowOfferPage(true);
  //     const data = {
  //       userId: userData.id,
  //       StartUserNewJourney: startUserNewJourney,
  //       ShowOfferPage: showOfferPage,
  //     };

  //     // Store the JSON data in sessionStorage
  //     const userStat = encryptData(data);
  //     sessionStorage.setItem("u_stat_bdl", userStat);

  //     // loan_status_30 = 1 redirect to offer page
  //     router.push("/apply-loan-online/user-status");
  //   }
  // }, [userData]);

  const handleEditClick = () => {
    // Update the form state to reflect that the modal is open
    setFormState((prev) => {
      const updatedState = {
        ...prev,
        isModalOpen: false,
      };

      // Store the updated state in sessionStorage
      sessionStorage.setItem("u_data", JSON.stringify(updatedState));

      return updatedState;
    });
  };

  const maskMobileNumber = (number) => {
    return "xxxxxxx" + number?.slice(-4);
  };

  return (
    <div className="mx-auto max-w-sm text-center">
      <div>
        <h2 className="text-2xl text-black">Verify Mobile Number</h2>
        <p className="my-3 flex items-center justify-center rounded-sm px-0 text-center text-sm text-gray-500">
          OTP sent on Mobile Number +91-{maskMobileNumber(mobile)}
          <button
            className="flex items-center justify-center ps-2 text-[#1E4AE9] transition-colors hover:text-black"
            onClick={handleEditClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1l1-4l9.5-9.5z" />
              </g>
            </svg>
            <span className="ps-1">Edit</span>
          </button>
        </p>
      </div>

      <form>
        {/* Otp Inputs */}
        <div className="flex items-center justify-center space-x-2">
          {otpValues.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              // onPaste={handlePaste}
              className="block size-12 rounded-lg border border-gray-300 text-center text-sm font-semibold text-black focus:border-bl-blue focus:ring-2 focus:ring-bl-blue"
            />
          ))}
        </div>
        {/* Display OTP verification message */}
        {state.message && (
          <p
            className={`mt-4 text-center text-sm ${
              state.message.includes("✅") ? "text-green-500" : "text-red-500"
            }`}
          >
            {state.message}
          </p>
        )}
        {/* OTP resend button or timer */}
        {/* {mobileNumber && state.canVerifyOtp && ( */}
        <div className="mt-4 text-center">
          {state.loading ? (
            // Loading spinner while waiting for OTP verification
            <div className="flex justify-center">
              <svg
                className="size-6 animate-spin text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v1m0 14v1m8-7h1m-14 0H3m14.071 7.071a9.042 9.042 0 001.424-1.424M4.929 6.929A9.042 9.042 0 006.353 5.5m13.838 0a9.042 9.042 0 01-1.424 1.429m-13.838 0a9.042 9.042 0 011.424-1.429"
                />
              </svg>
            </div>
          ) : (
            <OtpTimerTwo reSendOtp={reSendOtp} verifyOtp={verifyOtp} />
          )}
        </div>
        {/* )} */}

        {/* Verify Button */}
        <button
          type="submit"
          className={`my-3 w-[160px] rounded-xl py-2 text-[20px] font-bold text-white ${
            state.canVerifyOtp ? "" : "cursor-not-allowed opacity-50"
          }`}
          style={{
            background: state.canVerifyOtp
              ? "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)"
              : "gray",
          }}
          disabled={!state.canVerifyOtp}
          onClick={(e) => handleVerifyOTP(e)}
        >
          Verify
        </button>

        <div>
          <span className="text-xs text-black">
            By logging in, you agree to the following
          </span>
          <div className="text-center text-xs text-[#58C4FF]">
            <span className="inline-block cursor-pointer hover:underline">
              About Us
            </span>
            <span className="mx-1">|</span>
            <span className="inline-block cursor-pointer hover:underline">
              Privacy Policy
            </span>
            <span className="mx-1">|</span>
            <span className="inline-block cursor-pointer hover:underline">
              Terms & Conditions
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreditOtpValidation;
