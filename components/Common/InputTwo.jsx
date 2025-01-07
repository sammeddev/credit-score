const InputTwo = ({ placeholder, value, onChange, type, error, maxLength }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (type === "number" && maxLength && inputValue.length > maxLength) {
      return; // Prevent further input if maxLength is exceeded
    }
    onChange(e);
  };

  return (
    <div className="relative mb-4 w-full">
      <input
        type={type}
        className={`z-1 h-[47.47px] w-full rounded-[12px] border-[#DCDBDD] px-3 ${
          error ? "border-red-500" : "border-[#47B6F2]"
        } text-black placeholder-[#84818A] outline-none focus:border-[#47B6F2] focus:ring-0`}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        maxLength={maxLength} // Restrict input length
      />
      {/* Error */}
      {error && <p className="mt-1 text-end text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputTwo;
