import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

const TotalEstimatedChart = () => {

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = '#cfd8dc';

  const optionsareachart = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: '3',
      curve: 'smooth',
    },
    colors: [primary, secondary],
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
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriesareachart = [
    {
      name: 'Sales Summery 1',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Sales Summery 2',
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ];

  return (
    <Card title="Area Chart">
      <Box display="flex" flexDirection="column" alignItems="start" p={2}>
        <Typography variant="h5" color="textSecondary">
          Total estimated
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Typography variant="h4" color="textPrimary" mr={1}>
            $4,250
          </Typography>
          <Box display="flex" alignItems="center" borderRadius="4px">
            <Typography variant="body2" ml={0.5}>
              +9%
            </Typography>
          </Box>
        </Box>
      </Box>
      <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
    </Card>
  );
};

export default TotalEstimatedChart;
