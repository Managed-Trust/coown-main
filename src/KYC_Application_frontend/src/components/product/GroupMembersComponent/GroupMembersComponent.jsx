import React from 'react';
import {
    Box,
    Typography,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container
} from '@mui/material';
import img from '../../../assets/images/svgs/groupmember.svg'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export default function GroupMembersComponent() {
    return (
        <Container sx={{ p: 4, mt: 10 , mb:5 }}>
            <Grid container spacing={4}>
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
                <Grid item xs={12} md={6} p={10}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mt: 8 }}>
                        Identify economic beneficiaries, executives, employees, affiliates including people and entities.
                    </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Set daily and monthly spending limits" />
                        </ListItem>
                        <ListItem disableGutters sx={{mt:'-10px'}}>
                            <ListItemIcon>
                                <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Secure, fast and convenient transaction approvals" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
    );
}
