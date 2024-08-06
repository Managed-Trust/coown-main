import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
  Button,
  Chip,
  Breadcrumbs,
  Input,
  Tab, Divider, Tabs
} from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { QRCodeCanvas } from 'qrcode.react';

import { useConnect } from "@connect2ic/react";
import ic from "ic0";

// Import your asset
import profileCover from '../../../assets/images/backgrounds/profilebg.jpg';
import AssociatedMember from './AssociatedMember';
import AccountHistory from './AccountHistory';

// Tabler icons
import {
  IconCircle,
  IconChartLine,
  IconSend,
  IconHeart, IconPhone, IconUser
} from '@tabler/icons';

// Component Imports
import BlankCard from '../../shared/BlankCard';
import ChildCard from '../../shared/ChildCard';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Adjust as needed for your environment

const AccountBanner = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const { principal } = useConnect();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const COMMON_TAB = [
    { value: '1', icon: <IconPhone width={20} height={20} />, label: 'Associated member', disabled: false },
    { value: '2', icon: <IconHeart width={20} height={20} />, label: 'Account history', disabled: false }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      if (principal) {
        try {
          const response = await ledger.call("getCustomer", principal);
          const profileData = response[0];
          setProfile(profileData);
        } catch (e) {
          console.error("Error Fetching Profile:", e);
        }
      }
    };
    fetchProfile();
  }, [principal]);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <BlankCard>
        {isLoading ? (
          <Box sx={{ width: '100%', height: 220, bgcolor: 'background.default' }} />
        ) : (
          <Card sx={{ width: '100%', height: 220, backgroundImage: `url(${profileCover})` }}>
          </Card>
        )}
        <Grid container spacing={0}>
          {/* Post | Followers | Following */}

          {/* about profile */}
          <Grid
            item
            lg={12}
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
              p={4}
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >

              <ChildCard>
                <Grid container spacing={0} justifyContent="space-between" alignItems="center">
                  <Grid>
                    <Box display="flex" flexDirection="column" p={2} alignItems="flex-start">
                      <Breadcrumbs
                        separator={
                          <IconCircle
                            size="5"
                            fill="textSecondary"
                            fillOpacity={'0.6'}
                            style={{ margin: '0 5px' }}
                          />
                        }
                        sx={{ alignItems: 'center', mt: '10px' }}
                        aria-label="breadcrumb"
                      >
                        <div>
                          <Typography color="textPrimary">Group</Typography>
                        </div>
                        <div>
                          <Typography color="textPrimary">TechInnovators Inc.</Typography>
                        </div>
                        <div>
                          <Typography color="textPrimary">Account details</Typography>
                        </div>

                      </Breadcrumbs>
                      <Typography color="textSecondary" variant="h6" fontWeight={400} mt={2} mb={2}>
                        Operation fund
                      </Typography>
                      <Box display="flex" gap={1} my={1}>
                        <Chip label="CHTFC" color="primary" variant="outlined" />
                        <Chip label="Incorporation" color="secondary" variant="outlined" />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid>
                    <Box display="flex" gap={1} mt={2}>
                      <Button variant="outlined">Edit details</Button>
                      <Button variant="outlined">Edit cover</Button>
                    </Box>
                  </Grid>
                </Grid>
                <Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Card sx={{ background: 'linear-gradient(to right, #2C5364, #203A43, #0F2027)', color: 'white' }}>
                        <CardContent>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box>
                              <Typography variant="h3">1.715156 ckBTC</Typography>
                              <Typography variant="body2" display="flex" alignItems="flex-start" >$11193.91 USD</Typography>
                            </Box>
                            <Button variant="contained" sx={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
                              <IconChartLine />
                            </Button>
                          </Box>
                          <Box display="flex" alignItems="flex-start" mt={10}>
                            <Button variant="contained" sx={{ background: '#1A73E8', color: 'white' }} startIcon={<IconSend />}>
                              Send
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card>
                        <Box display="flex" justifyContent="space-between" mb={1}>
                          <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
                            <Typography variant="h3" display="flex" alignItems="flex-start">Receive funds</Typography>
                            <Box display="flex" alignItems="center" justifyContent="center" mt={8} mb={3} position="relative">
                              <Input
                                placeholder="Network"
                                style={{ width: 200, marginRight: 8 }}
                                inputProps={{ 'aria-label': 'network' }}
                              />
                              <Typography variant="body2" style={{ position: 'absolute', right: 10 }}>IPC</Typography>
                            </Box>
                            <Button variant="contained" color="primary" style={{ marginTop: 10, width: '100%' }}>
                              1A1zp1...DivfNa
                            </Button>
                          </Box>
                          <Box display="flex" alignItems="center" justifyContent="center">
                            <QRCodeCanvas value="1A1zp1eP5QGefi2DMPTfTL5SLmv7DivfNa" size={128} />
                          </Box>
                        </Box>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>

                <Grid item xs={12} display="flex" alignItems="stretch" mt={5}>
                  <ChildCard>
                    <TabContext value={value}>
                      <Box>
                        <TabList variant="scrollable"
                          scrollButtons="auto" onChange={handleChange} aria-label="lab API tabs example">
                          {COMMON_TAB.map((tab, index) => (
                            <Tab key={tab.value} label={tab.label} value={String(index + 1)} />
                          ))}
                        </TabList>
                      </Box>
                      <Divider />
                      <Box mt={2}>
                        {COMMON_TAB.map((panel, index) => (
                          <TabPanel key={panel.value} value={String(index + 1)}>
                            {panel.value == '1' ?

                              <AssociatedMember /> : <AccountHistory />
                            }
                          </TabPanel>
                        ))}
                      </Box>

                    </TabContext>
                  </ChildCard>
                </Grid>
              </ChildCard>
            </Box>
          </Grid>
        </Grid>
      </BlankCard>

    </Box>
  );
};

export default AccountBanner;
