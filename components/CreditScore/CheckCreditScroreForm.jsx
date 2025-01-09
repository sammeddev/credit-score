import { useFormValidation } from "@/hooks/useValidation";
import React, { useEffect, useState } from "react";
import InputTwo from "../Common/InputTwo";
import CalendarInput from "../Common/CalendarInput";
import Dropdown from "../Common/Dropdown";
import Input from "../Common/Input";
import CreditScroreInfo from "./CreditScroreInfo";

const CheckCreditScroreForm = ({ formState, setFormState, setLoading }) => {
  // Form fields and state
  const fields = ["dob", "panCard", "pincode", "companyType"];

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
    const storedData = sessionStorage.getItem("u_data");
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

  // Callback to handle input change
  const handleFieldChange = (field, value) => {
    setValue(field, value);
    trigger(field); // Validate the field on change
  };

  // Callback to handle date change
  const handleDateChange = (field, date) => {
    setValue(field, date);
    trigger(field);
    console.log("date", date);
  };

  // Callback to dropdown change
  const handleDropdownChange = (field, value) => {
    setValue(field, value);
    trigger(field);
  };

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="min-h-screen bg-[url('/credit-score/gredient-bg.svg')] bg-cover bg-center pt-4 md:min-h-full md:ps-5">
      <div className="container mx-auto mt-[100px] flex flex-col items-center justify-center gap-4 md:ps-8 lg:flex-row">
        <>
          {/* Left Section */}
          <div className="flex-1 p-2 text-white">
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
              <CalendarInput
                placeholder="Date of Birth"
                value={watch("dob") || null}
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
                value={watch("panCard")}
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
                value={watch("pincode") || ""}
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
                selected={watch("companyType") || ""}
                placeholder="Employment Type"
                onChange={(value) => handleDropdownChange("companyType", value)}
                error={errors.companyType?.message}
              />

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
                Check My Credit Score
              </button>

              {/* Footer Links */}
              <div className="pt-10 text-center text-black">
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
            </form>
          </div>

          {/* Right Section */}
          <div className="relative hidden flex-1 text-center text-white md:block">
            <div className="flex flex-col items-start space-y-6">
              <img
                src="/credit-score/banner-1.svg"
                alt="Banner Img"
                className="max-h-[600px]"
              />
            </div>
          </div>
        </>
      </div>
      {/* Credit Score Information */}
      <CreditScroreInfo />
    </div>
  );
};

export default CheckCreditScroreForm;
