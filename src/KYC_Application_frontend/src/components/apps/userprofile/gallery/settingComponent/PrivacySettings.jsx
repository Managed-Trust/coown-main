import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Switch,
    useMediaQuery,
    Card,
    Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ChildCard from '../../../../shared/ChildCard';

const PrivacySettings = () => {
    const [privacySettings, setPrivacySettings] = useState({
        fullName: { groupOwner: true, groupMembers: false, customerSupport: true, amlOfficer: true },
        email: { groupOwner: true, groupMembers: true, customerSupport: false, amlOfficer: true },
        phone: { groupOwner: true, groupMembers: false, customerSupport: true, amlOfficer: false },
        address: { groupOwner: true, groupMembers: false, customerSupport: true, amlOfficer: true },
        personalAccount: { groupOwner: true, groupMembers: false, customerSupport: false, amlOfficer: false },
        balance: { groupOwner: false, groupMembers: false, customerSupport: false, amlOfficer: true },
        shareholderBook: { groupOwner: true, groupMembers: true, customerSupport: false, amlOfficer: false },
    });

    const handleSwitchChange = (section, role) => {
        setPrivacySettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [role]: !prev[section][role],
            },
        }));
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ChildCard p={3}>
            <Typography variant="h6" gutterBottom>
                Privacy settings
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Choose which information about you is visible to other users.
            </Typography>
            <Grid mt={2} p={1} mb={2} container spacing={2} alignItems="center">
                <Grid item xs={4}>
                    <Typography variant="body2">Data</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">Group Owner & Admins</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">Group Members</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">Customer Support</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2">AML Officer</Typography>
                </Grid>
            </Grid>
            {Object.keys(privacySettings).map((key) => (
                <Grid p={1}>
                    <Grid container key={key} spacing={2} alignItems="center">
                        <Grid item xs={4}>
                            <Typography variant="body1" sx={{ fontWeight: '700' }}>
                                {key === 'fullName'
                                    ? 'My full name'
                                    : key === 'email'
                                        ? 'My email'
                                        : key === 'phone'
                                            ? 'My phone'
                                            : key === 'address'
                                                ? 'My address'
                                                : key === 'personalAccount'
                                                    ? 'My personal account address'
                                                    : key === 'balance'
                                                        ? 'The balance of my personal account'
                                                        : 'Shareholder book'}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={privacySettings[key].groupOwner}
                                onChange={() => handleSwitchChange(key, 'groupOwner')}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={privacySettings[key].groupMembers}
                                onChange={() => handleSwitchChange(key, 'groupMembers')}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={privacySettings[key].customerSupport}
                                onChange={() => handleSwitchChange(key, 'customerSupport')}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Switch
                                checked={privacySettings[key].amlOfficer}
                                onChange={() => handleSwitchChange(key, 'amlOfficer')}
                            />
                        </Grid>
                    </Grid>
                    <hr />
                </Grid>
            ))}
        </ChildCard>
    );
};

export default PrivacySettings;
