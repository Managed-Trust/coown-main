import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import IntroCard from '../../../components/apps/userprofile/profile/IntroCard';
import PhotosCard from '../../../components/apps/userprofile/profile/PhotosCard';
import Post from '../../../components/apps/userprofile/profile/Post';
import FormTabs from '../../../components/forms/form-horizontal/FormTabs';
import ProfileForm from '../../../components/forms/form-horizontal/ProfileForm';

const UserProfile = () => {
  return (
    <PageContainer title="User Profile" description="this is User Profile page">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>

        {/* intro and Photos Card */}
        <Grid item sm={12} lg={4} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              {/* <IntroCard /> */}
            </Grid>
            <Grid item sm={12}>
              {/* <PhotosCard /> */}
            </Grid>
          </Grid>
        </Grid>
        {/* Posts Card */}
        <Grid item sm={12} lg={12} xs={12}>
          <ProfileForm />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
