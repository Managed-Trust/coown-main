import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import { useConnect } from "@connect2ic/react";

const ConnectBanner = () => {
    const [copied, setCopied] = useState(false);
    const { isConnected, principal, disconnect } = useConnect({
        onConnect: () => {
            console.log("User connected!");
        },
        onDisconnect: () => {
            console.log("User disconnected!");
        },
    });

    const copyToClipboard = (data) => {
        navigator.clipboard.writeText(data).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDisconnect = () => {
        if (isConnected) {
            alert("Your wallet disconnected successfully");
            disconnect();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#6B4EFF',
                padding: '10px 20px',
                borderRadius: '8px',
                color: '#fff',
                marginY: 2,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            {principal ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoOutlinedIcon sx={{ marginRight: 2, color: '#fff' }} />
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                        Your Internet Identity is{" "}
                        <Box
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                display: 'flex',
                                alignItems: 'center',
                                paddingX: 3,
                                borderRadius: '8px',
                                marginX: 2,
                                gap: 2,
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            {principal && `${principal.substring(0, 7)}...${principal.substring(principal.length - 7)}`}
                            <IconButton
                                onClick={() => copyToClipboard(principal)}
                                size="small"
                                sx={{
                                    marginLeft: 1,
                                    color: copied ? 'green' : 'inherit',
                                }}
                            >
                                {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                            </IconButton>
                        </Box>

                    </Typography>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InfoOutlinedIcon sx={{ marginRight: 2, color: '#fff' }} />
                    <Typography variant="body1">
                        Connect with ICP Internet Identity to be able to use your accounts.
                    </Typography>
                </Box>
            )}

            <Box>
                {isConnected ? (
                    <Button
                        variant="contained"
                        onClick={handleDisconnect}
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
                        Disconnect
                    </Button>
                ) : (
                    <Link to="/user/connect" style={{ textDecoration: 'none' }}>
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
                    </Link>
                )}
            </Box>
        </Box>
    );
};

export default ConnectBanner;
