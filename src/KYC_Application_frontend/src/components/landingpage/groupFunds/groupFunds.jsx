import { Box, Typography, Container, Grid } from '@mui/material'

export default function GroupFunds() {

  return (
    <Container maxWidth="lg">
    <Grid container spacing={4} sx={{ p: 4 }}>
      <Grid item xs={12} md={6}>
        <Box sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src='/images/landingPage/simple_control_over_group.jpg'
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            alt="Easy Payments"
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Box sx={{ pt: { xs: 0, md: 8 } }}>
          <Typography
            color="primary"
            variant="subtitle1"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            Easy Group Asset Management
          </Typography>
          <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
            Simple Control Over Group Funds
          </Typography>
          <Typography
            variant="body1"
            color="#5A6A85"
            fontSize={16}
            sx={{ lineHeight: 1.5 }}
          >
            COOWN helps families, companies, and public groups share and control digital assets easily. Managers can set daily and monthly spending limits for each group member. If someone needs to spend more, approvals can be given quickly on a smartphone by designated people like executive managers. For large transactions, shareholders can vote to approve them as an optional feature. COOWN makes managing group finances straightforward and transparent, all while staying secure and following national laws.
          </Typography>
        </Box>
      </Grid>
    </Grid>
    </Container>
  )
}