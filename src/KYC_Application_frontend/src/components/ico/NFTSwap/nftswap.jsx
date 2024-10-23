import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';

const NFTCard = ({ image, amount, packageName, discount }) => (
  <Card sx={{ maxWidth: 280, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <CardMedia
      component="img"
      height="280"
      image={image}
      alt={packageName}
    />
    <CardContent sx={{ p: 2, pb: 1 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {packageName}
      </Typography>
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
        {discount}
      </Typography>
    </CardContent>
    <CardActions sx={{ px: 2, pb: 2 }}>
      <Button 
        variant="outlined" 
        fullWidth 
        sx={{ 
          textTransform: 'none', 
          color: '#3b82f6',
          borderColor: '#3b82f6',
          '&:hover': { 
            bgcolor: 'transparent',
            borderColor: '#2563eb',
            color: '#2563eb'
          } 
        }}
      >
        Swap
      </Button>
    </CardActions>
  </Card>
);

export default function NFTSwap() {
  const nftPackages = [
    { image: '/images/nftSwapImages/Coown_10.svg', amount: 10, packageName: 'Crab package', discount: 'Airdrops and others' },
    { image: '/images/nftSwapImages/Coown_32.svg', amount: 32, packageName: 'Octopus package', discount: 'up to 60 % discount' },
    { image: '/images/nftSwapImages/Coown_66.svg', amount: 66, packageName: 'Fisch package', discount: 'up to 65 % discount' },
    { image: '/images/nftSwapImages/Coown_175.svg', amount: 175, packageName: 'Dolphin package', discount: 'up to 75% discount' },
  ];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
        Swap your NFTs for $COOWN
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: '#64748b', mb: 4 }}>
        Redeem earned NFTs for $COOWN tokens
      </Typography>
      <Grid container spacing={3}>
        {nftPackages.map((pkg, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <NFTCard
              image={pkg.image}
              amount={pkg.amount}
              packageName={pkg.packageName}
              discount={pkg.discount}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}