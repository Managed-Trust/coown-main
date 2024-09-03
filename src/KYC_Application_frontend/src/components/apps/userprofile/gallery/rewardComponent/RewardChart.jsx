import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Card, Box, Typography ,Grid } from '@mui/material';

const RewardChart = () => {

  // chart colors
  const theme = useTheme();
  const StarReward = '#512da8';
  const StakingReward = '#e79696';
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
    colors: [Total, StarReward, StakingReward],
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
      name: 'Total',
      data: [15, 30, 45, 55, 65, 75, 85],
    },
    {
      name: 'Star Reward',
      data: [25, 40, 45, 50, 55, 70, 90],
    },
    {
      name: 'Staking Reward',
      data: [5, 15, 25, 35, 45, 55, 65],
    },
  ];

  return (
    <Card title="Area Chart">
      <Box sx={{ width: '100%', padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Rewards received
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="body2">Total received</Typography>
            <Typography variant="h5">4,250 ICP</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">$TAR rewards</Typography>
            <Typography variant="h5">1,750 ICP</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Staking rewards</Typography>
            <Typography variant="h5">2,500 ICP</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="body2">Reseller rewards</Typography>
            <Typography variant="h5">0 ICP</Typography>
          </Grid>
        </Grid>
      </Box>
      <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
    </Card>
  );
};

export default RewardChart;
