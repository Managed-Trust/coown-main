import React from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import bank from '../../../assets/images/svgs/bank.svg';
import code from '../../../assets/images/svgs/code-snippet-02.svg';
import crypto from '../../../assets/images/svgs/cryptocurrency-04.svg';
import certificate from '../../../assets/images/svgs/certificate-01.svg';
import globe from '../../../assets/images/svgs/Icon.svg';
import dataflow from '../../../assets/images/svgs/dataflow-04.svg';

const EntityBox = ({ icon, title, description }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '16px',
    }}
  >
    <Avatar
      src={icon}
      sx={{ width: 40, height: 40, mb: 2, bgcolor: 'white', border: '1px solid #DFE5EF', p: 1 }}
      variant="circular"
    />
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: '#5A6A85', fontSize:'13px' }}>
      {description}
    </Typography>
  </Paper>
);

export default function Card() {
  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', p: 4 }}>
      <Typography variant="body2" display="block" align="center" gutterBottom sx={{fontSize:'14px', color: '#5D87FF' }}>
        Decentralized Autonomous Organization
      </Typography>
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        COOWN is governed by a DAO
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ color:"#5A6A85",fontSize:'16px' }}>
        Token holders elect the Foundation and approve transactions fees for performance based staking rewards.
      </Typography>

      <Box sx={{ position: 'relative', mt: 8, mb: 8 }}>
        <Typography variant="subtitle1" align="center" sx={{ position: 'absolute', top: -20, left: 0, right: 0, color: '#5A6A85', fontSize:'16px' }}>
          Inner circle
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={bank}
              title="Foundation"
              description="Governs the platform and oversees the affiliates of the consortium."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={code}
              title="Software Developer"
              description="Maintains and develops COOWN's technology and platform features."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={crypto}
              title="Treasury"
              description="Manages $COOWN tokenomics, including the distribution and allocation of funds."
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ position: 'relative', mt: 8 }}>
        <Typography variant="subtitle1" align="center" sx={{ position: 'absolute', top: -20, left: 0, right: 0, color: '#5A6A85', fontSize:'16px' }}>
          Outer circle
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={certificate}
              title="IP Holder"
              description="Managed - Trust . com LTD holds the intellectual property rights for COOWN."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={globe}
              title="Regional Operators"
              description="Handle local compliance, KYC/AML processes, customer interaction, and manage enterprise subscriptions."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={dataflow}
              title="Affiliates"
              description="Includes banking partners, software providers, and auditors that support COOWN's infrastructure."
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}