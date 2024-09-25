import React from 'react';
import { Container, Grid, Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import img from '../../../assets/images/landingpage/Frame89.png'
const PerformanceMetrics = () => {
    const metrics = [
        { label: '$COCOWN in circulation', value: '0.1m / 10m' },
        { label: 'Users', value: '72' },
        { label: 'Groups', value: '8' },
        { label: 'Total transactions', value: '1008' },
        { label: 'Transactions volume', value: '21877' },
        { label: 'Market capitalization', value: '$0.1M' },
        { label: 'Total rewards paid', value: '$2.1877' },
      ];

    return (
        <Box mt={10} mb={5} >
            <Container maxWidth="lg">
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={10} lg={8}>
                        <Typography variant="h6" display={'flex'} justifyContent="center" gap={1} mb={2}>
                           <img src={img} alt=""/>
                           Proven Success
                        </Typography>
                        <Typography variant='h2' fontWeight={700} textAlign="center" sx={{
                            fontSize: {
                                lg: '36px',
                                xs: '25px'
                            },
                            lineHeight: {
                                lg: '43px',
                                xs: '30px'
                            }
                        }}>Performance Metrics</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" mt={4}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: '16px',
                  textAlign: 'center',
                  borderRadius: '12px',
                }}
              >
                <Typography variant="body2" color="textSecondary" mb={1}>
                  {metric.label}
                </Typography>
                <Typography variant="h4" fontWeight={700} color="#5D87FF">
                  {metric.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
            </Container>
        </Box>
    );
};

export default PerformanceMetrics;
