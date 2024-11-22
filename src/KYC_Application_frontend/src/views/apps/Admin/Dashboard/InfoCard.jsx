import React from 'react';
import { Grid, Paper, Typography, Box, Chip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const Card = ({ title, value, unit, percentage }) => (
    <Paper
        elevation={3}
        sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '120px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
    >
        <Typography variant="body2" color="#7C8FAC">
            {title}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
            <Typography variant="h4" fontWeight="bold" color="textPrimary">
                {value}
            </Typography>
            {percentage && (<Chip
                label={
                    <Box display="flex" alignItems="center" gap={0.5}>
                        <span style={{ display: 'inline-block' }}>
                            ➚ 
                        </span>
                        <Typography sx={{ fontSize: '12px' }}>{percentage} %</Typography>
                    </Box>
                }
                sx={{
                    backgroundColor: '#E3FAED',
                    color: '#19BB8D',
                    borderRadius: '16px',
                    marginLeft:'4px'

                }}
            />
            )}

        </Box>
    </Paper>
);

// InfoCard component to display different statistics
const InfoCard = () => {
    return (
        <Box sx={{ width: '100%' }} mt={4}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card title="Total users" value="36K" percentage="10.38" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card title="Enterprises" value="8K" percentage="7.30" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card title="Transactions" value="10 000M" percentage="15.21" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card title="Total revenue" value="$500K" percentage="7.11" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default InfoCard;
