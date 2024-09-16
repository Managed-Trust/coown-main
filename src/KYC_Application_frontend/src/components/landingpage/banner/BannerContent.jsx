import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, Stack, styled, useMediaQuery,Grid } from '@mui/material';
import { IconRocket, IconWallet } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

// Styled Button for solid style
const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
  textTransform: 'none',
  width: '80%',
  borderRadius: '8px',
  backgroundColor: '#4A80F6',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#3a6fcc',
  },
}));

// Styled Button for outlined style
const StyledButton2 = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
  textTransform: 'none',
  width: '75%',
  borderRadius: '8px',
  color: '#4A80F6',
  border: '1px solid #4A80F6',
  '&:hover': {
    border: '1px solid #3a6fcc',
    color: 'white',
  },
}));

const BannerContent = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [user, setUser] = useState(null); // State to track the authenticated user
  const [profile, setProfile] = useState(null); // State to store user profile

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
    <GoogleOAuthProvider clientId="725664575664-3tboqhepr5uggob4mitv569jj9vfv362.apps.googleusercontent.com">
      <Box mt={lgDown ? 8 : 0}>
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
          }}
        >
          <Typography variant="h6" display={'flex'} gap={1} mb={2}>
            <Typography color={'secondary'}>
              <IconWallet size={'21'} />
            </Typography>{' '}
            Wallet for your groups
          </Typography>

          <Typography
            variant="h1"
            fontWeight={900}
            sx={{
              fontSize: {
                md: '54px',
              },
              lineHeight: {
                md: '60px',
              },
            }}
          >
            Managed{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #6797FF, #A66EFE)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >Shared</span>{' '}
            <Typography component={'span'} variant="none" color={'primary'}>
              assets
            </Typography>{' '}
            with your team
          </Typography>
        </motion.div>
        <Box pt={2} pb={3}>
          <motion.div
            initial={{ opacity: 0, translateY: 550 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              type: 'spring',
              stiffness: 150,
              damping: 30,
              delay: 0.2,
            }}
          >
            <Typography variant="h6" fontWeight={300}>
              Group accounts with spending limits, transaction approvals, and custom securities for regional markets, suitable for private groups, corporations and public law entities.
            </Typography>
          </motion.div>
        </Box>
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            delay: 0.4,
          }}
        >
          <Stack direction='column' spacing={2} mt={3}>
            <StyledButton variant="contained" color="primary" to="/dashboards/ecommerce" component={NavLink}>
              Connect with Internet Identity
            </StyledButton>

            {/* Custom Google Login Button */}
            {!profile ? (
              <StyledButton2 onClick={login}>
                Connect with personal email
              </StyledButton2>
            ) : (
              <Typography>Welcome, {profile ? profile.name : user.name}!</Typography>
            )}
          </Stack>
        </motion.div>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default BannerContent;
