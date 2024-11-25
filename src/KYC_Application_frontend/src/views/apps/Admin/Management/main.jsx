import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import Dashboard from './Dashboard';
function Management() {
    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid item sm={12}>
                    <Banner />
                    <AdminTabs />
                    <Dashboard /> 
                </Grid>
            </PageContainer>
        </>
    );
}

export default Management;