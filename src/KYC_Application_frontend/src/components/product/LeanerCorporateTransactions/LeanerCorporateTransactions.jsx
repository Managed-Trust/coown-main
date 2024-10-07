import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText,Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FeatureItem = ({ title, description }) => (
  <Box mb={3}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', mb:1 }}>
      {title}
    </Typography>
    <Typography sx={{fontSize:'13px'}} color="textSecondary">
      {description}
    </Typography>
  </Box>
);

export default function LeanerCorporateTransactions() {
  return (
    <Container sx={{ p: 4, mt: 10 , mb:10 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography
            variant="h2"
            sx={{ fontWeight: 'bold'}}
          >
            Robust on-chain system for leaner corporate transactions
          </Typography>
          <List>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Enterprise grade crypto wallets" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Scalable stakeholder involvement" />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Fast, secure, compliant and efficient" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureItem
            title="On-chain System"
            description="Fully on-chain, ensuring a hackerproof environment with robust interoperability."
          />
          <FeatureItem
            title="Free third-party Involvement"
            description="Allows clients, suppliers, and other third parties to participate without extra costs."
          />
          <FeatureItem
            title="Elevated privacy"
            description="Non-custodial control, providing encryption and privacy for user data."
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <FeatureItem
            title="Freemium Business Model"
            description="Essential features available for free and low maintenance fees."
          />
          <FeatureItem
            title="KYC & AML Compliant"
            description="Integrated Know Your Customer (KYC) and Anti-Money Laundering (AML) protocols, ensuring compliance"
          />
          <FeatureItem
            title="Legacy Integration"
            description="Can be implemented alongside older technologies, ensuring smooth transitions."
          />
        </Grid>
      </Grid>
    </Container>
  );
}
