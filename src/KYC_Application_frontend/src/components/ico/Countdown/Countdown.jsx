import React, { useState, useEffect } from 'react';
import { Container,Grid, Box, Typography, Button } from '@mui/material';

const Countdown = () => {
  // Set initial time for the countdown (e.g., 1 day, 12 hours, 35 minutes, and 41 seconds from now)
  const targetDate = new Date().getTime() + 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 35 * 60 * 1000 + 41 * 1000;

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear timer if the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f0f4fa', padding: '30px', borderRadius: '8px' }}>

      <Container maxWidth="lg">
        <Grid container  spacing={2} >
          <Grid item xs={6}>
            <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
              Next token sale phase starts in
            </Typography>           
          </Grid>
          <Grid item   xs={6} >
            <Grid container spacing={1} alignItems="center">
              <Grid item sx={{ marginRight: '20px' }}>
                <Typography variant="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {timeLeft.days}
                </Typography>
                <Typography variant="body2" align="center">
                  Days
                </Typography>
              </Grid>
              <Grid item sx={{ marginRight: '20px' }}>
                <Typography variant="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {timeLeft.hours}
                </Typography>
                <Typography variant="body2" align="center">
                  Hours
                </Typography>
              </Grid>
              <Grid item sx={{ marginRight: '20px' }}>
                <Typography variant="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {timeLeft.minutes}
                </Typography>
                <Typography variant="body2" align="center">
                  Minutes
                </Typography>
              </Grid>
              <Grid item sx={{ marginRight: '20px' }}>
                <Typography variant="h1" sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                  {timeLeft.seconds}
                </Typography>
                <Typography variant="body2" align="center">
                  Seconds
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Countdown;
