import React from "react";
import { useLocation } from "react-router-dom";
import Login from "../components/AuthFroms/Login";
import SignUp from "../components/AuthFroms/SignUp";
import { Box, Container } from "@mui/material";

const AuthForm = () => {
  const location = useLocation();
  return (
    <div className="h-screen flex justify-center items-center relative overflow-hidden bg-custom-gradient">
      <Container sx={{ width: "60%",position: "relative"}}>
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "blue",
        }}
      />

          {/* Right Side: Form Section */}
          <Box sx={{ marginLeft: "auto" , width : "50%"}}>
              {location.pathname === "/login" ? <Login /> : <SignUp />}
          </Box>
      </Container>
    </div>
  );
};

export default AuthForm;
