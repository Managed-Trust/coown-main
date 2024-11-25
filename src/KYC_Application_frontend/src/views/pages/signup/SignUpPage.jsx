import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Grid, Box, Typography, TextField, Button, Divider, Checkbox, FormControlLabel } from '@mui/material';
import googleLogo from '../../../assets/images/login/GoogleIcon.svg';
import GoogleLoginLogo from "../../../assets/images/login/GoogleLogin.svg";
import { useGoogleLogin } from '@react-oauth/google';
import swal from 'sweetalert';
import emailjs from "@emailjs/browser";
import { useUser } from "../../../userContext/UserContext";

const SignUpPage = () => {
    const { user, setUser } = useUser();
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    // Function to send OTP to email
    const sendOtpToEmail = () => {
        if (!email) {
            swal("Error", "Please enter a valid email address", "error");
            return;
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
        setGeneratedOtp(otp);
        emailjs.send(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            { email, otp },
            'YOUR_USER_ID'
        )
            .then(() => {
                swal("Success", "OTP sent to your email address", "success");
                setIsOtpSent(true);
            })
            .catch((error) => {
                swal("Error", "Failed to send OTP. Please try again later.", "error");
                console.error(error);
            });
    };

    // Function to handle Google login
    const login = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const { access_token } = response;
                const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                });
                const profileData = await userInfo.json();
                setProfile(profileData);
                setUser(profileData);
                navigate('/dashboard'); // Navigate to the dashboard after successful login
            } catch (error) {
                swal("Error", "Google login failed. Please try again.", "error");
                console.error(error);
            }
        },
        onError: (error) => {
            swal("Error", "Google login was unsuccessful", "error");
            console.error(error);
        },
    });

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
                    padding: 10,
                }}
            >
                <div>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                        Create an account
                    </Typography>
                    <Typography variant="body2" style={{ fontSize: '16px' }} mb={4} color="textSecondary" gutterBottom>
                        Account associated with aleksei@gmail.com will be created.
                    </Typography>

                    <FormControlLabel
                        control={<Checkbox value="receiveProductNotifications" color="primary" />}
                        label="I agree to receive product notifications via email"
                        sx={{ alignItems: 'center' }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="receiveSpecialOffers" color="primary" />}
                        label="I agree to receive marketing notifications via email"
                        sx={{ alignItems: 'center' }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="receiveProductNotifications" color="primary" />}
                        label="I am not resident of a country with prohibitive crypto restrictions"
                        sx={{ alignItems: 'center' }}
                    />
                    <FormControlLabel
                        control={<Checkbox value="receiveSpecialOffers" color="primary" />}
                        label="I agree to the Data Privacy Policy and General Terms of Service"
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
                        Create account
                    </Button>
                </div>


            </Grid>
        </Grid>
    );
};

export default SignUpPage;
