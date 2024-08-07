
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChildCard from '../../../components/shared/ChildCard';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';
import './style.css';
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister
import {
    Grid,
    Typography,
    Box, Switch, TextField, Button, Skeleton, CircularProgress
} from "@mui/material";
import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Use a strong secret key

const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
const BCrumb = [
    {
        to: '/',
        title: 'Operator',
    },
    {
        title: 'AML',
    },
    {
        title: 'Approval',
    },
];

const UserApproval = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [documentLoader, setDocumentLoader] = useState(false);
    const [identityLoader, setIdentityLoader] = useState(false);
    const [approving, setApproving] = useState(false);
    const [document, setDocument] = useState(false);
    const [identity, setIdentity] = useState(false);
    const { isConnected, principal } = useConnect({
        onConnect: () => { },
        onDisconnect: () => { },
    });

    useEffect(() => {
        fetchProfile();
        checkDocumentStatus();
        checkIdentityStatus();
    }, [principal]);


    const showDeclineReasonAlert = () => {
        Swal.fire({
            title: 'Decline reason',
            input: 'textarea',
            inputPlaceholder: 'Add decline reason',
            inputAttributes: {
                rows: 4,
            },
            showCancelButton: true,
            confirmButtonText: 'Decline',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'swal2-confirm'
            },
            preConfirm: (reason) => {
                if (!reason) {
                    Swal.showValidationMessage('Please enter a decline reason');
                }
                return reason;
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const responseDecline = await ledger.call("declineCustomer", id, result.value);
                    console.log('Response of decline:', responseDecline);
                    await Swal.fire('Success', 'User Request Declined Successfully!', 'success');
                } catch (e) {
                    console.log("Error Verifying:", e);
                    await Swal.fire('Error', 'There was an error declining the request', 'error');
                } finally {
                    navigate(-1);
                }
            }
        });
    };

    const showApproveReasonAlert = () => {
        Swal.fire({
            title: 'Limitation reason',
            input: 'textarea',
            inputPlaceholder: 'Add Limitation reason',
            inputAttributes: {
                rows: 4,
            },
            showCancelButton: true,
            confirmButtonText: 'Approve',
            cancelButtonText: 'Cancel',
            preConfirm: (reason) => {
                if (!reason) {
                    Swal.showValidationMessage('Please enter a limitation reason');
                }
                return reason;
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const responseLimit = await ledger.call("limitCustomer", id, result.value);
                    console.log('Response of limit:', responseLimit, '', result.value);
                    await Swal.fire('Success', 'User Request Verified Successfully!', 'success');
                } catch (e) {
                    console.log("Error Verifying:", e);
                    await Swal.fire('Error', 'There was an error approving the request', 'error');
                } finally {
                    navigate(-1);
                }
            }
        });
    }


    const handleVerify = async () => {
        setApproving(true);
        try {
            const response = await ledger.call("verifyCustomer", id);
            console.log('respose', response);
            Swal.fire("Success", 'User Verified Successfully!', "success");
        } catch (e) {
            console.log("Error Verifying:", e);
            Swal.fire("Error", 'There was an error verifying the user', "error");
        } finally {
            setApproving(false);
            navigate(-1);
        }
    }

    const isBase64Image = (base64) => {
        return base64.startsWith('/9j/') || base64.startsWith('iVBORw0KGgo'); // JPEG or PNG
    }

    const displayFile = (base64) => {
        if (isBase64Image(base64)) {
            return <img src={`data:image/jpeg;base64,${base64}`} alt="Residency Document" style={{ maxWidth: '100%', width: '150px', height: 'auto', marginTop: 10 }} />;
        } else {
            return (
                <object data={`data:application/pdf;base64,${base64}`} type="application/pdf" width="100%" height="600px">
                    <p>This browser does not support PDFs. Please download the PDF to view it: <a href={`data:application/pdf;base64,${base64}`}>Download PDF</a>.</p>
                </object>
            );
        }
    }
    const fetchProfile = async () => {
        setLoading(true);
        try {
            const response = await ledger.call("getCustomer", id);
            console.log("Profile:", response);
            const profileData = response[0];
            setProfile(profileData);
            console.log('Document type', decryptData(profileData.document_type)
            );
        } catch (e) {
            console.log("Error Fetching Profile:", e);
        }
        setLoading(false);
    };

    const checkDocumentStatus = async () => {
        try {
            const result = await ledger.call("isDocumentVerified", id);
            console.log('result document', result);
            setDocument(result[0]);
        } catch (e) {
            console.log("Error checking document verified:", e);
        }
    };
    const checkIdentityStatus = async () => {
        try {
            const result = await ledger.call("isIdentityVerified", id);
            console.log('result identity', result);
            setIdentity(result[0]);
        } catch (e) {
            console.log("Error checking identity:", e);
        }
    }

    const toggleDocument = async () => {
        setDocumentLoader(true);
        try {
            const newDocumentState = !document;
            const result = await ledger.call("verifyDocument", id, newDocumentState);
            console.log('result newDocumentState', newDocumentState);
            setDocument(newDocumentState);
        } catch (e) {
            console.log("Error toggling Document:", e);
        }
        setDocumentLoader(false);
    };
    const toggleIdentity = async () => {
        setIdentityLoader(true);
        try {
            const newIdentityState = !identity;
            const result = await ledger.call("verifyIdentity", id, newIdentityState);
            console.log('result newIdentityState', newIdentityState);
            setIdentity(newIdentityState);
        } catch (e) {
            console.log("Error toggling Document:", e);
        }
        setIdentityLoader(false);
    }
    return (
        <PageContainer title="Create New Group" description="this is Note page">
            <Breadcrumb title="Request ID-156165" items={BCrumb} />
            {isLoading ? (
                <>
                    <Skeleton
                        animation="wave"
                        variant="square"
                        width="100%"
                        height={400}
                        sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
                    ></Skeleton>
                </>
            ) : (
                profile &&
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Box p={2}>
                            <ChildCard>
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Typography variant="h6" gutterBottom>
                                                Personal Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Given Name</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.given_name)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Family Name</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}> {decryptData(profile.family_name)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Date of birth</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}> {decryptData(profile.birth_date)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Birth Country</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.birth_country)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Phone</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'blue' }}>{decryptData(profile.phone)}</Typography>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ChildCard>
                        </Box>
                        <Box p={2}>
                            <ChildCard>
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Typography variant="h6" gutterBottom>
                                                Address
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Residence full address</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.resident_address)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Residence Country</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.resident_country)}</Typography>

                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12}>
                                                {displayFile(profile.residency_doc[0])}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ChildCard>
                        </Box>
                        <Box p={2}>
                            <ChildCard>
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Typography variant="h6" gutterBottom>
                                                Document Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Document type</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.document_type)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Citizenship</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.citizenship[0])}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Document number</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.document_number)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Issuing country</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.issuing_country)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Document issue date</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.issuance_date)}</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Document expirt date</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{decryptData(profile.expiry_date)}</Typography>

                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} mt={0.5}>
                                                {displayFile(profile.document_photo[0])}
                                            </Grid>

                                            <Grid item xs={12} mt={0.5}>
                                                <img
                                                    src={`${profile.live_photo[0]}`}
                                                    alt="Identity Document"
                                                    style={{ maxWidth: '100%', width: '150px', height: 'auto', marginTop: 10 }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ChildCard>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Box p={2}>
                            <ChildCard>
                                <Box p={2}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant='h5'>Verification steps</Typography>
                                            <Typography variant='body2' m={0.2} >Proceed with Verification steps and approve or decline the user's request</Typography>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} display={'flex'}>
                                                    <Switch /> <Typography variant="body1" p={0.2}>Address matches user's data</Typography>
                                                </Grid>
                                                <Grid item xs={12} display={'flex'}>
                                                {documentLoader ? <CircularProgress style={{ color: 'black' }} size={24} /> : <Switch checked={document} onClick={toggleDocument} /> }  <Typography variant="body1" p={0.2}>Document matches user's data</Typography>
                                                </Grid>
                                                <Grid item xs={12} display={'flex'}>
                                                {identityLoader ? <CircularProgress style={{ color: 'black' }} size={24} /> : <Switch checked={identity} onClick={toggleIdentity} /> }
                                                     <Typography variant="body1" p={0.2}>Face matches document</Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box mt={2} p={2} bgcolor="#fce4ec">
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                                                            <Typography variant="h6" color="red">
                                                                AML risk analysis
                                                            </Typography>
                                                            <Typography variant="h6" color="red">
                                                                14
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={0.5}>
                                                            <Typography variant="body2" color="red">
                                                                Residency
                                                            </Typography>
                                                            <Typography variant="body2" color="red">
                                                                7
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={0.5}>
                                                            <Typography variant="body2" color="red">
                                                                Industry
                                                            </Typography>
                                                            <Typography variant="body2" color="red">
                                                                0
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={0.5}>
                                                            <Typography variant="body2" color="red">
                                                                Politically exposed person:
                                                            </Typography>
                                                            <Typography variant="body2" color="red">
                                                                7
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} mt={2}>
                                                <Typography variant='h6'>Limitation imposted</Typography>
                                                <Typography variant='body2' mt={0.5} mb={1} >Leave the fiedl empty no limitation is applied</Typography>
                                                <TextField
                                                    fullWidth
                                                    placeholder='Transaction limit USD'
                                                />
                                            </Grid>
                                            <Box pt={3} display="flex" justifyContent="flex-start">
                                                <Button onClick={() => handleVerify()} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                                    {approving ? <CircularProgress style={{ color: 'white' }} size={24} /> : "Approve"}
                                                </Button>
                                                <Button onClick={() => showDeclineReasonAlert()} className="btn-decline" variant="contained" sx={{ color: 'white', backgroundColor: 'red' }}>
                                                    Reject
                                                </Button>
                                            </Box>
                                            <Box pt={3} display="flex" justifyContent="flex-start">
                                                <Button onClick={() => showApproveReasonAlert()} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                                    Approve with limitations
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ChildCard>
                        </Box>
                    </Grid>
                </Grid>
            )}
        </PageContainer >
    );
};
const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    appearance: 'none',
    fontWeight: 400,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    fontSize: '0.875rem',
    lineHeight: 1.75,
    minWidth: '64px',
    color: 'white',
    backgroundColor: 'red',
    textTransform: 'none',
    boxShadow: 'none',
    outline: 0,
    borderWidth: 0,
    margin: 0,
    textDecoration: 'none',
    padding: '6px 16px',
    borderRadius: '7px',
    transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1), border-color 250ms cubic-bezier(0.4, 0, 0.2, 1), color 250ms cubic-bezier(0.4, 0, 0.2, 1)'
};


export default UserApproval;
