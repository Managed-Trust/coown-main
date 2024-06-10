import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
  Tab,
  Typography,
  Select,
  MenuItem,
  TextField,
  OutlinedInput,
  Tooltip,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BlankCard from "../../shared/BlankCard";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ic from "ic0";
import WebcamCapture from "../../../WebCapture";
import { ConnectButton, ConnectDialog, Connect2ICProvider, useConnect } from "@connect2ic/react";

const ledger = ic.local("bd3sg-teaaa-aaaaa-qaaba-cai"); // Ledger canister

const countries = [
  { value: "IN", label: "India" },
  { value: "UK", label: "United Kingdom" },
  { value: "SL", label: "Sri Lanka" },
];

const initialState = {
  family_name: "",
  email: "",
  given_name: "",
  birth_date: "",
  age_over_18: true,
  gender: "",
  issuance_date: "",
  expiry_date: "",
  resident_address: "",
  nationality: '',
  resident_country: "",
  document_number: "",
  issuing_country: "",
  phone_number: "",
  openchat_id: "",
  document_file: null,
};

const FormTabs = () => {
  const [value, setValue] = useState("1");
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [image, setImage] = useState(null);
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    }
  });

  const handleCapture = async (imageSrc) => {
    setImage(imageSrc);

    try {
      const data = await ledger.call("addImage", imageSrc); // Call the `name()` method

      console.log(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

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

  const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== "");
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form Submitted", formData);
  };

  return (
    <div>
      <Typography variant="h2" mb={2} mt={2}>
        KYC Form
      </Typography>
      <BlankCard>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
              <Tab label="Personal Details" value="1" />
              <Tab label="Address Details" value="2" />
              <Tab label="Document Details" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="given_name" sx={{ mt: 2 }} className="center">
                  Given Name
                  <Tooltip title="Given and middle names" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="given_name" placeholder="John" fullWidth onChange={handleInputChange} />

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <CustomFormLabel htmlFor="birth_date" sx={{ mt: 2 }} className="center">
                      Date of Birth
                      <Tooltip title="Day, month, and year on which the PID User was born." placement="top" cursor="pointer">
                        <ErrorOutlineIcon />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField type="date" id="birth_date" fullWidth onChange={handleInputChange} />
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
                <TextField id="family_name" placeholder="Doe" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="birth_place" sx={{ mt: 2 }} className="center">
                  Birth Place
                  <Tooltip title="The country, state, and city where the PID User was born." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="birth_place" fullWidth onChange={handleInputChange} />

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
          </TabPanel>
          <TabPanel value="2">
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
                />

                <CustomFormLabel htmlFor="email" className="center">
                  Email Address
                  <Tooltip title="User Email" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="email" placeholder="user@gmail.com" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="openchat_id" sx={{ mt: 2 }} className="center">
                  OpenChat ID
                  <Tooltip title="Your OpenChat ID" placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="birth_place" fullWidth onChange={handleInputChange} />
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
                <TextField id="phone_number" placeholder="+271-0099-221" fullWidth onChange={handleInputChange} />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="document_number" className="center">
                  Document Number
                  <Tooltip title="A number for the PID, assigned by the PID Provider." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField id="document_number" placeholder="A1234567" fullWidth onChange={handleInputChange} />

                <CustomFormLabel htmlFor="issuance_date" className="center">
                  Personal ID Issue Date
                  <Tooltip title="Date (and possibly time) when the PID was issued." placement="top" cursor="pointer">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField type="date" id="issuance_date" placeholder="" fullWidth onChange={handleInputChange} />
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
                <OutlinedInput type="date" id="expiry_date" placeholder="" fullWidth onChange={handleInputChange} />
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
          </TabPanel>
        </TabContext>
      </BlankCard>
      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} mb={5}>
        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!isFormValid()}>
          Submit
        </Button>
      </Stack>

      <div>
        <div>
          <h1>KYC Application</h1>
          <p>
            {/* <ConnectButton /> */}
            <ConnectDialog dark={false} />
          </p>
          {!image ? (
            <WebcamCapture onCapture={handleCapture} />
          ) : (
            <div>
              <h2>Captured Image:</h2>
              <img src={image} alt="Captured" />
              <button onClick={() => setImage(null)}>Retake</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormTabs;
