import React from 'react';
import { Grid, Paper, Typography, Box,Chip } from '@mui/material';
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
            {unit && (
                <Typography component="span" variant="h6" fontWeight="bold" color="textSecondary" mx={0.5}>
                    {unit}
                </Typography>
            )}
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
                <Grid item xs={12} sm={6} md={4}>
                    <Card title="Fees Collected" value="$10 000" percentage="7.11" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card title="Fees allocated" value="$5 000" percentage="7.11" />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card title="Pending Fees" value="$5 000" />
                </Grid>
            </Grid>
        </Box>
    );
};

export default InfoCard;
