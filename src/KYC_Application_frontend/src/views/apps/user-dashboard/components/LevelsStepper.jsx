import React from 'react';
import { Paper, Stepper, Grid, Slider, Typography, Box } from '@mui/material';

const levels = [
    {
        label: 'Level 1',
        title: 'Sign up',
        description: 'Sign up with your personal email',
    },
    {
        label: 'Level 2',
        title: 'Become a viewer of a group',
        description: 'Accept invitation to become a group viewer',
    },
    {
        label: 'Level 3',
        title: 'Become group owner',
        description: 'Complete KYC verification and connect with your Internet Identity to get your first free group',
    },
    {
        label: 'Level 4',
        title: 'Upgrade your plan',
        description: 'Add enterprise edition features to your groups',
    },
    {
        label: 'Level 5',
        title: 'Become a contributor',
        description: 'Support the platform maintenance',
    },
];

const VerticalSlider = () => {
  return (
    <Box sx={{ height: { xs: '300px', sm: '450px' } }}>
      <Slider
        orientation="vertical"
        defaultValue={3}
        step={1}
        min={0}
        max={4}
        valueLabelDisplay="auto"
        track="inverted"
        sx={{
          height: { xs: '300px', sm: '450px' }, // Responsive height for slider
        }}
      />
    </Box>
  );
};

const LevelsStepper = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        paddingBottom:'35px !important',
        p: { xs: 2, sm: 3 }, // Responsive padding
        maxWidth: { xs: '100%', sm: '400px' },
        margin: '50px auto 10px auto',
        borderRadius: '8px',
      }}
    >
      <Grid container display={'flex'} spacing={2}>
        {/* Vertical Slider */}
        <Grid item xs={2}>
          <VerticalSlider />
        </Grid>

        {/* Stepper with levels */}
        <Grid item xs={10}>
          <Stepper activeStep={-1} orientation="vertical">
            {levels.map((level, index) => (
              <Box key={index} sx={{mb:{xs:1, sm: 2}  }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', color: '#007BFF', fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                  {level.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: '600', fontSize: { xs: '0.875rem', sm: '1rem' } }}
                >
                  {level.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'textSecondary', fontSize: { xs: '0.75rem', sm: '0.875rem' }, mb: {xs:1, sm: 2} }}
                >
                  {level.description}
                </Typography>
              </Box>
            ))}
          </Stepper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LevelsStepper;
