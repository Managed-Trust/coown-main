import React from 'react';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardContent
} from '@mui/material';


import PeopleIcon from '../../../../../assets/images/group/user.svg';
import TransactionsIcon from '../../../../../assets/images/group/transaction.svg';
import NFTIcon from '../../../../../assets/images/group/NFT.svg';
import ReweardIcon from '../../../../../assets/images/group/reward.svg';
import TotalEstimatedChart from './TotalEstimatedChart';
import RevenueUpdates from './RevenueUpdates';
import ActiveMember from './ActiveMember';
import RecentTransaction from './RecentTransaction';
import RecentChat from './RecentChat';
import ActivityStream from './ActivityStream';

// Adjust as needed for your environment

const Overview = () => {
    const cardData = [
        { title: "Total members", value: "15", Icon: PeopleIcon, bgColor: '#ecf2ff', textColor: '#5883ff' },
        { title: "Transactions", value: "16.5K", Icon: TransactionsIcon, bgColor: '#fef5e5', textColor: '#ffa90f' },
        { title: "NFTs", value: "97", Icon: NFTIcon, bgColor: '#fbf2ef', textColor: '#ff6b60' },
        { title: "Rewards received", value: "$1.5k", Icon: ReweardIcon, bgColor: '#e3faed', textColor: '#24be92' }
    ];

    return (
        <Box>
            <Grid container spacing={3}> 
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ backgroundColor: card.bgColor }}>
                            <CardContent>
                                <Grid container direction="column" alignItems="center">
                                    <img src={card.Icon} alt={card.title} style={{ width: 40, height: 40 }} />
                                    <Typography sx={{ color: card.textColor }}>{card.title}</Typography>
                                    <Typography variant='h5' sx={{ color: card.textColor }}>{card.value}</Typography>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                <Grid item xs={12} lg={6}>
                    <TotalEstimatedChart/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <RevenueUpdates/>
                </Grid>
            </Grid>
            
            <Grid container spacing={3} sx={{ marginTop: '10px' }}>
                <Grid item xs={12} lg={4}>
                    <ActiveMember/>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <RecentTransaction/>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <RecentChat/>
                </Grid>
            </Grid>
            <Grid container sx={{ marginTop: '10px' }}>
                <Grid item xs={12} display='flex' alignItems="start">
                    <ActivityStream />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Overview;
