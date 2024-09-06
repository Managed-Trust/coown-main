import React, { useState } from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChildCard from '../../../components/shared/ChildCard';
import { Box, Grid, Typography, TextField, Select, MenuItem, Checkbox, Button, Switch, FormControlLabel, Divider, Link } from '@mui/material';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';

const BCrumb = [
  {
    to: '/',
    title: 'Group',
  },
  {
    title: 'Private Group',
  },
];

const PrivateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupLogo, setGroupLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [enableFileSharing, setEnableFileSharing] = useState(true);
  const [useAccountBalance, setUseAccountBalance] = useState(true);
  const [autoRenew, setAutoRenew] = useState(true);
  const [payWithInvoice, setPayWithInvoice] = useState(false);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setGroupLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission here
    const formData = new FormData();
    formData.append('groupName', groupName);
    formData.append('groupDescription', groupDescription);
    formData.append('groupLogo', groupLogo);
    formData.append('enableFileSharing', enableFileSharing);

    // You can send formData to your backend or handle it accordingly
    console.log('Form submitted', {
      groupName,
      groupDescription,
      groupLogo,
      enableFileSharing
    });
  };
  return (
    <PageContainer title="Create Private Group" description="this is Note page">
      <Breadcrumb title="Create Private Group" items={BCrumb} />
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <ChildCard>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                      Group Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="groupName">Group name</CustomFormLabel>
                        <TextField
                          id="groupName"
                          fullWidth
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="groupDescription">Group description</CustomFormLabel>
                        <TextField
                          id="groupDescription"
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          value={groupDescription}
                          onChange={(e) => setGroupDescription(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="groupLogo">Group logo</CustomFormLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button variant="contained" component="label">
                            Choose file
                            <input
                              type="file"
                              id="groupLogo"
                              hidden
                              onChange={handleLogoChange}
                            />
                          </Button>
                          {logoPreview && (
                            <Box
                              component="img"
                              sx={{ width: 100, height: 100, borderRadius: '8px' }}
                              src={logoPreview}
                              alt="Logo preview"
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </ChildCard>
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                        File Sharing
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>

                          <Typography sx={{ paddingTop: '10px' }} variant="body2" gutterBottom>
                            Turn on file sharing to allow members to easily send and shares files directly within the group chat
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={enableFileSharing}
                                onChange={(e) => setEnableFileSharing(e.target.checked)}
                              />
                            }
                            label="Enable file sharing"
                          />
                        </Grid>
                        <Typography sx={{ marginLeft: '60px' }} variant="body2" gutterBottom>
                          0.06 USD/MB
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                        Payment Options
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        {/* Pay with personal account balance */}
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={useAccountBalance}
                                onChange={(e) => setUseAccountBalance(e.target.checked)}
                              />
                            }
                            label="Pay with personal account balance"
                          />
                        </Grid>

                        {/* Select currency */}
                        {useAccountBalance && (
                          <Grid item xs={12}>
                            <Select
                              fullWidth
                              value="USD" // Replace with the actual selected value
                              onChange={(e) => console.log(e.target.value)} // Add your handler here
                            >
                              <MenuItem value="USD">USD</MenuItem>
                              <MenuItem value="EUR">EUR</MenuItem>
                              <MenuItem value="GBP">GBP</MenuItem>
                            </Select>
                          </Grid>
                        )}

                        {/* Automatically renew subscription */}
                        {useAccountBalance && (
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={autoRenew}
                                  onChange={(e) => setAutoRenew(e.target.checked)}
                                />
                              }
                              label="Automatically renew subscription for the next year"
                            />
                          </Grid>
                        )}

                        {/* Pay with invoice */}
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={payWithInvoice}
                                onChange={(e) => setPayWithInvoice(e.target.checked)}
                              />
                            }
                            label="Pay with invoice"
                          />
                          {payWithInvoice && (
                            <Typography sx={{ marginLeft: '40px' }} variant="body2" gutterBottom>
                              Manual handling fee is $20 per invoice
                            </Typography>
                          )}
                        </Grid>

                        {/* Invoice recipient address */}
                        {payWithInvoice && (
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Invoice recipient address"
                              multiline
                              rows={2}
                              variant="outlined"
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>

          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ padding: 5, borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
              {/* Order summary title */}
              <Typography variant="h6" gutterBottom>
                Order summary
              </Typography>

              {/* Description */}
              <Typography variant="body2" fontSize="14px" color="gray" gutterBottom>
                Setting up a registered company includes a KYC review of key stakeholder data by an AML Officer to ensure data quality and compliance. Additional transaction fees may apply.{' '}<br/>
                <Link href="#" underline="hover">
                  Learn more
                </Link>
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Fees */}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" fontSize="14px" color="gray">KYC review fee</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontSize="14px" fontWeight="bold">19 USD</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" fontSize="14px" color="gray">Annual fee (until Dec 31, 2024)</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontSize="14px" fontWeight="bold">0 USD</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" fontSize="14px" color="gray">File sharing</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontSize="14px" fontWeight="bold">0.006 USD/MB</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Subscription renewal notice */}
              <Box sx={{ padding: 2, backgroundColor: '#f0f4ff', borderRadius: 1 }}>
                <Typography variant="body2" color="primary" fontSize="14px">
                  Your subscription will renew automatically on the first week of a next year, at a cost of $60 USD.
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total to pay */}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body1" fontWeight="bold">
                    To pay today
                  </Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="h5" fontWeight="bold">
                    168 USD
                  </Typography>
                </Grid>
              </Grid>

              {/* Confirm and pay button */}
              <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Confirm and pay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </PageContainer>
  );
};

export default PrivateGroup;
