import React from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';

const steps = [
  {
    number: '1',
    title: 'Sign up and connect your personal wallet',
    description: 'Empower your team with features designed to simplify collective financial management.',
  },
  {
    number: '2',
    title: 'Create a group wallet',
    description: 'Empower your team with features designed to simplify collective financial management.',
  },
  {
    number: '3',
    title: 'Invite your team and set spending limits',
    description: 'Empower your team with features designed to simplify collective financial management.',
  },
  {
    number: '4',
    title: 'Upgrade your group to legal entity status',
    description: 'Empower your team with features designed to simplify collective financial management.',
  },
  {
    number: '5',
    title: 'Digitize company shares for voting and distributing dividends',
    description: 'Empower your team with features designed to simplify collective financial management.',
  },
  {
    number: '6',
    title: 'Mint and certify custom NFTs as securities, such as commodities.',
    description: 'Empower your team with features designed to simplify collective financial management.',
  },
];

const QuickStartGuide = () => {
  return (
    <Box mt={10} mb={5}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Typography
          variant="body1"
          sx={{ color: '#5D87FF', textAlign: 'center', fontWeight: 'bold' }}
          mb={1}
        >
          Simple and effective
        </Typography>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
        >
          Quick Start Guide
        </Typography>

        {/* Steps Grid */}
        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'left',
                  borderRadius: '12px',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="#5D87FF"
                  mb={1}
                >
                  {step.number}
                </Typography>
                <Typography variant="h6" fontWeight={600} mb={1}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default QuickStartGuide;
