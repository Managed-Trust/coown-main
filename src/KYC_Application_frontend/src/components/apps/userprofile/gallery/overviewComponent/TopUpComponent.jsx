import React, { useState, useEffect } from "react";
import { Button, Typography, Card, Grid, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import MultilineSpeedometer from '../../../../../views/dashboard/MultilineSpeedometer';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

const TopUpComponent = () => {
    const [frontendCanister, setFrontendCanister] = useState([]);
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
    const formatMemorySize = (bytes) => {
        // Convert pages to bytes
        if (bytes >= 1e12) {
            return (bytes / 1e12).toFixed(2) + ' TB';
        } else if (bytes >= 1e9) {
            return (bytes / 1e9).toFixed(2) + ' GB';
        } else if (bytes >= 1e6) {
            return (bytes / 1e6).toFixed(2) + ' MB';
        } else if (bytes >= 1e3) {
            return (bytes / 1e3).toFixed(2) + ' KB';
        } else {
            return bytes + ' Bytes';
        }
    }
    const dailyToWeekly = (dailyBurnRate) => {
        return dailyBurnRate * 7;
    }
    const dailyToMonthly = (dailyBurnRate) => {
        return dailyBurnRate * 30;
    }
    const calculateTimeRemaining = (totalCycles, burnRate) => {
        if (burnRate === 0) return '∞'; // Infinite duration if no burn
        return Math.floor(totalCycles / burnRate); // Calculate time and round down
    }

    const calculateDaysRemaining = (totalCycles, dailyBurnRate) => {
        if (dailyBurnRate === 0) return '∞'; // Handle zero burn rate
        return Math.floor(totalCycles / dailyBurnRate); // Calculate days and round down
    };
    const getData = async () => {
        setCnLoading(true);
        try {
            const frontend = await ledger.call(
                "getCanisterStatus",
                "sifoc-qqaaa-aaaap-ahorq-cai"
            );
            console.log("res", frontend);
            const backend = await ledger.call(
                "getCanisterStatus",
                "speiw-5iaaa-aaaap-ahora-cai"
            );
            //   console.log("res", "sss ", backend);
            setBackendCanister(backend);
            setFrontendCanister(frontend);
        } catch (error) {
            console.log('error', error);
        }
        setCnLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <Card mb={2}>
                <Box p={2}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">

                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <Typography variant="h4" align="left">Top up your group canister with cycle token</Typography>
                                <Typography variant='body1' mt={2} color={'#7C8FAC'}>To pay for data storage and computing power for your group, send ICP tokens from your personal or any other account. We recommend $5–$10 worth of ICP, which typically covers about one year, depending on usage. Please note that once deposited, these funds are non-refundable.</Typography>
                                <Grid item xs={12} lg={6} mt={2} container spacing={2}>
                                    <Grid item >
                                        <Button variant="contained" color="primary">
                                            Pay ICP
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outlined" color="primary">
                                            Copy Address
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
                                                Burn rate (cycles/day)
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
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} lg={6}>
                    <Card p={2}>
                        <Typography variant="h5" align="left" mb={2}>Your cycles (Frontend)</Typography>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Typography variant="subtitle1" color="#7C8FAC"> Cycles</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Burn rate <br /> (cycles/day)</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Memory</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="subtitle1"> {cnloading ? "...." : formatNumber(Number(frontendCanister.cycles))}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1"> {cnloading ? "...." : formatNumber(Number(frontendCanister.idle_cycles_burned_per_day))}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1"> {cnloading ? "...." : formatMemorySize(Number(frontendCanister.memory_size))}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Card>
                        <Typography variant="h5" align="left" mb={2} >Cycles will run out (Frontend)</Typography>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Typography variant="subtitle1" color="#7C8FAC"> Based on the
                                        last day</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Based on the
                                        last week</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Based on the
                                        last month</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{cnloading ? "..." : calculateTimeRemaining(Number(frontendCanister.cycles), dailyToWeekly(Number(frontendCanister.idle_cycles_burned_per_day))) + ' weeks'}</TableCell>
                                    <TableCell align="center">{cnloading ? "..." : calculateTimeRemaining(Number(frontendCanister.cycles), dailyToWeekly(Number(frontendCanister.idle_cycles_burned_per_day))) + ' weeks'}</TableCell>
                                    <TableCell align="center">{cnloading ? "..." : calculateTimeRemaining(Number(frontendCanister.cycles), dailyToWeekly(Number(frontendCanister.idle_cycles_burned_per_day))) + ' weeks'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} lg={6}>
                    <Card p={2}>
                        <Typography variant="h5" align="left" mb={2}>Your cycles (Backend)</Typography>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Typography variant="subtitle1" color="#7C8FAC"> Cycles</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Burn rate <br /> (cycles/day)</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Memory</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography variant="subtitle1"> {cnloading ? "...." : formatNumber(Number(backendCanister.cycles))}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1"> {cnloading ? "...." : formatNumber(Number(backendCanister.idle_cycles_burned_per_day))}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1"> {cnloading ? "...." : formatMemorySize(Number(backendCanister.memory_size))}</Typography></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Card>
                        <Typography variant="h5" align="left" mb={2} >Cycles will run out (Backend)</Typography>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell> <Typography variant="subtitle1" color="#7C8FAC"> Based on the
                                        last day</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Based on the
                                        last week</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle1" color="#7C8FAC">Based on the
                                        last month</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            <TableRow>
                                    <TableCell>{cnloading ? "..." : calculateTimeRemaining(Number(backendCanister.cycles), dailyToWeekly(Number(backendCanister.idle_cycles_burned_per_day))) + ' weeks'}</TableCell>
                                    <TableCell align="center">{cnloading ? "..." : calculateTimeRemaining(Number(backendCanister.cycles), dailyToWeekly(Number(backendCanister.idle_cycles_burned_per_day))) + ' weeks'}</TableCell>
                                    <TableCell align="center">{cnloading ? "..." : calculateTimeRemaining(Number(backendCanister.cycles), dailyToWeekly(Number(backendCanister.idle_cycles_burned_per_day))) + ' weeks'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
};

export default TopUpComponent;
