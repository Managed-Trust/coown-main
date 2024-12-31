import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../../components/container/PageContainer';
import Banner from './Banner';
import AdminTabs from './AdminTabs';
import InfoCard from './InfoCard';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

function Fees() {
    const [drawer, setDrawer] = useState(false);
    const [renderAgain, setRenderAgain] = useState(false);
    const [transactionRules, setTransactionRule] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        const fetchTransactionRule = async () => {
            try {
                const response = await ledger.call('getAllTransactionRules');
                console.log('Transaction Rules:', response);
                setTransactionRule(response);
            } catch (e) {
                console.log('Error Fetching Transaction Rules:', e);
            }
        };
        fetchTransactionRule();
    }, [renderAgain]);
    const toggleDrawer = (transaction) => {
        console.log('Transaction:', transaction);
        setSelectedTransaction(transaction);

        setDrawer((prev) => !prev);
    };

    const handleFormSubmit = () => {
        setRenderAgain((prev) => !prev); // Trigger useEffect
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
                        <InfoCard />
                    </Grid>
                    <Grid item xs={12}>
                        <Dashboard
                            openDrawer={toggleDrawer}
                            transactionRules={transactionRules}
                            renderAgain={renderAgain}
                            onFormSubmit={handleFormSubmit}
                        />
                    </Grid>
                </Grid>
            </PageContainer>
            <Sidebar openDrawer={toggleDrawer} drawer={drawer} transaction={selectedTransaction} />

        </>
    );
}

export default Fees;