import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import TopUpComponent from './TopUpComponent';
import RewardTable from './RewardTable';

const AdminSetting = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard page">
      <Box mt={3}>
        <Grid container spacing={3}>
          {/* column */}
          <Grid item xs={12}>
           <RewardTable />
          </Grid>
          <Grid item xs={12}>
            <TopUpComponent />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default AdminSetting;
