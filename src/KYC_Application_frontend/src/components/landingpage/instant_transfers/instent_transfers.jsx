import { Box, Typography, Grid } from '@mui/material'

export default function InstantTransfers() {

    return (
        <Grid container spacing={4} sx={{ p: 4, maxWidth: 1300, mx: 'auto' }}>
            <Grid item xs={12} md={6}>
                <Box sx={{ pt: { xs: 0, md: 8 } }}>
                    <Typography
                        color="primary"
                        variant="subtitle1"
                        sx={{ mb: 2, fontWeight: 500 }}
                    >
                        Manage group assets with ease
                    </Typography>
                    <Typography variant="h3" sx={{ mb: 3, fontWeight: 600 }}>
                        Instant Transfers with Low Fees
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: 1.8 }}
                        style={{ fontSize: "14px" }}
                    >
                        With COOWN, you can make instant payments easily. Transections take less then 2 seconds, and a typical transection fee is around $0.05 with no extra charges for using the network.
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box>
                    <img src='/images/landingPage/instantTransections.jpg' />
                </Box>
            </Grid>
        </Grid>
    )
}