import React, { useState } from 'react';
import Breadcrumb from '../../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../container/PageContainer';
import ChildCard from '../../../../shared/ChildCard';
import { Box, Grid, Typography, InputLabel, TextField, Select, MenuItem, FormControl, Button, Switch, FormControlLabel, Divider, Link } from '@mui/material';
import CustomFormLabel from '../../../../forms/theme-elements/CustomFormLabel';

const BCrumb = [
  {
    to: '/',
    title: 'StakeHolder',
  },
  {
    title: 'Add StakeHolder',
  },
];

const AddStakeHolder = () => {
  const [isShareholder, setIsShareholder] = useState(true);
  const [type, setType] = useState('naturalPerson');

  const handleShareholderToggle = (event) => {
    setIsShareholder(event.target.checked);
  };
  return (
    <PageContainer title="Add StakeHolder" description="this is Note page">
      <Breadcrumb title="Add StakeHolder" items={BCrumb} />
      <form>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={9}>
            <ChildCard>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                      StakeHolder Type
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          defaultValue="naturalPerson"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <MenuItem value="registerCompany">Register Company</MenuItem>
                          <MenuItem value="naturalPerson">Natural Person</MenuItem>
                        </Select>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </ChildCard>
            {type == 'naturalPerson' ? 
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                        StakeHolder Detail
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Work email
                          </Typography>
                          <TextField
                            fullWidth
                            placeholder="Work email"
                            defaultValue="aleksei@ignatjev.ee"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>

                          <CustomFormLabel htmlFor="groupLogo"> Given name</CustomFormLabel>

                          <TextField
                            fullWidth
                            placeholder="Given name"
                            defaultValue="Aleksei"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <CustomFormLabel htmlFor="groupLogo">Family name</CustomFormLabel>
                          <TextField
                            fullWidth
                            placeholder="Family name"
                            defaultValue="Ignatjev"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="groupLogo">Title</CustomFormLabel>
                          <TextField
                            fullWidth
                            placeholder="Enter title/position"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="groupLogo">  Phone number</CustomFormLabel>

                          <TextField
                            fullWidth
                            placeholder="Phone number"
                            defaultValue="+123"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>
            :
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                        StakeHolder Detail
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="subtitle1" gutterBottom>
                            Business email
                          </Typography>
                          <TextField
                            fullWidth
                            placeholder="Business email"
                            defaultValue="aleksei@ignatjev.ee"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="groupLogo">Company Name</CustomFormLabel>
                          <TextField
                            fullWidth
                            placeholder="Enter company name"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="groupLogo">  Phone number</CustomFormLabel>

                          <TextField
                            fullWidth
                            placeholder="Phone number"
                            defaultValue="+123"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>
            }
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                        Address
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="groupLogo"> Full address</CustomFormLabel>

                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Address, City, State, Postal code"
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12}>

                          <CustomFormLabel htmlFor="groupLogo">Country</CustomFormLabel>
                          <FormControl fullWidth variant="outlined">
                            <Select
                              defaultValue=""
                              onChange={(e) => console.log(e.target.value)}
                              displayEmpty
                            >
                              <MenuItem value="" disabled>
                                Select country
                              </MenuItem>
                              <MenuItem value="usa">United States</MenuItem>
                              <MenuItem value="canada">Canada</MenuItem>
                              <MenuItem value="uk">United Kingdom</MenuItem>
                              {/* Add more countries as needed */}
                            </Select>
                          </FormControl>
                        </Grid>


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
                        Role and Ownership
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Switch color="primary" />}
                            label="Is an Executive Manager"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Switch color="primary" />}
                            label="Is nominated to the Board of Directors"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormControlLabel
                            control={<Switch color="primary" checked={isShareholder} onChange={handleShareholderToggle} />}
                            label="Is a Shareholder"
                          />
                        </Grid>

                        {isShareholder && (
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              placeholder="Shares amount"
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
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                        Proof of Authority
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="incorporationCertificate" sx={{ paddingBottom: '15px' }}>Upload proof of authority</CustomFormLabel>

                          <Grid container alignItems="center" spacing={2} sx={{ backgroundColor: '#f5f7fa', paddingBottom: 2, borderRadius: 1 }}>
                            <Grid item>
                              <Button variant="contained" component="label" color="primary">
                                Choose file
                                <input
                                  type="file"
                                  hidden
                                  id="incorporationCertificate"
                                />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>

                          <CustomFormLabel htmlFor="groupLogo">Stakeholder description</CustomFormLabel>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Stakeholder description"
                            variant="outlined"
                          />
                        </Grid>
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
                        Dedicated Role
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputLabel>Select role</InputLabel>
                            <Select
                              defaultValue=""
                              onChange={(e) => console.log(e.target.value)}
                              label="Select role"
                            >
                              <MenuItem value="manager">Manager</MenuItem>
                              <MenuItem value="director">Director</MenuItem>
                              <MenuItem value="shareholder">Shareholder</MenuItem>
                              {/* Add more roles as needed */}
                            </Select>
                          </FormControl>
                        </Grid>
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
                      <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                        Invitation message
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>

                          <CustomFormLabel htmlFor="groupLogo">Add invitation message</CustomFormLabel>
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Type your message here"
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>
          </Grid>
        </Grid>
      </form>
    </PageContainer>
  );
};

export default AddStakeHolder;
