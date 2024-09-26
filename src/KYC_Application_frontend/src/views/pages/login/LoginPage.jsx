import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, TextField, Button, Divider, Checkbox, FormControlLabel } from '@mui/material';

// Import the Google logo as an image for a colorful look
import googleLogo from '../../../assets/images/login/GoogleIcon.svg'; // You can use any colorful Google logo image
import GoogleLoginLogo from "../../../assets/images/login/GoogleLogin.svg";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false); // Toggle between email and OTP form
    const [otp, setOtp] = useState(['', '', '', '']);  // Store 4-digit OTP
    const [profile, setProfile] = useState(null); // State to store user profile

    // Function to simulate sending OTP to email
    const sendOtpToEmail = () => {
        console.log(`OTP sent to ${email}`);
        setIsOtpSent(true); // Switch to OTP form
    };

    // Handle OTP input changes
    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    // Handle form submission (for OTP verification)
    const verifyOtp = () => {
        console.log(`OTP Entered: ${otp.join('')}`);
        // Add OTP verification logic here
    };

    // Initialize Google login
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
            console.log('Login Success:', tokenResponse);
            fetchUserProfile(tokenResponse.access_token); // Fetch user profile using access token
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

    // useEffect to re-render the component when the profile state changes
    useEffect(() => {
        if (profile) {
            // Trigger any side effects or updates that should occur when the profile changes
            console.log('Profile updated, re-rendering component:', profile);
        }
    }, [profile]); // Dependency array with profile ensures this runs when profile changes

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
                {/* Image Placeholder */}
                <img
                    src={GoogleLoginLogo} // Replace with your image URL
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
                            {/* Email Form */}
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                                Sign in via email
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Enter your email address to receive a one-time password to sign in.
                            </Typography>

                            {/* Email Input */}
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

                            {/* Checkboxes */}
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

                            {/* Submit Button to send OTP */}
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={sendOtpToEmail}
                                sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                                Send password
                            </Button>

                            {/* Divider */}
                            <Divider sx={{ my: 3, color: '#aaa' }}>or sign in with</Divider>

                            {/* Google Sign In Button */}
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
                            {/* OTP Form */}
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                                Enter One-Time Password
                            </Typography>
                            <Typography variant="body2" color="textSecondary" gutterBottom>
                                Please enter the password we sent to {email}.
                            </Typography>

                            {/* OTP Input (4 Digits) */}
                            <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
                                {otp.map((digit, index) => (
                                    <TextField
                                        key={index}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(e.target.value, index)}
                                        inputProps={{
                                            maxLength: 1,
                                            style: { textAlign: 'center',padding:'25px 0px' },
                                            
                                        }}
                                        sx={{
                                            width: 60,
                                            height: 70,  // Increased height
                                            fontSize: '24px',
                                            borderRadius: '8px', // Add border radius for rounded look
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Submit Button to verify OTP */}
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
