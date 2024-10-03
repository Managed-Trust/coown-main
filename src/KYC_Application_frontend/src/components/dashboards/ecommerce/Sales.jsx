import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Chip, Typography } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { useUser } from "../../../userContext/UserContext";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";

import ic from "ic0";

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const Sales = () => {
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });
  const navigate = useNavigate(); // Initialize navigate
  const theme = useTheme();
  const { user, setUser } = useUser();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      if (principal) {
        try {
          console.log("Principal:", principal);
          const profileResponse = await ledger.call("getUser", principal);
          setProfile(profileResponse[0]);
        } catch (e) {
          console.log("Error checking user profile:", e);
        }
      }
    };
    checkUserProfile();
  }, [principal]);

  return (
    <DashboardCard>
      <Box display="flex" flexDirection="column" alignItems="center" p={3.4}>
        <Typography variant="h4" pb={1.8} color="#253992">
          Your Account Status
        </Typography>

        {/* Chip for Email Verified */}
        {user ? (
          <Chip
            label="Email Verified"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontWeight: 600,
              mb: 1, // margin bottom for spacing
            }}
          />
        ) : (
          <Chip
            label="Guest User"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              fontWeight: 600,
              mb: 1, // margin bottom for spacing
            }}
          />
        )}

        {/* Chip for KYC Status */}
        {profile ? (
          <Chip
            label="KYC Completed"
            sx={{
              backgroundColor: theme.palette.success.main,
              color: theme.palette.common.white,
              fontWeight: 600,
            }}
          />
        ) : (
          <Chip
            label="KYC Pending"
            clickable // Makes the chip appear as a button
            onClick={() => navigate('/dashboards/modern')}
            sx={{
              backgroundColor: theme.palette.warning.main,
              color: theme.palette.common.white,
              fontWeight: 600,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: theme.palette.warning.dark,
              },
            }}
          />
        )}
      </Box>
    </DashboardCard>
  );
};

export default Sales;
