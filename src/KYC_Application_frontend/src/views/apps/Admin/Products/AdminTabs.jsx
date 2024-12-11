import React from 'react';
import { Tabs, Tab, Box, Card } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const AdminTabs = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const ProfileTabs = [
    {
      label: 'Overview',
      to: '/pages/admin-dashboard',
    },
    {
      label: 'Localization',
      to: '/pages/admin-localization',
    },
    {
      label: 'Transaction Fees',
      to: '/pages/admin-fees',
    },
    {
      label: 'Products',
      to: '/pages/admin-products',
    },
    {
      label: 'Management',
      to: '/pages/admin-management',
    }
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
                sx={{ minHeight: '60px' }}
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

export default AdminTabs;
