import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import bank from '../../../assets/images/svgs/bank.svg';
import code from '../../../assets/images/svgs/code-snippet-02.svg';
import crypto from '../../../assets/images/svgs/cryptocurrency-04.svg';
import certificate from '../../../assets/images/svgs/certificate-01.svg';
import globe from '../../../assets/images/svgs/globe-05.svg';
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
      100% free transactions
      </Typography>
      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
      Get free transactions with Enterprise Edition
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ color:"#5A6A85",fontSize:'16px' }}>
      With Enterprise edition you will get 365 free transactions for each currency per year. Transaction exceeding the limit will cost the regular fee starting  from 0.008 USD to around 0.05 USD.  Higher fees apply to larger transactions exceeding the value of  10 000 USD.
      </Typography>
     <Link> <Typography variant="body2" display="block" align="center" gutterBottom sx={{fontSize:'14px', color: '#5D87FF' }}>
      Learn more
      </Typography>
      </Link>
    </Box>
  );
}