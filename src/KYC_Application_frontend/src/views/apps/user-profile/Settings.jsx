import * as React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Tabs, Tab, Box, CardContent, Divider } from '@mui/material';

// components
import AccountTab from '../../../components/pages/account-setting/AccountTab';
import { IconArticle, IconBell, IconLock, IconUserCircle } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import NotificationTab from '../../../components/pages/account-setting/NotificationTab';
import BillsTab from '../../../components/pages/account-setting/BillsTab';
import SecurityTab from '../../../components/pages/account-setting/SecurityTab';
import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Account Setting',
    },
];


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const AccountSetting = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <PageContainer title="Account Setting" description="this is Account Setting page">

            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ProfileBanner />
                </Grid>
                <Grid item xs={12}>
                    <BlankCard>
                        <Box sx={{ maxWidth: { xs: 320, sm: 480 } }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                scrollButtons="auto"
                                aria-label="basic tabs example" variant="scrollable"
                            >

                                <Tab
                                    iconPosition="start"
                                    icon={<IconLock size="22" />}
                                    label="Privacy Settings"
                                    {...a11yProps(0)}
                                />
                            </Tabs>
                        </Box>
                        <Divider />
                        <CardContent>
                            <TabPanel value={value} index={0}>
                                <NotificationTab />
                            </TabPanel>
                        </CardContent>
                    </BlankCard>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default AccountSetting;
