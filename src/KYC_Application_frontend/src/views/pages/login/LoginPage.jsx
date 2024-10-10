import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Divider, Checkbox, FormControlLabel } from '@mui/material';
import googleLogo from '../../../assets/images/login/GoogleIcon.svg';
import GoogleLoginLogo from "../../../assets/images/login/GoogleLogin.svg";
import { useGoogleLogin } from '@react-oauth/google';
import swal from 'sweetalert';
import emailjs from "@emailjs/browser";
import { useUser } from "../../../userContext/UserContext";

const LoginPage = () => {
    const { user, setUser } = useUser();
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [profile, setProfile] = useState(null);
    const [generatedOtp, setGeneratedOtp] = useState("");
    const navigate = useNavigate();

    // Function to generate and set a 4-digit OTP
    const generateOtp = () => {
        const otp = Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
        setGeneratedOtp(otp.toString());
    };

    // Function to simulate sending OTP to email
    const sendOtpToEmail = async () => {
        generateOtp(); // Generate OTP first
        setIsOtpSent(true); // Switch to OTP form
    };

    // useEffect to send the OTP once it is generated
    useEffect(() => {
        if (generatedOtp && isOtpSent) {
            const emailParams = {
                email: email,
                otp: generatedOtp,
            };

            emailjs
                .send(
                    "service_idh0h15",
                    "template_3d2t5lb",
                    emailParams,
                    "Y4QJDpwjrsdi3tQAR"
                )
                .then(
                    () => {
                        console.log("SUCCESS!");
                        swal("OTP sent to your email!", email, "success");
                    },
                    (error) => {
                        console.log("FAILED...", error.text);
                        swal("Error Sending OTP", error.text, "error");
                    }
                )
                .catch((error) => {
                    console.log("Error sending OTP:", error);
                    swal("Error Sending OTP", error.message, "error");
                });
        }
    }, [generatedOtp, isOtpSent]);

    // Handle OTP input changes
    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    // Handle form submission (for OTP verification)
    const verifyOtp = () => {
        const enteredOtp = otp.join('');
        if (enteredOtp === generatedOtp) {
            console.log('OTP Verified!');
            swal("Success", "OTP verified successfully!", "success").then(() => {
                // Navigate to the dashboard or e-commerce page
                setUser(email);
                navigate('/user/connect');
            });
        } else {
            console.log('Incorrect OTP');
            swal("Error", "Incorrect OTP. Please try again.", "error");
            setOtp(['', '', '', '']); // Clear OTP state
        }
    };

    // Function to go back to email form
    const handleBack = () => {
        setIsOtpSent(false);
        setOtp(['', '', '', '']);
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
            setProfile(data); // Set profile state to the fetched user data
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    // useEffect to re-render the component and set user state when the profile state changes
    useEffect(() => {
        if (profile) {
            console.log('Profile updated, re-rendering component:', profile);
            setUser(profile.email); // Set user email when profile is updated
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
                                Sign in via email
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Enter your email address to receive a one-time password to sign in.
                            </Typography>

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email address"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                sx={{ borderRadius: '8px', marginBottom: 2 }}
                            />

                            <FormControlLabel
                                control={<Checkbox value="receiveProductNotifications" color="primary" />}
                                label="I agree to receive product notifications via email"
                                sx={{ alignItems: 'center' }}
                            />
                            <FormControlLabel
                                control={<Checkbox value="receiveSpecialOffers" color="primary" />}
                                label="I agree to receive updates on news and special offers via email"
                                sx={{ alignItems: 'center' }}
                            />

                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={sendOtpToEmail}
                                sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                                Send OTP
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
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                                Enter One-Time Password
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Please enter the password we sent to {email}.
                            </Typography>

                            <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: { textAlign: 'center', padding: '25px 0px' },
                                        }}
                                        sx={{
                                            width: 60,
                                            height: 70,
                                            fontSize: '24px',
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
                                Sign in
                            </Button>

                            {/* Resend and Back Buttons in Same Row */}
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
