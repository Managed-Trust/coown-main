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
import profilecover from '../../../../assets/images/backgrounds/account_bg.png';
import userimg from '../../../../assets/images/profile/user-1.jpg';
import StarIcon from '@mui/icons-material/Star';
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

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

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
  const [isLoading, setLoading] = React.useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const { principal } = useConnect();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ledger.call("getCustomer", principal);
        console.log("Profile:", response);
        const profileData = response[0];
        setProfile(profileData);

      } catch (e) {
        console.log("Error Fetching Profile:", e);
      }
    };
    if (principal) {
      fetchProfile();
    }
  }, [principal]);

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
                      {decryptData(profile.given_name)}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {(profile.role)}
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
        <ConnectBanner />
        <ProfileTab />
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
