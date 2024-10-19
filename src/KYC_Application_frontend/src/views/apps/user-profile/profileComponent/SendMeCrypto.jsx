import React from 'react';
import { Box, Typography, Grid, Paper, Stack } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

// Placeholder data for the supported currencies
const cryptoData = [
  { name: 'USD', symbol: 'ckUSDC', color: '#00D68F' },
  { name: 'Bitcoin', symbol: 'ckBTC', color: '#8E44AD' },
  { name: 'Gold', symbol: 'ckXAUt', color: '#F39C12' },
  { name: 'ICP', symbol: 'ICP', color: '#5B2C6F' },
];

const SendMeCrypto = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: '12px' }}>
      <Grid container spacing={2}>
        {/* Left Side - Crypto Details */}
        <Grid item xs={12} md={8}>
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Send me crypto
            </Typography>
            <Typography variant="body2" gutterBottom>
              Send me crypto assets on the <strong>ICP Network.</strong> It is fast, cost-efficient, and secure. Transaction fees apply*.
            </Typography>

            {/* Supported Currencies */}
            <Stack direction="row" spacing={2} mt={2}>
              {cryptoData.map((crypto) => (
                <Box key={crypto.symbol} textAlign="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: crypto.color,
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    {/* Icon Placeholder */}
                    <Typography variant="h6" color="white">
                      {crypto.symbol[0]}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">
                    {crypto.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {crypto.symbol}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Important Message */}
            <Paper sx={{ backgroundColor: '#E8F4FF', mt: 3, p: 2, borderRadius: '8px' }}>
              <Typography variant="body2" color="primary">
                Make sure to select <strong>ICP network</strong> when you send funds. If you transact on the wrong network, your funds may be difficult to recover, and can get lost.
              </Typography>
            </Paper>
          </Box>
        </Grid>

        {/* Right Side - QR Code */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center" alignItems="center">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <QRCodeCanvas value="https://your-crypto-wallet-link.com" size={150} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SendMeCrypto;
