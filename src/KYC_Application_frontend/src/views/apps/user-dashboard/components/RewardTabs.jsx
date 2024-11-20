import React from 'react';
import { Grid, Chip, Box, Typography, Button, Paper } from '@mui/material';
import icp from '../../../../assets/images/svgs/icpPic.svg';

const RewardTabs = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        style={{
                            padding: '20px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div>
                            <Typography sx={{ padding: '5px 0px' }} variant="h6">
                                $COOWN tokens held
                            </Typography>
                            <Typography sx={{ padding: '5px 0px' }} variant="h3" component="div">
                                120
                            </Typography>
                            <Typography sx={{ padding: '5px 0px' }} variant="body2" color="#7C8FAC">
                                9,512.40 USD
                            </Typography>
                        </div>
                        <Button variant="outlined" color="primary" style={{ marginTop: '30px' }}>
                            Get $COOWN
                        </Button>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={3}
                        style={{
                            padding: '17px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={4} md={2} lg={2} container alignItems="center" justifyContent="center">
                                <img src={icp} alt="ICP Icon" style={{ maxWidth: '100%', height: 'auto' }} />
                            </Grid>
                            <Grid item xs={8} md={10}>
                                <Typography sx={{ padding: '3px 0px' }} variant="h5">
                                    Get rewards by staking $COOWN token   <Chip
                                        label="Coming soon"
                                        sx={{
                                            ml: 2,
                                            backgroundColor: 'rgba(106, 153, 242, 0.15)',
                                            color: 'rgb(106, 153, 242)',
                                            fontWeight: 'bold',
                                            fontSize:'16px'
                                        }}
                                    />
                                </Typography>
                                <Typography sx={{ padding: '3px 0px' }} variant="body1" color="#5A6A85">
                                    $COOWN is an ICP layer 2 cryptocurrency designed as a utility token, providing holders with voting power and staking rewards.{' '}
                                    <strong>Staking rewards depend on the amount of $COOWN token held</strong> and are automatically paid to token holders on a weekly basis.
                                </Typography>
                                <div>
                                    <Typography variant="text" color="primary" style={{ marginTop: '16px' }}>
                                        Learn more ↗
                                    </Typography>

                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={2} mb={2} width="100%">
                <Paper
                    elevation={3}
                    style={{
                        padding: '20px',
                        borderRadius: '12px',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                >
                    <Grid container alignItems="center" spacing={2}>
                        <Grid item xs={12} sm={12} md={6} container alignItems="center" justifyContent="start">
                            <img src={icp} alt="ICP Icon" style={{ maxWidth: '100%', height: 'auto' }} />
                            <Typography ml={2} variant="h5">Staking rewards
                                <Typography variant="body2" color="#5A6A85">
                                    Receive rewards for processing $COOWN
                                </Typography>
                            </Typography>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Typography variant="body2" color="#7C8FAC">
                                        Total rewards
                                    </Typography>
                                    <Typography variant="h6">52 ICP</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Typography variant="body2" color="#7C8FAC">
                                        Rewards past 3 months
                                    </Typography>
                                    <Typography display={'flex'} variant="h6">21 ICP <Typography mx={1} variant="body2" color="#FF695E">
                                    ↘   -2%
                                    </Typography></Typography>

                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Typography variant="body2" color="#7C8FAC">
                                        Rewards past year
                                    </Typography>
                                    <Typography display={'flex'} variant="h6">1,615 ICP <Typography   mx={1} variant="body2" color="#19BB8D">
                                        ↗  +9%
                                    </Typography></Typography>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        </>
    );
};

export default RewardTabs;
