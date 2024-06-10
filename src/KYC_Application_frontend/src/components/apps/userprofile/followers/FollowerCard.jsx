import {
  CardContent,
  Box,
  Stack,
  Grid,
  Button,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Avatar,
  Tab,
  Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import BlankCard from '../../../../components/shared/BlankCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFollwores, onToggleFollow } from '../../../../store/apps/userProfile/UserProfileSlice';
import { IconMapPin, IconSearch } from '@tabler/icons';

const TwoFactorAuthCard = ({ title, description, status }) => (
  <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
    <Box mb={2}>
      <Typography variant="h5">{title}</Typography>
    </Box>
    <Box mb={2}>
      <Typography variant="body">{description}</Typography>
    </Box>
    <Box mb={2}>
      <Button variant="contained" color="primary">
        Enable {title}
      </Button>
    </Box>
    <Box mt={1}>
      <Typography variant="caption">
        CURRENT STATUS:&nbsp; <Chip label={status} color={status === 'ENABLED' ? 'primary' : 'default'} />
      </Typography>
    </Box>
  </Paper>
);

const AuthSettings = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <Box>
      <Tabs value={currentTab} onChange={handleChange} centered>
        <Tab label="2FA" />
        <Tab label="3FA" />
      </Tabs>

      <TabPanel value={currentTab} index={0}>
        <TwoFactorAuthCard
          title="Two-Factor Authentication"
          description="Two-factor authentication is a method for protecting your web account. When it is activated you need to enter not only your password, but also a special code. You can receive this code in your mobile app. Even if a third person will find your password, they can't access with that code."
          status="DISABLED"
        />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <TwoFactorAuthCard
          title="Three-Factor Authentication"
          description="Three-factor authentication adds an extra layer of security. In addition to your password and a special code from your mobile app, you will need to verify a third factor, such as a biometric scan or a security token."
          status="DISABLED"
        />
      </TabPanel>
    </Box>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

export default AuthSettings;
