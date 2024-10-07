import React from 'react';
import {
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,Chip ,
    Container
} from '@mui/material';
import img from '../../../assets/images/svgs/sharecontrol.svg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function ShareControlComponent() {
    return (
        <Container sx={{ p: 4, mt: 10,mb:5 }}>
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
                <Grid item xs={12} md={6}  p={10}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 4 }}>
                    Share control over assets such as USD, bitcoin, and gold-referenced cryptocurrencies with your team.
                    </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Automated financial reports" />
                        </ListItem>
                        
                        <ListItem disableGutters sx={{mt:'-20px'}}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                       Recurrent payments and automated splitting 
                                        <Chip
                                            label="Coming soon"
                                            sx={{
                                                ml: 2,
                                                backgroundColor: 'rgba(106, 153, 242, 0.15)',
                                                color: 'rgb(106, 153, 242)',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </Box>
                                }
                            />
                        </ListItem>
                        <ListItem disableGutters sx={{mt:'-20px'}}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        Custom NFT series for securities
                                        <Chip
                                            label="Coming soon"
                                            sx={{
                                                ml: 2,
                                                backgroundColor: 'rgba(106, 153, 242, 0.15)',
                                                color: 'rgb(106, 153, 242)',
                                                fontWeight: 'bold',
                                            }}
                                        />
                                    </Box>
                                }
                            />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}
