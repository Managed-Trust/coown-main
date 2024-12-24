import { Box, Typography, Grid, Container } from '@mui/material';

export default function EasyPayments() {
  return (
    <Container maxWidth="lg">
      <Grid 
        container 
        spacing={4} 
        alignItems="center" 
        sx={{ p: { xs: 2, md: 4 } }} // Adjust padding for mobile
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img 
              src='/images/landingPage/easypayment.svg' 
              alt="Easy Payments" 
              style={{ maxWidth: '100%', height: 'auto' }} // Ensure image is responsive
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ pt: { xs: 2, md: 8 } }}>
            <Typography
              color="primary"
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: 500 }}
            >
              Free and Instant Crypto Transactions
            </Typography>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
              Easy Payments
            </Typography>
            <Typography
              variant="body1"
              color="#5A6A85"
              sx={{ lineHeight: 1.5, fontSize: "16px" }}
            >
              COOWN makes crypto payments simple for businesses and individuals.
              Enjoy secure, hassle-free transactions with full control over your data.
              Verified users share real names with their contacts, ensuring security, trust, 
              and convenience. Select customers benefit from gas-free transfers in Bitcoin, 
              USD, and Gold-referenced coins, while others enjoy fees as low as a few cents.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
