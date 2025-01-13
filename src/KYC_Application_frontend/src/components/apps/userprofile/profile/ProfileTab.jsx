import React from 'react';
import { Tabs, Tab, Box, Card } from '@mui/material';
import {
  IconHeart, IconUserCircle, IconSettings,
  IconAperture,
  IconWallet,
  IconUsers,
  IconAddressBook,

} from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';

const ProfileTab = ({ profile }) => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const isSettingsDisabled =
    !profile || // Covers null, undefined, or falsy profile
    (profile.role === 'fullapplicant' && !profile.verified && profile.decline_reason?.length !== 0);

  console.log("Profile in GroupDetailPage", profile)
  const ProfileTabs = [
    {
      label: 'Dashboard',
      icon: <IconAperture size="20" />,
      to: '/app/user-dashboard',
    },
    {
      label: 'Personal Account',
      icon: <IconWallet size="20" />,
      to: '/app/user-accounts',
    },
    {
      label: 'Groups',
      icon: <IconUsers size="20" />,
      to: '/apps/gallery',
    },
    {
      label: 'Contact',
      icon: <IconAddressBook size="20" />,
      to: '/apps/friends',
    },
    {
      label: 'Profile',
      icon: <IconUserCircle size="20" />,
      to: '/user-profile',
    },
    {
      label: 'Referral',
      icon: <IconHeart size="20" />,
      to: '/referral',
    },
    {
      label: 'Settings',
      icon: <IconSettings size="20" />,
      to: '/apps/user-setting',
      disabled: isSettingsDisabled,
    },
  ];

  return (
    <Box mt={1} sx={{ mt: 1, backgroundColor: 'white' }}>
      <Card justifyContent={'start'} display="flex" style={{ paddingBottom: "0px" }} sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
        <Tabs value={value} onChange={handleChange} aria-label="scrollable prevent tabs example" variant="scrollable"
          scrollButtons="auto">
          {ProfileTabs.map((tab) => {
            return (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{
                  minHeight: '50px',
                  color: tab.disabled ? 'gray' : 'black', // Lighter color for disabled tabs
                  cursor: tab.disabled ? 'not-allowed' : 'pointer', // Change cursor for disabled tabs
                  opacity: tab.disabled ? 0.5 : 1, // Reduce opacity for disabled tabs
                  paddingBottom:'25px',
                }}

                component={Link}
                to={tab.to}
                value={tab.to}
                key={tab.label}
                disabled={tab.disabled} // Disable the tab if the condition is true
              />
            );
          })}
        </Tabs>
      </Card>
    </Box>
  );
};

export default ProfileTab;
