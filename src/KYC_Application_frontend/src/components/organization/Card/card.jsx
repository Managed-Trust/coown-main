import React from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CodeIcon from '@mui/icons-material/Code';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';
import GroupsIcon from '@mui/icons-material/Groups';

const EntityBox = ({ icon, title, description }) => (
  <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
    <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
      {icon}
    </Avatar>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" sx={{ color: '#5A6A85' }}>
      {description}
    </Typography>
  </Paper>
);

export default function Card() {
  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', p: 4 }}>
      <Typography variant="overline" display="block" align="center" gutterBottom sx={{ color:'#5D87FF' }}>
        Decentralized Autonomous Organization
      </Typography>
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        COOWN is governed by a DAO
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ color: '#5A6A85' }}>
        Token holders elect the Foundation and approve transactions fees for performance based staking rewards.
      </Typography>

      <Box sx={{ position: 'relative', mt: 8, mb: 8 }}>
        <Typography variant="subtitle1" align="center" sx={{ position: 'absolute', top: -20, left: 0, right: 0,color: '#5A6A85' }}>
          Inner circle
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <EntityBox 
              icon={<AccountBalanceIcon />}
              title="Foundation"
              description="Governs the platform and oversees the affiliates of the consortium."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox 
              icon={<CodeIcon />}
              title="Software Developer"
              description="Maintains and develops COOWN's technology and platform features."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox 
              icon={<MonetizationOnIcon />}
              title="Treasury"
              description="Manages $COOWN tokenomics, including the distribution and allocation of funds."
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ position: 'relative', mt: 8 }}>
        <Typography variant="subtitle1" align="center" sx={{ position: 'absolute', top: -20, left: 0, right: 0, color: '#5A6A85' }}>
          Outer circle
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <EntityBox 
              icon={<BusinessIcon />}
              title="IP Holder"
              description="Managed - Trust . com LTD holds the intellectual property rights for COOWN."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox 
              icon={<LanguageIcon />}
              title="Regional Operators"
              description="Handle local compliance, KYC/AML processes, customer interaction, and manage enterprise subscriptions."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox 
              icon={<GroupsIcon />}
              title="Affiliates"
              description="Includes banking partners, software providers, and auditors that support COOWN's infrastructure."
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}