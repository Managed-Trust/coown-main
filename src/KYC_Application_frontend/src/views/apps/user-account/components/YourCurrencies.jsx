import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography, Card } from '@mui/material';
import ParentCard from '../../../../components/shared/ParentCard';


const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Doughtnut Chart',
    },
];

const YourCurrencies = () => {

    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const primarylight = theme.palette.primary.light;
    const secondary = theme.palette.secondary.main;
    const secondarylight = theme.palette.secondary.light;
    const warning = theme.palette.warning.main;

    // 1
    const optionsdoughnutchart = {
        chart: {
            id: 'donut-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70px',
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
        },
        colors: [primary, primarylight, secondary, secondarylight, warning],
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriesdoughnutchart = [45, 15, 27, 18, 35];

    // 2
    const optionspiechart = {
        chart: {
            id: 'pie-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70px',
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
        },
        colors: [primary, primarylight, secondary, secondarylight, warning],
        tooltip: {
            fillSeriesColor: false,
        },
    };
    const seriespiechart = [45, 15, 27, 18, 35];

    return (
        <Card>
            <Box display="flex" flexDirection="column" alignItems="start" p={2}>
                <Typography variant="h5" color="textSecondary">
                    Your currencies
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body2" color="textSecondary" mr={1}>
                        Current balance breakdown
                    </Typography>
                </Box>
            </Box>
            <Chart
                options={optionsdoughnutchart}
                series={seriesdoughnutchart}
                type="donut"
                height="300px"
            />
        </Card>

    );
};

export default YourCurrencies;
