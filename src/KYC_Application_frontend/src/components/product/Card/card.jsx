import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Container } from '@mui/material';
import img1 from '../../../assets/images/products/Frame1.png';
import img2 from '../../../assets/images/svgs/Frame11.svg';
import img3 from '../../../assets/images/svgs/Frame13.svg';
import img4 from '../../../assets/images/svgs/btc-pic.svg';
import img5 from '../../../assets/images/svgs/Frame12.svg';

const EntityBox = ({ title,icon}) => (
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
      src={icon}
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
        fontSize='36px'
        lineHeight='44px'
        gutterBottom
        sx={{ fontWeight: 'bold' }}
      >
        COOWN empowers individuals and <br /> businesses to
      </Typography>
      <Box sx={{ mt: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Identification" icon={img1} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Corporate governance"  icon={img2} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Transactions regulation"  icon={img3} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Digital asset management"  icon={img4} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <EntityBox title="Custom assets creation"  icon={img5} />
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Container>
  );
}
