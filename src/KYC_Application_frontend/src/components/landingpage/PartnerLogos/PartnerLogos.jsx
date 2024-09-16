import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import logo1 from '../../../assets/images/partnerlogo/logoo1.png';
import logo2 from '../../../assets/images/partnerlogo/logoo2.png';
import logo3 from '../../../assets/images/partnerlogo/logoo3.png';
import logo4 from '../../../assets/images/partnerlogo/logoo4.png';
import logo5 from '../../../assets/images/partnerlogo/logoo5.png';

const PartnerLogos = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0', padding: '10px 0' }}>

            <Grid container spacing={2} justifyContent="center" alignItems="center">

                <Grid item>
                    <Typography variant="h4" sx={{ marginRight: '20px', fontWeight: 'bold' }}>
                        Partners:
                    </Typography>
                </Grid>
                <Grid item>
                    <img src={logo1} alt="Logo 1" style={{ marginRight: '10px', height: '40px', width: 'auto' }} />
                </Grid>
                <Grid item>
                    <img src={logo2} alt="Logo 2" style={{ marginRight: '10px', height: '40px', width: 'auto' }} />
                </Grid>
                <Grid item>
                    <img src={logo3} alt="Logo 3" style={{ marginRight: '10px', height: '40px', width: 'auto' }} />
                </Grid>
                <Grid item>
                    <img src={logo4} alt="Logo 4" style={{ marginRight: '10px', height: '40px', width: 'auto' }} />
                </Grid>
                <Grid item>
                    <img src={logo5} alt="Logo 5" style={{height: '40px', width: 'auto' }} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default PartnerLogos;
