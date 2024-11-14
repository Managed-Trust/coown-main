import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import { Container } from '@mui/system';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import InfoCard from './InfoCard';
import Dashboard from './Dashboard';
function Fees() {
    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid item sm={12}>
                    <Banner />
                    <AdminTabs />
                    <InfoCard />
                    <Dashboard /> 
                </Grid>
            </PageContainer>
        </>
    );
}

export default Fees;