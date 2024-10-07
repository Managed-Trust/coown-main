import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import img from '../../../assets/images/landingpage/image94.png'
const AssetControl = () => {

    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                <Grid container spacing={2} >
                    <Grid item xs={12} md={6}>
                        <Box mt={10}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                }}
                            >
                                <Typography variant="body" sx={{ color: '#5D87FF', fontWeight: 'bold' }} gap={1} mb={2}>

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
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={1} p={2} alignItems="center">
                            <Box
                                component="img"
                                src={img}
                                alt="Tech Innovators"
                                sx={{
                                    width: '100%',
                                    maxHeight: '400px',
                                    objectFit: 'cover', 
                                    borderRadius: '12px', 
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AssetControl;
