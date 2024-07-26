import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChildCard from '../../../components/shared/ChildCard';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  Button,
  FormControlLabel
} from "@mui/material";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Add stakeholder',
  },
];

const AddStakeHolder = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    title: '',
    address: '',
    country: '',
    isShareholder: false,
    sharePercentage: '',
    isExecutiveManager: false,
    createUserProfile: false,
    role: '',
    invitationMessage: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <PageContainer title="Add stakeholder" description="this is Note page">
      <Breadcrumb title="Add stakeholder" items={BCrumb} />
      <form onSubmit={handleSubmit}>
        <Box p={2}>
          <ChildCard>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Personal details
                  </Typography></Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="email">
                        Work Email
                      </CustomFormLabel>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        name="email"
                        placeholder="test@gmial.com"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel htmlFor="firstName">
                        First name
                      </CustomFormLabel>
                      <TextField
                        required
                        fullWidth
                        id="firstName"
                        placeholder='First name'
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        autoComplete="given-name"
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CustomFormLabel htmlFor="lastName">
                        Last name
                      </CustomFormLabel>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        placeholder='Last name'
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        autoComplete="family-name"
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="title">
                        Title
                      </CustomFormLabel>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        placeholder="Enter Title/Position"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid></Grid>
            </Box>
          </ChildCard>
        </Box>
        <Box p={2}>
          <ChildCard>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Address
                  </Typography>
                  <Typography variant="span" color="textSecondary">
                    Address will be used for AML check
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="address">
                        Full address
                      </CustomFormLabel>
                      <TextField
                        required
                        fullWidth
                        id="address"
                        placeholder="Address,City,State, Postal code"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <CustomFormLabel htmlFor="country-label">
                          Country
                        </CustomFormLabel>
                        <Select
                          labelId="country-label"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          label="Country"
                          style={{
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          }}
                        >
                          <MenuItem value="">
                            <em>Select country</em>
                          </MenuItem>
                          <MenuItem value="USA">USA</MenuItem>
                          <MenuItem value="Canada">Canada</MenuItem>
                          <MenuItem value="UK">UK</MenuItem>
                          {/* Add more countries as needed */}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid></Grid></Grid>
            </Box>
          </ChildCard></Box>
        <Box p={2}>
          <ChildCard>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Role and Ownership
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.isExecutiveManager}
                            onChange={handleChange}
                            name="isExecutiveManager"
                            color="primary"
                          />
                        }
                        label="Is executive manager"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={formData.isShareholder}
                            onChange={handleChange}
                            name="isShareholder"
                            color="primary"
                          />
                        }
                        label="Is shareholder"
                      />
                    </Grid>
                    {formData.isShareholder && (
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="sharePercentage"
                          placeholder="Share %"
                          name="sharePercentage"
                          value={formData.sharePercentage}
                          onChange={handleChange}
                          variant="outlined"
                          InputProps={{
                            style: {
                              borderRadius: '8px',
                              border: '1px solid #E2E8F0',
                            },
                          }}
                        />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </ChildCard>
        </Box>
        <Box p={2}>
          <ChildCard>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Create user profile
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.createUserProfile}
                        onChange={handleChange}
                        name="createUserProfile"
                        color="primary"
                      />
                    }
                    label="Create user profile"
                  />
                  {formData.createUserProfile && (
                    <FormControl fullWidth variant="outlined" style={{ marginTop: '16px' }}>
                      <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        placeholder='Select role'
                        value={formData.role}
                        onChange={handleChange}
                        style={{
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        <MenuItem value="">
                          <em>Select role</em>
                        </MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Viewer">Viewer</MenuItem>
                        {/* Add more roles as needed */}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
              </Grid>          </Box>
          </ChildCard>
        </Box>
        <Box p={2}>
          <ChildCard>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Invitation message
                  </Typography>
                  <Typography variant="span" color="textSecondary">
                    Include a personal message that the invited stakeholder will see in their email.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="invitationMessage">
                        Add invitation message
                      </CustomFormLabel>
                      <TextField
                        fullWidth
                        id="invitationMessage"
                        placeholder="Type your message here"
                        name="invitationMessage"
                        value={formData.invitationMessage}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        InputProps={{
                          style: {
                            borderRadius: '8px',
                            border: '1px solid #E2E8F0',
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </ChildCard>
        </Box>
        <Box p={3} display="flex" justifyContent="flex-end">
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
            Confirm and send invite
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </form>
    </PageContainer>
  );
};

export default AddStakeHolder;
