import React from 'react';
import {
    Box,
    Typography,
    Grid, Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container
} from '@mui/material';
import img from '../../../assets/images/svgs/shareholder.svg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ShareHolderComponent() {
    return (
        <Container sx={{  p: 4, mt: 10,mb:5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} p={10}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 8 }}>
                        Enable fast, informed shareholder decisions.
                    </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Manage shareholder book" />
                        </ListItem>
                        <ListItem disableGutters sx={{mt:'-10px'}}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Elect board and executives" />
                        </ListItem>
                        <ListItem disableGutters sx={{mt:'-20px'}}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        Trade shares and raise capital
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
                                        Automated revenue-based dividends
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

                <Grid item xs={12} md={6}>
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
            </Grid>
        </Container>
    );
}
