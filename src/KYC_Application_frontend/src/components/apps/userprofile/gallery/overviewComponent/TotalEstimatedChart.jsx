import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

const TotalEstimatedChart = () => {

  // chart colors
  const theme = useTheme();
  const ckBTCColor = '#9C80FF';
  const GLDTColor = '#FFAA50';
  const ckUSDCColor = '#1DCD9B';
  const EURColor = '#81d4fa';
  const ICPColor = '#512da8';
  const COOWNColor = '#b39ddb';
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
    colors: [ckBTCColor, GLDTColor, ckUSDCColor, EURColor, ICPColor, COOWNColor, USDColor],
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
      name: 'GLDT',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: 'ckUSDC',
      data: [20, 35, 55, 40, 45, 60, 80],
    },
    {
      name: 'EUR',
      data: [10, 22, 30, 40, 50, 65, 75],
    },
    {
      name: 'ICP',
      data: [25, 40, 45, 50, 55, 70, 90],
    },
    {
      name: 'COOWN',
      data: [5, 15, 25, 35, 45, 55, 65],
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
          Total Estimated
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="h4" color="textPrimary" mr={1}>
            4,250 ICP
          </Typography>
        </Box>
      </Box>
      <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
    </Card>
  );
};

export default TotalEstimatedChart;
