import React from 'react';
import { Grid, Link, Typography, Container, Box } from '@mui/material';
import img from '../../../assets/images/landingpage/Vector.svg';
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
              <img src={img} alt="logo" style={{ width: '80px' }} />
              <Typography variant='h1' m={2} >COOWN</Typography>
            </Box>
            <Typography variant="subtitle" color="textSecondary" mb={2}>
              Team-based asset management for private groups,
              <br /> corporations, and public law entities.
            </Typography>
            <br />
            <Link href="mailto:info@co-own.com" color="primary" underline="none">
              info@co-own.com
            </Link>
          </Grid>

          {/* Middle Section (Resources) */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Resources
            </Typography>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Product
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Organization
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              ICO
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Pricing
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Contact
            </Link>
          </Grid>

          {/* Right Section (Links) */}
          <Grid item xs={6} sm={3}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Links
            </Typography>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Whitepaper
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Investor Pitch
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Know-How Library
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              Partner Policies
            </Link>
            <Link href="#" color="textSecondary" underline="none" mb={1} display="block">
              User Policies
            </Link>
          </Grid>
        </Grid>
        <hr />
        {/* Bottom Copyright Section */}
        <Grid container justifyContent="center" mt={4} flexDirection="column" gap="10px">
          <Typography variant="body2" color="textSecondary" textAlign="center" fontSize="14px" fontWeight="bold">
            Powred by&nbsp;<img src={logo} style={{ width: '25px',marginTop:'5px' }}/>
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center">
            Copyright © 2024 , cookie-free
          </Typography>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
