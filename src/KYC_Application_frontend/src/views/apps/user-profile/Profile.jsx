import React from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import ProfileForm from '../../../components/forms/form-horizontal/ProfileForm';
import { Container } from '@mui/system';
import AboutCard from './profileComponent/AboutCard';
import ShareProfile from './profileComponent/ShareProfile';

const Profile = () => {
    return (
        <PageContainer title="User Profile" description="this is User Profile page">

            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ProfileBanner />
                </Grid>
                <Container>
                    <AboutCard/>
                    <ShareProfile />
                </Container>
            </Grid>
        </PageContainer>
    );
};

export default Profile;
