import React from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const SignUp = () => {
  return (
      <Paper className="relative z-10 p-10 shadow-lg rounded-lg bg-white">
        <Typography variant="h5" className="mb-4 text-center">Sign Up</Typography>
        <TextField label="Email" variant="outlined" fullWidth className="mb-4" />
        <TextField label="Password" type="password" variant="outlined" fullWidth className="mb-4" />
        <Button variant="contained" color="primary" fullWidth>Sign Up</Button>
      </Paper>
  );
};

export default SignUp;
