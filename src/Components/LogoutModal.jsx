import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setOpenLogoutModal }) => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const closeLogoutModal = () => {
    setOpenLogoutModal(false);
  };

  const handleLogout = async () => {
    await signOut(); // Ends the Clerk session
    navigate("/login"); // Redirect to login page after sign-out
  };

  return (
    <div className="fixed inset-0 bg-[#000]/50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-md py-8 px-6">
        <div className="flex justify-between mb-2 items-center">
          <h3 className="font-medium text-lg">Confirm Logout</h3>
          <button
            className="font-medium text-gray hover:bg-gray-light/90 hover:text-gray-dark rounded-md py-1.5 px-2"
            onClick={closeLogoutModal}
          >
            x
          </button>
        </div>
        <div className="mb-8 text-gray pr-8">
          <p>Are you sure you want to log out?</p>
        </div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleLogout}
            className="py-2 px-3 text-sm font-medium text-center text-white bg-error rounded-md hover:bg-red-600"
          >
            Logout
          </button>
          <button
            onClick={closeLogoutModal}
            className="py-2 px-3 text-sm font-medium text-center text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
