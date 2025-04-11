import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from './GoogleLoginButton';
import axiosInstance from '../../config/axios';
import Toast from '../../common/Toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "error" // 'error' | 'success'
  });

  const showToast = (message, severity = 'error') => {
    setToast({
      open: true,
      message,
      severity
    });
  };

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, open: false }));
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);

    if (!minLength || !hasNumber || !hasSpecialChar || !hasUpperCase) {
      setPasswordError("Password must be at least 8 characters and include one number, one special character, and one uppercase letter");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) return;

    try {
      await axiosInstance.post('/accounts/register/', {
        email,
        password,
        username: firstName,
        last_name: lastName
      });

      const loginResponse = await axiosInstance.post('/accounts/token/', {
        email,
        password
      });

      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

      showToast('Registration successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      showToast(error.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      validatePassword(newPassword);
    }, 500);

    setTypingTimeout(timeout);
  };

  const handleGoogleSuccess = async (response) => {
    try {
      localStorage.setItem('access_token', response.access);
      localStorage.setItem('refresh_token', response.refresh);
      localStorage.setItem('user', JSON.stringify(response.user));

      showToast('Google sign in successful!', 'success');
      navigate('/dashboard');
    } catch (error) {
      console.error('Google sign in error:', error);
      showToast(error.response?.data?.error || 'Google sign in failed. Please try again.');
    }
  };

  const handleGoogleFailure = (error) => {
    console.error('Google sign in error:', error);
    showToast('Google sign in failed. Please try again.');
  };

  useEffect(() => {
    return () => {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
    };
  }, [typingTimeout]);

  return (
    <div className="relative w-full h-full bg-white max-sm:py-6 sm:py-10 md:py-14 md:px-10 px-6 sm:px-4 flex flex-col justify-center">
      <h2 className="text-center font-bold text-3xl mb-6 sm:mb-10 text-gray-800">Sign Up</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-4">
        {/* First Name and Last Name Fields */}
        <div className="flex gap-2 items-center mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              id="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="First name"
              required
            />
            <FaUser className="absolute left-3 top-4 text-gray-400" />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              id="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Last name"
              required
            />
            <FaUser className="absolute left-3 top-4 text-gray-400" />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border border-gray-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email"
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
              onChange={handlePasswordChange}
              className={`w-full p-3 pl-10 border ${passwordError ? 'border-red-500' : 'border-gray-300'} bg-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              placeholder="Password"
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
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}
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
            py: 1,
            backgroundColor: "#7494ec"
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
        <GoogleLoginButton 
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        />
      </form>

      {/* Toast Notification */}
      <Toast
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default SignUp;