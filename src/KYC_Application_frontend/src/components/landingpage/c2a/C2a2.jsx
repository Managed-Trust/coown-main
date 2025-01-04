import React from 'react';
import { Grid, Typography, Box, Button, styled, Container, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

import c2aImg from '../../../assets/images/landingpage/background/c2a.png';
import GuaranteeCard from './GuaranteeCard';

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  fontWeight: 600,
  borderRadius: '12px',
}));

const StyledButton2 = styled(Button)(({ theme }) => ({
  padding: '13px 34px',
  fontSize: '16px',
  border: '1px solid white', // Ensure the border is solid and white
  color: 'white', // Text color is white
  fontWeight: 600,
  backgroundColor: 'transparent', // Transparent background
  borderRadius: '12px',
  '&:hover': {
    backgroundColor: theme.palette.background.paper, // Slightly opaque white background on hover
    color: theme.palette.primary.main, // Primary color on hover
  },
}));


const C2a2 = () => {
  return (
    <Box bgcolor='#f8f9fb'>
      <Box
        bgcolor="primary.main"
        sx={{
          pt: '60px',
          pb: '30px',
        }}
      >
        <Container maxWidth="lg">
          <Grid container justifyContent="space-between" spacing={3}>
            <Grid item xs={12} sm={12} lg={5}>
              <Typography variant="h2" color="background.paper" fontWeight={700} mt={4}>
              Streamline asset management and collaborate across your teams and organizations
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={3}>
                <StyledButton variant="contained" color="inherit" component={NavLink} to="/contact-us">
                  Contact now
                </StyledButton>
                <StyledButton2 variant="contained" color="inherit" component={NavLink} to="/contact-us">
                  Get in touch
                </StyledButton2>
              </Stack>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Box
                sx={{
                  textAlign: {
                    xs: 'center',
                    lg: 'right',
                  },
                }}
              >
                <img src={c2aImg} alt="img" width="330" />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <GuaranteeCard />
      </Container>
    </Box>
  );
};

export default C2a2;
