import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import coown from '../../../assets/images/svgs/trend-up-01.svg';
import img from '../../../assets/images/svgs/image 101.svg'

function Banner() {
    return (
        <>
            <Box mt={10} mb={10} sx={{ width: '100%', maxWidth: '100%' }}>
                <Box sx={{ maxWidth: 950, margin: 'auto', padding: '4 4 4 4' }}>
                    <Typography variant="body" align="center" display={'flex'} justifyContent={'center'} gutterBottom>
                        <img src={coown} />
                        <Typography variant="body"> &nbsp; With scalability in mind</Typography>
                    </Typography>
                    <Typography variant="h1" align="center" gutterBottom sx={{ fontWeight: 700, fontSize:'54px', lineHeight:'60px' }}>
                        Plans for every group
                    </Typography>
                    <Typography variant="body1" align="center" paragraph sx={{ color: '#5A6A85', fontSize:'18px' }}>
                        Essential features are available for free and low maintenance fees.
                    </Typography>
                    
                </Box>
            </Box>
        </>
    );
}

export default Banner;
