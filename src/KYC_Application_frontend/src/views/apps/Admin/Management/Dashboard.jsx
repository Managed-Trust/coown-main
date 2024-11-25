import React, { useState } from 'react';
import {
  Box, Paper, Checkbox,
  Button,
  IconButton, Link, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, MenuItem, List, ListItem, ListItemIcon, ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled, Avatar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import LinkIcon from '@mui/icons-material/Link';
import icp from '../../../../assets/images/svgs/Layer_1.svg';
import { ConnectDialog, useConnect, useDialog } from "@connect2ic/react";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& td': {
    borderBottom: 'none',
  },
}));

const settingsOptions = [
  { label: 'Announcements', icon: <AccountCircleIcon /> },
  { label: 'Links', icon: <SecurityIcon /> },
  { label: 'Policies', icon: <LockIcon /> },
];

const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [productNotifications, setProductNotifications] = useState(true);
  const [marketingNotifications, setMarketingNotifications] = useState(true);

  const { open, close, isOpen } = useDialog()
  const { isConnected, principal, disconnect } = useConnect({
    onConnect: () => {
      console.log("User connected!");
    },
    onDisconnect: () => {

      console.log("User disconnected!");
    }
  });

  const affiliatesData = [
    {
      name: 'Operator Policy',
      totalMembers: 'Regional Operators',
      Balance: 'https://www.notion',
      total_revenue: 'Steering Committee',
    },
    {
      name: 'User  Policy - Template',
      totalMembers: 'New Account',
      Balance: 'https://www.notion',
      total_revenue: 'Executive Committee',
    },
    {
      name: 'Global Marketplace Policy',
      totalMembers: 'Entity issuing securities',
      Balance: 'https://www.notion',
      total_revenue: 'Foundation',
    },
  ];

  const handleConnect = () => {
    if (isConnected) {
      swal({
        title: 'Success',
        text: 'Your wallet disconnected successfully',
        icon: 'success'
      });
      console.log("Disconnecting...");
      disconnect(); // If already connected, clicking will disconnect
    } else {
      console.log("Connecting...");
      open(); // If not connected, clicking will trigger connection
    }
  };


  function Row({ row }) {
    return (
      <>
        <StyledTableRow>
          <TableCell sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
            <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
              {row.name}
            </Typography>
          </TableCell>
          <TableCell sx={{ color: '#1e293b' }}>{row.totalMembers}</TableCell>
          <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
            {row.Balance}
          </TableCell>
          <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
            {row.total_revenue}
          </TableCell>
          <TableCell align="right">

            <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      </>
    );
  }

  const handleListItemClick = (index) => {
    setActiveStep(index);
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom>
                Announcements
              </Typography>
              <Typography variant="body1" color={'#5A6A85'} >
                Send announcements to affiliates and end-users
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{
              py: '20px'
            }}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                  Internal announcement
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <CustomFormLabel htmlFor="acc1">Announcement to regional operators and other affiliates</CustomFormLabel>
                    <TextField
                      id="acc1"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder='Type announcement message'
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                      Publish
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Save draft
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{
              py: '20px'
            }}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                  Public announcement
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <CustomFormLabel htmlFor="acc2">
                      Announcement to end-users of COOWN app
                    </CustomFormLabel>
                    <TextField
                      id="acc2"
                      fullWidth
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder='Search by name or email'
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                      Publish
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: 'none' }}>
                      Save draft
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6" gutterBottom>
                Links
              </Typography>
              <Typography variant="body1" color={'#5A6A85'} >
                Changing this details will require additional KYC verfication.
              </Typography>
            </Grid>
            <Grid container spacing={2} sx={{
              py: '20px'
            }}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                  Management system
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <CustomFormLabel htmlFor="link1">Link to management system</CustomFormLabel>
                    <TextField
                      id="link2"
                      fullWidth
                      placeholder='Germany'
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>
                    Copy
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }}>
                    Publish
                  </Button>

                </Grid>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{
              py: '20px'
            }}>
              <Grid item xs={12} sm={12} md={4}>
                <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                  Management system
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <CustomFormLabel htmlFor="link1">Link to management system</CustomFormLabel>
                    <TextField
                      id="link2"
                      fullWidth
                      placeholder='Germany'
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', gap: 1, mt: 1 }}>
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>
                    Copy
                  </Button>
                  <Button variant="contained" sx={{ textTransform: 'none' }}>
                    Publish
                  </Button>

                </Grid>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                  Operators
                </Typography>

              </Box>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',

                  boxShadow: 'none',
                  padding: '8px 16px',
                }}
              >
                Add policy
              </Button>
            </Box>

            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Document Name</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Applicability</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Link</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Responsible entity</TableCell>
                    <TableCell align="right" sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {affiliatesData.map((row) => (
                    <Row key={row.name} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
    }
  };

  return (
    <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>


      <Grid container spacing={2} mt={2}>
        <Grid item xs={3}>
          <Paper sx={{ padding: '10px', height: '100%' }}>
            <Typography variant="h6" sx={{ marginBottom: '10px' }}>Settings</Typography>
            <List>
              {settingsOptions.map((option, index) => (
                <ListItem
                  button
                  key={option.label}
                  selected={activeStep === index}
                  onClick={() => handleListItemClick(index)}
                >
                  <ListItemIcon sx={{ color: '#5A6A85' }}>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.label} sx={{ marginLeft: '-20px' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>

          <Paper sx={{ padding: '20px' }}>
            {renderStepContent(activeStep)}
          </Paper>
        </Grid>

        <ConnectDialog dark={false} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
