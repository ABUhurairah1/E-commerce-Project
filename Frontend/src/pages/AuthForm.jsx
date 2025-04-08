import React, { useState } from "react";
import Login from "../components/AuthFroms/Login";
import SignUp from "../components/AuthFroms/SignUp";
import { Box, Container } from "@mui/material";

const AuthForm = () => {
  const [activeForm, setActiveForm] = useState('sign-up');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFormChange = (form) => {
    setIsTransitioning(true);
    setActiveForm(form); 
    setTimeout(() => {
      setIsTransitioning(false); 
    }, 800); 
  };

  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden bg-custom-gradient">
      <Container 
        disableGutters 
        sx={{ 
          width: {xs: "90%", md: "80%", lg: "60%"}, 
          position: "relative", 
          background: "white", 
          borderRadius: "20px", 
          minHeight: {xs: "90vh", sm: "600px"}, 
          overflow: "hidden" ,
          display : {sm : "flex"},
          alignItems : {sm : "center"}
        }}
      >
        {/* Animated Background */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: {xs: "30%", sm: "100%"},
            display : "flex",
            alignItems : "center",
            "&::before": {
              content: "''",
              position: "absolute",
              width: {xs: "100%", sm: "300%"},
              height: {xs: "300%", sm: "100%"},
              backgroundColor: "#7494ec",
              zIndex: 2,
              left: activeForm === "login" 
                ? {xs: 0, sm: "-250%"} 
                : {xs: 0, sm: "50%"},
              top: activeForm === "login" 
                ? {xs: "-200%", sm: "auto"} 
                : {xs: "220%", sm: "auto"},
              borderRadius: "150px",
              transition: "left 1.2s ease-in-out, top 1.2s ease-in-out",
            }
          }}
        >
          {/* Welcome Message - Login Side */}
          <div
            className={`w-full sm:w-1/2 absolute h-full flex flex-col gap-5 justify-center items-center text-white transition-all duration-500 ${
              activeForm === "login" 
                ? "max-sm:top-0 sm:left-0 opacity-100 delay-75" 
                : "max-sm:-top-full sm:-left-full opacity-0"
            }`}
            style={{ zIndex: 3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button
              className="sm:w-[160px] h-10 p-5 flex items-center justify-center rounded-lg border-2 border-white font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => handleFormChange("sign-up")}
            >
              Register
            </button>
          </div>

          {/* Welcome Message - Signup Side */}
          <div
            className={`w-full sm:w-1/2  absolute h-full flex flex-col gap-5 justify-center items-center text-white transition-all duration-500 ${
              activeForm === "sign-up" 
                ? "max-sm:-bottom-[230%] sm:right-0 opacity-100 delay-300 md:delay-150" 
                : "max-sm:bottom-[30%] sm:-right-full opacity-0"
            }`}
            style={{ zIndex: 3 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className="sm:w-[160px] h-10 p-5 flex items-center justify-center rounded-lg border-2 border-white font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              onClick={() => handleFormChange("login")}
            >
              Login
            </button>
          </div>
        </Box>

        {/* Form Section (Slides + Delayed Content Update) */}
        <Box
          sx={{
            width: {xs: "100%", sm: "50%"},
            height: {xs: "70%", sm: "100%"},
            position: {xs: "absolute", sm: "relative"},
            left: activeForm === "login" ? {xs: 0, sm: "50%"} : "0",
            top: activeForm === "login" ? {xs: "30%", sm: "auto"} : {xs: "0%", sm: "auto"},
            transition: "left 1.2s ease-in-out, top 1.2s ease-in-out",
            opacity: isTransitioning ? 0 : 1,
            visibility: isTransitioning ? "hidden" : "visible",
            bottom: {xs: 0, sm: "auto"},
          }}
        >
          {!isTransitioning && (activeForm === "login" ? <Login /> : <SignUp />)}
        </Box>
      </Container>
    </div>
  );
};

export default AuthForm;