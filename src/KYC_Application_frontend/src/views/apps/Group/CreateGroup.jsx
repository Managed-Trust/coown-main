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
  Button,
  Paper
} from "@mui/material";

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Create New Group',
  },
];

const initialState = {
  groupName: "",
  groupId: "",
  addressOfLegalEntity: "",
  residencyOfGroup: "",
  groupDescription: "",
  groupImage: "",
  email: "",
  entityType: "",
  registerCompany: false,
  companyName: "",
  industrySector: "", // Added industry sector
  registrationNumber: "",
  legalStructure: "",
  registeredAddress: "",
  taxID: "",
  incorporationCertificate: [],
  memorandumAndArticles: [],
  representativeFullName: "",
  position: "",
  idDocumentType: "",
  idDocumentNumber: "",
  idDocument: [],
  proofOfAuthority: [],
  emailRep: "",
  phoneNumber: "",
  beneficialOwner: "",
  economicOwner: "",
  publicLawEntity: false,
  entityName: "",
  jurisdiction: "",
  establishmentDate: "",
  function: "",
  address: "",
  phone: "",
  caller: "",
  contactDetails: "",
  recordType: "",
  cPerson: "",
  cpEmail: "",
  website: "",
  emailGJ:"",
  emailGB:"",
  supervisoryBody:"",
  legislation:""
};

