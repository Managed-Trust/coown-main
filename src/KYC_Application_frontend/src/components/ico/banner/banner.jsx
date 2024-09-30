import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { IconChartAreaLine } from '@tabler/icons-react';

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
                <Typography variant="h6" align="center" gutterBottom>
                    <IconChartAreaLine sx={{ color: '#5A6A85', verticalAlign: 'middle', marginRight: 1 }} />
                    Investment opportunity
                </Typography>
                <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
                    Participate in our{' '}
                    <Box component="span" sx={{ color: '#3b82f6' }}>
                        Initial Coin Offering
                    </Box>{' '}
                    (ICO)
                </Typography>
                <Typography variant="body1" align="center" paragraph sx={{ color: '#5A6A85', mb: 4 }}>
                    Invest in our platform for governing and benefitting from performance based staking rewards
                </Typography>
                <Grid container spacing={2} justifyContent="center">
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
                </Grid>
            </Box>
        </Box>
    );
}

export default Banner;
