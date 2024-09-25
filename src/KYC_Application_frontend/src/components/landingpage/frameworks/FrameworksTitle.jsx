import React from 'react';
import { Grid, Typography } from '@mui/material';


const FrameworksTitle = () => {

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={10} lg={8}>
                <Typography variant='h2' fontWeight={700} textAlign="center" sx={{
                    fontSize: {
                        lg: '36px',
                        xs: '25px'
                    },
                    lineHeight: {
                        lg: '43px',
                        xs: '30px'
                    }
                }}>Innovative tools for secure <br/> collaboration</Typography>
                
                <Typography variant='body2' mt={2} sx={{fontSize:'15px'}} textAlign="center">
                Empower your team with features designed to <br/> simplify collective financial management.
                    </Typography>
            </Grid>
        </Grid>
    );
};

export default FrameworksTitle;
