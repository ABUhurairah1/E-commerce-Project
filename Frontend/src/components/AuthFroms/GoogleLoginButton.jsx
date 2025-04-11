import React from 'react';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Button } from "@mui/material";
import { FaGoogle } from "react-icons/fa";

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const [isLoading, setIsLoading] = React.useState(false);

    const responseGoogle = async (credentialResponse) => {
        if (isLoading) return; // Prevent multiple submissions
        
        try {
            setIsLoading(true);
            // The credential is actually the ID token, not the access token
            const idToken = credentialResponse.credential;
            
            const res = await axios.post(`${backendUrl}/accounts/google/callback/`, {
                access_token: idToken
            });
            
            console.log('Login success:', res.data);
            onSuccess(res.data);
        } catch (error) {
            console.error('Login error:', error);
            onFailure(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                    console.log('Login Failed');
                    onFailure(new Error('Google login failed'));
                }}
                render={({ onClick }) => (
                    <Button
                        variant="outlined"
                        fullWidth
                        className="!py-2 !text-base !font-medium !mb-4 !rounded-lg"
                        startIcon={<FaGoogle className="text-gray-500" />}
                        onClick={onClick}
                        disabled={isLoading}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                            textTransform: 'none'
                        }}
                    >
                        {isLoading ? 'Signing in...' : 'Continue with Google'}
                    </Button>
                )}
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;