import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Divider, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import googleLogo from '../../../assets/images/login/GoogleIcon.svg';
import GoogleLoginLogo from '../../../assets/images/login/GoogleLogin.svg';
import { useGoogleLogin } from '@react-oauth/google';
import swal from 'sweetalert';
import emailjs from '@emailjs/browser';
import { useUser } from '../../../userContext/UserContext';
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
import ic from "ic0";

const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const LoginPage = () => {
    const { user, setUser } = useUser();
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [profile, setProfile] = useState(null);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const [agreeToProductNotifications, setAgreeToProductNotifications] = useState(false);
    const [agreeToSpecialOffers, setAgreeToSpecialOffers] = useState(false);
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loader state
    const navigate = useNavigate();
    const otpRefs = useRef([]); // Refs for OTP boxes

    // Function to create user, fetch OTP from backend, and send it via email
    const sendOtpToEmail = async () => {
        setIsLoading(true); // Show loader
        try {
            // Backend call to create user
            console.log("USer:",email,"Password:",password);
            await ledger.call("createUser", email, password, 'Simple');
            console.log("User created successfully!");

            // Backend call to fetch OTP
            const otpResponse = await ledger.call("generateOTP", email);
            if (otpResponse) {
                setGeneratedOtp(otpResponse.toString());
                console.log("OTP fetched from backend:", otpResponse);

                // Send OTP via email using emailjs
                const emailParams = {
                    email: email,
                    otp: otpResponse.toString(),
                };

                await emailjs.send(
                    'service_idh0h15', // Replace with your actual service ID
                    'template_3d2t5lb', // Replace with your actual template ID
                    emailParams,
                    'Y4QJDpwjrsdi3tQAR' // Replace with your actual user/public key
                );

                console.log("OTP sent via email!");
                swal("Success", "User account created and OTP sent to your email!", "success");
            } else {
                throw new Error("Failed to fetch OTP from backend.");
            }

            setIsOtpSent(true); // Show OTP form
        } catch (error) {
            swal("Error", "Failed to create user or send OTP. Please try again.", "error");
            console.error("Error in user creation or OTP process:", error);
        } finally {
            setIsLoading(false); // Hide loader
        }
    };

    // Handle OTP input changes
    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Ensure only 1 digit is added
        setOtp(newOtp);

        // Move to the next input if a digit is entered
        if (value && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    // Handle form submission (for OTP verification)
    const verifyOtp = async () => {
        const enteredOtp = otp.join(''); // Combine OTP digits into a single string
        try {
            // Make the backend call to verify OTP
            const isVerified = await ledger.call("verifyOTP", email, enteredOtp);

            if (isVerified) {
                swal('Success', 'OTP verified successfully!', 'success').then(() => {
                    setUser(email);
                    navigate('/user/connect'); // Navigate to the next page
                });
            } else {
                throw new Error('Incorrect OTP'); // Throw error for incorrect OTP
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            swal('Error', 'Incorrect OTP. Please try again.', 'error');
            setOtp(new Array(6).fill('')); // Clear OTP state
            otpRefs.current[0].focus(); // Focus back to the first input
        }
    };


    // Function to go back to email form
    const handleBack = () => {
        setIsOtpSent(false);
        setOtp(new Array(6).fill(''));
        setEmail('');
    };

    // Initialize Google login
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Login Success:', tokenResponse);
            fetchUserProfile(tokenResponse.access_token);
        },
        onError: (error) => {
            console.log('Login Failed:', error);
        },
    });

    // Function to fetch user profile using the access token
    const fetchUserProfile = async (accessToken) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            const data = await response.json();
            console.log('User Profile:', data);
            // setProfile(data); // Set profile state to the fetched user data
            try {
                const res = await ledger.call("createUser", data.email, '', 'Google');
                console.log("User Created Via Google:", res);
            } catch (e) {
                console.log("Error Creating User via Google:", e);
            } finally {
                setProfile(data.email);
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // useEffect to re-render the component and set user state when the profile state changes
    useEffect(() => {
        if (profile) {
            console.log('Profile updated, re-rendering component:', profile);
            setUser(profile); // Set user email when profile is updated
            swal("Success", "Login successfully!", "success").then(() => {
                // Navigate to the dashboard or e-commerce page
                navigate('/user/connect');
            });
        }
    }, [profile, navigate, setUser]);

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
                    {!isOtpSent ? (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                                Sign up via email
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Enter your email address to create an account and receive a one-time password.
                            </Typography>

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email address"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ borderRadius: '8px' }}
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

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="receiveProductNotifications"
                                        color="primary"
                                        checked={agreeToProductNotifications}
                                        onChange={(e) => setAgreeToProductNotifications(e.target.checked)}
                                    />
                                }
                                label="I agree to receive product notifications via email"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        value="receiveSpecialOffers"
                                        color="primary"
                                        checked={agreeToSpecialOffers}
                                        onChange={(e) => setAgreeToSpecialOffers(e.target.checked)}
                                    />
                                }
                                label="I agree to receive updates on news and special offers via email"
                            />

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={sendOtpToEmail}
                                disabled={isLoading || !agreeToProductNotifications || !agreeToSpecialOffers}
                                sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Create Account'}
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
                                <img src={googleLogo} alt="Google Logo" style={{ width: '20px', marginRight: '8px' }} />
                                Sign in with Google
                            </Button>
                            <Typography variant="body2" gutterBottom sx={{ fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
                                Go Back to <Link to="/user/sign-up" color="primary">Login Page</Link>
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                                Enter One-Time Password
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Please enter the 6-digit password sent to {email}.
                            </Typography>

                            <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        inputRef={(el) => (otpRefs.current[index] = el)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: { textAlign: 'center', padding: '10px' },
                                        }}
                                        sx={{
                                            width: 50,
                                            height: 50,
                                            fontSize: '20px',
                                            textAlign: 'center',
                                            borderRadius: '8px',
                                        }}
                                    />
                                ))}
                            </Box>

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={verifyOtp}
                                sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                                Verify OTP
                            </Button>

                            <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
                                <Button
                                    type="button"
                                    onClick={sendOtpToEmail}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        color: 'primary.main',
                                    }}
                                >
                                    Resend OTP
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleBack}
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: '600',
                                        color: 'primary.main',
                                    }}
                                >
                                    Back
                                </Button>
                            </Box>

                            <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
                                If you sign in for the first time, a free account will be created
                            </Typography>
                        </>
                    )}
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginPage;
