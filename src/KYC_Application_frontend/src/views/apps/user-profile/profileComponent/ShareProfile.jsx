import React from 'react';
import { Box, Typography, Grid, Button, TextField, Paper, Card } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import { padding } from '@mui/system';

const ShareProfile = () => {
    return (
        <Box sx={{ py: 3, borderRadius: '12px' }}>
            <Grid container spacing={2}>
                {/* Left Side - Share Profile Section */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Share profile
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Share your profile page with payment links
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: '20px' }}>
                            <QRCodeCanvas value="https://yourprofilelink.com" size={128} />
                        </Box>

                        <Box display="flex" mt={2} gap={2}>
                            <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                                Copy profile link
                            </Button>
                            <Button variant="outlined" color="primary" sx={{ textTransform: 'none' }}>
                                Print
                            </Button>
                        </Box>

                    </Paper>
                </Grid>

                {/* Right Side - Invite People Section */}
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={3}
                        style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Invite people
                        </Typography>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                            Invite people as new contacts
                        </Typography>

                        {/* Invite Form */}
                        <Box component="form" noValidate autoComplete="off">
                            <Grid item xs={12} mt={-2} mb={-1}>
                                <CustomFormLabel htmlFor="name">Email</CustomFormLabel>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    sx={{
                                        marginTop:'-4px'
                                    }}
                                /></Grid>
                            <Grid item xs={12}>
                                <CustomFormLabel htmlFor="name">Add invite message</CustomFormLabel>
                                <TextField
                                    fullWidth
                                    label="Add invite message"
                                    variant="outlined"
                                    sx={{
                                        marginTop:'-4px'
                                    }}
                                /></Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2, textTransform: 'none' }}
                            >
                                Send invite
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ShareProfile;
