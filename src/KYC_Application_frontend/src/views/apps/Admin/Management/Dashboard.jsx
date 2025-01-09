import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Checkbox,
  Button,
  IconButton, Card, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, MenuItem, List, ListItem, ListItemIcon, ListItemText,
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
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

const settingsOptions = [
  { label: 'Announcements', icon: <AccountCircleIcon /> },
  { label: 'Quick Links', icon: <LinkIcon /> },
  { label: 'Policies', icon: <LockIcon /> },
];
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& td': {
    borderBottom: 'none',
  },
}));

const initialState = {
  internalAnn: '',
  isInternalPublish: false,
  acc1: [],
  publicAnn: '',
  isPublicPublish: false,
  acc2: []
};

const AnnouncementCard = ({ message, createdBy, createdAt }) => {
  // const formattedDate = new Date(Number(createdAt.toString().slice(0, -6))).toLocaleString("en-US", {
  //   month: "short",
  //   day: "numeric",
  //   year: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  // });

  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: "#f0f5ff",
        border: "1px solid #e0e7ff",
      }}
    >
      <Typography variant="body1" color="textPrimary" gutterBottom>
        {message}
      </Typography>
      <Typography variant="caption" color="primary">
        Published by {createdBy}
      </Typography>
    </Card>
  );
};

