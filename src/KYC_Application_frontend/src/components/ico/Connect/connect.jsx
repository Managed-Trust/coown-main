import React from 'react';
import { Box, Button, Typography, Card, CardContent, useMediaQuery, useTheme } from '@mui/material';

export default function Connect() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect mobile view

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 4,
      }}
    >
      <Card sx={{ maxWidth: 1000, bgcolor: '#F8F6FF', borderRadius: 3, width: '100%' }}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'space-between', // Center content on mobile
            flexDirection: isMobile ? 'column' : 'row', // Column layout for mobile
            gap: isMobile ? 2 : 0, // Add gap between elements on mobile
            p: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'column' : 'row' }}>
            <Box
              sx={{
                display: 'flex',
                mr: isMobile ? 0 : 2, // Adjust margin for mobile
                mb: isMobile ? 2 : 0, // Add margin bottom on mobile
                gap: '10px',
              }}
            >
              <img src="/images/logos/icp_pic.svg" alt="ICP Logo" />
              <img src="/images/logos/plug_pic.svg" alt="Plug Wallet Logo" />
            </Box>
            <Box textAlign={isMobile ? 'center' : 'left'}> {/* Center text on mobile */}
              <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                Connect with Internet Identity or Plug Wallet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Your $COOWN will be saved to this wallet, and may remain hidden initially
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#36304A',
              '&:hover': { bgcolor: '#2A2438' },
              borderRadius: '50px',
              width: isMobile ? '100%' : 'auto', // Full width button on mobile
            }}
          >
            Connect
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
