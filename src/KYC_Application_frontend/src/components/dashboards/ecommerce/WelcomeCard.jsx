import React from 'react';
import { Box, Avatar, Typography, Card, CardContent, Grid, Divider, Stack } from '@mui/material';
import userImg from '../../../assets/images/profile/user-1.jpg';

const WelcomeCard = () => {
  return (
    <Card elevation={0} sx={{ backgroundColor: (theme) => theme.palette.primary.light, py: 0 }}>
      <CardContent sx={{ py: 4, px: 2 }}>
        <Grid container justifyContent="space-between">
          <Grid item sm={6} display="flex" alignItems="center">
            <Box>
              <Box
                gap="16px" mb={2}
                sx={{
                  display: {
                    xs: 'block',
                    sm: 'flex',
                  },
                  alignItems: 'center',
                }}
              >
                <Avatar src={userImg} alt="img" sx={{ width: 40, height: 40 }} />
                <Typography variant="h5" whiteSpace="nowrap">
                  Welcome back Mathew Anderson!
                </Typography>
              </Box>

              <Stack spacing={2} direction="row" alignItems="flex-end " mb={2} divider={<Divider orientation="vertical" flexItem />}>
                <Box>
                  <Typography variant="h2" whiteSpace="nowrap">$2,340 <span></span></Typography>
                  <Typography variant="subtitle1" whiteSpace="nowrap">Total Balance</Typography>
                </Box>
                <Stack spacing={0.5} direction="column">
                  <Typography variant="h5" whiteSpace="nowrap">
                    Your Contribution
                  </Typography>
                  <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
                    <Box>
                      <Typography variant="h2" whiteSpace="nowrap">2.646<span></span></Typography>
                      <Typography variant="subtitle1" whiteSpace="nowrap">ETH</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h2" whiteSpace="nowrap">1.265<span></span></Typography>
                      <Typography variant="subtitle1" whiteSpace="nowrap">BTC</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h2" whiteSpace="nowrap">6.56<span></span></Typography>
                      <Typography variant="subtitle1" whiteSpace="nowrap">LTC</Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
