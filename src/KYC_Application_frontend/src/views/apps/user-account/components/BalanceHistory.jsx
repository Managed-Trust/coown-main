import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Box, Typography, Card } from '@mui/material';


const BalanceHistory = () => {

    // chart color

    // 1
    const ckBTCColor = '#9C80FF';
    const USDColor = '#bdbdbd';

    const optionsareachart = {
        chart: {
            id: 'area-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: '2',
            curve: 'smooth',
        },
        colors: [ckBTCColor, USDColor],
        fill: {
            type: 'solid',
            opacity: 0,  // This removes the fill color under the line
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
            ],
            labels: {
                show: true,
                format: 'MMM',
            },
        },
        yaxis: {
            opposite: false,
            labels: {
                show: true,
            },
            title: {
                text: 'ICP',
                style: {
                    color: '#adb0bb',
                    fontWeight: 600,
                },
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            offsetX: -10,
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            strokeDashArray: 5,
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriesareachart = [
        {
            name: 'ckBTC',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Value in USD',
            data: [15, 30, 45, 55, 65, 75, 85],
        },
    ];

    return (
        <Card title="Area Chart">
            <Box display="flex" flexDirection="column" alignItems="start" p={2}>
                <Typography variant="h5" color="textSecondary">
                    Balance History
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                    <Typography variant="body1" color="textPrimary" mr={1}>
                        Overview of Profit
                    </Typography>
                </Box>
            </Box>
            <Chart options={optionsareachart} series={seriesareachart} type="area" height="250px" />
        </Card>

    );
};

export default BalanceHistory;
