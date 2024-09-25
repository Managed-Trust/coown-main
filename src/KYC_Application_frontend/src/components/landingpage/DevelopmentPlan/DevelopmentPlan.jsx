import React from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';

const developmentSteps = [
  {
    number: '1',
    title: 'Minimum Viable Product',
    description: 'Launch the basic version of COOWN with essential group-centric wallet functionalities and security protocols.',
  },
  {
    number: '2',
    title: 'Financing & ICO',
    description: 'Initiate the ICO phase to fund the development of COOWN, expand the ecosystem through token distribution, and attract grants and venture capital.',
  },
  {
    number: '3',
    title: 'Regional Operators & Distribution',
    description: 'Establish partnerships with regional operators for decentralized distribution and local support in key markets.',
  },
  {
    number: '4',
    title: 'Advanced Features & Marketplaces',
    description: 'Introduce advanced features, automation tools, and a marketplace for NFTs and expanded digital asset management capabilities.',
  },
];

const DevelopmentPlan = () => {
  return (
    <Box mt={5} mb={5}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Typography
          variant="body1"
          sx={{ color: '#5D87FF', textAlign: 'center', fontWeight: 'bold' }}
          mb={1}
        >
          Our roadmap
        </Typography>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={700}
          mb={4}
        >
          Development plan
        </Typography>

        {/* Development Plan Grid */}
        <Grid container spacing={4}>
          {developmentSteps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: '12px',
                  height: '100%',
                }}
              >
                <Typography
                  variant="h3"
                  fontWeight={700}
                  color="#5D87FF"
                  mb={2} textAlign={'start'}
                >
                  {step.number}
                </Typography>
                <Typography variant="h6" fontWeight={600} textAlign={'start'} mb={2}>
                  {step.title}
                </Typography>
                <Typography variant="body2" textAlign={'start'} color="textSecondary">
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

export default DevelopmentPlan;
