import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import AddPolicy from './AddPolicy';
import EditPolicy from './EditPolicy';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

function Management() {
    const [drawer, setDrawer] = useState(false);
    const [drawer2, setDrawer2] = useState(false);
    const [drawer3, setDrawer3] = useState(false);
    const [polices, setPolices] = useState([]);

    useEffect(() => {
    const fetchPolicies = async () => {
        try {
          const response = await ledger.call('getPolicies');
          console.log('response policy', response);
          if (response) {
            setPolices(response);
           
          }
        } catch (error) {
          console.log('error', error);
        }
      }
      fetchPolicies();
    },[]);
    const toggleDrawer = () => {        
        setDrawer((prev) => !prev);
    };
    const toggleDrawer2 = () => {        
        setDrawer2((prev) => !prev);
    };
    const toggleDrawer3 = () => {        
        setDrawer3((prev) => !prev);
    };
    return (
        <>
            <PageContainer title="Admin Dashboard" description="this is Admin Dashboard page">
                <Grid item sm={12}>
                    <Banner />
                    <AdminTabs />
                    <Dashboard openDrawer={toggleDrawer} openDrawer2={toggleDrawer2} polices={polices}/> 
                </Grid>
            </PageContainer>
            <Sidebar openDrawer={toggleDrawer} drawer={drawer}  />
            <AddPolicy openDrawer={toggleDrawer2} drawer={drawer2}  />
            <EditPolicy openDrawer={toggleDrawer3} drawer={drawer3}  />
        </>
    );
}

export default Management;