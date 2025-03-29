import React from "react";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  return (
      <Paper className="relative z-10 p-10 shadow-lg rounded-lg bg-white w-96">
        <Typography variant="h5" className="mb-4 text-center">Login</Typography>
        <TextField label="Email" variant="outlined" fullWidth className="mb-4" />
        <TextField label="Password" type="password" variant="outlined" fullWidth className="mb-4" />
        <Button variant="contained" color="primary" fullWidth>Login</Button>
      </Paper>
  );
};

export default Login;
