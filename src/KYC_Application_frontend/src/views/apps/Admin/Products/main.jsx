import React, { useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';

function Products() {
    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = () => {
        setDrawer((prev) => !prev);
      };

    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Banner />
                    </Grid>
                    <Grid item xs={12}>
                        <AdminTabs />
                    </Grid>
                    <Grid item xs={12}>
                        <Dashboard openDrawer={toggleDrawer}/>
                    </Grid>
                </Grid>
            </PageContainer>
            <Sidebar openDrawer={toggleDrawer} drawer={drawer} />
        </>
    );
}

export default Products;