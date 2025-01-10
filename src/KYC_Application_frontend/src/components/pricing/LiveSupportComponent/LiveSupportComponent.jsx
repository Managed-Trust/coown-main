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
import img from '../../../assets/images/svgs/LiveSupport.svg';


export default function LiveSupportComponent() {
    return (
        <Container sx={{ p: 4, mt: 10 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6} p={10} mt={8}>
                    <Typography variant="body" sx={{ color: '#5D87FF', fontWeight: '600', fontSize:'16px' }} gap={1} mb={2}>
                    Upon request
                    </Typography>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', fontSize:'36px' }}>
                    Live support and training
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2, fontSize: '16px', color: '#5A6A85', lineHeight: '24px' }}>
                    Get real-time assistance and expert guidance with our live support and training. Live onboarding sessions are available upon request.
                      </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Best practice to set daily and monthly spending limits" />
                        </ListItem>

                        <ListItem disableGutters sx={{ mt: '-10px' }}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Document and train convenient transaction approvals" />
                        </ListItem>
                    </List>
                </Grid>

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
            </Grid>
        </Container>
    );
}
