import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  Tab,
  Typography,
  Select,
  TextField,
  OutlinedInput,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// components
import BlankCard from '../../shared/BlankCard';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { IconEye, IconEyeOff } from '@tabler/icons';

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];

const initialState = {
  family_name: '',
  email: '',
  given_name: '',
  birth_date: '',
  age_over_18: '',
  gender: '',
  issuance_date: '',
  expiry_date: '',
  resident_address: '',
  resident_country: '',
  document_number: '',
  issuing_country: '',
  phone_number: '',
  openchat_id: '',
  document_file: null,
  publish_profile: false,
  comments: '',
};

const FormTabs = () => {
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      document_file: file,
    }));
    setDocumentPreview(URL.createObjectURL(file));
  };

  const handleSelectChange = (id) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: event.target.value,
    }));
  };

  const handleToggleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      publish_profile: event.target.checked,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form Submitted', formData);
  };

  return (
    <div>
      <BlankCard>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
              <Tab label="Personal Details" value="1" />
              <Tab label="Communication Settings" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="given_name" sx={{ mt: 3 }} className="center">
                  Given Name
                </CustomFormLabel>
                <TextField id="given_name" placeholder="John" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="birth_date" sx={{ mt: 2 }} className="center">
                  Date of Birth
                </CustomFormLabel>
                <TextField type="date" id="birth_date" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="age_over_18" sx={{ mt: 2 }} className="center">
                  Age Over 18
                </CustomFormLabel>
                <Select id="age_over_18" fullWidth onChange={handleSelectChange('age_over_18')} value={formData.age_over_18}>
                  <MenuItem value="true">True</MenuItem>
                  <MenuItem value="false">False</MenuItem>
                </Select>

                <CustomFormLabel htmlFor="resident_address" className="center">
                  Resident Address
                </CustomFormLabel>
                <TextField id="resident_address" placeholder="123 Main St" fullWidth onChange={handleInputChange} />

              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="family_name" className="center">
                  Family Name
                </CustomFormLabel>
                <TextField id="family_name" placeholder="Doe" fullWidth onChange={handleInputChange} />
                
                <CustomFormLabel htmlFor="birth_place" sx={{ mt: 2 }} className="center">
                  Birth Place
                </CustomFormLabel>
                <TextField id="birth_place" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="gender" sx={{ mt: 2 }} className="center">
                  Gender
                </CustomFormLabel>
                <Select id="gender" fullWidth onChange={handleSelectChange('gender')} value={formData.gender}>
                  <MenuItem value="0">Not known</MenuItem>
                  <MenuItem value="1">Male</MenuItem>
                  <MenuItem value="2">Female</MenuItem>
                  <MenuItem value="9">Not applicable</MenuItem>
                </Select>

                <CustomFormLabel htmlFor="resident_country" sx={{ mt: 3 }} className="center">
                  Resident Country
                </CustomFormLabel>
                <Select id="resident_country" fullWidth onChange={handleSelectChange('resident_country')} value={formData.resident_country}>
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="email" className="center">
                  Email Address
                </CustomFormLabel>
                <TextField id="email" placeholder="user@gmail.com" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="openchat_id" sx={{ mt: 2 }} className="center">
                  OpenChat ID
                </CustomFormLabel>
                <TextField id="openchat_id" fullWidth onChange={handleInputChange} />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.publish_profile}
                      onChange={handleToggleChange}
                      color="primary"
                    />
                  }
                  label="Publish Profile"
                  sx={{ mt: 2 }}
                />


              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="phone_number" className="center">
                  Phone Number
                </CustomFormLabel>
                <TextField id="phone_number" placeholder="+271-0099-221" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="comments" sx={{ mt: 2 }} className="center">
                  Comments
                </CustomFormLabel>
                <TextField
                  id="comments"
                  placeholder="Provide additional information about your communications"
                  fullWidth
                  multiline
                  rows={4}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </BlankCard>
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} mb={5}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Stack>
    </div>
  );
};

export default FormTabs;
