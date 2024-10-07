import React from 'react';
import {
    Box,
    Typography,
    Grid, Chip,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,Container
} from '@mui/material';
import img from '../../../assets/images/svgs/integratedCommunication.svg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function IntegratedCommunication() {
    return (
        <Container sx={{ p: 4, mt: 10 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} p={10}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 8 }}>
                        Integrated Communication
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, fontSize:'16px',color:'#5A6A85' }}>
                        Built-in chat and file-sharing features for seamless internal and external communication.
                    </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Group chat" />
                        </ListItem>
                        <ListItem disableGutters sx={{ mt: '-10px' }}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="File sharing option" />
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
