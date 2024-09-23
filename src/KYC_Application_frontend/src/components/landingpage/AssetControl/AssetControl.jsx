import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import img from '../../../assets/images/landingpage/image94.png'
const AssetControl = () => {
    // Set initial time for the countdown (e.g., 1 day, 12 hours, 35 minutes, and 41 seconds from now)
    const targetDate = new Date().getTime() + 1 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 35 * 60 * 1000 + 41 * 1000;

    const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        const timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Clear timer if the component is unmounted
        return () => clearInterval(timer);
    }, []);

    return (
        <Box mt={2}>
            <Container maxWidth="lg">
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <Box  mt={10}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                }}
                            >
                                <Typography variant="body"  sx={{ color: '#5D87FF', fontWeight: 'bold'}} gap={1} mb={2}>
                                    
                                   Manage group assets with ease
                                </Typography>

                                <Typography
                                    variant="h1"
                                    fontWeight={700}
                                >
                                    Streamline asset control and decisions
                                </Typography>
                            </motion.div>
                            <Box pt={2} pb={3}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 150,
                                        damping: 30,
                                        delay: 0.2,
                                    }}
                                >
                                    <Typography variant="body">
                                    COOWN offers an integrated solution for families, corporations, and public entities to share and control digital assets. With features like shareholder voting, custom spending limits, and multi-signature payments, COOWN empowers groups to manage assets securely and in full compliance with local regulations. Simplify governance, enhance transparency, and gain control over group finances with COOWN.
                                         </Typography>
                                </motion.div>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid  item xs={12} md={6}>
                        <Grid container spacing={1} alignItems="center">
                            <img src={img} alt="" sx={{width:'80%'}}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AssetControl;
