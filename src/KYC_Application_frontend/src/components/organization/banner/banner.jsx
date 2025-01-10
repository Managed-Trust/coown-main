import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import bank from '../../../assets/images/svgs/building-08.svg';

function Banner() {
    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '100%', background: 'linear-gradient(to bottom, #FFFFFF, #F2F6FA)' }}>
                <Box sx={{ maxWidth: 950, margin: 'auto', padding: '4 4 4 0' ,mt:6 }}>
                <Typography variant="body" align="center" display={'flex'} justifyContent={'center'} gutterBottom>
                        <img src={bank} />
                        <Typography variant="body"sx={{fontWeight:'bold', fontSize:'16px'}} mt={0.5}> &nbsp;  Consortium Governance Structure</Typography>
                    </Typography>
                    <Typography variant="h1" fontSize='54px' lineHeight='60px' align="center" gutterBottom sx={{ color: '#3b82f6' }}>
                        Decentralization
                        <Box component="span" sx={{ color: '#1e3a8a' }}>
                            {' '}
                            Aligned with Localized Compliance
                        </Box>
                    </Typography>
                    <Typography variant="body1" fontSize='18px' lineHeight='26px' align="center" paragraph sx={{ color: '#5A6A85' }}>
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
