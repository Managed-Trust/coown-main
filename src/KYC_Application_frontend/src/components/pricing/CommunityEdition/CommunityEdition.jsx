import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText ,Container} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import img from '../../../assets/images/landingpage/image94.png';

const FeatureItem = ({ title, description }) => (
    <Box mb={3}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {title}
        </Typography>
        <Typography sx={{ fontSize: '13px' }} color="#5A6A85">
            {description}
        </Typography>
    </Box>
);

const CommunityEdition = () => {

    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h2"
                            sx={{ fontWeight: 'bold' }}
                        >Community edition is available for free
                        </Typography>
                        <List>
                            <ListItem disableGutters>
                                <ListItemIcon>
                                    <CheckCircleIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="No subscription nor sign-up fees" />
                            </ListItem>
                            <ListItem disableGutters sx={{marginTop:'-10px'}}>
                                <ListItemIcon>
                                    <CheckCircleIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Low transaction fees" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureItem
                            title="One private group included"
                            description="One private group is included. Additional groups and subgroups are available as upgrade option."
                        />
                        <FeatureItem
                            title="Unlimited group members "
                            description="Add as many group members as you want without extra fees."
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureItem
                            title="Rewards available"
                            description="Get automated staking rewards for holding $COOWN token  in your wallet."
                        />
                        <FeatureItem
                            title="Limit transactions"
                            description="Set transaction limits based on user roles with the ability to approve transactions exceeding limit."
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CommunityEdition;