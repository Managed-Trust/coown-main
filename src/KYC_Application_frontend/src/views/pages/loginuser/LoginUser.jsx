import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Divider, CircularProgress } from '@mui/material';
import googleLogo from '../../../assets/images/login/GoogleIcon.svg';
import GoogleLoginLogo from '../../../assets/images/login/GoogleLogin.svg';
import { useGoogleLogin } from '@react-oauth/google';
import swal from 'sweetalert';
import { useUser } from '../../../userContext/UserContext';
import ic from "ic0";

const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const LoginUser = () => {
    const { user, setUser } = useUser();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const navigate = useNavigate();

    // Function to verify email for login
    const handleEmailLogin = async () => {
        setIsLoading(true); // Show loader
        try {
            const isEmailVerified = await ledger.call("loginUser", email, password); // Simulated function call
            if (isEmailVerified.length > 0) {
                setUser(email);
                swal("Success", "Logged in successfully!", "success").then(() => {
                    navigate('/dashboards/ecommerce');
                });
            } else {
                throw new Error("Email not found or unauthorized.");
            }
        } catch (error) {
            swal("Error", "Failed to log in with email. Please try again.", "error");
            console.error("Error logging in with email:", error);
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    // Initialize Google login
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            setIsGoogleLoading(true);
            fetchGoogleProfile(tokenResponse.access_token);
        },
        onError: (error) => {
            setIsGoogleLoading(false);
            swal("Error", "Google login failed. Please try again.", "error");
            console.error("Google login error:", error);
        },
    });

    // Fetch Google user profile
    const fetchGoogleProfile = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            console.log("Google User Profile:", data);
            const isGoogleUserVerified = await ledger.call("getUser", data.email); // Simulated function call
            if (isGoogleUserVerified.length > 0) {
                setUser(data.email);
                swal("Success", "Logged in successfully with Google!", "success").then(() => {
                    navigate('/dashboards/ecommerce');
                });
            } else {
                throw new Error("Google account not authorized.");
            }
        } catch (error) {
            swal("Error", "Failed to log in with Google. Please try again.", "error");
            console.error("Error fetching Google profile:", error);
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {/* Left section with image */}
            <Grid
                item
                xs={false}
                sm={4}
                md={6}
                sx={{
                    backgroundColor: '#f0f4f8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={GoogleLoginLogo}
                    alt="Login Illustration"
                    style={{ maxWidth: '80%', height: 'auto' }}
                />
            </Grid>

            {/* Right section with form */}
            <Grid
                item
                xs={12}
                sm={8}
                md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        padding: 4,
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                        Log in with Email
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        Enter your email address to log in.
                    </Typography>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Email address"
                        type="email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ borderRadius: '8px'}}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ borderRadius: '8px', marginBottom: 2 }}
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleEmailLogin}
                        disabled={isLoading}
                        sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Log In'}
                    </Button>
                    <Divider sx={{ my: 3, color: '#aaa' }}>or sign in with</Divider>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={login}
                        sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '12px 0',
                            fontWeight: '600',
                            color: '#555',
                            border: '1px solid #ddd',
                        }}
                    >
                        {isGoogleLoading ? (
                            <CircularProgress size={20} />
                        ) : (
                            <>
                                <img src={googleLogo} alt="Google Logo" style={{ width: '20px', marginRight: '8px' }} />
                                Log in with Google
                            </>
                        )}
                    </Button>
                    <Typography variant="body2" gutterBottom sx={{ fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
                        or Register new Account, <Link to="/user/sign-up" color="primary">Regirster Account</Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginUser;
