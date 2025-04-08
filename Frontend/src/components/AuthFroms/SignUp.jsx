import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleSignUp = () => {
    console.log("Signing up with Google");
  };

  return (
    <div className="relative w-full h-full  bg-white max-sm:py-6 sm:py-10 md:py-14 md:px-10 px-6 sm:px-4 flex flex-col justify-center">
      <h2 className="text-center font-bold text-3xl mb-6 sm:mb-10 text-gray-800">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-4">
        {/* Email Field */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
            <FaUser className="absolute left-3 top-4 text-gray-400" />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Create a password"
              required
            />
            <FaLock className="absolute left-3 top-4 text-gray-400" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ 
            borderRadius: '8px', 
            fontSize: '1rem',
            fontWeight: 'medium',
            py : 1,
            backgroundColor : "#7494ec"
          }}
        >
          Register
        </Button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500 text-xs">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign Up Button */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<FaGoogle className="text-gray-500" />}
          onClick={handleGoogleSignUp}
          sx={{
            borderRadius: '8px',
            py: 1.5,
            textTransform: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          Continue with Google
        </Button>
      </form>
    </div>
  );
};

export default SignUp;