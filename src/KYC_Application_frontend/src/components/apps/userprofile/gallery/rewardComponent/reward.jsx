import React from 'react';
import {
    Grid,
    Box
} from '@mui/material';
import RewardChart from './RewardChart';
import ResellerProgramCard from './ResellerProgramCard';
import RewardTabs from './RewardTabs';
// Adjust as needed for your environment

const Rewards = () => {
    return (
        <Box>
            <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                <Grid item xs={12} md={7} lg={8}>
                    <RewardChart />
                </Grid>
                <Grid item xs={12} md={5} lg={4}>
                    <ResellerProgramCard />
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: '20px' }}>
                <RewardTabs/>
            </Grid>
        </Box>
    );
};

export default Rewards;
