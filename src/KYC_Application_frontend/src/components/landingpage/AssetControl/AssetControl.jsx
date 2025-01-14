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
                                <Typography variant="body" sx={{ color: '#5D87FF', fontWeight: '600', fontSize:'16px', lineHeight:'24px' }} gap={1} mb={2}>

                                    Manage group assets with ease
                                </Typography>

                                <Typography
                                    variant="h2"
                                    fontWeight={700}
                                    fontSize="36px"
                                    lineHeight="44px"
                                >
                                    Streamline asset control and decision-making 
                                </Typography>
                            </motion.div>
                            <Box pt={2} pb={3} >
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
                                    <Typography variant="body" color="#5A6A85" fontSize="16px" lineHeight="24px" fontWeight={400}>
                                        COOWN offers an integrated solution for families, corporations, and public entities to share and control digital assets. Spending limits can be set by administrators or executive managers for each user individually. Transaction approvals are implemented by management decisions or even shareholder voting as needed. COOWN empowers groups to manage assets securely, fully on-chain, and in compliance with local regulations. Simplify governance, enhance transparency, and gain control over group finances with COOWN.   
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
