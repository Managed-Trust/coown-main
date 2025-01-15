import React from 'react';
import { Box, CardContent, Button, TextField, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SavingsImg from '../../../../assets/images/backgrounds/piggy.png';
import { CopyAll as CopyIcon } from '@mui/icons-material';

const ResellerProgramCard = () => {
  const theme = useTheme();
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://co-own.com/affiliate/i94hf8f2h3h");
    alert('Link copied to clipboard!');
  };
  const borderColor = theme.palette.grey[100];

  return (
    <Paper
      sx={{
        bgcolor: 'primary.main',
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" color="white" sx={{ fontSize:"18px", fontWeight:"600" }}>
          Reseller Program
        </Typography>
        <Typography
          variant="subtitle1"
          color="white"
          mb={1}
          sx={{ fontSize: '14px', fontWeight: '400' }}
        >
          Invite your friends and get rewards
        </Typography>

        {/* Image section with responsive size */}
        <Box textAlign="center" mt={1} mb={{ xs: '-50px', sm: '-100px' }}>
          <img
            src={SavingsImg}
            alt="Savings"
            style={{ maxWidth: '100%', height: 'auto' }}
            width="300px"
          />
        </Box>
      </CardContent>

      <Paper
        sx={{
          overflow: 'hidden',
          zIndex: 1,
          position: 'relative',
          margin: { xs: '8px', sm: '14px' }, // Responsive margin for the inner content
          borderRadius: '8px',
        }}
      >
        <CardContent
          sx={{
            padding: { xs: '12px', sm: '16px' }, // Adjust padding for smaller screens
            backgroundColor: '#FFFFFF',
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
            gutterBottom
            fontSize="16px" 
            fontWeight="600"
          >
            Send link to your friend
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value="https://co-own.com/affiliate/i94hf8f2h3h"
            style={{ color:'#7C8FAC'}}
            InputProps={{
              readOnly: true,
              sx: {
                '&.MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Removes the border
                  },
                  '&:hover fieldset': {
                    border: 'none', // Ensures no border on hover
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none', // Ensures no border on focus
                  },
                },
              },
            }}
          />

          <Button
            variant="contained"
            startIcon={<CopyIcon />}
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: 'primary.main',
              padding: { xs: '8px', sm: '12px' }, // Adjust button size for small screens
            }}
            onClick={handleCopyLink}
          >
            Copy
          </Button>
        </CardContent>
      </Paper>
    </Paper>
  );
};

export default ResellerProgramCard;
