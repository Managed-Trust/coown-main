import React from 'react';
import { Container, Grid, Box, Typography, Paper, Avatar } from '@mui/material';
import icon1 from '../../../assets/images/landingpage/icon1.png'
import icon2 from '../../../assets/images/landingpage/icon2.png'
import icon3 from '../../../assets/images/landingpage/icon3.png'
import icon4 from '../../../assets/images/landingpage/icon4.png'
import icon5 from '../../../assets/images/landingpage/icon5.png'
import icon6 from '../../../assets/images/landingpage/icon6.png'
import GroupIcon from '@mui/icons-material/Group'; // For "Flexible Role-Based Permissions"
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // For "Multi-Currency Support"
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion'; // For "Automated Financial Workflows"
import BusinessIcon from '@mui/icons-material/Business'; // For "Digitalized Company Shares"
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'; // For "Privacy and Compliance"
import WorkspacesIcon from '@mui/icons-material/Workspaces'; // For "Real-World Asset (RWA) Tokenization"

const features = [
    {
        icon: icon1,
        title: 'Flexible Role-Based Permissions',
        description: 'Assign roles like owners, admins, and members to ensure secure and controlled operations.',
    },
    {
        icon: icon2,
        title: 'Multi-Currency Support',
        description: 'Easily manage various digital assets, including cryptocurrencies, stablecoins, and NFT licenses.',
    },
    {
        icon: icon3,
        title: 'Automated Financial Workflows',
        description: 'Automate transactions, split payments, and enforce multi-signature approvals for enhanced security.',
    },
    {
        icon: icon4,
        title: 'Digitalized Company Shares',
        description: 'Digitize company shares to enable voting, control executive spending, raise capital, and distribute performance-based dividends.',
    },
    {
        icon: icon5,
        title: 'Privacy and Compliance',
        description: 'Balance privacy with AML and KYC requirements. Non-custodial design ensures users own and control their data, with operator oversight for security.',
    },
    {
        icon: icon6,
        title: 'Real-World Asset (RWA) Tokenization',
        description: 'Bring real-world assets online by creating custom NFT series for your group or marketplace.',
    },
];

const FeaturesGrid = () => {
    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Box
                                elevation={3}
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    height: '100%',
                                    border: 'none',
                                }}
                            >
                                <img src={feature.icon} alt="" width='50px' />
                                <Typography variant="h6" fontWeight={600} mt={2} mb={2}>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="#5A6A85" fontSize={14} lineHeight={1.3}>
                                    {feature.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default FeaturesGrid;
