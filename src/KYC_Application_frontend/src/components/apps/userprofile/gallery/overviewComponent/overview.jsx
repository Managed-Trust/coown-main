import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    Card,
    CardContent, IconButton
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
import CycleComponent from './CycleComponent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TopUpComponent from './TopUpComponent';

// Adjust as needed for your environment

const Overview = () => {
    const [showDetails, setShowDetails] = useState(false);
    
    const toggleShowDetails= ()=>{
        setShowDetails(!showDetails);
    }
    const cardData = [
        { title: "Total members", value: "15", Icon: PeopleIcon, bgColor: '#ecf2ff', textColor: '#5883ff' },
        { title: "Transactions", value: "16.5K", Icon: TransactionsIcon, bgColor: '#fef5e5', textColor: '#ffa90f' },
        { title: "NFTs", value: "97", Icon: NFTIcon, bgColor: '#fbf2ef', textColor: '#ff6b60' },
        { title: "Rewards received", value: "$1.5k", Icon: ReweardIcon, bgColor: '#e3faed', textColor: '#24be92' }
    ];

    return (
        <>
            {showDetails ?
                <Grid container sx={{ marginTop: '10px' }}>
                    <Grid item xs={12} display='flex' alignItems="start">
                        <Card>
                            <Box>
                                <Grid item xs={12} display='flex' alignItems="start">
                                    <IconButton onClick={() => setShowDetails(false)} size="large">
                                        <ArrowBackIcon />
                                    </IconButton>
                                    <Typography variant="h6" mt={2} >
                                        Cycle token details
                                    </Typography>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid item xs={12} display='flex' alignItems="start" mt={2} >
                        <Card>
                            <Box>
                                <Grid item xs={12} alignItems="start">
                                    <Typography variant="h6" mt={2} >
                                        What is cycle token
                                    </Typography>
                                    <Typography variant='subtitle1' color='#7C8FAC' mt={2}>
                                        ICP can be used to pay for the usage of resources consumed the IC. More specifically, ICP tokens can be converted to cycles (i.e., burned), and these cycles are used by developers to pay for installing smart contracts, called “canisters” on the IC, for the resources that canisters use (storage, CPU, and bandwidth). The cycle price is pegged to a basket of fiat currencies, so the conversion rate ICP to cycle fluctuates with the market price of ICP. Hence the cost to developers of acquiring fuel to run their application is predictable.
                                    </Typography>
                                    <Typography variant='subtitle1' color='#7C8FAC' mt={2}>
                                        In this so-called "reverse gas model" of the IC, developers pre-pay costs by loading canisters with computation cycles. As a consequence, users can interact with a decentralized application (dapp) without needing tokens or dealing with seed-phrases. As cycles are stable in cost, developers know in advance how much they will need to spend on computation, storage, and other resources.
                                    </Typography>

                                    <Typography variant='body1' color='#5D87FF' mt={2}>
                                        View Source ➚
                                    </Typography>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} display='flex' alignItems="start" mt={2} >
                        <Card>
                            <Box>
                                <Grid item xs={12} alignItems="start">
                                    <Typography variant="h6" mt={2} >
                                        How is it used
                                    </Typography>
                                    <Typography variant='subtitle1' color='#7C8FAC' mt={2}>
                                        Your group is stored in a data container of Internet Computer named canister. Your canister uses “cycles” to pay for storage, computation, and other resources on the Internet Computer. Topping up your canister is routine maintenance to ensure it never runs out of fuel or stops working. Simply send ICP to the address shown, and it will be converted into cycles to keep your canister running smoothly. There is no refund. If you don’t pay, your canister may be suspended and eventually deleted.
                                    </Typography>
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} alignItems="start" mt={3} >
                        <TopUpComponent />
                    </Grid>
                </Grid>
                :
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
                    {/* <Grid container sx={{ marginTop: '10px' }}>
                        <Grid item xs={12} display='flex' alignItems="start">
                            <CycleComponent toggleShowDetails={toggleShowDetails}/>
                        </Grid>
                    </Grid> */}
                    <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                        <Grid item xs={12} lg={6}>
                            <TotalEstimatedChart />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <RevenueUpdates />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} sx={{ marginTop: '10px' }}>
                        <Grid item xs={12} lg={4}>
                            <ActiveMember />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <RecentTransaction />
                        </Grid>
                        <Grid item xs={12} lg={4}>
                            <RecentChat />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ marginTop: '10px' }}>
                        <Grid item xs={12} display='flex' alignItems="start">
                            <ActivityStream />
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
    );
};

export default Overview;
