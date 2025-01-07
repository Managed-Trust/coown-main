import React from 'react';
import { Grid, Link, Typography, Container, Box } from '@mui/material';
import img from '../../../assets/images/logos/dark-logo.svg';
import logo from '../../../assets/images/partnerlogo/logoo1.png';
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f8f9fb',
        pt: 10,
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          {/* Left Section (Logo + Info) */}
          <Grid item xs={12} sm={6}>
            <Box mb={2} display="flex" >
              <img src={img} alt="logo" width="180px" />
            </Box>
            <Typography variant="subtitle" color="textSecondary" mb={2}>
              Team-based asset management for private groups,
              <br /> corporations, and public law entities.
            </Typography>
            <br />
            <Link href="mailto:coown@dmail.com" color="primary" underline="none">
              coown@dmail.com
            </Link>
          </Grid>

          {/* Middle Section (Resources) */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Resources
            </Typography>
            <Link href="/product" color="textSecondary" underline="none" mb={1} display="block">
              Product
            </Link>
            <Link href="/organization" color="textSecondary" underline="none" mb={1} display="block">
              Organization
            </Link>
            <Link href="/ico" color="textSecondary" underline="none" mb={1} display="block">
              Token
            </Link>
            <Link href="/pricing" color="textSecondary" underline="none" mb={1} display="block">
              Pricing
            </Link>
            <Link href="/contact-us" color="textSecondary" underline="none" mb={1} display="block">
              Contact
            </Link>
          </Grid>

          {/* Right Section (Links) */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Links
            </Typography>
            <Link href="https://coown.notion.site/COOWN-Whitepaper-2a590a104e0546cdb0fce464e0953216" target="_blank" rel="noopener noreferrer" color="textSecondary" underline="none" mb={1} display="block">
              Whitepaper
            </Link>

            <Link href="https://coown.notion.site/a8174463fc134e88b36bfaa85bb5dcba?v=ddcece06d04b43b191bee5f9067c0634" target="_blank" color="textSecondary" underline="none" mb={1} display="block">
              Brand Kit
            </Link>
            <Link href="https://coown.notion.site/Data-Privacy-Policy-9b0e10d106ee4925b53b498e9910b840" target="_blank" color="textSecondary" underline="none" mb={1} display="block">
              Data Privacy Policy
            </Link>
            <Link href="https://coown.notion.site/General-Terms-of-Service-9b5e7c4fc8f448c6b49565285b7b4e74" target="_blank" color="textSecondary" underline="none" mb={1} display="block">
              General Terms of Service
            </Link>
            <Link href="https://coown.notion.site/139e4beacc2281edada2d169544c4eb9" target="_blank" color="textSecondary" underline="none" mb={1} display="block">
              Service Help Desk
            </Link>
          </Grid>
        </Grid>
        <hr />
        {/* Bottom Copyright Section */}
        <Grid container justifyContent="center" mt={4} flexDirection="column" gap="10px">
          <Typography variant="body2" color="textSecondary" textAlign="center" fontSize="14px" fontWeight="bold">
            Powered by&nbsp;<img src={logo} style={{ width: '25px', marginTop: '5px' }} />
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center">
            Copyright © 2025 , Cookie-free
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
