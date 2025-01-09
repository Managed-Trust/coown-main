import React from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    MenuItem,
    List,
    ListItem,
    ListItemText,
    ThemeProvider,
    createTheme,
} from '@mui/material';
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
            <Box width="100%" sx={{ bgcolor: 'background.default' }}>
                <Box sx={{ maxWidth: 1200, margin: 'auto', p: 4 }}>
                    <Typography variant="h2" gutterBottom fontSize='36px'>
                        Get in touch
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <StyledTextField
                                            fullWidth
                                            label="Your name"
                                            variant="outlined"
                                            required
                                            placeholder="Your name"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <StyledTextField
                                            fullWidth
                                            label="Your email"
                                            variant="outlined"
                                            required
                                            type="email"
                                            placeholder="Enter email"
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                </Grid>
                                <StyledTextField
                                    fullWidth
                                    select
                                    label="Subject"
                                    variant="outlined"
                                    required
                                    defaultValue=""
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (selected) => selected ? selected : 'Select subject',
                                    }}
                                >
                                    <StyledMenuItem disabled value="">
                                        <em>Select subject</em>
                                    </StyledMenuItem>
                                    {subjects.map((subject) => (
                                        <StyledMenuItem key={subject} value={subject}>
                                            {subject}
                                        </StyledMenuItem>
                                    ))}
                                </StyledTextField>
                                <StyledTextField
                                    fullWidth
                                    label="Your message"
                                    variant="outlined"
                                    required
                                    multiline
                                    rows={4}
                                    placeholder="Leave your message"
                                    InputLabelProps={{ shrink: true }}
                                />
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
                        <Grid item xs={12} md={6}>
                            <Paper elevation={1} sx={{ p: 3, bgcolor: 'white', borderRadius: '1rem', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                                <List>
                                    {engagementOptions.map((option, index) => (
                                        <ListItem key={index} alignItems="flex-start" sx={{ px: 0, py: 1 }}>
                                            <ListItemText
                                                primary={<Typography variant="h6">{option.title}</Typography>}
                                                secondary={
                                                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                                                        {option.description}
                                                    </Typography>
                                                }
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
