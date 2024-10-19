import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import { Container } from '@mui/system';
import Accounts from '../../../components/apps/userprofile/gallery/accountComponent/account';
import IntroCard from './components/IntroCard';
import AccountBalance from './components/AccountBalance';
import YourCurrencies from './components/YourCurrencies';
import BalanceHistory from './components/BalanceHistory';
import PendingMember from './components/PendingMember';
import TransactionHistory from './components/TransactionHistory';

const UserAccount = () => {
  return (
    <PageContainer title="User Profile" description="This is the User Profile page">

      <Grid container spacing={3}>
        {/* Profile Banner */}
        <Grid item xs={12}>
          <ProfileBanner />
        </Grid>
        <Container>
          <IntroCard />
          <AccountBalance />
          <Grid container spacing={2} mb={2}> 
            <Grid item xs={12} sm={4} md={4}>
              <YourCurrencies />
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <BalanceHistory /></Grid>
          </Grid>
          <PendingMember/>
          <TransactionHistory/>
        </Container>
      </Grid>
    </PageContainer>
  );
};

export default UserAccount;
