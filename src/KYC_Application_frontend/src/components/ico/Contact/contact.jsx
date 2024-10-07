import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    ThemeProvider,
    createTheme, Container,
    Link,
} from '@mui/material';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3b82f6',
        },
        background: {
            default: '#f2f6fa',
        },
        text: {
            primary: '#1e293b',
            secondary: '#64748b',
        },
    },
    typography: {
        h3: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1e293b',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1e293b',
        },
        body2: {
            fontSize: '0.875rem',
            color: '#64748b',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                },
            },
        },
    },
});


export default function Contact() {
    const subjects = [
        'ICO Participation',
        'Venture Capital',
        'Early Access',
        'Regional Operators',
        'Partnerships',
        'Support',
        'Customization',
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box width="100%" sx={{ backgroundColor: '#F4F8FB' }}>
                <Container sx={{ p: 4 , mt:10,paddingBottom: 10 }} >
                    <Typography variant="h3" mt={5} gutterBottom>
                        Get in touch
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6} mt={-1}>
                            <Box component="form" noValidate autoComplete="off">
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <CustomFormLabel htmlFor="name">Your name</CustomFormLabel>
                                        <TextField
                                            id="name" placeholder="Your name"
                                            fullWidth
                                            InputProps={{
                                                sx: { backgroundColor: 'white' },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <CustomFormLabel htmlFor="email">Your email</CustomFormLabel>
                                        <TextField
                                            id="email" placeholder="Enter email"
                                            fullWidth
                                            InputProps={{
                                                sx: { backgroundColor: 'white' },
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} mt={-3}>
                                        <CustomFormLabel htmlFor="email">Subject* </CustomFormLabel>
                                        <Select
                                            fullWidth
                                            value="Select subject"
                                            sx={{
                                                backgroundColor: 'white',
                                                '& .MuiSelect-select': {
                                                    padding: '10px', // Adjust padding for better appearance
                                                },
                                            }}// Replace with the actual selected value
                                        >
                                            {subjects.map((subject) => (
                                                <MenuItem key={subject} value={subject}>
                                                    {subject}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} mt={-3}>
                                        <CustomFormLabel htmlFor="message">Your message </CustomFormLabel>
                                        <TextField
                                            fullWidth
                                            placeholder="Leave your message"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            InputProps={{
                                                sx: { backgroundColor: 'white' },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{ alignSelf: 'flex-start', mt: 3 }}
                                >
                                    Submit message
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ mt: { xs: 3, md: 0 },p:4 }}>
                                <Typography variant="h4" sx={{fontWeight:'semibold'}}>Coown init s.r.l.</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Foundation, token issuer, and sandbox operator
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    San José, los yoses, 8-10 ave, 39 st, ly center, Costa Rica
                                </Typography>
                                <Link href="mailto:coown@dmail.ai" underline="none" sx={{ display: 'block', mt: 2, color: '#3b82f6' }}>
                                    coown@dmail.ai
                                </Link>
                                <Link href="#" underline="none" sx={{ mt: 1, color: '#3b82f6' }}>
                                    OpenChat
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
