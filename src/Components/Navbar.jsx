import { SignedIn, SignedOut, SignInButton, UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Left: Logo & Links */}
      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-gray-300 font-bold text-lg">MyApp</Link>
        
        <SignedIn>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
        </SignedIn>
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <span className="hidden sm:inline">Hi, {user?.firstName}</span>
          <UserButton afterSignOutUrl="/" />
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </SignedIn>
      </div>
    </nav>
  );
}
