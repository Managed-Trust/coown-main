import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Fab,
  Skeleton,
  Chip
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import profilecover from '../../../../assets/images/backgrounds/account_bg.png';
import userimg from '../../../../assets/images/profile/user-1.jpg';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import {
  IconBrandDribbble,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconFileDescription,
  IconUserCheck,
  IconUserCircle,
} from '@tabler/icons';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
import { useUser } from '../../../../userContext/UserContext';

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

import CryptoJS from "crypto-js";
import ConnectBanner from '../../../../views/apps/user-dashboard/components/ConnectBanner';

const secretKey = "your-secret-key"; // Use a strong secret key

const hashData = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const ProfileBanner = () => {
  const ProfileImage = styled(Box)(() => ({
    position: 'relative',
    width: '110px',
    height: '110px',
    borderRadius: '50%',
    // backgroundImage: 'linear-gradient(#50b2fc,#f44c66)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const Badge = styled(Box)(() => ({
    position: 'absolute',
    bottom: '0',
    right: '-10px',
    backgroundColor: '#22c55e',
    color: '#fff',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid white',
  }));

  const { user, setUser } = useUser();
  const [isLoading, setLoading] = React.useState(true);
  const [profile, setProfile] = useState(null);
  const [kyc, setKyc] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const { principal } = useConnect();
  const fetchProfile = async () => {
    try {
      const response = await ledger.call("getCustomer", user);
      console.log("Profile:", response);
      if (response.length > 0) {
        const profileData = response[0];
        setProfile(profileData);
      }

    } catch (e) {
      console.log("Error Fetching Profile:", e);
    }
  };

  useEffect(() => {
    console.log('user', user);
    if (user) {
      fetchProfile();
    }
  }, [user]);

  return (
    <>
      <BlankCard>
        {isLoading ? (
          <>
            <Skeleton variant="square" animation="wave" width="100%" height={330}></Skeleton>
          </>
        ) : (
          <CardMedia component="img" image={profilecover} alt={profilecover} width="100%" height={250} />
        )}
        <Grid container spacing={0} justifyContent="space-between" alignItems="start">
          {/* Post | Followers | Following */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="start"
              justifyContent="center"
              sx={{
                mt: '-45px',
                pb: '25px'
              }}
            >
              {profile ?
                <Box display="flex" alignItems="center">
                  <ProfileImage>
                    <Avatar
                      src={profile.live_photo[0]}
                      alt={decryptData(profile.given_name)}
                      sx={{
                        borderRadius: '50%',
                        width: '100px',
                        height: '100px',
                        border: '4px solid #fff',
                      }}
                    />
                    <Chip
                      icon={<StarIcon style={{ color: 'white' }} />}
                      label="2"
                      sx={{
                        backgroundColor: '#19BB8D',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        position: 'absolute',
                        bottom: '0px',
                        right: '0px'
                      }}
                    />
                  </ProfileImage>
                  <Box mt={2} ml={2}>
                    <Typography fontWeight={600} variant="h6">
                      {profile.given_name}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {profile.role}
                    </Typography>
                  </Box>
                </Box> :

                <Box display="flex" alignItems="center">
                  <ProfileImage>
                    <Avatar
                      src={userimg}
                      alt="Tony Stark"
                      sx={{
                        borderRadius: '50%',
                        width: '110px',
                        height: '110px',
                        border: '4px solid #fff',
                      }}
                    />
                    <Chip
                      icon={<StarIcon style={{ color: 'white' }} />}
                      label="2"
                      sx={{
                        backgroundColor: '#19BB8D',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        position: 'absolute',
                        bottom: '0px',
                        right: '0px'
                      }}
                    />
                  </ProfileImage>

                  {/* Text Section */}
                  <Box mt={7} ml={2}>
                    <Typography fontWeight={600} variant="h2" mb={1}>
                      Tony Stark
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      Genius, billionaire, playboy, philanthropist
                    </Typography>
                  </Box>
                </Box>
              }
            </Box>
          </Grid>

          {/* about profile */}

          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '3',
                sm: '3',
                lg: '3',
              },
            }}
          >
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="center" my={2}>
              {/* <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                <IconBrandFacebook size="16" />
              </Fab>
              <Fab size="small" color="primary" sx={{ backgroundColor: '#1DA1F2' }}>
                <IconBrandTwitter size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#EA4C89' }}>
                <IconBrandDribbble size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#CD201F' }}>
                <IconBrandYoutube size="18" />
              </Fab> */}
              <Button color="primary" variant="contained">
                Edit Cover
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/**TabbingPart**/}
        {profile && profile.verified && profile.verified ?
          <ConnectBanner />
          : <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#4e84ff',
              padding: '10px 20px',
              borderRadius: '5px',
              color: '#fff',
              my: 1,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Left side - Info text with an icon */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <InfoOutlinedIcon sx={{ marginRight: '8px', color: '#fff' }} />
              <Typography variant="body1">
                {profile && profile.role && profile.role == 'fullapplicant' ?
                !profile.verified && profile.decline_reason.length !== 0 ?  'Your KYC Application is declined' :
                  'Your KYC Application is pending for approval' : 'Perform KYC to get your personal wallet'
                }
              </Typography>
            </Box>
            {profile && profile.role && !profile.role == 'fullapplicant' &&
              <Link to='/dashboards/modern'
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#333',
                    },
                  }}
                >
                  KYC
                </Button>
              </Link>
            }
          </Box>
        }
        <ProfileTab />
      </BlankCard >
    </>
  );
};

export default ProfileBanner;
