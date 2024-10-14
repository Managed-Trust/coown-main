import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ConnectBanner = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#6B4EFF',
                padding: '10px 20px',
                borderRadius: '5px',
                color: '#fff',
                my: 1,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Left side - Info text with an icon */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InfoOutlinedIcon sx={{ marginRight: '8px', color: '#fff' }} />
                <Typography variant="body1">
                    Connect with ICP Internet Identity to be able to use your accounts
                </Typography>
            </Box>

            {/* Right side - Connect button */}
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#000',
                    color: '#fff',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#333',
                    },
                }}
            >
                Connect
            </Button>
        </Box>
    );
};

export default ConnectBanner;
