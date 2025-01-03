import React from 'react';
import {
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText, Container
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import img from '../../../assets/images/svgs/AssetMining.svg';


export default function AssetMiningComponent() {
    return (
        <Container sx={{ p: 4, mt: 10 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} >
                    <Box
                        component="img"
                        src={img}
                        alt="Tech Innovators"
                        sx={{
                            width: '100%',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} p={10} mt={8}>
                    <Typography variant="body" sx={{ color: '#5D87FF', fontWeight: 'semibold' }} gap={1} mb={2}>
                        In the roadmap
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 'bold'}}>
                        Custom asset minting
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, fontSize: '14px', color: '#5A6A85' }}>
                        Custom NFT minting is available on request, allowing you to create and share unique  blockchain-based items. Regional marketplaces for trading assets are on our roadmap.    </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Legal review" />
                        </ListItem>

                        <ListItem disableGutters sx={{ mt: '-10px' }}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Customization support" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}
