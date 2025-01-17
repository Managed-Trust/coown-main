import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Divider, CircularProgress } from '@mui/material';
import googleLogo from '../../../assets/images/login/GoogleIcon.svg';
import GoogleLoginLogo from '../../../assets/images/login/GoogleLogin.svg';
import { useGoogleLogin } from '@react-oauth/google';
import swal from 'sweetalert';
import emailjs from '@emailjs/browser';
import { useUser } from '../../../userContext/UserContext';
import ic from "ic0";

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const LoginUser = () => {
    const { user, setUser } = useUser();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [login1, setLogin1] = useState(false);
    const [login2, setLogin2] = useState(false);
    const [password, setPassword] = useState('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState('');
    const navigate = useNavigate();
    const otpRefs = useRef([]);

    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        // Move focus to next input on type
        if (value.length === 1 && index < otp.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').slice(0, otp.length).split('');
        if (pasteData.length === otp.length) {
            setOtp(pasteData);
            // Focus the last input after pasting
            otpRefs.current[otp.length - 1].focus();
        }
    };
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
            const isGoogleUserVerified = await ledger.call("createUser", data.email, '', 'Google');
            console.log("Verified:", isGoogleUserVerified);
            if (data.email_verified == true) {
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

    // Function to create user, fetch OTP from backend, and send it via email
    const sendOtpToEmail = async () => {
        setIsLoading(true); // Show loader
        try {
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

    // Handle form submission (for OTP verification)
    const verifyOtp = async () => {
        setIsLoading(true);
        const enteredOtp = otp.join(''); // Combine OTP digits into a single string
        try {
            // Make the backend call to verify OTP
            const isVerified = await ledger.call("loginWithOTP", email, enteredOtp);

            if (isVerified) {
                swal('Success', 'OTP verified successfully!', 'success').then(() => {
                    setUser(email);
                    navigate('/dashboards/ecommerce'); // Navigate to the next page
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
        setIsLoading(false);
    };


    // Function to go back to email form
    const handleBack = () => {
        setIsOtpSent(false);
        setOtp(new Array(6).fill(''));
        setEmail('');
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
                    {login1 &&
                        <>
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
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleEmailLogin}
                                disabled={isLoading}
                                sx={{ mt: 1, mb: 1, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Log In'}
                            </Button>
                            <br />

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setLogin1(false)}
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

                                Back


                            </Button>
                        </>
                    }
                    {login2 && !isOtpSent &&
                        <>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                                Log in with Email & OTP
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
                                sx={{ borderRadius: '8px' }}
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={sendOtpToEmail}
                                disabled={isLoading}
                                sx={{ mt: 1, mb: 1, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                                {isLoading ? <CircularProgress size={24} /> : 'Log In'}
                            </Button>
                            <br />

                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setLogin2(false)}
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

                                Back


                            </Button>
                        </>
                    }
                    {isOtpSent &&
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
                                        onPaste={handlePaste}
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
                                disabled={isLoading}
                                onClick={verifyOtp}
                                sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
                            >
                               
                               {isLoading ? <CircularProgress size={24} /> : ' Verify OTP'} 
                            </Button>

                            <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
                                <Button
                                    type="button"
                                    onClick={sendOtpToEmail} 
                                    disabled={isLoading}
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

                        </>
                    }
                    {!(login1 === true || login2 === true) && (
                        <><Typography variant="h1" mb={4} align="center" gutterBottom sx={{ fontWeight: 600 }}>
                            Log in
                        </Typography>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setLogin1(true)}
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

                                Log in Email Password


                            </Button>
                            <Divider sx={{ my: 2, color: '#aaa' }}>or sign in with</Divider>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setLogin2(true)}
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

                                Log in with OTP


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
                        </>
                    )}
                    <Typography variant="body2" gutterBottom sx={{ fontSize: '14px', textAlign: 'center', marginTop: '10px' }}>
                        or Register new Account, <Link to="/user/sign-up" color="primary">Register Account</Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

export default LoginUser;
