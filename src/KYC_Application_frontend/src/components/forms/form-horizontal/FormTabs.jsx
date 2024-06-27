import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Tab,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  Select,
  Paper,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BlankCard from '../../shared/BlankCard';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import emailjs from "@emailjs/browser";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";
import ic from "ic0";
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const initialState = {
  email: '',
  otp: '',
  groupName: '',
  groupId: '',
  groupAccess: false,
  registerCompany: false,
  companyName: '',
  registrationNumber: '',
  legalStructure: '',
  registeredAddress: '',
  taxID: '',
  incorporationCertificate: [],
  memorandumAndArticles: [],
  representativeFullName: '',
  position: '',
  idDocumentType: '',
  idDocumentNumber: '',
  idDocument: [],
  proofOfAuthority: [],
  emailRep: '',
  phoneNumber: '',
  ecnomicOwner: '',
  beneficialOwner: '',
  publicLawEntity: false,
  entity: {
    mail: '',
    name: '',
    contactPerson: '',
    website: '',
    address: '',
    phone: ''
  },
};

const FormTabs = () => {
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initialState);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showJoinGroupForm, setShowJoinGroupForm] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});

  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    }
  });

  const handleChange = (event, newValue) => {
    if ((newValue === '2' || newValue === '3') && !isEmailDisabled) {
      alert('Please submit your email first');
      return;
    }
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    const inputId = id || name; // for Select component

    if (inputId in formData.entity) {
      setFormData((prevData) => ({
        ...prevData,
        entity: {
          ...prevData.entity,
          [inputId]: value,
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [inputId]: value,
      }));
    }
  };

  const handleFileChange = async (e) => {
    const { id, files } = e.target;
    const file = files[0];
    const blob = await file.arrayBuffer();
    setFormData((prevData) => ({
      ...prevData,
      [id]: new Uint8Array(blob),
    }));
    setFilePreviews((prev) => ({
      ...prev,
      [id]: URL.createObjectURL(file),
    }));
  };

  const createUser = async () => {
    try {
      const response = await ledger.call("createUser", principal, "1", "1", formData.email);
      console.log("User created:", formData.email);
      alert(response);
    } catch (e) {
      console.log("Error creating user:", e);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await ledger.call("generateOTP", principal);
      setGeneratedOtp(response);
      console.log("Generated OTP:", response);
    } catch (e) {
      console.log("Error Generation OTP:", e);
    }
  };

  useEffect(() => {
    if (generatedOtp) {
      const emailParams = {
        email: formData.email,
        otp: generatedOtp,
      };

      emailjs
        .send('service_idh0h15', 'template_3d2t5lb', emailParams, 'Y4QJDpwjrsdi3tQAR')
        .then(
          () => {
            console.log('SUCCESS!');
            setIsEmailDisabled(true);
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        )
        .catch((error) => {
          console.log("Error sending OTP:", error);
        })
        .finally(() => {
          alert("OTP sent to your email " + formData.email);
          setValue('3');
        });
    }
  }, [generatedOtp]);

  const handleEmailSubmit = async () => {
    if (formData.email.trim() === '') {
      alert('Email cannot be empty');
      return;
    }
    await createUser();
    setIsEmailDisabled(true);
    setValue('2');
  };

  const handleOtpSubmit = async () => {
    if (formData.otp === generatedOtp) {
      try {
        const response = await ledger.call("verifyOTP", principal, formData.otp);
        if (response) {
          alert("Email address verified...");
        } else {
          alert("Invalid OTP");
        }
      } catch (e) {
        console.log("Error Verifying:", e);
      } finally {
        console.log("end verification");
      }
    } else {
      alert("Invalid OTP");
    }
  };

  const handleCreateGroupClick = () => {
    setShowCreateGroupForm(true);
    setShowJoinGroupForm(false);
  };

  const handleJoinGroupClick = () => {
    setShowJoinGroupForm(true);
    setShowCreateGroupForm(false);
  };

  const handleCreateGroup = async () => {
    console.log("Create Group Data:", formData);

    try {
      const response = await ledger.call("createGroup", principal, formData.groupName, formData.groupId, formData.groupAccess, formData.registerCompany, formData.companyName, formData.registrationNumber, formData.legalStructure, formData.registeredAddress, formData.taxID, formData.incorporationCertificate, formData.memorandumAndArticles, formData.representativeFullName, formData.position, formData.idDocumentType, formData.idDocumentNumber, formData.idDocument, formData.proofOfAuthority, formData.emailRep, formData.phoneNumber, formData.ecnomicOwner, formData.beneficialOwner, formData.publicLawEntity, formData.publicLawEntity ? formData.entity : null);

      console.log("Create Group Response:", response);
    } catch (e) {
      console.log("Error Creating Group:", e);
    }
  };

  const handleJoinGroup = async () => {
    console.log("Join Group Data:", formData);

    try {
      const response = await ledger.call("joinGroup", principal, formData.groupId, formData.registerCompany, formData.representativeFullName, formData.position, formData.idDocumentType, formData.idDocumentNumber, formData.idDocument, formData.proofOfAuthority, formData.emailRep, formData.phoneNumber);

      console.log("Join Group Response:", response);
    } catch (e) {
      console.log("Error Creating Group:", e);
    }
  };

  return (
    <div>
      <BlankCard>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
              <Tab label="Enter Email" value="1" />
              <Tab label="Verify Email" value="2" disabled={!isEmailDisabled} />
              <Tab label="OTP Verification" value="3" disabled={!isEmailDisabled} />
              <Tab label="Group Management" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel htmlFor="email" className="center" style={{ marginTop: '0px' }}>
                  Email Address
                </CustomFormLabel>
                <TextField
                  id="email"
                  placeholder="user@gmail.com"
                  fullWidth
                  onChange={handleInputChange}
                  disabled={isEmailDisabled}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} mb={5}>
              <Button variant="contained" color="primary" onClick={handleEmailSubmit}>
                Create User
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel htmlFor="email" className="center" style={{ marginTop: '0px' }}>
                  Email Address
                </CustomFormLabel>
                <TextField
                  id="email"
                  value={formData.email}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} mb={5}>
              <Button variant="contained" color="primary" onClick={sendOTP}>
                Send OTP
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel htmlFor="otp" className="center" style={{ marginTop: '0px' }}>
                  Enter OTP
                </CustomFormLabel>
                <TextField id="otp" placeholder="Enter 6 digit OTP" fullWidth onChange={handleInputChange} />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="primary" onClick={handleOtpSubmit}>
                Verify OTP
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value="4">
            <Grid container spacing={3} justifyContent="center" gap="30px" padding="30px">
              <Button variant="contained" color="primary" onClick={handleCreateGroupClick}>
                Create Group
              </Button>
              <Button variant="contained" color="secondary" onClick={handleJoinGroupClick}>
                Join Group
              </Button>
            </Grid>
            {showCreateGroupForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupName">Group Name</CustomFormLabel>
                  <TextField id="groupName" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupId">Group ID</CustomFormLabel>
                  <TextField id="groupId" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupAccess">Group Access</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="groupAccess-label"
                      id="groupAccess"
                      name="groupAccess"
                      value={formData.groupAccess}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={true}>Public</MenuItem>
                      <MenuItem value={false}>Private</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="registerCompany">Register Company</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="registerCompany-label"
                      id="registerCompany"
                      name="registerCompany"
                      value={formData.registerCompany}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {formData.registerCompany && (
                  <>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="companyName">Company Name</CustomFormLabel>
                      <TextField id="companyName" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="registrationNumber">Registration Number</CustomFormLabel>
                      <TextField id="registrationNumber" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="legalStructure">Legal Structure</CustomFormLabel>
                      <TextField id="legalStructure" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="registeredAddress">Registered Address</CustomFormLabel>
                      <TextField id="registeredAddress" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="taxID">Tax ID</CustomFormLabel>
                      <TextField id="taxID" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="incorporationCertificate">Incorporation Certificate</CustomFormLabel>
                      <TextField
                        id="incorporationCertificate"
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                      />
                      {filePreviews.incorporationCertificate && (
                        <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                          <img src={filePreviews.incorporationCertificate} alt="Incorporation Certificate" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="memorandumAndArticles">Memorandum And Articles</CustomFormLabel>
                      <TextField
                        id="memorandumAndArticles"
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                      />
                      {filePreviews.memorandumAndArticles && (
                        <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                          <img src={filePreviews.memorandumAndArticles} alt="Memorandum And Articles" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="representativeFullName">Representative Full Name</CustomFormLabel>
                      <TextField id="representativeFullName" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="position">Position</CustomFormLabel>
                      <TextField id="position" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="idDocumentType">ID Document Type</CustomFormLabel>
                      <TextField id="idDocumentType" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="idDocumentNumber">ID Document Number</CustomFormLabel>
                      <TextField id="idDocumentNumber" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="idDocument">ID Document</CustomFormLabel>
                      <TextField
                        id="idDocument"
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                      />
                      {filePreviews.idDocument && (
                        <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                          <img src={filePreviews.idDocument} alt="ID Document" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="proofOfAuthority">Proof Of Authority</CustomFormLabel>
                      <TextField
                        id="proofOfAuthority"
                        type="file"
                        fullWidth
                        onChange={handleFileChange}
                      />
                      {filePreviews.proofOfAuthority && (
                        <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                          <img src={filePreviews.proofOfAuthority} alt="Proof Of Authority" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Paper>
                      )}
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="emailRep">Representative Email</CustomFormLabel>
                      <TextField id="emailRep" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="phoneNumber">Phone Number</CustomFormLabel>
                      <TextField id="phoneNumber" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="ecnomicOwner">Economic Owner</CustomFormLabel>
                      <TextField id="ecnomicOwner" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="beneficialOwner">Beneficial Owner</CustomFormLabel>
                      <TextField id="beneficialOwner" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="publicLawEntity">Public Law Entity</CustomFormLabel>
                      <FormControl fullWidth>
                        <Select
                          labelId="publicLawEntity-label"
                          id="publicLawEntity"
                          name="publicLawEntity"
                          value={formData.publicLawEntity}
                          onChange={handleInputChange}
                        >
                          <MenuItem value={true}>Yes</MenuItem>
                          <MenuItem value={false}>No</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {formData.publicLawEntity && (
                      <>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel htmlFor="name">Entity Name</CustomFormLabel>
                          <TextField id="name" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel htmlFor="contactPerson">Contact Person</CustomFormLabel>
                          <TextField id="contactPerson" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
                          <TextField id="address" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel htmlFor="mail">Email</CustomFormLabel>
                          <TextField id="mail" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
                          <TextField id="phone" fullWidth onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <CustomFormLabel htmlFor="website">Website</CustomFormLabel>
                          <TextField id="website" fullWidth onChange={handleInputChange} />
                        </Grid>
                      </>
                    )}
                  </>
                )}
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleCreateGroup}>
                      Create Group
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            )}
            {showJoinGroupForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupId">Group ID</CustomFormLabel>
                  <TextField id="groupId" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="registerCompany">Register Company</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="registerCompany-label"
                      id="registerCompany"
                      name="registerCompany"
                      value={formData.registerCompany}
                      onChange={handleInputChange}
                    >
                      <MenuItem value={true}>Yes</MenuItem>
                      <MenuItem value={false}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="representativeFullName">Representative Full Name</CustomFormLabel>
                  <TextField id="representativeFullName" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="position">Position</CustomFormLabel>
                  <TextField id="position" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="idDocumentType">ID Document Type</CustomFormLabel>
                  <TextField id="idDocumentType" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="idDocumentNumber">ID Document Number</CustomFormLabel>
                  <TextField id="idDocumentNumber" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="idDocument">ID Document</CustomFormLabel>
                  <TextField
                    id="idDocument"
                    type="file"
                    fullWidth
                    onChange={handleFileChange}
                  />
                  {filePreviews.idDocument && (
                    <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                      <img src={filePreviews.idDocument} alt="ID Document" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Paper>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="proofOfAuthority">Proof Of Authority</CustomFormLabel>
                  <TextField
                    id="proofOfAuthority"
                    type="file"
                    fullWidth
                    onChange={handleFileChange}
                  />
                  {filePreviews.proofOfAuthority && (
                    <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                      <img src={filePreviews.proofOfAuthority} alt="Proof Of Authority" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Paper>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="emailRep">Representative Email</CustomFormLabel>
                  <TextField id="emailRep" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="phoneNumber">Phone Number</CustomFormLabel>
                  <TextField id="phoneNumber" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleJoinGroup}>
                      Join Group
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </TabPanel>
        </TabContext>
      </BlankCard>
    </div>
  );
};

export default FormTabs;
