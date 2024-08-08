import PageContainer from '../../../container/PageContainer';
import ChildCard from '../../../shared/ChildCard';
import React, { useState,useEffect } from 'react';
import {
    Grid,
    Typography,
    Box, Button
} from "@mui/material";

import CryptoJS from "crypto-js";
const secretKey = "your-secret-key"; // Use a strong secret key

const hashData = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
const DetailComponent = (Group) => {

    const [group, setGroup] = useState(null);

    useEffect(() => {
        setGroup(Group.Group[0])
        console.log('detail component', Group);
        console.log('detail component1', Group.Group[0]);
        console.log('detail component2', Group.Group[0].groupType);
    }, []);

    return (
        <PageContainer title="Create New Group" description="this is Note page">
            <Grid container>
                <Grid item xs={12}>
                    <Box p={2}>
                        <ChildCard>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item sx={{ paddingLeft: '20px' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Group Info
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Edit details
                                    </Button>
                                </Grid>
                            </Grid>
                        </ChildCard>
                    </Box>
                </Grid>
            </Grid>

            {group && group.groupType === "Incorporation" && (
                <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                        <Box p={2}>
                            <ChildCard>
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Typography variant="h6" gutterBottom>
                                                Compmany Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Company Name</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Emily</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Registration Number</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Johnson</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Legal structure</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>01.01.1900</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Registered Address</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Tax ID</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'blue' }}>+123 456 7890</Typography>

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
                                                OwnerShip
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Econimic Owner</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Valge 1-10 Talien, 1011 Harjmaa</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Beneficial Owner</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

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
                                                Representative
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Full name</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Passport</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Position</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Representative email</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>KE1234567890</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Representative phone number</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </ChildCard>
                        </Box>
                    </Grid>
                </Grid>
            )}
            {group && group.groupType === "Public Law Entity" && (
                <Grid container>
                    <Grid item xs={12} sm={12} md={12}>
                        <Box p={2}>
                            <ChildCard>
                                <Box p={2}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={4}>
                                            <Typography variant="h6" gutterBottom>
                                                Entity Details
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Entity Name</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Emily</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Address</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Johnson</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Contact person</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>01.01.1900</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Contact person email</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Website</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'blue' }}>+123 456 7890</Typography>

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
                                                OwnerShip
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Owner Job Title</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Valge 1-10 Talien, 1011 Harjmaa</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Owner Business Email</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

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
                                                Legal Framework
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={8}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Description of Purpose</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Passport</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Link to Constituting legislation</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Estoria</Typography>

                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={2} mt={0.5}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ color: 'gray' }}>Link to Supervisory body</Typography>

                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>KE1234567890</Typography>

                                                </Grid>
                                            </Grid>
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

export default DetailComponent;