const CreateGroup = () => {
  const [formData, setFormData] = useState(initialState);
  const [filePreviews, setFilePreviews] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    const inputId = id || name; // for Select component
    setFormData((prevData) => ({
      ...prevData,
      [inputId]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { id, files } = e.target;
    const file = files[0];

    if (id === "groupImage") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result
          .replace("data:", "")
          .replace(/^.+,/, "");
        setFormData((prevData) => ({
          ...prevData,
          [id]: base64String,
        }));
        setFilePreviews((prev) => ({
          ...prev,
          [id]: URL.createObjectURL(file),
        }));
      };
      reader.readAsDataURL(file);
    } else {
      const blob = await file.arrayBuffer();
      setFormData((prevData) => ({
        ...prevData,
        [id]: new Uint8Array(blob),
      }));
      setFilePreviews((prev) => ({
        ...prev,
        [id]: URL.createObjectURL(file),
      }));
    }
  };

  const handleRegisterCompanySubmit = (event) => {
    event.preventDefault();
    console.log('Register Company Data:', formData);
    // Add your register company logic here
  };

  const handlePublicLawEntitySubmit = (event) => {
    event.preventDefault();
    console.log('Public Law Entity Data:', formData);
    // Add your public law entity logic here
  };

  const handleInitialSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <PageContainer title="Create New Group" description="this is Note page">
      <Breadcrumb title="Create New Group" items={BCrumb} />
      <form onSubmit={handleInitialSubmit}>
        <Box p={2}>
          <ChildCard>
            <Box p={2}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography variant="h6" gutterBottom>
                    Group Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="groupName">Group Name</CustomFormLabel>
                      <TextField
                        id="groupName"
                        fullWidth
                        placeholder='Group name'
                        value={formData.groupName}
                        onChange={handleInputChange}
                        disabled={isSubmitted}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="entityType">Group Type</CustomFormLabel>
                      <FormControl fullWidth>
                        <Select
                          labelId="entityType-label"
                          id="entityType"
                          name="entityType"
                          value={formData.entityType}
                          onChange={handleInputChange}
                          disabled={isSubmitted}
                        >
                          <MenuItem value="">Select Group Type</MenuItem>
                          <MenuItem value="registerCompany">Register Company</MenuItem>
                          <MenuItem value="publicLawEntity">Public Law Entity</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </ChildCard>
        </Box>
        {isSubmitted && formData.entityType === "registerCompany" && (
          <>
            <Box p={2}>
              <ChildCard>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography variant="h6" gutterBottom>
                        Company Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="companyName">
                            Company Name
                          </CustomFormLabel>
                          <TextField
                            id="companyName"
                            fullWidth
                            placeholder='Company Name'
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="industrySector">
                            Industry Sector
                          </CustomFormLabel>
                          <FormControl fullWidth>
                            <Select
                              labelId="industrySector-label"
                              id="industrySector"
                              name="industrySector"
                              value={formData.industrySector}
                              onChange={handleInputChange}
                            >
                              <MenuItem value="">Select Industry Sector</MenuItem>
                              <MenuItem value="technology">Technology</MenuItem>
                              <MenuItem value="finance">Finance</MenuItem>
                              <MenuItem value="healthcare">Healthcare</MenuItem>
                              <MenuItem value="education">Education</MenuItem>
                              <MenuItem value="manufacturing">Manufacturing</MenuItem>
                              {/* Add more sectors as needed */}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="registrationNumber">
                            Registration Number
                          </CustomFormLabel>
                          <TextField
                            id="registrationNumber"
                            fullWidth
                            placeholder='Registration Number'
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="legalStructure">
                            Legal Structure
                          </CustomFormLabel>
                          <TextField
                            id="legalStructure"
                            fullWidth
                            placeholder='Legal Structure'
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="registeredAddress">
                            Registered Address
                          </CustomFormLabel>
                          <TextField
                            required
                            fullWidth
                            id="registeredAddress"
                            placeholder="Enter full address"
                            name="registeredAddress"
                            onChange={handleInputChange}
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
                          <CustomFormLabel htmlFor="taxID">Tax ID</CustomFormLabel>
                          <TextField
                            id="taxID"
                            placeholder='Tax ID'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="incorporationCertificate">
                            Incorporation Certificate
                          </CustomFormLabel>
                          <TextField
                            id="incorporationCertificate"
                            type="file"
                            fullWidth
                            onChange={handleFileChange}
                          />
                          {filePreviews.incorporationCertificate && (
                            <Paper
                              elevation={3}
                              sx={{ mt: 2, width: 100, height: 100 }}
                            >
                              <img
                                src={filePreviews.incorporationCertificate}
                                alt="Incorporation Certificate"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Paper>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="memorandumAndArticles">
                            Memorandum And Articles
                          </CustomFormLabel>
                          <TextField
                            id="memorandumAndArticles"
                            type="file"
                            fullWidth
                            onChange={handleFileChange}
                          />
                          {filePreviews.memorandumAndArticles && (
                            <Paper
                              elevation={3}
                              sx={{ mt: 2, width: 100, height: 100 }}
                            >
                              <img
                                src={filePreviews.memorandumAndArticles}
                                alt="Memorandum And Articles"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Paper>
                          )}
                        </Grid>
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
                        Representative Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="representativeFullName">
                            Representative Full Name
                          </CustomFormLabel>
                          <TextField
                            id="representativeFullName"
                            placeholder='Representative Full Name'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="position">
                            Representative Position
                          </CustomFormLabel>
                          <TextField
                            id="position"
                            placeholder='Representative Position'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="idDocumentType">
                            ID Document Type
                          </CustomFormLabel>
                          <FormControl fullWidth>
                            <Select
                              labelId="idDocumentType"
                              id="idDocumentType"
                              name="idDocumentType"
                              value={formData.idDocumentType}
                              onChange={handleInputChange}
                            >
                              <MenuItem value="">Select document type</MenuItem>
                              <MenuItem value="image">Image</MenuItem>
                              <MenuItem value="other">Other</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="idDocumentNumber">
                            ID Document Number
                          </CustomFormLabel>
                          <TextField
                            id="idDocumentNumber"
                            placeholder='ID Document Number'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="idDocument">
                            ID Document
                          </CustomFormLabel>
                          <TextField
                            id="idDocument"
                            type="file"
                            fullWidth
                            onChange={handleFileChange}
                          />
                          {filePreviews.idDocument && (
                            <Paper
                              elevation={3}
                              sx={{ mt: 2, width: 100, height: 100 }}
                            >
                              <img
                                src={filePreviews.idDocument}
                                alt="ID Document"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Paper>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="proofOfAuthority">
                            Proof of Authority 
                          </CustomFormLabel>
                          <TextField
                            id="proofOfAuthority"
                            type="file"
                            fullWidth
                            onChange={handleFileChange}
                          />
                          {filePreviews.proofOfAuthority && (
                            <Paper
                              elevation={3}
                              sx={{ mt: 2, width: 100, height: 100 }}
                            >
                              <img
                                src={filePreviews.proofOfAuthority}
                                alt="Proof of Authority"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Paper>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="emailRep">Representative Email</CustomFormLabel>
                          <TextField
                            id="emailRep"
                            fullWidth
                            placeholder='Representative Email'
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="phoneNumber">
                            Representative Phone Number
                          </CustomFormLabel>
                          <TextField
                            id="phoneNumber"
                            fullWidth
                            placeholder='+123'
                            onChange={handleInputChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>
            <Box p={3} display="flex" justifyContent="flex-start">
              <Button type="button" variant="contained" color="primary" onClick={handleRegisterCompanySubmit}>
                Register Company
              </Button>
            </Box>
          </>
        )}
        {isSubmitted && formData.entityType === "publicLawEntity" && (
          <>
            <Box p={2}>
              <ChildCard>
                <Box p={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography variant="h6" gutterBottom>
                        Entity Information
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="entityName">
                            Entity Name
                          </CustomFormLabel>
                          <TextField
                            id="entityName"
                            placeholder='Entity Name'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Grid item xs={12}>
                            <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
                            <TextField
                              id="address"
                              fullWidth
                              placeholder='Enter full address'
                              onChange={handleInputChange}
                              multiline
                              rows={4}
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="cPerson">
                            Contact Person
                          </CustomFormLabel>
                          <TextField
                            id="cPerson"
                            placeholder='Contact person'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="cpEmail">
                            Contact Person Email
                          </CustomFormLabel>
                          <TextField
                            id="cpEmail"
                            placeholder='Contact person email'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="website">Website</CustomFormLabel>
                          <TextField
                            id="website"
                            placeholder='http://'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
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
                        Group Owner
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="emailGJ">
                            Group Owner Job Title
                          </CustomFormLabel>
                          <TextField
                            id="emailGJ"
                            placeholder='Group owner job title'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <CustomFormLabel htmlFor="emailGB">
                            Group Owner Business Email
                          </CustomFormLabel>
                          <TextField
                            id="emailGB"
                            placeholder='Group owner business email'
                            fullWidth
                            onChange={handleInputChange}
                          />
                        </Grid>
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
                        Legal Framework 
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="economicOwner">Description of Purpose</CustomFormLabel>
                        <TextField
                          id="economicOwner"
                          fullWidth
                          multiline
                          rows={4}
                          placeholder='Economic Owner'
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="legislation">
                          Link to Constituting Legislation
                        </CustomFormLabel>
                        <TextField
                          id="legislation"
                          placeholder='https://'
                          fullWidth
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="supervisoryBody">
                          Link to Supervisory Body
                        </CustomFormLabel>
                        <TextField
                          id="supervisoryBody"
                          placeholder='https://'
                          fullWidth
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>
            <Box p={3} display="flex" justifyContent="flex-start">
              <Button type="button" variant="contained" color="primary" onClick={handlePublicLawEntitySubmit}>
                Submit Public Law Entity
              </Button>
            </Box>
          </>
        )}
        <Box p={3} display="flex" justifyContent="flex-start">
          {!isSubmitted && (
            <>
              <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
                Create Group
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </>
          )}
        </Box>
      </form>
    </PageContainer>
  );
};

export default CreateGroup;
