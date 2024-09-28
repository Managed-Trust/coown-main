import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

function Banner() {
    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '100%', background: 'linear-gradient(to bottom, #FFFFFF, #F2F6FA)' }}>
                <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
                    <Typography variant="h6" align="center" gutterBottom>
                        <BusinessIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
                        Consortium Governance Structure
                    </Typography>
                    <Typography variant="h1" align="center" gutterBottom sx={{ color: '#3b82f6' }}>
                        Decentralization
                        <Box component="span" sx={{ color: '#1e3a8a' }}>
                            {' '}
                            Aligned with Localized Compliance
                        </Box>
                    </Typography>
                    <Typography variant="body1" align="center" paragraph sx={{ color: '#5A6A85' }}>
                        COOWN is a consortium led by $COOWN token holders and managed by the Foundation. It operates through a combination of DAO governance and traditional business structures, with Regional Operators managing compliance and customer interaction
                    </Typography>
                    <Box
                        component="img"
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/organization-pic-XGUXJLvse93E6yJwq6pgEdEPkQQ24k.svg"
                        alt="Organization structure"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: 800,
                            display: 'block',
                            margin: 'auto',
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default Banner;
