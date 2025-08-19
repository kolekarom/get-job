import { ClerkProvider, SignIn, SignedIn, SignedOut, useAuth } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useClerk } from "@clerk/clerk-react";
import Dashboard from './Dashboard';


const Home = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          
          <SignedIn>
            <Dashboard />
          </SignedIn>
          
          <SignedOut>
            <SignIn />
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default Home;
