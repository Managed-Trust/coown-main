import { Box, Typography, Grid, Button } from '@mui/material'

export default function OpenChatCommunity() {

    return (
        <Grid container spacing={4} sx={{ p: 4, maxWidth: 1300, mx: 'auto' }}>
            <Grid item xs={12} md={6}>
                <Box sx={{ pt: { xs: 0, md: 8 } }}>
                    <img style={{ marginBottom: '10px' }} src="/images/landingPage/OpenChatImage.jpg" />
                    <Typography variant="h2" sx={{ mb: 3, fontWeight: 700, fontSize:'36px' }}>
                        Join Our OpenChat Community
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ lineHeight: '24px' }}
                        style={{ fontSize: "16px" }}
                    >
                        Join our community on OpenChat! Connect with us and stay updated — click to join the conversation.
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }} style={{ borderRadius:'3px' }}>
                        Join
                    </Button>
                </Box>
            </Grid>

            <Grid item xs={12} md={6}>
                <Box>
                    <img src='/images/landingPage/OpenChatCommunication.jpg' />
                </Box>
            </Grid>
        </Grid>
    )
}