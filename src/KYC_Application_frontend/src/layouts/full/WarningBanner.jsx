import React from 'react';
import { Box, Typography } from '@mui/material';

export default function WarningBanner() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: 'yellow', // Equivalent to bg-yellow-400
      }}
    >
      {/* Diagonal stripes pattern */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0, // Equivalent to absolute inset-0
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #000 0px,
            #000 10px,
            #fbbf24 10px,
            #fbbf24 20px
          )`,
        }}
      />

      {/* Text content */}
      <Box
        sx={{
          position: 'relative',
          py: 1, // Equivalent to py-2
          px: 4, // Equivalent to px-4
          textAlign: 'center', // Equivalent to text-center
        }}
      >
        <Typography
          component="p"
          sx={{
            color: 'white', // Equivalent to text-white
            fontWeight: '500', // Equivalent to font-medium
            display: 'inline-block',
            backgroundColor: 'black', // Equivalent to bg-black
            px: 2, // Equivalent to px-4
            py: 0, // Equivalent to py-1
            fontSize: { xs: '0.875rem', md: '1rem' }, // Equivalent to text-sm md:text-base
          }}
        >
          Prototype mode - for testing only!
        </Typography>
      </Box>
    </Box>
  );
}
