import React,{useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import AddPolicy from './AddPolicy';
function Management() {
    const [drawer, setDrawer] = useState(false);
    const [drawer2, setDrawer2] = useState(false);
    const toggleDrawer = () => {        
        setDrawer((prev) => !prev);
    };
    const toggleDrawer2 = () => {        
        setDrawer2((prev) => !prev);
    };
    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid item sm={12}>
                    <Banner />
                    <AdminTabs />
                    <Dashboard openDrawer={toggleDrawer} openDrawer2={toggleDrawer2} /> 
                </Grid>
            </PageContainer>
            <Sidebar openDrawer={toggleDrawer} drawer={drawer}  />
            <AddPolicy openDrawer={toggleDrawer2} drawer={drawer2}  />
        </>
    );
}

export default Management;