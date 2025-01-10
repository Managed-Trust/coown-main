import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import coown from '../../../assets/images/svgs/coown.svg';
import img from '../../../assets/images/svgs/image 101.svg'

function Banner() {
    return (
        <>
            <Box sx={{ width: '100%', maxWidth: '100%', background: 'linear-gradient(to bottom, #FFFFFF, #F2F6FA)' }}>
                <Box sx={{ maxWidth: 950, margin: 'auto', padding: '4 4 4 0' }}>
                    <Typography variant="h6" align="center" mt={10} mb={2} display={'flex'} justifyContent={'center'} gutterBottom>
                        <img src={coown}  />
                       <Typography  variant="h6"> &nbsp; Product</Typography> 
                    </Typography>
                    <Typography variant="h1" fontSize='54px' align="center" gutterBottom sx={{ fontWeight: 700, letterSpacing:'-1.35px', lineHeight:"60px" }}>
                        Manage {' '}
                        <Box component="span" sx={{ color: '#3b82f6' }}>
                            shared assets
                        </Box>{' '}
                        with your team
                    </Typography>
                    <Typography variant="p" align="center" paragraph sx={{ color: "#5A6A85", fontSize:'18px', lineHeight:'26px' }}>
                        Group accounts with spending limits, transaction approvals, and custom securities for regional markets, suitable for private groups,  corporations and public law entities.
                    </Typography>
                    <Box
                        component="img"
                        src={img}
                        alt="Organization structure"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: 800,
                            display: 'block',
                            margin: 'auto',
                            marginTop:4
                        }}
                    />
                </Box>
            </Box>
        </>
    );
}

export default Banner;
