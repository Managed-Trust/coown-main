import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Paper, Tooltip, Avatar } from '@mui/material';
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
    <Typography variant="body2" sx={{ color: '#5A6A85', fontSize: '13px' }}>
      {description}
    </Typography>
  </Paper>
);

export default function Card() {
  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', p: 4 }}>
      <Tooltip
        title={
          <Box
            sx={{
              textAlign: "left",
              color: "#fff",
              padding: 2,
              borderRadius: 1,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
              Regular transaction fees
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">ICP</Typography>
              <Typography variant="body2">0.0005 ICP</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">ckBTC</Typography>
              <Typography variant="body2">0.000005 ckBTC</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">GLDT</Typography>
              <Typography variant="body2">0.005 GLDT</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">ckUSDC</Typography>
              <Typography variant="body2">0.05 ckUSDC</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2">$COOWN</Typography>
              <Typography variant="body2">0.025 $COOWN</Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Transactions &lt; 9,999 USD: 25.- USD per transaction
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "#fff", mt: 0.5 }}
            >
              (~1.- USD for transactions rejected by the operator)
            </Typography>
          </Box>
        }
        arrow
      >
        <Typography variant="body2" display="block" align="center" gutterBottom sx={{ fontSize: '14px', color: '#5D87FF', fontWeight: '600' }}>
          100% free transactions
        </Typography>
      </Tooltip>

      <Typography variant="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        Get free transactions with Enterprise Edition
      </Typography>
      <Typography variant="p2" align="center" paragraph sx={{ color: "#5A6A85", fontSize: '16px' }}>
        With Enterprise edition you will get 365 free transactions for each currency per year. Transaction exceeding the limit will cost the regular fee starting  from 0.008 USD to around 0.05 USD.  Higher fees apply to larger transactions exceeding the value of  10 000 USD.
      </Typography>
      <Link> <Typography variant="body2" display="block" align="center" gutterBottom sx={{ fontSize: '14px', color: '#5D87FF', fontWeight: '600' }}>
        Learn more
      </Typography>
      </Link>
    </Box>
  );
}