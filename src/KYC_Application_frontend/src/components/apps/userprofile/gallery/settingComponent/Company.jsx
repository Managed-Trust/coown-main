import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Switch, FormControlLabel, FormControl, Select, MenuItem } from '@mui/material';
import ChildCard from '../../../../shared/ChildCard';
import CustomFormLabel from "../../../../forms/theme-elements/CustomFormLabel";

const Company = () => {
    const [companyName, setCompanyName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [taxId, setTaxId] = useState('');
    const [legalStructure, setLegalStructure] = useState('');
    const [industrySector, setIndustrySector] = useState('');
    const [countryOfRegistry, setCountryOfRegistry] = useState('');


    return (
        <form>
            <ChildCard p={3}>
                <Typography variant="h6" gutterBottom>
                    Company
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Changing this detail will require additional KYC verification.
                </Typography>

                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                Company Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Company name
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Company name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Industry sector
                                    </Typography>
                                    <FormControl fullWidth variant="outlined">
                                        <Select
                                            value={industrySector}
                                            onChange={(e) => setIndustrySector(e.target.value)}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                Select industry sector
                                            </MenuItem>
                                            <MenuItem value="technology">Technology</MenuItem>
                                            <MenuItem value="finance">Finance</MenuItem>
                                            <MenuItem value="healthcare">Healthcare</MenuItem>
                                            {/* Add more sectors as needed */}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Registration number
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Registration number"
                                        value={registrationNumber}
                                        onChange={(e) => setRegistrationNumber(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Tax ID
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Tax ID"
                                        value={taxId}
                                        onChange={(e) => setTaxId(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Legal structure
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        placeholder="Legal structure"
                                        value={legalStructure}
                                        onChange={(e) => setLegalStructure(e.target.value)}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Country of registry
                                    </Typography>
                                    <FormControl fullWidth variant="outlined">
                                        <Select
                                            value={countryOfRegistry}
                                            onChange={(e) => setCountryOfRegistry(e.target.value)}
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
            
            <ChildCard p={3}>
                
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                    Corporate Documentation
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="incorporationCertificate" sx={{ paddingBottom: '15px' }}>Incorporation certificate</CustomFormLabel>
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
                      <CustomFormLabel htmlFor="memorandumArticles" sx={{ paddingBottom: '15px' }}>Memorandum and articles</CustomFormLabel>
                      <Grid container alignItems="center" spacing={2} sx={{ backgroundColor: '#f5f7fa', paddingBottom: 2, borderRadius: 1 }}>
                        <Grid item>
                          <Button variant="contained" component="label" color="primary">
                            Choose file
                            <input
                              type="file"
                              hidden
                              id="memorandumArticles"
                            />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>
        </form>
    );
};

export default Company;
