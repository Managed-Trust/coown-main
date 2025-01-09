import React from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';

const steps = [
  {
    number: '1',
    title: 'Sign up ',
    description: 'Sign up using your personal email, complete the Know-Your-Customer (KYC) process for individuals. As invited user you may participate in the chat.',
  },
  {
    number: '2',
    title: 'Create a group wallet ',
    description: 'Connect with the identity provided for Internet Computer Protocol (ICP), to enable your personal and group wallets.',
  },
  {
    number: '3',
    title: 'Setup your group',
    description: 'Invite people to your group, set spending limits for users, add funds, make transactions, chat, and check reports.',
  },
  {
    number: '4',
    title: 'Upgrade for onboarding legal entities',
    description: 'Purchase an annual enterprise license for adding additional groups and to set up one as legal entity for which the KYC is repeated.  ',
  },
  {
    number: '5',
    title: 'Maintain the shareholder book',
    description: 'Optionally you can create email based shareholder records to enable voting which will allow you to limit the transaction power of administrators and executives.',
  },
  {
    number: '6',
    title: 'Mint and market custom NFT series',
    description: 'In later releases, we plan to enable the minting of NFT series by offering legal reviews, technical support, and by operating regional market places.',
  },
];

const QuickStartGuide = () => {
  return (
    <Box mt={10} mb={5}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Typography
          variant="body1"
          sx={{ color: '#5D87FF', textAlign: 'center', fontWeight: '600',fontSize:'16px' }} 
          mb={1}
        >
          Simple and effective
        </Typography>
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight={700}
          mb={4}
          fontSize='36px'
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
                  fontWeight={600}
                  fontSize='30px'
                  color="#5D87FF"
                  mb={2}
                >
                  {step.number}
                </Typography>
                <Typography variant="h4" fontWeight={600} mb={1} fontSize='18px'>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="#5A6A85" lineHeight={1.3} sx={{fontSize:'16px'}}> 
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
