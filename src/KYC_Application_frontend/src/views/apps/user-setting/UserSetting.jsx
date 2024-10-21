import React from 'react';
import { Grid, Container} from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import SettingForm from './components/SettingForm';

const UserSetting = () => {
  return (
    <PageContainer title="User Profile" description="This is the User Profile page">

      <Grid container spacing={3}>
        {/* Profile Banner */}
        <Grid item xs={12}>
          <ProfileBanner />
        </Grid>
        <Container>
          <SettingForm />
        </Container>
      </Grid>
    </PageContainer>
  );
};

export default UserSetting;
