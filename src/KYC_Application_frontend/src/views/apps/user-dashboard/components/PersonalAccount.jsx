import React from 'react';
import { Card , Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

// PersonalAccount component with chart implementation
const PersonalAccount = () => {
  const theme = useTheme();
  const StarReward = '#DFE5EF';
  const Total = '#4472ff';

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
    colors: [Total, StarReward],
    fill: {
      type: 'solid',
      opacity: 0,
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
      name: 'Total Balance',
      data: [15, 30, 45, 55, 65, 75, 85],
    },
    {
      name: 'Total Balance (Last Year)',
      data: [25, 40, 45, 50, 55, 70, 90],
    },
  ];

  return (
    <Paper
    elevation={3}
    style={{
        padding: '10px',
    }}>
      <Box sx={{ width: '100%', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Personal Account
        </Typography>
      </Box>
      <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
    </Paper>
  );
};

export default PersonalAccount ;
