import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login"); // Redirect after logout
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "#ef4444",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
