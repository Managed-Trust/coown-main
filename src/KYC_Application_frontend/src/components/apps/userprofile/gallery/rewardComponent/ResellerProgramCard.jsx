import React from 'react';
import { Box, CardContent, Button, TextField, Chip, Paper, Stack, Typography, LinearProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SavingsImg from '../../../../../assets/images/backgrounds/piggy.png';
import { CopyAll as CopyIcon } from '@mui/icons-material';


const ResellerProgramCard = () => {
    const theme = useTheme();
    const handleCopyLink = () => {
        navigator.clipboard.writeText("https://co-own.com/affiliate/i94hf8f2h3h");
        alert('Link copied to clipboard!');
    };
    const borderColor = theme.palette.grey[100];

    return (
        <Paper sx={{ bgcolor: 'primary.main', border: `1px solid ${borderColor}` }} variant="outlined">
            <CardContent>
                <Typography variant="h5" color="white" fontSize="18px" fontWeight="600">
                    Reseller Program
                </Typography>
                <Typography variant="subtitle1" color="white" mb={4}>
                    Invite your friends and get rewards
                </Typography>

                <Box textAlign="center" mt={2} mb="-90px">
                    <img src={SavingsImg} alt={SavingsImg} width={'300px'} />
                </Box>
            </CardContent>
            <Paper sx={{ overflow: 'hidden', zIndex: '1', position: 'relative', margin: '10px' }}>

                <CardContent sx={{ padding: '16px', backgroundColor: '#FFFFFF' }}>
                    <Typography variant="body1" fontSize="16px" fontWeight="600" component="div" gutterBottom>
                        Send link to your friend
                    </Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        value="https://co-own.com/affiliate/i94hf8f2h3h"
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{ color:'#7C8FAC'}}
                    />
                    <Button
                        variant="contained"
                        startIcon={<CopyIcon />}
                        fullWidth
                        sx={{ marginTop: '12px', backgroundColor: 'primary.main' }}
                        onClick={handleCopyLink}
                    >
                        Copy
                    </Button>
                </CardContent>
            </Paper>
        </Paper>
    );
};

export default ResellerProgramCard;
