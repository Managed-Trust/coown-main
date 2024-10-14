import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Card = ({ title, value, unit }) => (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="body" color="#7C8FAC">
        {title}
      </Typography>
      <Typography variant="h3" sx={{ mt: 0.5 }}>
        {value}
        {unit && (
          <Typography component="span" mx={0.2} variant="body2" fontWeight={'bold'} color="textSecondary">
            {unit}
          </Typography>
        )}
      </Typography>
    </Paper>
  );
  
  // InfoCard component that displays the user's groups, personal funds, managed funds, and contacts
  const InfoCard = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card title="Your groups" value="4" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card title="Personal funds" value="5 000" unit="USD" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card title="Managed funds" value="25 000" unit="USD" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card title="Contacts" value="50" />
          </Grid>
        </Grid>
      </Box>
    );
  }

export default InfoCard;
