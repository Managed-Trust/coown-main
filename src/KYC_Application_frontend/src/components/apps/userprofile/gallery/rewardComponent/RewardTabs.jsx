import React from 'react';
import { Grid, Box, Typography, Button, Paper } from '@mui/material';
import icp from '../../../../../assets/images/group/icp.png';

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
                            <Typography sx={{ padding: '5px 0px' }} variant="body2" color="textSecondary">
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
                                <Typography sx={{ padding: '3px 0px' }} variant="h6">
                                    Get rewards by staking $COOWN token
                                </Typography>
                                <Typography sx={{ padding: '3px 0px' }} variant="body1" color="textSecondary">
                                    $COOWN is an ICP layer 2 cryptocurrency designed as a utility token, providing holders with voting power and staking rewards.{' '}
                                    <strong>Staking rewards depend on the amount of $COOWN token held</strong> and are automatically paid to token holders on a weekly basis.
                                </Typography>
                                <div>
                                    <Button variant="text" color="primary" style={{ marginTop: '16px' }}>
                                        Learn staking
                                    </Button>
                                    <Button variant="text" color="primary" style={{ marginTop: '16px', marginLeft: '8px' }}>
                                        Learn voting
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>

            <Box mt={2} mb={2}  width="100%">
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
                        <Grid item xs={12} sm={3} md={2} container alignItems="center" justifyContent="right">
                            <img src={icp} alt="ICP Icon" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Grid>
                        <Grid item xs={12} sm={9} md={4}>
                            <Typography variant="h5">$TAR Rewards</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Receive rewards for processing ckUSDC
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Typography variant="body2" color="textSecondary">
                                        Total rewards
                                    </Typography>
                                    <Typography variant="h6">2,152 ICP</Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Typography variant="body2" color="textSecondary">
                                        Rewards past 3 months
                                    </Typography>
                                    <Typography variant="h6">952 ICP</Typography>
                                    <Typography variant="body2" color="error">
                                        -2%
                                    </Typography>
                                </Grid>
                                <Grid item xs={4} sm={4} md={4} lg={4}>
                                    <Typography variant="body2" color="textSecondary">
                                        Rewards past year
                                    </Typography>
                                    <Typography variant="h6">1,615 ICP</Typography>
                                    <Typography variant="body2" color="success.main">
                                        +9%
                                    </Typography>
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