const Dashboard = ({ openDrawer,openDrawer2,polices }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [quickLinks, setQuickLinks] = useState([]);
  const [formData, setFormData] = useState(initialState);
  const [toggleEditInternal, setToggleEditInternal] = useState(false);
  const [toggleEditPublic, setToggleEditPublic] = useState(false);

  const [renderTrigger, setRenderTrigger] = useState(0);
  const [linkValues, setLinkValues] = useState({});

  const handleURLChange = (id, value) => {
    setLinkValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const affiliatesData = [
    {
      name: 'Operator Policy',
      totalMembers: 'Regional Operators',
      Balance: 'https://www.notion',
      total_revenue: 'Steering ',
    },
    {
      name: 'User  Policy - Template',
      totalMembers: 'New Account',
      Balance: 'https://www.notion',
      total_revenue: 'Executive ',
    },
    {
      name: 'Global Marketplace Policy',
      totalMembers: 'Entity issuing securities',
      Balance: 'https://www.notion',
      total_revenue: 'Foundation',
    },
  ];


  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        // Fetch internal announcements
        const internalResponse = await ledger.call('getInternalAnnouncements');
        console.log('Internal Announcements:', internalResponse);
        if (internalResponse.length > 0) {
          const acc1 = internalResponse[0] || {};
          const isInternalPublish = acc1.isPublished || false;
          const internalAnn = acc1.message || '';

          setFormData((prevFormData) => ({
            ...prevFormData,
            isInternalPublish,
            internalAnn,
            acc1,
          }));
        }

        // Fetch public announcements
        const publicResponse = await ledger.call('getPublicAnnouncements');
        console.log('Public Announcements:', publicResponse);
        if (publicResponse.length > 0) {
          const acc2 = publicResponse[0] || {};
          const isPublicPublish = acc2.isPublished || false;
          const publicAnn = acc2.message || '';

          setFormData((prevFormData) => ({
            ...prevFormData,
            isPublicPublish,
            publicAnn,
            acc2,
          }));
        }
      } catch (e) {
        console.error('Error fetching announcements:', e);
      }
    };

    const fetchQuickLinks = async () => {
      try {
        const response = await ledger.call('getQuickLinks');
        console.log('response quick link', response);
        if (response) {
          setQuickLinks(response);
          const preFilledValues = response.reduce((acc, link) => {
            acc[link.id] = link.url || ''; // Default to an empty string if URL is missing
            return acc;
          }, {});

          setLinkValues(preFilledValues);
        }
      } catch (error) {
        console.log('error', error);
      }
    }

    fetchQuickLinks();
    fetchAnnouncements();
  }, [renderTrigger]); // Dependency array


  const handleAddInternalAnnouncement = async (publish) => {
    if (!formData.internalAnn) {
      swal('Warning', 'Please fill the internal Announcemnt field', 'warning');
      return;
    }
    const id = `internalAnn-${Math.floor(100000 + Math.random() * 900000).toString()}`;
    try {
      const response = await ledger.call('addOrUpdateInternalAnnouncement', id, formData.internalAnn, 'user', publish);
      console.log('response', response);
      if (response) {
        swal({
          title: 'Success',
          text: 'Internal Announcemnet Update Successfully',
          icon: 'success'
        });
        setRenderTrigger(!renderTrigger);
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    }
    catch (e) {
      console.log('error', e);
    }
  }
  const handleUpdateInternalAnnouncement = async (id, publish) => {
    if (!formData.internalAnn) {
      swal('Warning', 'Please fill the internal Announcemnt field', 'warning');
      return;
    }
    try {
      const response = await ledger.call('addOrUpdateInternalAnnouncement', id, formData.internalAnn, 'user', publish);
      console.log('response', response);
      if (response) {
        swal({
          title: 'Success',
          text: 'Internal Announcemnet Update Successfully',
          icon: 'success'
        });
        setToggleEditInternal(false);
        setRenderTrigger(!renderTrigger);
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    }
    catch (e) {
      console.log('error', e);
    }
  }
  const handleUnpublisInternal = async (id) => {
    console.log('id', id);
    try {
      const response = await ledger.call('unpublishInternalAnnouncement', id);
      console.log('resp', response);
      if (response) {
        swal('Success', 'Internal Announcement unpublished', 'success');
        setRenderTrigger(!renderTrigger);
      } else {
        swal('Warning', 'Something went wrong', 'warning');
        setRenderTrigger(!renderTrigger);
      }
    } catch (e) {
      console.log('error', e);
    }
  }
  const handlepublisInternal = async (id) => {
    try {
      const response = await ledger.call('publishInternalAnnouncement', id);
      if (response) {
        swal('Success', 'Internal Announcement published', 'success');
      } else {
        swal('Warning', 'Something went wrong', 'warning')
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  const handleAddPublicAnnouncement = async (publish) => {
    if (!formData.publicAnn) {
      swal('Warning', 'Please fill the public Announcemnt field', 'warning');
      return;
    }
    const id = `publicAnn-${Math.floor(100000 + Math.random() * 900000).toString()}`;
    try {
      const response = await ledger.call('addOrUpdatePublicAnnouncement', id, formData.publicAnn, 'user', publish);
      console.log('response', response);
      if (response) {
        swal({
          title: 'Success',
          text: 'Public Announcemnet Update Successfully',
          icon: 'success'
        });
        setRenderTrigger(!renderTrigger);
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    }
    catch (e) {
      console.log('error', e);
    }
  }
  const handleUpdatePublicAnnouncement = async (id, publish) => {
    if (!formData.publicAnn) {
      swal('Warning', 'Please fill the internal Announcemnt field', 'warning');
      return;
    }
    try {
      const response = await ledger.call('addOrUpdatePublicAnnouncement', id, formData.publicAnn, 'user', publish);
      console.log('response', response);
      if (response) {
        swal({
          title: 'Success',
          text: 'Public Announcemnet Update Successfully',
          icon: 'success'
        });
        setToggleEditPublic(false);
        setRenderTrigger(!renderTrigger);
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    }
    catch (e) {
      console.log('error', e);
    }
  }
  const handleUnpublishPublic = async (id) => {
    console.log('id', id);
    try {
      const response = await ledger.call('unpublishPublicAnnouncement', id);
      console.log('resp', response);
      if (response) {
        swal('Success', 'Public Announcement unpublished', 'success');
        setRenderTrigger(!renderTrigger);
      } else {
        swal('Warning', 'Something went wrong', 'warning');
        setRenderTrigger(!renderTrigger);
      }
    } catch (e) {
      console.log('error', e);
    }
  }
  const handlepublishPublic = async (id) => {
    try {
      const response = await ledger.call('publishPublicAnnouncement', id);
      if (response) {
        swal('Success', 'Public Announcement published', 'success');
      } else {
        swal('Warning', 'Something went wrong', 'warning');
      }
    } catch (e) {
      swal('ERROR', e, 'error');
      console.log('error', e);
    }
  }

  const handlePublishQuickLink = async (id, url) => {
    try {
      const response = await ledger.call('updateQuickLinkUrl', id, url);
      if (response) {
        swal('Success', 'QuicK Link Updated', 'success');
      } else {
        swal('Warning', 'Something went wrong', 'warning')
      }
    } catch (e) {

      swal('ERROR', e, 'error');
      console.log('error', e);
    }
  }
  const handleCopy = (id) => {
    if (linkValues[id]) {
      navigator.clipboard
        .writeText(linkValues[id])
        .then(() => {
          swal("Copied!", "The link has been copied to your clipboard.", "success");
        })
        .catch((error) => {
          console.error("Copy failed", error);
          swal("Error", "Failed to copy the link.", "error");
        });
    } else {
      swal("Error", "No link available to copy.", "error");
    }
  };

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
                {formData.acc1.length !== 0 ?
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="acc1">Announcement to regional operators and other affiliates</CustomFormLabel>
                      {toggleEditInternal ?
                        <TextField
                          id="internalAnn"
                          fullWidth
                          onChange={handleInputChange}
                          value={formData.internalAnn}
                          multiline
                          rows={4}
                          variant="outlined"
                          placeholder='Type announcement message'
                        /> :

                        <AnnouncementCard {...formData.acc1} />}
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                      {formData.isInternalPublish ?
                        <>
                          <Button onClick={() => handleUnpublisInternal(formData.acc1.id)} variant="contained" sx={{ textTransform: 'none' }}>
                            UnPublish
                          </Button>
                          {toggleEditInternal ?
                            <Button onClick={() => handleUpdateInternalAnnouncement(formData.acc1.id, false)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                            :
                            <Button onClick={() => setToggleEditInternal(true)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                          }
                        </> :
                        <>
                          <Button
                            onClick={() => handlepublisInternal(formData.acc1.id)} variant="contained" sx={{ textTransform: 'none' }}>
                            Publish
                          </Button>
                          {toggleEditInternal ?
                            <Button onClick={() => handleUpdateInternalAnnouncement(formData.acc1.id, false)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                            :
                            <Button onClick={() => setToggleEditInternal(true)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                          }
                        </>
                      }
                    </Grid>
                  </Grid> :
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="acc1">Announcement to regional operators and other affiliates</CustomFormLabel>
                      <TextField
                        id="internalAnn"
                        fullWidth
                        onChange={handleInputChange}
                        value={formData.internalAnn}
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder='Type announcement message'
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        onClick={() => handleAddInternalAnnouncement(true)} variant="contained" sx={{ textTransform: 'none' }}>
                        Publish
                      </Button>
                      <Button onClick={() => handleAddInternalAnnouncement(false)} variant="outlined" sx={{ textTransform: 'none' }}>
                        Save draft
                      </Button>
                    </Grid>
                  </Grid>
                }
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
                {formData.acc2.length !== 0 ?
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="acc2">
                        Announcement to end-users of COOWN app      </CustomFormLabel>
                      {toggleEditPublic ?
                        <TextField
                          id="publicAnn"
                          fullWidth
                          multiline
                          onChange={handleInputChange}
                          value={formData.publicAnn}
                          rows={4}
                          variant="outlined"
                          placeholder='Public Announcemnet'
                        /> :

                        <AnnouncementCard {...formData.acc2} />
                      }


                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>
                      {formData.isPublicPublish ?
                        <>
                          <Button onClick={() => handleUnpublishPublic(formData.acc1.id, false)} variant="contained" sx={{ textTransform: 'none' }}>
                            UnPublish
                          </Button>
                          {toggleEditPublic ?
                            <Button onClick={() => handleUpdatePublicAnnouncement(formData.acc2.id, false)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                            :
                            <Button onClick={() => setToggleEditPublic(true)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                          }
                        </> :
                        <>
                          <Button onClick={() => handlepublishPublic(formData.acc2.id, false)} variant="contained" sx={{ textTransform: 'none' }}>
                            Publish
                          </Button>
                          {toggleEditPublic ?
                            <Button onClick={() => handleUpdatePublicAnnouncement(formData.acc2.id, false)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                            :
                            <Button onClick={() => setToggleEditPublic(true)} variant="outlined" sx={{ textTransform: 'none' }}>
                              Edit
                            </Button>
                          }
                        </>
                      }
                    </Grid>
                  </Grid> :
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="acc2">
                        Announcement to end-users of COOWN app
                      </CustomFormLabel>
                      <TextField
                        id="publicAnn"
                        fullWidth
                        multiline
                        onChange={handleInputChange}
                        value={formData.publicAnn}
                        rows={4}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', gap: 1 }}>

                      <Button
                        onClick={() => handleAddPublicAnnouncement(true)} variant="contained" sx={{ textTransform: 'none' }}>
                        Publish
                      </Button>
                      <Button onClick={() => handleAddPublicAnnouncement(false)} variant="outlined" sx={{ textTransform: 'none' }}>
                        Save draft
                      </Button>

                    </Grid>
                  </Grid>
                }
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid item xs={12} sm={12} md={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Quick Links
                  </Typography>
                  <Typography variant="body1" color={'#5A6A85'} >
                    Changing this details will require additional KYC verfication.
                  </Typography>
                </Box>
                <Button
                  onClick={() => openDrawer()}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#5d87ff',
                    },
                    boxShadow: 'none',
                    padding: '8px 16px',
                  }}
                >
                  Add Quick Link
                </Button>
              </Box>
            </Grid>
            {quickLinks && quickLinks.length > 0 && quickLinks.map((link) => (
              <Grid container spacing={2} sx={{
                py: '20px'
              }}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                    {link.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2} >
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="link1">Link to {link.name}</CustomFormLabel>
                      <TextField
                        id={`${link.id}`}
                        name=""
                        fullWidth
                        value={linkValues[link.id] || ''}
                        onChange={(e) => handleURLChange(link.id, e.target.value)}
                        placeholder="Enter URL"
                      />
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Button onClick={() => handlePublishQuickLink(link.id, linkValues[link.id])} variant="contained" sx={{ textTransform: 'none' }}>
                      Save
                    </Button>
                    <Button
                      onClick={() => handleCopy(link.id)} variant="outlined" sx={{ textTransform: 'none' }}>
                      Copy
                    </Button>

                  </Grid>
                </Grid>
              </Grid>

            ))}
          </Box>
        );
      case 2:
        return (
          <Box>
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
              <Box>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                  Polices
                </Typography>

              </Box>
              <Button              
              onClick={() => openDrawer2()}
                variant="outlined"
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
                {polices.map((row) => (
                  <StyledTableRow>
                    <TableCell sx={{ color: '#1e293b' }}>{row.name}</TableCell>
                    <TableCell sx={{ color: '#1e293b' }}>{row.applicability}</TableCell>
                    <TableCell sx={{ color: '#1e293b' }}>{row.link}</TableCell>
                    <TableCell sx={{ color: '#1e293b' }}>{row.responsibleEntity}</TableCell>
                    <TableCell align="right">                    
                      <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
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
      </Grid>
    </Box>
  );
};

export default Dashboard;
