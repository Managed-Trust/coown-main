import React, { useState } from 'react';
import {
    Grid,
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';
import StreamIcon from '@mui/icons-material/Stream';
import GroupIcon from '@mui/icons-material/Group';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import EditGroup from './EditGroup';
import ActivityStream from './ActivityStream';
import Ownership from './Ownership';
import NotificationTriggers from './NotificationTriggers';

const Setting = () => {
    const [selectedView, setSelectedView] = useState('Notifications');

    const renderContent = () => {
        switch (selectedView) {
            case 'Notifications':
                return <NotificationSettings />;
            case 'Notification triggers':
                return <NotificationTriggers />;
            case 'Privacy settings':
                return <PrivacySettings />;
            case 'Edit group':
                return <EditGroup />;
            case 'Activity Stream':
                return <ActivityStream />;
            case 'Ownership':
                return <Ownership />;
            default:
                return <NotificationSettings />;
        }
    };

    return (
        <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={12} md={3}>
                <Box sx={{ width: { xs: '100%', md: 240 }, backgroundColor: '#f5f5f5', padding: 2 }}>
                    <List>
                        <Typography variant="subtitle2" sx={{ paddingLeft: 1, paddingTop: 1 }}>
                            Personal settings
                        </Typography>
                        {[
                            { label: 'Notifications', icon: <NotificationsIcon /> },
                            { label: 'Privacy settings', icon: <LockIcon /> }
                        ].map((item) => (
                            <ListItem
                                button
                                key={item.label}
                                onClick={() => setSelectedView(item.label)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                        <Typography variant="subtitle2" sx={{ paddingLeft: 1, paddingTop: 2 }}>
                            Group settings
                        </Typography>
                        {[
                            { label: 'Edit group', icon: <EditIcon /> },
                            { label: 'Notification triggers', icon: <NotificationsIcon /> },
                            { label: 'Activity Stream', icon: <StreamIcon /> },
                            { label: 'Ownership', icon: <GroupIcon /> }
                        ].map((item) => (
                            <ListItem
                                button
                                key={item.label}
                                onClick={() => setSelectedView(item.label)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Grid>

            {/* Main Content */}
            <Grid item xs={12} md={9}>
                {renderContent()}
            </Grid>
        </Grid>
    );
};

export default Setting;