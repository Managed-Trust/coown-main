import { Box, Typography, Grid } from '@mui/material'

export default function EasyPayments() {


  return (
    <Grid container spacing={4} sx={{ p: 4, maxWidth: 1300, mx: 'auto' }}>
      <Grid item xs={12} md={6}>
        <Box>
          <img src='/images/landingPage/easyPayments.jpg' />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ pt: { xs: 0, md: 8 } }}>
          <Typography
            color="primary"
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            Sending Cryptocurrencies Conveniently
          </Typography>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
            Easy Payments
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ lineHeight: 1.8 }}
            style = {{  fontSize:"14px" }}
          >
            COOWN makes crypto payments simple for both businesses and individuals.
            Every user and company is verified, sharing real names with their
            contacts. Our easy-to-use interface helps you confidently send money to
            the right person. With COOWN, you can trust that each transaction is
            secure and as transparent as desired. Enjoy hassle-free payments while
            keeping full control over your data at a very low cost.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}