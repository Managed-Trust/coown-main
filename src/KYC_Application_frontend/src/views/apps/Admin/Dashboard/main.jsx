import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import { Container } from '@mui/system';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import InfoCard from './InfoCard';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

function AdminMain() {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = () => {
        setDrawer((prev) => !prev);
    };
    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid item sm={12}>
                    <Banner />
                    <AdminTabs />
                    <InfoCard />
                    <Dashboard openDrawer={toggleDrawer} />
                </Grid>
            </PageContainer>
            <Sidebar openDrawer={toggleDrawer} drawer={drawer} />
        </>
    );
}

export default AdminMain;