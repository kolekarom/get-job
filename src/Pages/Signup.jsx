import { SignUp } from "@clerk/clerk-react";

export default function Signup() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #9333ea, #4f46e5)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          maxWidth: "450px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#9333ea",
            fontFamily: "sans-serif",
          }}
        >
          Create Your Account
        </h2>
        <SignUp routing="path" path="/signup" />
      </div>
    </div>
  );
}
