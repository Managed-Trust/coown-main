import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import AccountBanner from '../../../components/apps/accounts/AccountBanner';

const Account = () => {
  return (
    <PageContainer title="User Profile" description="this is User Profile page">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <AccountBanner />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Account;
