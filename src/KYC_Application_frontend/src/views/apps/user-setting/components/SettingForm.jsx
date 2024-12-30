import React, { useState, useEffect } from 'react';
import ChildCard from '../../../../components/shared/ChildCard';
import { Box, Paper, Checkbox, Button, Link, Radio, Grid, Chip, Stack, TextField, Typography, FormControl, FormControlLabel, Switch, MenuItem, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import LinkIcon from '@mui/icons-material/Link';
import icp from '../../../../assets/images/svgs/Layer_1.svg';
import { ConnectDialog, useConnect, useDialog } from "@connect2ic/react";
import ic from "ic0";
import { useUser } from '../../../../userContext/UserContext';
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister
const settingsOptions = [
    { label: 'Profile', icon: <AccountCircleIcon /> },
    { label: 'KYC Data', icon: <SecurityIcon /> },
    { label: 'Privacy', icon: <LockIcon /> },
    { label: 'IC ID Connection', icon: <LinkIcon /> }
];

const SettingForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [profileDetails, setProfileDetails] = useState('Anyone with the link');
    const [publicEmail, setPublicEmail] = useState('Only to contacts');
    const [publicPhone, setPublicPhone] = useState('Only to contacts');
    const [profilePicture, setProfilePicture] = useState('Only to contacts');
    const [socialMedia, setSocialMedia] = useState('Only to contacts');
    const [productNotifications, setProductNotifications] = useState(true);
    const [marketingNotifications, setMarketingNotifications] = useState(true);

    const { open, close, isOpen } = useDialog()
    const { isConnected, principal, disconnect } = useConnect({
        onConnect: () => {
            console.log("User connected!");
        },
        onDisconnect: () => {

            console.log("User disconnected!");
        }
    });


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

    const handleConnect = () => {
        if (isConnected) {
            swal({
                title: 'Success',
                text: 'Your wallet disconnected successfully',
                icon: 'success'
            });
            console.log("Disconnecting...");
            disconnect(); // If already connected, clicking will disconnect
        } else {
            console.log("Connecting...");
            open(); // If not connected, clicking will trigger connection
        }
    };

    const handleProductNotificationsChange = (event) => {
        setProductNotifications(event.target.checked);
    };

    const handleMarketingNotificationsChange = (event) => {
        setMarketingNotifications(event.target.checked);
    };

    const handleListItemClick = (index) => {
        setActiveStep(index);
    };
    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h6" gutterBottom>
                                Profile
                            </Typography>
                            <Typography variant="body1" color={'#5A6A85'} >
                                Update your private and public profile information
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} sx={{
                            borderBottom: '1px solid #DFE5EF',
                            py: '20px'
                        }}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                    Account details
                                </Typography>
                                <Typography variant="body1" color={'#5A6A85'} >
                                    Your sign in information
                                </Typography>
                            </Grid>
                            {profile && (
                                <>
                                    <Grid item xs={12} sm={12} md={8}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={12}>
                                                <CustomFormLabel htmlFor="Principal" sx={{ color: '#9499a3' }}>Principal email</CustomFormLabel>
                                                <TextField
                                                    id="Principal"
                                                    fullWidth
                                                    value={profile.id || ''}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <CustomFormLabel htmlFor="Phonenumber">Phone number</CustomFormLabel>
                                                <TextField
                                                    id="Phonenumber"
                                                    fullWidth
                                                    value={profile.phone || ''}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button variant="contained" sx={{ textTransform: 'none' }}>
                                                    Save Changes
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>)
                            }

                        </Grid>

                        <Grid container spacing={2}
                            sx={{
                                borderBottom: '1px solid #DFE5EF',
                                py: '20px'
                            }}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                    Public profile details
                                </Typography>
                                <Typography variant="body1" color={'#5A6A85'} >
                                    This information will be displayed on your public profile
                                </Typography>
                            </Grid>
                            {profile && (
                                <>
                                    <Grid item xs={12} sm={12} md={8}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <CustomFormLabel htmlFor="name" sx={{ color: '#9499a3' }}>Given name</CustomFormLabel>
                                                <TextField
                                                    id="name"
                                                    fullWidth
                                                    value={profile.given_name || ''}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <CustomFormLabel htmlFor="Familyname" sx={{ color: '#9499a3' }}>Family name</CustomFormLabel>
                                                <TextField
                                                    id="Familyname"
                                                    fullWidth
                                                    value={profile.family_name || ''}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomFormLabel htmlFor="Tagline">Tagline</CustomFormLabel>
                                                <TextField
                                                    id="Tagline"
                                                    fullWidth
                                                    placeholder='Tagline'
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <CustomFormLabel htmlFor="PublicEmail">Public email</CustomFormLabel>
                                                <TextField
                                                    id="PublicEmail"
                                                    fullWidth
                                                    value={profile.id || ''}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <CustomFormLabel htmlFor="Publicphone">Public phone</CustomFormLabel>
                                                <TextField
                                                    id="Publicphone"
                                                    fullWidth
                                                    value={profile.phone || ''}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <CustomFormLabel htmlFor="Company">Company</CustomFormLabel>
                                                <TextField
                                                    id="Company"
                                                    fullWidth
                                                    placeholder='Company'
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <CustomFormLabel htmlFor="Jobtitle">Job title</CustomFormLabel>
                                                <TextField
                                                    id="Jobtitle"
                                                    fullWidth
                                                    placeholder='Job title'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomFormLabel htmlFor="Location">Location</CustomFormLabel>
                                                <TextField
                                                    id="Location"
                                                    fullWidth
                                                    placeholder='City or economic area'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CustomFormLabel htmlFor="AboutYou">About you</CustomFormLabel>
                                                <TextField
                                                    id="AboutYou"
                                                    fullWidth
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                    placeholder='Write couple of sentences about you'
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button variant="contained" sx={{ textTransform: 'none' }}>
                                                    Save Changes
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}

                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                    Social media
                                </Typography>
                                <Typography variant="body1" color={'#5A6A85'} >
                                    This information will be displayed on your public profile
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container spacing={2} sx={{
                                    py: '20px'
                                }}>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Linkedin">Linkedin</CustomFormLabel>
                                        <TextField
                                            id="Linkedin"
                                            fullWidth
                                            placeholder='https://'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Telegram">Telegram</CustomFormLabel>
                                        <TextField
                                            id="Telegram"
                                            fullWidth
                                            placeholder='https://'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Openchat">Openchat</CustomFormLabel>
                                        <TextField
                                            id="Openchat"
                                            fullWidth
                                            placeholder='https://'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Website">Website</CustomFormLabel>
                                        <TextField
                                            id="Website"
                                            fullWidth
                                            placeholder='https://'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Github">Github</CustomFormLabel>
                                        <TextField
                                            id="Github"
                                            fullWidth
                                            placeholder='https://'
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" sx={{ textTransform: 'none' }}>
                                            Save Changes
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h6" gutterBottom>
                                KYC Data
                            </Typography>
                            <Typography variant="body1" color={'#5A6A85'} >
                                You  should redo the verification process if you relocate or change citizenship.
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} sx={{
                            py: '20px'
                        }}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                    Details
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="country" sx={{ color: '#9499a3' }}>Residence country</CustomFormLabel>
                                        <TextField
                                            id="country"
                                            fullWidth
                                            value={profile.resident_country}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Address" sx={{ color: '#9499a3' }}>Residence full address</CustomFormLabel>
                                        <TextField
                                            id="Address"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            value={profile.resident_address}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Citizenship" sx={{ color: '#9499a3' }}>Citizenship</CustomFormLabel>
                                        <Box sx={{ mt: 1 }}>
                                            {profile.citizenship && (profile.citizenship).length > 0 ? (
                                                <Stack direction="row" spacing={1} flexWrap="wrap">
                                                    {(profile.citizenship).map((citizenship, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={citizenship}
                                                            color="primary"
                                                            variant="outlined"
                                                            sx={{ mb: 1 }}
                                                        />
                                                    ))}
                                                </Stack>
                                            ) : (
                                                <TextField
                                                    id="Citizenship"
                                                    fullWidth
                                                    placeholder='Add citizenship'
                                                />
                                            )}
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button variant="contained" sx={{ textTransform: 'none' }}>
                                            Redo verification
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Grid item xs={12} sm={12} md={12}>
                            <Typography variant="h6" gutterBottom>
                                Privacy
                            </Typography>
                            <Typography variant="body1" color={'#5A6A85'} >
                                Changing these details will require additional KYC verification
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} sx={{
                            py: '20px'
                        }}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                    Privacy settings
                                </Typography>
                                <Typography variant="body1" color={'#5A6A85'} >
                                    Your name, your tagline, and wallet address will be shared with anyone who has the link
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container spacing={2}>
                                    {/* Show Profile Details */}
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="profiledetails">Show profile details</CustomFormLabel>
                                        <TextField
                                            id="profiledetails"
                                            select
                                            fullWidth
                                            value={profileDetails}
                                            onChange={(e) => setProfileDetails(e.target.value)}
                                        >
                                            <MenuItem value="Anyone with the link">Anyone with the link</MenuItem>
                                            <MenuItem value="Only to contacts">Only to contacts</MenuItem>
                                        </TextField>
                                    </Grid>

                                    {/* Description */}
                                    <Grid item xs={12}>
                                        <Typography variant="body1" color="#5A6A85">
                                            About you, location, company, job title, etc.
                                        </Typography>
                                    </Grid>

                                    {/* Show Public Email */}
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Showpublicemail">Show public email</CustomFormLabel>
                                        <TextField
                                            id="Showpublicemail"
                                            select
                                            fullWidth
                                            value={publicEmail}
                                            onChange={(e) => setPublicEmail(e.target.value)}
                                        >
                                            <MenuItem value="Anyone with the link">Anyone with the link</MenuItem>
                                            <MenuItem value="Only to contacts">Only to contacts</MenuItem>
                                        </TextField>
                                    </Grid>

                                    {/* Show Public Phone */}
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="Showpublicphone">Show public phone</CustomFormLabel>
                                        <TextField
                                            id="Showpublicphone"
                                            select
                                            fullWidth
                                            value={publicPhone}
                                            onChange={(e) => setPublicPhone(e.target.value)}
                                        >
                                            <MenuItem value="Anyone with the link">Anyone with the link</MenuItem>
                                            <MenuItem value="Only to contacts">Only to contacts</MenuItem>
                                        </TextField>
                                    </Grid>

                                    {/* Profile Picture */}
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="profilepicture">Profile picture</CustomFormLabel>
                                        <TextField
                                            id="profilepicture"
                                            select
                                            fullWidth
                                            value={profilePicture}
                                            onChange={(e) => setProfilePicture(e.target.value)}
                                        >
                                            <MenuItem value="Anyone with the link">Anyone with the link</MenuItem>
                                            <MenuItem value="Only to contacts">Only to contacts</MenuItem>
                                        </TextField>
                                    </Grid>

                                    {/* Show Social Media */}
                                    <Grid item xs={12}>
                                        <CustomFormLabel htmlFor="showsocialmedia">Show social media</CustomFormLabel>
                                        <TextField
                                            id="showsocialmedia"
                                            select
                                            fullWidth
                                            value={socialMedia}
                                            onChange={(e) => setSocialMedia(e.target.value)}
                                        >
                                            <MenuItem value="Anyone with the link">Anyone with the link</MenuItem>
                                            <MenuItem value="Only to contacts">Only to contacts</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}
                            sx={{
                                py: '20px'
                            }}>
                            <Grid item xs={12} sm={12} md={4}>
                                <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                                    Email notifications
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={productNotifications}
                                                    onChange={handleProductNotificationsChange}
                                                    color="primary"
                                                />
                                            }
                                            label="I agree to receive product notifications via email"
                                        />
                                    </Grid>

                                    {/* Marketing Notifications Checkbox */}
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={marketingNotifications}
                                                    onChange={handleMarketingNotificationsChange}
                                                    color="primary"
                                                />
                                            }
                                            label="I agree to receive marketing notifications via email"
                                        />
                                    </Grid>

                                    {/* Informational message */}
                                    <Grid item xs={12}>
                                        <Box sx={{ backgroundColor: '#F1F7FF', padding: '10px', borderRadius: '8px' }}>
                                            <Typography variant="body1" color="primary">
                                                You can change group-related notifications in group settings
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                );
            case 3:
                return (<Box>
                    {/* Heading */}
                    <Typography variant="h5" gutterBottom>
                        Internet Identity
                    </Typography>

                    {/* Description */}
                    <Typography variant="body1" gutterBottom>
                        Your COOWN account is linked permanently with an identity for Internet Computer Protocol (ICP) provided here:
                    </Typography>

                    {/* Links */}
                    <Typography>
                        <Link href="https://internetcomputer.org/" target="_blank" rel="noopener">
                            https://internetcomputer.org/
                        </Link>
                    </Typography>
                    <Typography >
                        <Link href="https://identity.ic0.app/" target="_blank" rel="noopener">
                            https://identity.ic0.app/
                        </Link>
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={9} md={8}>
                            {/* Connection Status */}
                            <Paper elevation={1} sx={{ padding: '6px', marginTop: '16px', borderRadius: '12px' }}>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        border: 'none',
                                        textAlign: 'start', // Align text to the start (left)
                                        justifyContent: 'flex-start', // Align content to the start
                                        fontWeight: '600',
                                        fontSize: { xs: '14px', md: '16px' },
                                        paddingLeft: '12px', // Add some padding for alignment
                                        color: '#377DFF', // Color to match the "Connected" color in the image
                                    }}
                                    onClick={handleConnect}
                                >
                                    {/* ICP Logo */}
                                    <img
                                        src={icp}
                                        alt="ICP Logo"
                                        style={{ width: '24px', height: '24px', marginRight: '8px' }}
                                    />
                                    {/* Connected Text */}
                                    {isConnected ? "Disconnect" : "Connected"}
                                </Button>
                            </Paper>


                            {/* Principal ID and Email */}
                            <Paper elevation={1} sx={{ marginTop: '16px' }}>
                                <Box sx={{ p: 2, borderRadius: '8px', marginBottom: 3 }}>
                                    <Grid container>
                                        <Grid item xs={12} sm={4}><Typography variant='body1'>Principal ID</Typography></Grid>
                                        <Grid item xs={12} sm={8}> <Typography variant='body1' fontWeight={'bold'}> un4fu-sample-aaaab-qadjq-cai</Typography></Grid>
                                        <Grid item xs={12} sm={4} mt={0.5}><Typography variant='body1'> Email </Typography></Grid>
                                        <Grid item xs={12} sm={8} mt={0.5}><Typography variant='body1' fontWeight={'bold'}> h.muster@gmail.com</Typography></Grid>
                                    </Grid>
                                </Box>
                            </Paper>

                            {/* Internet Identity Input */}
                            <Box mt={2}>
                                <Typography variant="h6" color="textSecondary">
                                    Internet Identity number
                                </Typography>
                                <Typography variant="body1" mt={2} mb={2} color="#5A6A85">
                                    You can optionally save your Internet Identity number in COOWN for facilitating the sign-in process in the future.
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Enter your Internet Identity (e.g. 2345678)"
                                />
                            </Box>
                            <Grid item xs={12} mt={2}>
                                <Button variant="contained" sx={{ textTransform: 'none' }}>
                                    Save Changes
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={9} md={6}></Grid>
                    </Grid>

                </Box>
                );
        }
    };

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: '10px', height: '100%' }}>
                    <Typography variant="h6" sx={{ marginBottom: '10px' }}>Settings</Typography>
                    <List>
                        {settingsOptions.map((option, index) => (
                            <ListItem
                                button
                                key={option.label}
                                selected={activeStep === index}
                                onClick={() => handleListItemClick(index)}
                            >
                                <ListItemIcon sx={{ color: '#5A6A85' }}>{option.icon}</ListItemIcon>
                                <ListItemText primary={option.label} sx={{ marginLeft: '-20px' }} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={9}>

                <Paper elevation={3} sx={{ padding: '20px' }}>
                    {renderStepContent(activeStep)}
                </Paper>
            </Grid>

            <ConnectDialog dark={false} />
        </Grid>
    );
};

export default SettingForm;
