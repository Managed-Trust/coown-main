import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Stack,
    IconButton,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ShareholderBook = () => {
    return (
        <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="600">
                    Shareholder book
                </Typography>
                <IconButton aria-label="settings" size="small" color="primary">
                    <SettingsIcon />
                </IconButton>
            </Stack>

            <Box
                sx={{
                    backgroundColor: '#f5f7fa',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                }}
            >
                <Typography variant="body2" color="textSecondary" mb={2}>
                    Easily manage your company’s shareholders by uploading a shareholder book.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                >
                    Upload shareholder book
                </Button>
            </Box>
        </Paper>
    );
};

export default ShareholderBook;
