import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  Tooltip,
  Checkbox,
  FormControlLabel,
  Alert
} from '@mui/material';
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ParentCard from '../../../components/shared/ParentCard';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const countries = [
  { value: 'IN', label: 'India' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'SL', label: 'Sri Lanka' },
];

const initialState = {
  family_name: '',
  email: '',
  given_name: '',
  birth_date: '',
  age_over_18: true,
  gender: '',
  issuance_date: '',
  expiry_date: '',
  resident_address: '',
  resident_country: '',
  nationality: '',
  document_number: '',
  issuing_country: '',
  phone_number: '',
  openchat_id: '',
  document_file: null,
};

const steps = ['Personal Details', 'Address Details', 'Document Details', 'Capture Image'];

const ProfileForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [image, setImage] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked,
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

  const isFormValid = (step) => {
    switch (step) {
      case 0:
        return formData.given_name && formData.family_name && formData.birth_date && formData.gender && formData.nationality;
      case 1:
        return formData.resident_address && formData.email && formData.openchat_id && formData.resident_country && formData.phone_number;
      case 2:
        return formData.document_number && formData.issuance_date && formData.expiry_date && formData.issuing_country && formData.document_file;
      case 3:
        return image;
      default:
        return false;
    }
  };

  const handleCapture = async (imageSrc) => {
    setImage(imageSrc);

    try {
      // Add your logic to handle the image capture here
      console.log("Captured Image: ", imageSrc);
    } catch (error) {
      console.error("There was a problem with the capture operation:", error);
    }
  };

  const handleSubmitPersonalDetails = () => {
    console.log('Personal Details Submitted', formData);
    setActiveTab((prev) => prev + 1);
  };

  const handleSubmitAddressDetails = () => {
    console.log('Address Details Submitted', formData);
    setActiveTab((prev) => prev + 1);
  };

  const handleSubmitDocumentDetails = () => {
    console.log('Document Details Submitted', formData);
    setActiveTab((prev) => prev + 1);
  };

  const handleSubmitCaptureImage = () => {
    console.log('Capture Image Submitted', formData);
  };

  const renderTabContent = (tab) => {
    switch (tab) {
      case 0:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="given_name" sx={{ mt: 2 }} className="center">
                  Given Name
                  <Tooltip title="Given and middle names" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="given_name" placeholder="John" fullWidth onChange={handleInputChange} value={formData.given_name} />

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CustomFormLabel htmlFor="birth_date" sx={{ mt: 2 }} className="center">
                      Date of Birth
                      <Tooltip title="Day, month, and year on which the PID User was born." placement="top" cursor="pointer">
                        <ErrorOutlineIcon />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField type="date" id="birth_date" fullWidth onChange={handleInputChange} value={formData.birth_date} />
                  </Grid>
                  <Grid item xs={6}>
                    <CustomFormLabel htmlFor="age_over_18" sx={{ mt: 2 }} className="center">
                      Age Over 18
                      <Tooltip title="Attesting whether the PID User is currently an adult (true) or a minor (false)." placement="top" cursor="pointer">
                        <ErrorOutlineIcon />
                      </Tooltip>
                    </CustomFormLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          id="age_over_18"
                          checked={formData.age_over_18}
                          onChange={handleCheckboxChange}
                        />
                      }
                      label="I am over 18 years old"
                    />
                  </Grid>
                </Grid>

                <CustomFormLabel htmlFor="nationality" sx={{ mt: 2 }} className="center">
                  Nationality
                  <Tooltip title="Select one or multiple Nationalities" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <Select id="nationality" fullWidth onChange={handleSelectChange('nationality')} value={formData.nationality}>
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="family_name" className="center">
                  Family Name
                  <Tooltip title="Current last name(s) or surname(s) of the PID User." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="family_name" placeholder="Doe" fullWidth onChange={handleInputChange} value={formData.family_name} />

                <CustomFormLabel htmlFor="birth_place" sx={{ mt: 2 }} className="center">
                  Birth Place
                  <Tooltip title="The country, state, and city where the PID User was born." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="birth_place" fullWidth onChange={handleInputChange} value={formData.birth_place} />

                <CustomFormLabel htmlFor="gender" sx={{ mt: 2 }} className="center">
                  Gender
                  <Tooltip title="PID User's gender, using a value as defined in ISO/IEC 5218." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <Select id="gender" fullWidth onChange={handleSelectChange('gender')} value={formData.gender}>
                  <MenuItem value="0">Not known</MenuItem>
                  <MenuItem value="1">Male</MenuItem>
                  <MenuItem value="2">Female</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleSubmitPersonalDetails}
                variant="contained"
                color='secondary'
                disabled={!isFormValid(0)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="resident_address" className="center">
                  Resident Address
                  <Tooltip title="The full address of the place where the PID User currently resides and/or can be contacted (street name, house number, city etc.)." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="resident_address"
                  placeholder="123 Main St"
                  fullWidth
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  value={formData.resident_address}
                />

                <CustomFormLabel htmlFor="email" className="center">
                  Email Address
                  <Tooltip title="User Email" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="email" placeholder="user@gmail.com" fullWidth onChange={handleInputChange} value={formData.email} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="resident_country" sx={{ mt: 3 }} className="center">
                  Resident Country
                  <Tooltip title="The country where the PID User currently resides, as an Alpha-2 country code as specified in ISO 3166-1." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <Select id="resident_country" fullWidth onChange={handleSelectChange('resident_country')} value={formData.resident_country}>
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

                <CustomFormLabel htmlFor="phone_number" className="center">
                  Phone Number
                  <Tooltip title="User Phone Number" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="phone_number" placeholder="+271-0099-221" fullWidth onChange={handleInputChange} value={formData.phone_number} />

                
                <CustomFormLabel htmlFor="openchat_id" sx={{ mt: 2 }} className="center">
                  OpenChat Invite Link
                  <Tooltip title="Your OpenChat ID" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="openchat_id" fullWidth onChange={handleInputChange} value={formData.openchat_id} />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleSubmitAddressDetails}
                variant="contained"
                color='secondary'
                disabled={!isFormValid(1)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="document_number" className="center">
                  Document Number
                  <Tooltip title="A number for the PID, assigned by the PID Provider." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="document_number" placeholder="A1234567" fullWidth onChange={handleInputChange} value={formData.document_number} />

                <CustomFormLabel htmlFor="issuance_date" className="center">
                  Personal ID Issue Date
                  <Tooltip title="Date (and possibly time) when the PID was issued." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField type="date" id="issuance_date" placeholder="" fullWidth onChange={handleInputChange} value={formData.issuance_date} />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="issuing_country" sx={{ mt: 2, mb: 2 }} className="center">
                  Issuing Country
                  <Tooltip title="Alpha-2 country code, as defined in ISO 3166-1, of the PID Provider's country or territory." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <Select id="issuing_country" fullWidth onChange={handleSelectChange('issuing_country')} value={formData.issuing_country}>
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </Select>
                <CustomFormLabel htmlFor="expiry_date" className="center" sx={{ mt: 3 }} >
                  Personal ID Expiry Date
                  <Tooltip title="Date (and possibly time) when the PID will expire." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <OutlinedInput type="date" id="expiry_date" placeholder="" fullWidth onChange={handleInputChange} value={formData.expiry_date} />
              </Grid>
            </Grid>
            <Typography variant="h6" mb={2} mt={4}>
              In order to complete, please upload any of the following personal document.
            </Typography>
            <Stack direction="row" spacing={2} mb={2}>
              <Button variant="outlined">National Identity Card</Button>
              <Button variant="outlined">Passport</Button>
              <Button variant="outlined" color="primary">Driver's License</Button>
            </Stack>
            <Typography variant="body2" mb={2}>
              To avoid delays when verifying account, Please make sure below:
            </Typography>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li>✓ Chosen credential must not be expired.</li>
              <li>✓ Document should be good condition and clearly visible.</li>
              <li>✓ Make sure that there is no light glare on the card.</li>
            </ul>
            <Typography variant="body1" mb={2}>
              Upload Here Your Driving License Copy
            </Typography>
            <Box
              sx={{
                border: '2px dashed #ccc',
                borderRadius: '10px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border 0.3s',
                '&:hover': {
                  borderColor: '#666',
                },
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                id="file-upload"
                style={{ display: 'none' }}
              />
              <label htmlFor="file-upload" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Drag and drop file OR &nbsp;<span style={{ color: '#1976d2', textDecoration: 'underline' }}>SELECT</span>
              </label>
              {documentPreview && (
                <Box mt={2}>
                  <img src={documentPreview} alt="Document Preview" style={{ width: '100%', maxWidth: '150px', maxHeight: '150px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }} />
                </Box>
              )}
            </Box>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleSubmitDocumentDetails}
                variant="contained"
                color='secondary'
                disabled={!isFormValid(2)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            {!image ? (
              <div>
                {/* Uncomment the next line and import WebcamCapture when using */}
                {/* <WebcamCapture onCapture={handleCapture} /> */}
              </div>
            ) : (
              <div>
                <h2>Captured Image:</h2>
                <img src={image} alt="Captured" />
                <button onClick={() => setImage(null)}>Retake</button>
              </div>
            )}
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                onClick={handleSubmitCaptureImage}
                variant="contained"
                color='secondary'
                disabled={!isFormValid(3)}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Breadcrumb title="KYC Application" description="this is KYC page" />
      <ParentCard title='KYC'>
        <Box width="100%">
          <TabContext value={activeTab.toString()}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="form tabs">
              {steps.map((label, index) => (
                <Tab key={label} label={label} value={index} />
              ))}
            </Tabs>
            {steps.map((label, index) => (
              <TabPanel key={label} value={index.toString()}>
                {renderTabContent(index)}
              </TabPanel>
            ))}
          </TabContext>
          <Box display="flex" flexDirection="row" mt={3}>
            {activeTab > 0 && (
              <Button
                color="inherit"
                variant="contained"
                onClick={() => setActiveTab((prev) => prev - 1)}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box flex="1 1 auto" />
          </Box>
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default ProfileForm;
