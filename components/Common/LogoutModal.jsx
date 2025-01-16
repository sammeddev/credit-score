import { useEffect, useState } from "react";

const LogoutModal = ({ handleLogout, setIsModalOpen }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-all duration-300">
      <div
        className={`relative m-2 w-full max-w-md rounded-3xl bg-white p-8 transition-all duration-300 ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="text-center">
          <h2 className="mb-4 text-lg font-semibold text-black">
            Are you sure you want to logout?
          </h2>

          <div className="flex justify-center gap-10">
            <button
              onClick={() => handleLogout()}
              className="w-[80px] rounded-xl p-1 text-[18px] font-bold text-white"
              style={{
                background:
                  "radial-gradient(97.81% 97.81% at 49.04% 98.81%, #008ACF 9%, #58B8F3 100%)",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="hover:gray-500 w-[80px] rounded-xl bg-gray-300 p-1 text-[18px] font-bold text-white"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
