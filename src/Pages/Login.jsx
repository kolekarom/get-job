import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4f46e5, #9333ea)",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#4f46e5",
            fontFamily: "sans-serif",
          }}
        >
          Welcome Back
        </h2>
        <SignIn routing="path" path="/login" />
      </div>
    </div>
  );
}
