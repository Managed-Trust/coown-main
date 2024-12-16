import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';

import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import ProfileForm from '../../../components/forms/form-horizontal/ProfileForm';
import { Container } from '@mui/system';
import AboutCard from './profileComponent/AboutCard';
import ShareProfile from './profileComponent/ShareProfile';
import ic from "ic0";
import { useUser } from '../../../userContext/UserContext';
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister
const Profile = () => {
    const { user, setUser } = useUser();
    const [profile, setProfile] = useState(null);
    const fetchProfile = async () => {
        try {
            const response = await ledger.call("getCustomer", user);
            console.log("Profile:", response);
            if (response.length > 0) {
                const profileData = response[0];
                setProfile(profileData);
            }

        } catch (e) {
            console.log("Error Fetching Profile:", e);
        }
    };

    useEffect(() => {
        console.log('user', user);
        if (user) {
            fetchProfile();
        }
    }, [user]);
    return (
        <PageContainer title="User Profile" description="this is User Profile page">

            <Grid container spacing={3}>
                <Grid item sm={12}>
                    <ProfileBanner />
                </Grid>
                <Container>
                    <AboutCard profile={profile}/>
                    <ShareProfile />
                </Container>
            </Grid>
        </PageContainer>
    );
};

export default Profile;
