import React from 'react';
import { Box, Container, Grid, Typography, LinearProgress } from '@mui/material';

const TokenDistribution = () => {
    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="md">
                {/* Title */}
                <Typography variant="h2" fontWeight="bold" gutterBottom textAlign="center" mb={3}>
                    Ongoing token distribution of $COOWN token
                </Typography>

                {/* Distribution Stages */}
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={3}>
                        <LinearProgress
                            variant="determinate"
                            value={100}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: '#e0e0e0', // Background of the progress bar track
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(to right, #62B6FF, #5D87FF)', // Gradient color for the progress indicator
                                    borderRadius: 5,
                                },
                            }}
                        />
                        <Typography variant="body1" justifyContent="center" display={'flex'} mt={1}>
                            <Typography variant="body1" color="primary" >0.3M </Typography> &nbsp;  Crowdfunding
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <LinearProgress
                            variant="determinate"
                            value={50}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: '#e0e0e0', // Background of the progress bar track
                                '& .MuiLinearProgress-bar': {
                                    background: 'linear-gradient(to right, #5D87FF, #E382AF)', // Gradient color for the progress indicator
                                    borderRadius: 5,
                                },
                            }}
                        />
                         <Typography variant="body1" justifyContent="center" display={'flex'} mt={1}>
                            <Typography variant="body1" color="primary" >1M </Typography> &nbsp;  Presale
                        </Typography>                       
                    </Grid>
                    <Grid item xs={3}>
                        <LinearProgress
                            variant="determinate"
                            value={0}
                            sx={{ height: 10, borderRadius: 5, bgcolor: '#E5E7EB' }}
                        />
                       
                        <Typography variant="body1" justifyContent="center" display={'flex'} mt={1}>
                            <Typography variant="body1" color="primary" >2M </Typography> &nbsp; Sale & Swap
                        </Typography>  
                    </Grid>
                    <Grid item xs={3}>
                        <LinearProgress
                            variant="determinate"
                            value={0}
                            sx={{ height: 10, borderRadius: 5, bgcolor: '#E5E7EB' }}
                        />
                         <Typography variant="body1" justifyContent="center" display={'flex'} mt={1}>
                            <Typography variant="body1" color="primary" >2M </Typography> &nbsp;  DAO Launch
                        </Typography>  
                       
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default TokenDistribution;
