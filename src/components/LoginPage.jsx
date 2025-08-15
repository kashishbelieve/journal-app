import React from "react";
import { FiBookOpen } from "react-icons/fi";

function LoginPage({ onLogin }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <FiBookOpen className="text-green-500 text-6xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Daily Journal</h1>
        <p className="text-gray-600 mb-6">Welcome to Daily Journal</p>
        <button
          onClick={onLogin}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
