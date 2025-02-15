import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Stack, IconButton, Link, Card, Paper, CircularProgress, Button } from '@mui/material';
import { Email, Phone, Work, LocationOn, School } from '@mui/icons-material'; // Material UI icons
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';

const AboutCard = ({ profile }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate a delay to fetch profile data
        const fetchData = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(fetchData);
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (!profile) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" flexDirection="column">
                <Typography variant="h6" gutterBottom>
                    No profile data found.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/dashboards/modern"
                >
                    Perform KYC
                </Button>
            </Box>
        );
    }

    return (
        <>
            {profile && (
                <Box sx={{ py: 2, borderRadius: '12px' }}>
                    <Grid container spacing={2}>
                        {/* Left Side - About Me Section */}
                        <Grid item xs={12} md={7}>
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
                                    About me
                                </Typography>
                                <Typography variant="body1" color="textSecondary" paragraph>
                                    Hello, I am Hans Muster. I love making websites and graphics. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </Typography>

                                {/* Social Icons */}
                                <Stack direction="row" spacing={2} mt={5}>
                                    <IconButton component="a" href="https://linkedin.com" target="_blank">
                                        <LinkedInIcon sx={{ color: '#0e76a8' }} />
                                    </IconButton>
                                    <IconButton component="a" href="https://github.com" target="_blank">
                                        <GitHubIcon sx={{ color: 'black' }} />
                                    </IconButton>
                                    <IconButton component="a" href="https://telegram.org" target="_blank">
                                        <TelegramIcon sx={{ color: '#0088cc' }} />
                                    </IconButton>
                                </Stack>
                            </Paper>
                        </Grid>
                        {/* Right Side - Contact Info */}
                        <Grid item xs={12} md={5}>
                            <Paper
                                elevation={3}
                                style={{
                                    padding: '14px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Stack spacing={2}>
                                    {/* Email */}
                                    <Box display="flex" alignItems="center">
                                        <Email sx={{ color: 'textSecondary', mr: 1 }} />
                                        <Link href={`mailto:` + profile.id} underline="hover" sx={{ color: '#1a73e8' }}>
                                            {profile.id}
                                        </Link>
                                    </Box>

                                    {/* Phone */}
                                    <Box display="flex" alignItems="center">
                                        <Phone sx={{ color: 'textSecondary', mr: 1 }} />
                                        <Link href={`tel:` + profile.phone} underline="hover" sx={{ color: '#1a73e8' }}>
                                            {profile.phone}
                                        </Link>
                                    </Box>

                                    {/* Job Title */}
                                    <Box display="flex" alignItems="center">
                                        <Work sx={{ color: 'textSecondary', mr: 1 }} />
                                        <Typography variant="body1">{profile.role}</Typography>
                                    </Box>

                                    {/* Location */}
                                    <Box display="flex" alignItems="center">
                                        <LocationOn sx={{ color: 'textSecondary', mr: 1 }} />
                                        <Typography variant="body1">{profile.resident_country}</Typography>
                                    </Box>

                                    {/* Education */}
                                    <Box display="flex" alignItems="center">
                                        <School sx={{ color: 'textSecondary', mr: 1 }} />
                                        <Typography variant="body1">
                                            University of Amsterdam, Information Technology
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </>
    );
};

export default AboutCard;
