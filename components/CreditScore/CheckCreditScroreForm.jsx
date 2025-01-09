import { useFormValidation } from "@/hooks/useValidation";
import React, { useState } from "react";
import InputTwo from "../Common/InputTwo";
import CalendarInputTwo from "../Common/CalendarInputTwo";
import Dropdown from "../Common/Dropdown";
import CreditScroreInfo from "./CreditScroreInfo";
import { useRouter } from "next/navigation";

const CheckCreditScroreForm = ({ formState, setFormState, setLoading }) => {
  // Form fields and state
  const fields = ["dob", "panCard", "pincode", "companyType"];
  const [fetchScoreLoading, setFetchScoreLoading] = useState(false);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
  } = useFormValidation(fields);

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

  // Callback to handle input change
  const handleFieldChange = (field, value) => {
    setValue(field, value);
    trigger(field); // Validate the field on change
  };

  // Callback to handle date change
  const handleDateChange = (field, date) => {
    setValue(field, date);
    trigger(field);
  };

  // Callback to dropdown change
  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    setFetchScoreLoading(true);

    setTimeout(() => {
      setFetchScoreLoading(false);
      router.push("/dashboard");
    }, 3000);
  };

  const CreditScoreFetchLoader = () => {
    return (
      <div className="inset-0 z-10 flex items-center justify-center">
        <div
          className="animate-spin"
          style={{
            animationDuration: "1.5s", // Speed of the spin
          }}
        >
          <img
            src="/credit-score/credit-loader.svg"
            className="my-5 h-[230px] w-[230px]"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`${fetchScoreLoading ? "h-[100vh]" : "min-h-screen"} bg-[url('/credit-score/gredient-bg.svg')] bg-cover bg-center pt-4 md:min-h-full md:ps-5`}
      >
        <div className="container relative mx-auto mt-[100px] flex flex-col items-center justify-around gap-20 md:ps-8 lg:flex-row">
          {fetchScoreLoading ? (
            <div className="flex h-[80vh] flex-col items-center justify-center">
              {/* Loader */}
              <CreditScoreFetchLoader />

              <h2 className="py-5 text-center text-4xl text-black">
                We’re Fetching Your Credit Score
              </h2>

              {/* Powered By Icon */}
              <img src="/credit-score/pwd-icon.png" />

              {/* Footer Links */}
              <div className="absolute bottom-0 text-center md:py-5">
                <span className="cursor-pointer hover:underline">About Us</span>
                <span className="mx-2">|</span>
                <span className="cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                <span className="mx-2">|</span>
                <span className="cursor-pointer hover:underline">
                  *Terms & Conditions
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Left Section */}
              <div className="p-2 text-white">
                <h1 className="py-2 text-[42px] font-semibold text-black">
                  You’re Almost There!
                </h1>
                <p className="py-2 text-start text-[18px] text-[#645A5A]">
                  Let’s Get You Verified!{" "}
                </p>

                <form
                  className="mt-[20px] max-w-md space-y-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* DOB */}
                  <CalendarInputTwo
                    placeholder="Date of Birth"
                    value={watch("dob") || formState?.dob}
                    onDateChange={(date) => {
                      handleDateChange("dob", date);
                    }}
                    error={errors.dob?.message}
                  />

                  {/* Pancard */}
                  <InputTwo
                    // type={isPanVisible ? "text" : "password"}
                    type="text"
                    placeholder="Pan Card"
                    value={watch("panCard") || formState?.pancard}
                    maxLength={10}
                    onChange={(e) => {
                      const uppercasedValue = e.target.value.toUpperCase(); // Auto-capitalize
                      handleFieldChange("panCard", uppercasedValue);
                    }}
                    error={errors.panCard?.message}
                  />

                  {/* Pincode */}
                  <InputTwo
                    type="text"
                    placeholder="Pincode"
                    value={watch("pincode") || formState?.pincode}
                    maxLength={6}
                    onChange={handleChange("pincode")}
                    error={errors.pincode?.message}
                  />

                  {/* Employment Type */}
                  <Dropdown
                    options={[
                      "Private Sector",
                      "Public Sector",
                      "Government",
                      "Proprietorship",
                      "Others",
                    ]}
                    selected={watch("companyType") || formState?.companyType}
                    placeholder="Employment Type"
                    onChange={(value) =>
                      handleDropdownChange("companyType", value)
                    }
                    error={errors.companyType?.message}
                  />

                  {/* Get OTP Button */}
                  <button
                    type="submit"
                    className={`w-full rounded-xl p-1 text-[28px] font-bold text-white ${
                      formState.userConsent
                        ? ""
                        : "cursor-not-allowed opacity-50"
                    }`}
                    style={{
                      background: formState.userConsent
                        ? "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)"
                        : "gray",
                    }}
                    disabled={!formState.userConsent}
                  >
                    Check My Credit Score
                  </button>

                  {/* Footer Links */}
                  <div className="pt-10 text-center text-black">
                    <span className="cursor-pointer hover:underline">
                      About Us
                    </span>
                    <span className="mx-2">|</span>
                    <span className="cursor-pointer hover:underline">
                      Privacy Policy
                    </span>
                    <span className="mx-2">|</span>
                    <span className="cursor-pointer hover:underline">
                      *Terms & Conditions
                    </span>
                  </div>
                </form>
              </div>

              {/* Right Section */}
              <div className="relative flex hidden items-end justify-end text-center text-white md:block">
                <div className="flex items-end justify-end">
                  <img
                    src="/credit-score/banner-1.svg"
                    alt="Banner Img"
                    className="max-h-[600px]"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* Credit Score Information */}
      <CreditScroreInfo />
    </>
  );
};

export default CheckCreditScroreForm;
