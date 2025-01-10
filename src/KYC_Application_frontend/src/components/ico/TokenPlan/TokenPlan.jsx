import React from 'react';
import Chart from 'react-apexcharts';
import { Card, Box, Typography, Container } from '@mui/material';

const TokenPlan = () => {
    // Chart colors for each category in the token distribution
    const colors = [
        '#CBD5E0',  // Reserved
        '#1E293B',  // Treasury - Liquidity Pool
        '#38BDF8',  // Foundation's strategic reserve
        '#A78BFA',  // Private Round Series C Funding
        '#FB7185',  // Private Round Series B Funding
        '#FCA5A5',  // Private Round Series A Funding
        '#F9A8D4',  // Airdrops to Early Adopters
        '#8B5CF6',  // Public Sale, unlocked
        '#F472B6',  // Presale, locked
        '#3B82F6',  // Crowdfunding
        '#5B21B6',  // Team (incl. Advisors, Ambassadors)
    ];

    const optionsAreaChart = {
        chart: {
            id: 'area-chart',
            type: 'area',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            stacked: true,
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: 1,
        },
        colors: colors,
        fill: {
            type: 'solid',
            opacity: 0.7,  // Semi-transparent fill for each area
        },
        xaxis: {
            type: 'category',
            categories: [
                '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035',
            ],
            labels: {
                show: true,
            },
        },
        yaxis: {
            labels: {
                formatter: (value) => `${value.toLocaleString()}`,
            },
            title: {
                text: '',
                style: {
                    color: 'black',
                    fontWeight: 600,
                },
            },
        },
        legend: {
            show: true,
            position: 'right',
            horizontalAlign: 'center',
            fontSize: '12px',
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            strokeDashArray: 5,
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
            y: {
                formatter: (value) => `${value.toLocaleString()}`,
            },
        },
    };

    const seriesAreaChart = [
        {
            name: 'Reserved',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Treasury - Liquidity Pool',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: "Foundation's strategic reserve",
            data: [400000, 500000, 600000, 600000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Private Round Series C Funding',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Private Round Series B Funding',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Private Round Series A Funding',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Airdrops to Early Adopters',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Public Sale, unlocked',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Presale, locked',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Crowdfunding',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
        {
            name: 'Team (incl. Advisors, Ambassadors)',
            data: [150000, 200000, 250000, 400000, 500000, 700000, 710000, 720000, 800000, 850000, 900000],
        },
    ];

    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                {/* Title */}
                <Typography variant="h2" fontWeight="bold" fontSize={36} gutterBottom textAlign="center" mb={3}>
                    Token Distribution Plan
                </Typography>

                <Card>
                    <Box p={3}>
                        <Chart options={optionsAreaChart} series={seriesAreaChart} type="area" height="400px" />
                    </Box>
                </Card>
            </Container>
        </Box>
    );
};

export default TokenPlan;
