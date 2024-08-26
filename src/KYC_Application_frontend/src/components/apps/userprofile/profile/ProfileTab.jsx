import React from 'react';
import { Tabs, Tab, Box,Card } from '@mui/material';
import { IconHeart, IconUserCircle,IconSettings,
  IconAperture,
  IconWallet,
  IconUsers,
  IconAddressBook,
  
 } from '@tabler/icons';
import { Link, useLocation } from 'react-router-dom';

const ProfileTab = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ProfileTabs = [
    {
      label: 'Dashboard',
      icon: <IconAperture size="20" />,
      to: '/user-profile',
    },
    {
      label: 'Personal Account',
      icon: <IconWallet size="20" />,
      to: '/apps/followers',
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
      to: '/user-referral',
    },
    {
      label: 'Settings',
      icon: <IconSettings size="20" />,
      to: '/apps/settings',
    },
  ];

  return (
    <Box mt={1} sx={{ mt: 1, backgroundColor: 'white' }}>
      <Card justifyContent={'start'} display="flex" style={{paddingBottom:"0px"}} sx={{ overflow: 'auto', width: { xs: '333px', sm: 'auto' } }}>
        <Tabs value={value} onChange={handleChange} aria-label="scrollable prevent tabs example" variant="scrollable"
          scrollButtons="auto">
          {ProfileTabs.map((tab) => {
            return (
              <Tab
                iconPosition="start"
                label={tab.label}
                sx={{ minHeight: '50px' }}
                icon={tab.icon}
                component={Link}
                to={tab.to}
                value={tab.to}
                key={tab.label}
              />
            );
          })}
        </Tabs>
      </Card>
    </Box>
  );
};

export default ProfileTab;
