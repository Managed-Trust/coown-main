import React, { useState, useEffect } from "react";
import { Button, Typography, Card, Grid, Box, Divider } from '@mui/material';
import MultilineSpeedometer from '../../../../../views/dashboard/MultilineSpeedometer';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

const CycleComponent = () => {
    const [backendCanister, setBackendCanister] = useState([]);
    const [cnloading, setCnLoading] = useState(false);

    const formatNumber = (num) => {
        if (num >= 1e12) {
            return (num / 1e12).toFixed(2) + ' T';
        } else if (num >= 1e9) {
            return (num / 1e9).toFixed(2) + ' B';
        } else if (num >= 1e6) {
            return (num / 1e6).toFixed(2) + ' M';
        } else {
            return num.toLocaleString(); // Show the number with commas for smaller values
        }
    }
    const getData = async () => {
        setCnLoading(true);
        try {
            const response = await ledger.call('getCanisterStatus', "speiw-5iaaa-aaaap-ahora-cai");
            setBackendCanister(response);
        } catch (error) {
            console.log('error', error);
        }
        setCnLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <Card>
            <Box p={2}>
                <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">

                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <Typography variant="h4" align="left">Cycle token</Typography>
                            <Typography variant='body1' mt={2} color={'#7C8FAC'}>You need cycle token to keep your  account running. Depending on the usage,  it typically costs around 5 USD per year, and need to be paid in ICP.</Typography>
                            <Grid item xs={12} lg={6} mt={2} container spacing={2}>
                                <Grid item >
                                    <Button variant="contained" color="primary">
                                        Top up
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Details
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Grid container spacing={2} mt={1}>
                                <Grid item xs={12} md={6} lg={6}>
                                    <Box sx={{ p: 2, }}>
                                        <Typography variant="subtitle1" color="#7C8FAC">
                                            Cycles available
                                        </Typography>
                                        <Typography variant="h6">
                                            {cnloading ? "...." : formatNumber(Number(backendCanister.cycles))}
                                        </Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant="subtitle1" color="#7C8FAC">
                                            Burn rate (cycles/month)
                                        </Typography>
                                        <Typography variant="h6">

                                            {cnloading ? "...." : formatNumber(Number(backendCanister.idle_cycles_burned_per_day))}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={6} lg={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: -3, mb: -14 }}>
                                    <MultilineSpeedometer value={680} />
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </Box>
        </Card>
    );
};

export default CycleComponent;
