import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import InfoCard from './components/InfoCard';
import PersonalAccount from './components/PersonalAccount';
import CurrentLevelCard from './components/CurrentLevelCard';
import ResellerProgramCard from './components/ResellerProgramCard';
import RecentContact from './components/RecentContact';
import LevelsStepper from './components/LevelsStepper';
import Overview from '../../../components/apps/userprofile/gallery/overviewComponent/overview';
import ActivityStream from './components/ActivityStream';
import RewardTabs from './components/RewardTabs';
import { Container } from '@mui/system';

const UserDashboard = () => {
  return (
    <PageContainer title="User Profile" description="This is the User Profile page">

      <Grid container spacing={3}>
        {/* Profile Banner */}
        <Grid item xs={12}>
          <ProfileBanner />
        </Grid>
        <Container>
          <Grid item xs={12} mt={2}>
            <InfoCard />
          </Grid>

          {/* Main Content Section */}
          <Grid container spacing={3} sx={{ mt: 2, mb: 2 }}>

            {/* Left Column (Personal Account, Reseller Program, Recent Contacts) */}
            <Grid item xs={12} md={8}>
              <PersonalAccount />
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <ResellerProgramCard />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <RecentContact />
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column (Current Level and Levels Stepper) */}
            <Grid item xs={12} md={4}>
              <CurrentLevelCard />
              <LevelsStepper sx={{ mt: 2 }} />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <RewardTabs />
          </Grid>
          <Grid item xs={12}>
            <ActivityStream />
          </Grid>
          </Container>
      </Grid>
    </PageContainer>
  );
};

export default UserDashboard;
