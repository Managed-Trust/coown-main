import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button, TextField, Divider } from '@mui/material';
import GoogleLoginLogo from "../../../assets/images/login/GoogleLogin.svg";
import icp from "../../../assets/images/svgs/icLogo.svg"
import { useUser } from '../../../userContext/UserContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ic from "ic0";
import swal from 'sweetalert';
import { ConnectDialog, useConnect, useDialog } from "@connect2ic/react";

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const ConnectPage = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [visit, setVisit] = useState(null);
    const [userRecord, setUserRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [internetId, setInternetId] = useState(null);
    const [code, setCode] = useState(null);
    const [loginCount, setLoginCount] = useState(1);
    const { isConnected, principal, disconnect } = useConnect({
        onConnect: () => {
            console.log("User connected!");
        },
        onDisconnect: () => {

            console.log("User disconnected!");
        }
    });

    const { open, close, isOpen } = useDialog()

    const handleConnect = () => {
        if (isConnected) {
            swal({
                title: 'Success',
                text: 'Your wallet disconnected successfully',
                icon: 'success'
            });
            console.log("Disconnecting...");
            disconnect(); 
            navigate(-1);// If already connected, clicking will disconnect
        } else {
            console.log("Connecting...");
            open(); // If not connected, clicking will trigger connection
        }
    };

    const handleSaveCode = async () => {
        try {
            const response = await ledger.call('updateIICode', user, code);
            console.log('res3', response);
            if (response == 'iiCode updated successfully for the associated email.') {
                swal('Success', 'Internet Identity Code saved successfully', 'success');
                navigate('/dashboards/ecommerce');
            } else {
                swal('Info', response, 'info');
            }

        } catch (e) {

        }
    }


    const handleCopy = (internetId) => {
        navigator.clipboard.writeText(internetId)
        swal({
            title: 'Success',
            text: 'Content Copy to Clipboard',
            icon: 'success'

        })
    }
    const CheckStatus = async () => {
        setLoading(true);
        try {
            const response = await ledger.call('getIIByEmail', user);
            console.log('res', response);
            if (response.length === 0) {
                setLoginCount(1);
                setVisit('first');
            }
            else if(response[0].iiCode.length === 0){
                setUserRecord(response);
                setLoginCount(4);
                setVisit('second');
            }
            else {
                setUserRecord(response);
                setInternetId(response[0].iiCode[0]);
                setLoginCount(5);
                setVisit('second');
                //It's four second time 
                // setLoginCount(4);

            }
        } catch (error) {
            console.log('Some thing went wrong');
        }
        setLoading(false);
    }

    const addInternetIdentity = async () => {
        try {
            console.log('principal', principal);
            const response = await ledger.call('associateIIWithEmail', user, principal);
            console.log('res1', response);
            if (response == 'Internet Identity (II) successfully associated with the email.') {
                swal("Success", 'Internet Identity (II) successfully associated with the email', 'success');
                setLoginCount(2);
            } else {
                // swal("Info", response, 'info');

            }
        } catch (e) {
            console.log('Some thing went wrong');

        }

    }
    const CheckIdentity = () => {
            console.log('principal', principal);
            if(principal == userRecord[0].ii){
                swal("Success", 'Internet Identity (II) connected successfully', 'success'); 
                navigate('/dashboards/ecommerce');
            }else{
                setLoginCount(3);
            }
    }

    useEffect(() => {
        console.log('user', user);
        if (user && visit == null) {
            CheckStatus();
        }
    }, [user]);
    useEffect(() => {
        if (principal && user && loginCount == 1) {
            addInternetIdentity();
        }else if (principal && user && (loginCount == 4 || loginCount == 5)) {
            CheckIdentity();
        }
    }, [principal, user]);

    const handleBack = () => {
        navigate('/user/login'); // Replace with your back navigation logic
    };
    const handleSkip = () => {
        navigate('/dashboards/ecommerce'); // Replace with your back navigation logic
    };

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
                {/* Left section with image */}
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    sx={{
                        backgroundColor: '#f0f4f8',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 2,
                    }}
                >
                    <img
                        src={GoogleLoginLogo}
                        alt="Login Illustration"
                        style={{
                            maxWidth: '90%',
                            height: 'auto',
                        }}
                    />
                </Grid>

                {/* Right section with form */}
                {loginCount == 1 &&
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: { xs: 'center', sm: 'center', md: 'flex-start' },
                            padding: { xs: 2, sm: 6, md: '60px 120px 100px 120px' },
                        }}
                    >
                        <Box sx={{ width: '100%', maxWidth: 600 }}>
                            <Grid container mb={6}>
                                <img src={icp} alt="ICP Logo" />
                            </Grid>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    fontSize: { xs: '22px', sm: '28px', md: '32px' },
                                }}
                            >
                                Connect with Internet Identity to be able to use your accounts.
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#555',
                                    fontSize: { xs: '14px', sm: '14px', md: '14px' },
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                Use your existing ID or create one for free. When creating your identity on Internet Computer Protocol (ICP), you will receive a passkey on your personal device. The personal device can be any smartphone or desktop computer that uses advanced user identification methods. To secure access to your account, consider creating additional passkeys on additional devices. Consider also setting a passphrase and make sure you save it securely.
                                <Typography variant="body1" color="primary" sx={{ mt: 1 }}>
                                    Learn more
                                </Typography>
                            </Typography>

                            <Divider sx={{ marginY: 2 }} />

                            <Box sx={{ backgroundColor: '#FBF2EF', p: 2, borderRadius: '8px', marginBottom: 3 }}>
                                <Typography variant="body2" sx={{ color: '#FF695E', fontSize: { xs: '14px', md: '14px' } }}>
                                    If you lose all your passkeys and your passphrase, you will no longer have access to your wallet and risk permanently losing your funds!
                                </Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    borderRadius: '12px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                    marginBottom: 2,
                                }}
                                onClick={handleConnect}
                            >
                                Connect with Internet Identity
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderRadius: '12px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                }}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                        </Box>
                    </Grid>
                }
                {loginCount == 2 &&
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: { xs: 'center', sm: 'center', md: 'center' },
                            padding: { xs: 2, sm: 6, md: 16 },
                        }}
                    >
                        <Box sx={{ width: '100%', maxWidth: 600 }}>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    fontSize: { xs: '22px', sm: '28px', md: '32px' },
                                }}
                            >
                                Internet Identity successfully connected with your account
                            </Typography>

                            <Box sx={{ backgroundColor: '#F2F6FA', p: 2, borderRadius: '8px', marginBottom: 3 }}>
                                <Grid container>
                                    <Grid item xs={12} sm={4}><Typography variant='body2'>Principal ID</Typography></Grid>
                                    <Grid item xs={12} sm={8}> <Typography variant='body2' fontWeight={'bold'}> {principal} </Typography></Grid>
                                    <Grid item xs={12} sm={4} mt={0.5}><Typography variant='body2'> Email </Typography></Grid>
                                    <Grid item xs={12} sm={8} mt={0.5}><Typography variant='body2' fontWeight={'bold'}> {user} </Typography></Grid>
                                </Grid>
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#555',
                                    fontSize: { xs: '14px', sm: '14px', md: '14px' },
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                <Typography variant="body1" sx={{ mt: 1, fontWeight: 'bold' }}>
                                    Save Internet Identity
                                </Typography>
                                You can optionally save you Internet Identity in COOWN for facilitating the sing in process in future.
                            </Typography>
                            <TextField
                                margin="normal"
                                fullWidth
                                placeholder='Enter your internet identity (e.g 2345678)'
                                type="number"
                                onChange={(e) => setCode(e.target.value)}
                                variant="outlined"
                                sx={{ borderRadius: '8px', marginBottom: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    borderRadius: '5px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                    marginBottom: 2,
                                }}
                                onClick={handleSaveCode}
                            >
                                Save
                            </Button>

                            <Button
                                variant="outlined"
                                fullWidth
                                sx={{
                                    borderRadius: '5px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                }}
                                onClick={handleSkip}
                            >
                                Skip
                            </Button>
                        </Box>
                    </Grid>
                }

                {loginCount == 3 &&
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: { xs: 'center', sm: 'center', md: 'center' },
                            padding: { xs: 2, sm: 6, md: 16 },
                        }}
                    >
                        <Box sx={{ width: '100%', maxWidth: 600 }}>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    fontSize: { xs: '22px', sm: '28px', md: '32px' },
                                }}
                            >Wrong Internet Identity connected
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: '#555',
                                    fontSize: { xs: '14px', sm: '14px', md: '14px' },
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                This Internet identity is not associated with your COOWN account. Please connect with correct ID. </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    borderRadius: '5px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                    marginBottom: 2,
                                }}
                                onClick={handleConnect}
                            >
                                Disconnect
                            </Button>
                        </Box>
                    </Grid>
                }


                {loginCount == 4 &&
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: { xs: 'center', sm: 'center', md: 'center' },
                            padding: { xs: 2, sm: 6, md: 16 },
                        }}
                    >
                        <Box sx={{ width: '100%', maxWidth: 600 }}>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    fontSize: { xs: '22px', sm: '28px', md: '32px' },
                                }}
                            >Connect with Internet Computer
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#555',
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                Use the Internet Identity (IC ID) associated with your account on COOWN
                            </Typography>
                            <Box sx={{ backgroundColor: '#F2F6FA', p: 2, borderRadius: '8px', marginBottom: 3 }}>
                                <Grid container>
                                    <Grid item xs={12} sm={4}><Typography variant='body1'>Principal ID</Typography></Grid>
                                    <Grid item xs={12} sm={8}> <Typography variant='body1' fontWeight={'bold'}> {userRecord && userRecord.length > 0 && userRecord[0].ii}</Typography></Grid>
                                    <Grid item xs={12} sm={4} mt={1}><Typography variant='body1'> Email </Typography></Grid>
                                    <Grid item xs={12} sm={8} mt={1}><Typography variant='body1' fontWeight={'bold'}> {user} </Typography></Grid>
                                </Grid>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#555',
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                You must always connect using the same Internet Computer ID. Your email address and Internet Identity (ID) are permanently linked for user identification, and this setting cannot be changed.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    borderRadius: '5px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                    marginBottom: 2,
                                }}
                                onClick={handleConnect}
                            >
                                Connect with Internet Identity
                            </Button>
                        </Box>
                    </Grid>
                }
                {loginCount == 5 &&
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: { xs: 'center', sm: 'center', md: 'center' },
                            padding: { xs: 2, sm: 6, md: 16 },
                        }}
                    >
                        <Box sx={{ width: '100%', maxWidth: 600 }}>

                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                    marginBottom: 2,
                                    fontSize: { xs: '22px', sm: '28px', md: '32px' },
                                }}
                            >Connect with Internet Computer
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#555',
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                Use the Internet Identity (IC ID) associated with your account on COOWN
                            </Typography>
                            <Box sx={{ backgroundColor: '#F2F6FA', p: 2, borderRadius: '8px', marginBottom: 3 }}>
                                <Grid container>
                                    <Grid item xs={12} sm={4}><Typography variant='body1'>Principal ID</Typography></Grid>
                                    <Grid item xs={12} sm={8}> <Typography variant='body1' fontWeight={'bold'}> {userRecord && userRecord.length > 0 && userRecord[0].ii} </Typography></Grid>
                                    <Grid item xs={12} sm={4} mt={1}><Typography variant='body1'> Email </Typography></Grid>
                                    <Grid item xs={12} sm={8} mt={1}><Typography variant='body1' fontWeight={'bold'}> {user} </Typography></Grid>
                                    <Grid item xs={12} sm={4} mt={1}>
                                        <Typography variant="body2" color="textSecondary">
                                            Internet Computer ID
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8} mt={1}>
                                        <Typography variant="body1" fontWeight="bold" display="flex" alignItems="center">
                                            {internetId}
                                            <ContentCopyIcon
                                                sx={{ marginLeft: 1, cursor: 'pointer', fontSize: '16px' }}
                                                onClick={() => handleCopy(internetId)}
                                            />
                                        </Typography>
                                    </Grid>  </Grid>
                            </Box>

                            <Typography
                                variant="body2"
                                sx={{
                                    color: '#555',
                                    lineHeight: 1.6,
                                    marginBottom: 2,
                                }}
                            >
                                You must always connect using the same Internet Computer ID. Your email address and Internet Identity (ID) are permanently linked for user identification, and this setting cannot be changed.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                sx={{
                                    borderRadius: '5px',
                                    padding: '10px 0',
                                    fontWeight: '600',
                                    fontSize: { xs: '14px', md: '16px' },
                                    marginBottom: 2,
                                }}
                                onClick={handleConnect}
                            >
                                Connect with Internet Identity
                            </Button>
                        </Box>
                    </Grid>
                }
            </Grid>
            <ConnectDialog dark={false} />
        </>
    );
};

export default ConnectPage;
