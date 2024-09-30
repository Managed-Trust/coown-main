import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';
import { styled } from '@mui/system';

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

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        '& fieldset': {
            borderColor: '#e2e8f0',
        },
        '&:hover fieldset': {
            borderColor: '#cbd5e1',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
        },
    },
    '& .MuiInputLabel-root': {
        color: '#94a3b8',
    },
    '& .MuiInputBase-input::placeholder': {
        color: '#94a3b8',
        opacity: 1,
    },
}));

const StyledMenuItem = styled(MenuItem)({
    '&.MuiMenuItem-root': {
        color: '#64748b',
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

    const engagementOptions = [
        {
            title: 'ICO Participation',
            description: 'Purchase $COOWN tokens for staking rewards and help shape the platform through the DAO.',
        },
        {
            title: 'Venture Capital',
            description: 'Explore investment opportunities in secure digital asset management and enterprise solutions.',
        },
        {
            title: 'Early Access',
            description: 'Access the MVP via a licensed operator in a sandbox environment, with initial regulatory limitations.',
        },
        {
            title: 'Regional Operators',
            description: 'Apply to become a regional operator, ensuring AML compliance and secure authorization, and benefit from enterprise subscription fees. Banks, crypto service providers, and governmental agencies are welcome.',
        },
        {
            title: 'Partnerships',
            description: 'Contact the Foundation to join the Consortium as an ambassador, advisor, banking partner, software supplier, or auditor.',
        },
        {
            title: 'Support',
            description: 'Get help with using the COOWN platform.',
        },
        {
            title: 'Customization',
            description: 'Inquire about customizing COOWN for your specific needs.',
        },
    ];

    return (
        <ThemeProvider theme={theme}>
            <Box width="100%" >
                <Box sx={{ maxWidth: 1200, margin: 'auto', p: 4 }}>
                    <Typography variant="h3" gutterBottom>
                        Get in touch
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                                    <Grid item xs={12}>
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
                                    <Grid item xs={12}>
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
                                    sx={{ alignSelf: 'flex-start', mt: 1 }}
                                >
                                    Submit message
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} mt={2}>
                            {engagementOptions.map((option, index) => (
                                <Box key={index} pt={2}>
                                    <Typography variant="h6" fontWeight="bold" display="inline">
                                        {option.title}:
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: '#000', display: 'inline', ml: 1 }}>
                                        {option.description}
                                    </Typography>
                                </Box>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
