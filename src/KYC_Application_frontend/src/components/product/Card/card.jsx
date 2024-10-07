import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Container } from '@mui/material';
import img from '../../../assets/images/products/Frame1.png';

const EntityBox = ({ title }) => (
  <Paper
    elevation={3}
    sx={{
      padding: '15px 5px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: 2,
    }}
  >
    <Avatar
      alt={title}
      src={img}
      sx={{ width: 60, height: 60, mb: 2 }}
    />
    <Typography variant="h6" sx={{ margin: '10px 0' }} gutterBottom>
      {title}
    </Typography>
  </Paper>
);

export default function Card() {
  return (
    <Container sx={{mt: 15, mb:15 }}>
    <Box>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        COOWN empowers individuals and <br /> businesses to
      </Typography>
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Identification" />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Corporate governance" />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Transactions regulation" />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Digital asset management" />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Custom assets creation" />
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Container>
  );
}
