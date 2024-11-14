import React from 'react';
import {
    Grid,
    Box,
    Typography,
    Button,
    CardMedia,
} from '@mui/material';
import profilecover from '../../../../assets/images/backgrounds/Admin_Banner.jpg';
import BlankCard from '../../../../components/shared/BlankCard';

function Banner() {
    return (
        <BlankCard>
            {/* Background Image */}
            <CardMedia component="img" image={profilecover} alt="Admin Banner" width="100%" />

            {/* Overlay Content */}
            <Grid container spacing={0} justifyContent="space-between" alignItems="start" sx={{ p: 3 }}>
                <Grid item xs={12}>
                    {/* Breadcrumbs */}
                    <Box display="flex" alignItems="center" mb={1}>
                        <Typography variant="body2" color="textSecondary" fontSize={14}>
                            Admin
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ mx: 1 }} fontSize={14}>
                            •
                        </Typography>
                        <Typography variant="body2" color="textSecondary" fontSize={14}>
                            Dashboard
                        </Typography>
                    </Box>

                    {/* Main Heading */}
                    <Typography variant="h4" fontWeight="bold" color="textPrimary" gutterBottom>
                        Foundation Dashboard
                    </Typography>

                    {/* Label */}
                    <Button variant="contained" size="small" sx={{
                        backgroundColor: '#E3F2FD',
                        color: '#0D47A1',
                        textTransform: 'none',
                        borderRadius: '16px',
                        mt: 1,
                    }}>
                        Consortium
                    </Button>
                </Grid>
            </Grid>
        </BlankCard>
    );
}

export default Banner;
