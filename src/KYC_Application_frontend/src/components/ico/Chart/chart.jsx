import React from 'react';
import Chart from 'react-apexcharts';
import { Container, Grid, Box, Typography } from '@mui/material';

const DoughnutChart = () => {
    // Colors matching the segments as in the reference chart
    const colors = [
        '#5B21B6',  // Team (incl. Advisors, Ambassadors)
        '#3B82F6',  // Crowdfunding
        '#F9A8D4',  // Presale, locked
        '#8B5CF6',  // Public Sale, unlocked
        '#FECACA',  // Airdrops to Early Adopters
        '#FB7185',  // Private Round Series A Funding
        '#FECACA',  // Private Round Series C Funding
        '#38BDF8',  // Foundation's strategic reserve
        '#60A5FA'   // Reserved
    ];

    // Labels matching the chart segments
    const labels = [
        'Team (incl. Advisors, Ambassadors)',
        'Crowdfunding',
        'Presale, locked',
        'Public Sale, unlocked',
        'Airdrops to Early Adopters',
        'Private Round Series A Funding',
        'Private Round Series C Funding',
        "Foundation's strategic reserve",
        'Reserved'
    ];

    const optionsDoughnutChart = {
        chart: {
            id: 'donut-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
        },
        labels: labels, // Adding custom labels for the segments
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '16px',
                            color: '#5A6A85',
                        },
                        value: {
                            show: true,
                            fontSize: '14px',
                            color: '#5A6A85',
                        },
                        total: {
                            show: true,
                            label: 'Total',
                            color: '#373d3f',
                            fontSize: '18px',
                        },
                    },
                },
            },
        },
        legend: {
            show: true,
            position: 'right',
            fontSize: '10px',
            labels: {
                colors: '#5A6A85',
            },
            itemMargin: {
                vertical: 8,
            },
        },
        colors: colors,
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };

    const seriesDoughnutChart = [7, 1, 2, 52, 2, 9, 9, 9, 9];

    return (
        <Box mt={10} mb={10}>
            <Container maxWidth="lg">
                <Grid container alignItems="center">
                    <Grid item xs={12} md={5}>
                        <Typography variant="body1" sx={{ color: '#5A6A85' }} gutterBottom>
                        Exchange of $COOWN token is locked during the crowdfunding and presale stages. The initial exchange offering is planned  in Q2-Q3, 2025. Exchange of $COOWN token is locked during the crowdfunding and presale stages.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Box >
                            <Chart
                                options={optionsDoughnutChart}
                                series={seriesDoughnutChart}
                                type="donut"
                                height="400px"
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default DoughnutChart;
