import React from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const SwapComponent = () => {
  return (
    <Box mt={10} mb={15}>
      <Container maxWidth="lg">
        <Grid container spacing={4} >
          {/* Text Section */}
          <Grid item xs={12} md={6} mt={2}>
            <Typography variant="h2" fontWeight="bold" gutterBottom mb={2}>
              Swap ICP for COOWN tokens
            </Typography>
            <Typography variant="body1" color="#5A6A85" gutterBottom mb={2}>
              Exchange of $COOWN token is locked during the crowdfunding and presale stages.
              The initial exchange offering is planned in Q2–Q3, 2025.
            </Typography>
             <Typography variant="body2" color="primary" display={'flex'}>
             <InfoOutlined color="primary" /> &nbsp; &nbsp;  <Typography variant="body1" color="primary" mt={0.2}> Learn about staking</Typography> 
            </Typography>
          </Grid>

          {/* Swap Form Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: '#F9FAFB' }}>
              <Box mb={2}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  Enter ICP Amount
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="0.0"
                />
                <Typography variant="body2" color="textSecondary" mt={1}>
                  You will receive  <Link href="#" color="primary" underline="hover">100 $COOWN</Link> tokens
                </Typography>
              </Box>
              <Button variant="contained" color="primary" sx={{ py: 1 }}>
                Swap
              </Button>
            </Paper>
            <Box mt={3} display="flex" gap={2}>
              <Box bgcolor="#F3F4F6" px={2} py={1} borderRadius={1}>
                <Typography variant="body2">
                  1 ICP = $9.15
                </Typography>
              </Box>
              <Box bgcolor="#F3F4F6" px={2} py={1} borderRadius={1}>
                <Typography variant="body2">
                  1 $COOWN = $0.50
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SwapComponent;
