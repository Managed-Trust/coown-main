import { Box, Typography, Grid, Container } from '@mui/material';

export default function InstantTransfers() {
    return (
        <Container maxWidth="lg">
            <Grid
                container
                spacing={4}
                sx={{ p: { xs: 2, md: 4 } }} // Adjust padding for mobile
            >

                <Grid item xs={12} md={6}>
                    <Box sx={{ pt: { xs: 2, md: 8 } }}> {/* Reduced padding for smaller screens */}
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
                            color="#5A6A85"
                            sx={{ lineHeight: 1.5, fontSize: '16px' }} // Consistent font size
                        >
                            With COOWN, you can make instant payments easily. Transactions take less than 2 seconds, and a typical transaction fee is around $0.05, with no extra charges for using the network.
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src='/images/landingPage/instantTransections.jpg'
                            style={{
                                maxWidth: '100%',
                                height: 'auto', // Ensures proper scaling on mobile
                                objectFit: 'contain',
                            }}
                            alt="Group Asset Management"
                        />
                    </Box>
                </Grid>

            </Grid>
        </Container>
    );
}
