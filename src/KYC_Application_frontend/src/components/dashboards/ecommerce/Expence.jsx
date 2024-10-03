import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { Wallet } from '@mui/icons-material'; // You can use any suitable icon
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";

import ic from "ic0";
const Expence = () => {
  const theme = useTheme();
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });

  return (
    <DashboardCard>
      <Box display="flex" flexDirection="column" alignItems="center" py={2.8} gap="19px">
        <Typography variant="h5" mt={1} textAlign="center">
          Connect Your Wallet
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <ConnectButton />
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default Expence;
