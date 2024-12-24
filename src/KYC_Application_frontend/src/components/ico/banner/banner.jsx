import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import img from '../../../assets/images/svgs/line-chart-up-01.svg'

function Banner() {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '100%',
                py: 10,
            }}
        >
            <Box sx={{ maxWidth: 800, margin: 'auto', textAlign: 'center', px: 2 }}>
                <Typography variant="body" align="center" mb={2} display={'flex'} justifyContent={'center'} gutterBottom>
                    <img src={img} />
                    <Typography variant="body" sx={{ fontWeight: 'bold' }} mt={0.5}> &nbsp;  Investment opportunity</Typography>
                </Typography>
                <Typography variant="h1" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                    Participate in our{' '}
                    <Box component="span" sx={{ color: '#3b82f6' }}>
                        Initial Coin Offering
                    </Box>{' '}
                    (ICO)
                </Typography>
                <Typography variant="body1" align="center" paragraph sx={{ color: '#5A6A85', mb: 4 }}>
                    Invest in our platform for governing and benefitting from performance based staking rewards
                </Typography>
                {/* <Grid container spacing={2} justifyContent="center">
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                textTransform: 'none',
                                fontWeight: 600,
                            }}
                        >
                            Connect now
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            sx={{
                                borderColor: '#3b82f6',
                                color: '#3b82f6',
                                textTransform: 'none',
                                fontWeight: 600,
                            }}
                        >
                            Swap tokens
                        </Button>
                    </Grid>
                </Grid> */}
            </Box>
        </Box>
    );
}

export default Banner;
