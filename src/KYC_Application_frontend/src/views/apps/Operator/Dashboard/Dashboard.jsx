import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  ThemeProvider,
  createTheme,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';
import { ArrowUpward, Settings, ArrowForward } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Chart from 'react-apexcharts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const chartData = [
  { name: 'Jan', pending: 10, overdue: 5, suspended: 10 },
  { name: 'Feb', pending: 20, overdue: 10, suspended: 20 },
  { name: 'Mar', pending: 30, overdue: 15, suspended: 30 },
  { name: 'Apr', pending: 40, overdue: 20, suspended: 40 },
  { name: 'May', pending: 50, overdue: 25, suspended: 50 },
  { name: 'Jun', pending: 60, overdue: 30, suspended: 60 },
  { name: 'Jul', pending: 70, overdue: 35, suspended: 70 },
  { name: 'Aug', pending: 80, overdue: 40, suspended: 80 },
  { name: 'Sep', pending: 90, overdue: 45, suspended: 90 },
  { name: 'Oct', pending: 100, overdue: 50, suspended: 100 },
  { name: 'Nov', pending: 110, overdue: 55, suspended: 110 },
  { name: 'Dec', pending: 120, overdue: 60, suspended: 120 },
];

const operatorGroups = [
  { name: 'Regional operator G', id: '#13245789', members: 12, function: 'Operator Group', since: 'Jan 1, 2024' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper elevation={3} sx={{ p: 1 }}>
        <Typography variant="body2">{`${label}`}</Typography>
        {payload.map((entry, index) => (
          <Typography key={`item-${index}`} variant="body2" color={entry.color}>
            {`${entry.name}: ${entry.value}`}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

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

function Dashboard() {
  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: 'background.default' }}>
      <Grid container spacing={3}>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Pending requests
                  </Typography>
                  <Typography variant="h4" color="text.primary">
                    46 <Typography variant="caption" color="success.main">↑ +9%</Typography>
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Overdue requests
                  </Typography>
                  <Typography variant="h4" color="text.primary">
                    7 <Typography variant="caption" color="success.main">↑ +9%</Typography>
                  </Typography>
                </Box>
              </Box>
              <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
              <Box mt={2} textAlign="start">
                <Button variant="outlined" color="primary">View more</Button>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Suspended payments
                  </Typography>
                  <Typography variant="h4" color="text.primary">
                    1000 <Typography variant="caption" color="success.main">↑ +9%</Typography>
                  </Typography>
                </Box>
              </Box>
              <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
              <Box mt={2} textAlign="start">
                <Button variant="outlined" color="primary">View more</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>


        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader title="Areas" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Exclusive areas
                  </Typography>
                  <Box display="flex" gap={1}>
                    <Chip label="EE" size="small" sx={{ backgroundColor: '#1976d2', color: 'white' }} />
                    <Chip label="LT" size="small" sx={{ backgroundColor: '#ffc107', color: 'black' }} />
                    <Chip label="LV" size="small" sx={{ backgroundColor: '#dc004e', color: 'white' }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Non-exclusive areas
                  </Typography>
                  <Chip label="EU" size="small" sx={{ backgroundColor: '#0d47a1', color: 'white' }} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Operator groups</Typography>
              <Button variant="outlined" size="small" startIcon={<Settings />}>Configure</Button>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>Groups of affiliates of the inner and outer circles</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Group name</TableCell>
                    <TableCell align="right">Total members</TableCell>
                    <TableCell align="right">Function</TableCell>
                    <TableCell align="right">Since</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {operatorGroups.map((group) => (
                    <TableRow key={group.id}>
                      <TableCell component="th" scope="row">
                        {group.name}
                        <Typography variant="caption" display="block" color="text.secondary">{group.id}</Typography>
                      </TableCell>
                      <TableCell align="right">{group.members}</TableCell>
                      <TableCell align="right">{group.function}</TableCell>
                      <TableCell align="right">{group.since}</TableCell>
                      <TableCell align="right">
                        <Button size="small" endIcon={<ArrowForward />}>View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;