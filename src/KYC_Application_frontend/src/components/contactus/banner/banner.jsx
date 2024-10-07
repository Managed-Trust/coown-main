import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import coin from '../../../assets/images/svgs/coins-03.svg';
import coinHand from '../../../assets/images/svgs/coins-hand.svg';
import star from '../../../assets/images/svgs/stars-01.svg';
import globe from '../../../assets/images/svgs/globe-05.svg';
import briefcase from '../../../assets/images/svgs/briefcase-02.svg';
import brush from '../../../assets/images/svgs/brush-02.svg';
import star7 from '../../../assets/images/svgs/star-07.svg';
import headphone from '../../../assets/images/svgs/headphones-01.svg';
import img from '../../../assets/images/svgs/send-03.svg';
import { Container } from '@mui/system';

function Banner() {
    const options = [
        { label: 'ICO Participation', icon: coin },
        { label: 'Venture Capital', icon: coinHand },
        { label: 'Get Early Access', icon: star },
        { label: 'Become Regional Operator', icon: globe },
        { label: 'Partnerships', icon: briefcase},
        { label: 'Customization Requests', icon: brush },
        { label: 'Feature Sponsoring', icon: star7},
        { label: 'Customer Support', icon: headphone },
    ];

    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '100%' }}>
                <Container sx={{ maxWidth: 800, margin: 'auto', padding: 6 }}>
                    <Typography variant="h6" display={'flex'} justifyContent={'center'} gap={1} gutterBottom>
                        <img src={img} alt="" />
                        <Typography variant="h6" mt={1} align="center" gutterBottom>Contact us</Typography>
                    </Typography>
                    <Typography variant="h1" align="center" gutterBottom>
                        We’d love to hear from you
                    </Typography>

                    {/* Grid of options */}
                    <Grid container spacing={2} justifyContent="center" mt={2}>
                        {options.map((option, index) => (
                            <Grid item key={index}>
                                <Paper
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        padding: '6px 12px',
                                        borderRadius: '24px',
                                        backgroundColor: '#F4F8FB',
                                        color: '#7C8FAC',
                                        fontWeight: 500,
                                        transition: 'background-color 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: '#E6F0FF',
                                        },
                                    }}
                                >
                                   <img src={option.icon} alt="" />
                                    <Typography variant="body2">
                                        {option.label}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

export default Banner;
