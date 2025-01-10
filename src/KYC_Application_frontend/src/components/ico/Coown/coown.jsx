import React from 'react';
import { Typography, Grid, Box } from '@mui/material';

export default function COOWN() {
  return (
    // Center the content on the page
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh', // Full viewport height
        paddingX: 2,  // Padding from the left and right
        paddingY: 2,  // Padding on top and bottom
        bgcolor: '#f9fafb', // Light background for better contrast
      }}
    >
      {/* Container for the content */}
      <Box
        sx={{
          maxWidth: '1200px', // Maximum width for large screens
          width: '100%',
        }}
      >
        <Grid container spacing={{ xs: 4, sm: 10 }} alignItems="center">
          {/* First Column */}
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: '10px' }}>
              <img src="/images/logos/coown-logo.svg" alt="$COOWN Logo" style={{ width: '50px' }} />
              <Typography variant="h2" component="div" sx={{ fontWeight: 'bold', fontSize: '36px' }}>
                $COOWN
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} fontSize="16px" lineHeight="24px" textAlign="justify">
              Exchange of $COOWN token is locked during the crowdfunding and presale stages. The initial exchange offering is planned in Q2-Q3, 2025. Exchange of $COOWN token is locked during the crowdfunding and presale stages.
            </Typography>
          </Grid>

          {/* Second Column */}
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Price
            </Typography>
            <Typography variant="h2" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
              $0.50
            </Typography>

            <Grid container spacing={1} rowSpacing={1.5}>
              {[
                { label: 'Token Name', value: '$COOWN' },
                { label: 'Maximum Supply', value: '10,000,000' },
                { label: 'Inflation', value: 'No' },
                { label: 'Burning', value: 'No' },
                { label: 'Staking Rewards', value: 'Yes, performance-based' },
                { label: 'Decentralization', value: 'Increasing' },
                { label: 'Technology', value: 'ICP (layer 2, ICRC-2)' }
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary" fontSize="16px">
                      {item.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" fontSize="16px" fontWeight="600">
                      {item.value}
                    </Typography>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
