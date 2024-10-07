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
            <Box width="100%">
                <Container sx={{ p: 4, mt: 5, paddingBottom: 10 }} >
                    <Grid container spacing={4} display={'flex'} justifyContent={'center'}>
                        <Grid item xs={12} md={6}>
                            <Box component="form" noValidate autoComplete="off">
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                                    <Typography variant="h3" mt={5} gutterBottom>
                                        Send us message
                                    </Typography>
                                    <Typography variant="body2" align={'center'} gutterBottom>
                                        Feel free to contact us for opportunities, support, or customization. Our team will respond promptly.
                                    </Typography>
                                </Box>
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
                                    <Grid item xs={12} mt={-1}>
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

                                        <Typography variant="body2" mt={2} gutterBottom>
                                            Inquire about becoming  regional operator, ensuring AML compliance and secure authorization, and benefit from enterprise subscription fees. Banks, crypto service providers, and governmental agencies are welcome.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} mt={-1}>
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
                    </Grid>
                </Container>
            </Box>
        </ThemeProvider>
    );
}
