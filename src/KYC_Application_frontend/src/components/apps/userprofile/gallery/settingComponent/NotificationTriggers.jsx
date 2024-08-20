import React,{useState } from 'react';
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

const NotificationTriggers = () => {
    const [settings, setSettings] = useState({
        transactions: {
            low: { inApp: false, email: false },
            medium: { inApp: false, email: false },
            high: { inApp: true, email: true },
            veryHigh: { inApp: true, email: true },
        },
        actions: {
            newMember: { inApp: false, email: true },
            withdrawal: { inApp: true, email: true },
            powerChange: { inApp: true, email: true },
            newAdmin: { inApp: true, email: true },
            newOwner: { inApp: true, email: true },
        },
    });

    const handleSwitchChange = (section, item, type) => {
        setSettings((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [item]: {
                    ...prev[section][item],
                    [type]: !prev[section][item][type],
                },
            },
        }));
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <ChildCard p={3}>
            <Typography variant="h6" gutterBottom>
                Notifications
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Select which group notifications you'd like to receive.
            </Typography>

            <Box mt={2} mb={2} sx={{ backgroundColor: '#faf8f8ba', borderRadius: '5px' }}>
                <Typography p={2} variant="h5" gutterBottom>
                    Transactions
                </Typography>
            </Box>

            <Grid p={2} container spacing={2} alignItems="center">
                <Grid item xs={isSmallScreen ? 12 : 6}>
                    <Typography variant="body2">Amount</Typography>
                </Grid>
                {!isSmallScreen && (
                    <>
                        <Grid item xs={3}>
                            <Typography variant="body2">In-app notification</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body2">Email notification</Typography>
                        </Grid>
                    </>
                )}
            </Grid>

            {Object.keys(settings.transactions).map((key) => (
                <Box key={key} p={1}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={isSmallScreen ? 12 : 6}>
                            <Typography  variant="body1" sx={{fontWeight:'700'}}>
                                {key === 'low'
                                    ? '$0 - $5'
                                    : key === 'medium'
                                        ? '$5 - $100'
                                        : key === 'high'
                                            ? '$100 - $1000'
                                            : '$1000+'}
                            </Typography>
                        </Grid>
                        {isSmallScreen ? (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant="body2">In-app notification</Typography>
                                    <Switch
                                        checked={settings.transactions[key].inApp}
                                        onChange={() =>
                                            handleSwitchChange('transactions', key, 'inApp')
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Email notification</Typography>
                                    <Switch
                                        checked={settings.transactions[key].email}
                                        onChange={() =>
                                            handleSwitchChange('transactions', key, 'email')
                                        }
                                    />
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={3}>
                                    <Switch
                                        checked={settings.transactions[key].inApp}
                                        onChange={() =>
                                            handleSwitchChange('transactions', key, 'inApp')
                                        }
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Switch
                                        checked={settings.transactions[key].email}
                                        onChange={() =>
                                            handleSwitchChange('transactions', key, 'email')
                                        }
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                </Box>
            ))}

            <Box mt={2} mb={2} sx={{ backgroundColor: '#faf8f8ba', borderRadius: '5px' }}>
                <Typography p={2} variant="h5" gutterBottom>
                    Group actions
                </Typography>
            </Box>

            <Grid p={1} container spacing={2} alignItems="center">
                <Grid item xs={isSmallScreen ? 12 : 6}>
                    <Typography variant="body2">Event</Typography>
                </Grid>
                {!isSmallScreen && (
                    <>
                        <Grid item xs={3}>
                            <Typography variant="body2">In-app notification</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="body2">Email notification</Typography>
                        </Grid>
                    </>
                )}
            </Grid>

            {Object.keys(settings.actions).map((key) => (
                <Box key={key} p={1}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={isSmallScreen ? 12 : 6}>
                            <Typography variant="body1" sx={{fontWeight:'700'}}>
                                {key === 'newMember'
                                    ? 'New member joined'
                                    : key === 'withdrawal'
                                        ? 'Withdrawal requests'
                                        : key === 'powerChange'
                                            ? 'Sending power changes'
                                            : key === 'newAdmin'
                                                ? 'New group admin'
                                                : 'New group owner'}
                            </Typography>
                        </Grid>
                        {isSmallScreen ? (
                            <>
                                <Grid item xs={6}>
                                    <Typography variant="body2">In-app notification</Typography>
                                    <Switch
                                        checked={settings.actions[key].inApp}
                                        onChange={() =>
                                            handleSwitchChange('actions', key, 'inApp')
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Email notification</Typography>
                                    <Switch
                                        checked={settings.actions[key].email}
                                        onChange={() =>
                                            handleSwitchChange('actions', key, 'email')
                                        }
                                    />
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={3}>
                                    <Switch
                                        checked={settings.actions[key].inApp}
                                        onChange={() =>
                                            handleSwitchChange('actions', key, 'inApp')
                                        }
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <Switch
                                        checked={settings.actions[key].email}
                                        onChange={() =>
                                            handleSwitchChange('actions', key, 'email')
                                        }
                                    />
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                </Box>
            ))}
        </ChildCard>
    );
};

export default NotificationTriggers;
