import React from 'react';
import { Box, Typography, Avatar, Grid, IconButton } from '@mui/material';

const SummaryTiles = () => {
  const data = [
    { label: 'Today', value: '-$350', trend: 'negative' },
    { label: 'This week', value: '+$1,350', trend: 'positive' },
    { label: 'This month', value: '+$4,500', trend: 'positive' }
  ];


  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
      {data.map((item, index) => (
        <Grid container alignItems="center" key={index} sx={{ textAlign: 'center' }}>
          <Grid item xs={12}>
            <Typography variant="body1">{item.label}</Typography>
            <Typography variant="h4" sx={{ color: item.trend === 'positive' ? 'green' : 'red' }}>
              {item.value}
            </Typography>
          </Grid>
         
        </Grid>
      ))}
    </Box>
  );
};

export default SummaryTiles;
