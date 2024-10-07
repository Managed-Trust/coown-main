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

export default function FileSharingComponent() {
    return (
        <Container sx={{ p: 4, mt: 10,mb:5 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} p={10}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 8 }}>
                    File sharing
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, fontSize:'14px',color:'#5A6A85' }}>
                    Enable file sharing to allow group members to easily send and share files directly within the group chat.   </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Available as add-on " />
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
