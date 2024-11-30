import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  TextField,
  CardMedia,
  Button,
  MenuItem,
  FormControl,
  Select,
  Paper,
  CircularProgress,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router-dom";
import BlankCard from "../../../../components/shared/BlankCard";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import { useDispatch } from "react-redux";
import { fetchPhotos } from "../../../../store/apps/userProfile/UserProfileSlice";
import { useConnect } from "@connect2ic/react";
import CryptoJS from "crypto-js";
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../../components/container/PageContainer';
import ChildCard from '../../../../components/shared/ChildCard';
import ic from "ic0";
import swal from 'sweetalert';
import mygroup1 from '../../../../assets/images/group/mygroup1.svg';
import mygroup2 from '../../../../assets/images/group/mygroup2.svg';
import mygroup3 from '../../../../assets/images/group/mygroup3.svg';
import GroupTable from './GroupTable';
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const secretKey = "your-secret-key"; // Use a strong secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

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
  business_email: "",
  cpEmail: "",
  website: "",
  emailGJ: "",
  emailGB: "",
  supervisoryBody: "",
  legislation: "",
  group_owner_job_title: "",
  group_owner_business_email: "",

};

const GalleryCard = () => {
  const dispatch = useDispatch();

  const cardData = [
    { title: "Set-up a private association", desc: "Add  here more user groups as informal private associations, where you are the sole economic beneficiary.", Icon: mygroup1, value: '19 USD', per: 'per year', link: '/create-group/private' },
    { title: "Set-up a registered company", desc: "Setting up a registered company includes a KYC review of key stakeholder data by an AML Officer to ensure data quality and compliance.", Icon: mygroup2, value: '168 USD', per: 'per year', link: '/create-group/registeredCompany' },
    { title: "Set-up a public law entitiy", desc: "The setup of a public law entity includes a review of the Know Your Customer (KYC) data by a legal expert to ensure legitimacy and data quality.", Icon: mygroup3, value: '680 USD', per: 'per year', link: '/create-group/publicLawEntitiy' }
  ];

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);


  const [search, setSearch] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [filePreviews, setFilePreviews] = useState({});
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showInviteUserForm, setShowInviteUserForm] = useState(false);
  const [groups, setGroups] = useState([]);
  const [fetchingGroups, setFetchingGroups] = useState(true);
  const [groupId, setGroupId] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // Added state variable
  const [isCreateGroupLoading, setIsCreateGroupLoading] = useState(false);
  const [isRegisterCompanyLoading, setIsRegisterCompanyLoading] = useState(false);
  const [isPublicLawEntityLoading, setIsPublicLawEntityLoading] = useState(false);

  const { principal } = useConnect();

  useEffect(() => {
    console.log("Principal:", principal);
  }, [principal]);

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
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1]; // Extract base64 string
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
  };

  const fetchGroup = async () => {
    setFetchingGroups(true);
    try {
      if (principal) {
        const response = await ledger.call("getGroupIdsByUserId", principal);
        if (response != null) {
          setGroupId(response);
          setGroups(response);
          console.log("Group IDs:", response);
          const groupDetails = await Promise.all(
            response.map(async (groupId) => {
              try {
                console.log("Single Group ID:", groupId);
                const groupDetailResponse = await ledger.call("getGroup", groupId);
                if (groupDetailResponse.length > 0) {
                  groupDetailResponse[0].groupId = groupId;
                }
                console.log("Single Group with ID:", groupDetailResponse);
                return groupDetailResponse;
              } catch (e) {
                console.error(`Error fetching group details for group ID ${groupId}:`, e);
                return null;
              }
            })
          );
          setGroups(groupDetails.filter((group) => group !== null));
          console.log("Groups:", groupDetails);
        }
      }
    } catch (e) {
      console.log("Error fetching groups:", e);
    } finally {
      setFetchingGroups(false);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [principal, ledger]);

  const generateGroupId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${timestamp}-${randomNum}`;
  };

  const handleCreateGroupClick = async () => {
    const groupId = generateGroupId();
    setFormData((prevData) => ({
      ...prevData,
      groupId: groupId,
    }));

    setShowCreateGroupForm(true);
    setShowInviteUserForm(false);
  };

  const handleCancel = () => {
    setShowCreateGroupForm(false);
    setIsSubmitted(false);
    setFormData(initialState);
  };

  const handleInitialSubmit = async (event) => {
    event.preventDefault();
    setIsCreateGroupLoading(true);
    console.log("FormData:", formData);
    try {
      const response = await ledger.call(
        "createGroup",
        principal,
        formData.groupId,
        formData.groupName,
        formData.entityType,
      );
      console.log("Group Response:", response);
      swal("Success", 'Group Created Successfully!', "success");
      fetchGroup(); // Fetch updated groups
    } catch (e) {
      console.log("Error Creating Group:", e);
    } finally {
      setIsSubmitted(true);
      setIsCreateGroupLoading(false);
      if (formData.entityType == "Private Group") {
        setIsSubmitted(false);
        setShowCreateGroupForm(false);
        setFormData(initialState);
        fetchGroup(); // Fetch updated groups
      }
    }
  };

  const handleRegisterCompanySubmit = async (event) => {
    event.preventDefault();
    setIsRegisterCompanyLoading(true);
    console.log('Register Company Data:', formData);
    console.log("principal Given:", principal + formData.groupId);
    try {
      await ledger.call(
        "updateIncorporationGroup",
        (principal + formData.groupId),
        encryptData(formData.companyName),
        encryptData(formData.industrySector),
        encryptData(formData.registrationNumber),
        encryptData(formData.taxID),
        encryptData(formData.legalStructure),
        encryptData(formData.registeredAddress),
        formData.incorporationCertificate,
        formData.memorandumAndArticles,
        encryptData(formData.economicOwner),
        encryptData(formData.beneficialOwner),
      );
      swal("Success", 'Company Registered Successfully!', "success");
      setShowCreateGroupForm(false); // Close the form
      setIsSubmitted(false);
      setFormData(initialState);
      fetchGroup(); // Fetch updated groups
    } catch (e) {
      console.log("Error registering company:", e);
    } finally {
      setIsRegisterCompanyLoading(false);
    }
  };

  const handlePublicLawEntitySubmit = async (event) => {
    event.preventDefault();
    setIsPublicLawEntityLoading(true);
    console.log('Public Law Entity Data:', formData);
    try {
      await ledger.call(
        "updatePublicLawEntityGroup",
        (principal + formData.groupId),
        formData.entityName,
        formData.address,
        formData.business_email,
        formData.website,
        formData.group_owner_job_title,
        formData.group_owner_business_email,
        formData.economicOwner,
        formData.legislation,
        formData.supervisoryBody
      );
      swal("Success", 'Public Law Entity Added Successfully!', "success");
      setShowCreateGroupForm(false); // Close the form
      setIsSubmitted(false);
      setFormData(initialState);
      fetchGroup(); // Fetch updated groups
    } catch (e) {
      console.log("Error creating Public Law Entity:", e);
    } finally {
      setIsPublicLawEntityLoading(false);
    }
  };

  const BCrumb = [
    {
      to: '/',
      title: 'Home',
    },
    {
      title: 'Groups',
    },
  ];

  return (
    <PageContainer title="User Groups" description="this is Note page">
      <Breadcrumb title="User Groups" items={BCrumb} />
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems="center" mt={2} mb={4}>
            <Box>
              <Typography variant="h3">
                Groups &nbsp;
                <Chip label={groups.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <Button
                variant="contained"
                color="primary"
                onClick={handleCreateGroupClick}
                sx={{ mr: 2 }}
              >
                Add New Group
              </Button>
            </Box>
          </Stack>
        </Grid>
        {showCreateGroupForm || showInviteUserForm ? (
          <>
            {showCreateGroupForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12}>
                  <form onSubmit={handleInitialSubmit}>
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
                                    <MenuItem value="Private Group">Private Group</MenuItem>
                                    <MenuItem value="Registered Company">Register Company</MenuItem>
                                    <MenuItem value="Public Law Entity">Public Law Entity</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Box>
                    </ChildCard>
                    <Box p={3} display="flex" justifyContent="flex-start">
                      {!isSubmitted && (
                        <>
                          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>
                            {isCreateGroupLoading ? <CircularProgress size={24} thickness={5} sx={{ color: 'white' }} /> : 'Create Group'}
                          </Button>
                          <Button variant="outlined" color="secondary" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </>
                      )}
                    </Box>
                  </form>
                </Grid>
                {isSubmitted && formData.entityType === "Registered Company" && (
                  <>
                    <Grid item xs={12}>
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
                                  <CustomFormLabel htmlFor="companyName">Company Name</CustomFormLabel>
                                  <TextField
                                    id="companyName"
                                    fullWidth
                                    onChange={handleInputChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="industrySector">Industry Sector</CustomFormLabel>
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
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="registrationNumber">Registration Number</CustomFormLabel>
                                  <TextField
                                    id="registrationNumber"
                                    fullWidth
                                    onChange={handleInputChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="legalStructure">Legal Structure</CustomFormLabel>
                                  <TextField
                                    id="legalStructure"
                                    fullWidth
                                    onChange={handleInputChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="registeredAddress">Registered Address</CustomFormLabel>
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
                                  <CustomFormLabel htmlFor="incorporationCertificate">Incorporation Certificate</CustomFormLabel>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Button variant="contained" component="label">
                                      Choose file
                                      <input
                                        type="file"
                                        id="incorporationCertificate"
                                        hidden
                                        onChange={handleFileChange}
                                      />
                                    </Button>
                                    <Typography>
                                      {filePreviews.incorporationCertificate ? "File chosen" : "No file chosen"}
                                    </Typography>
                                  </Box>
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
                                  <CustomFormLabel htmlFor="memorandumAndArticles">Memorandum And Articles</CustomFormLabel>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Button variant="contained" component="label">
                                      Choose file
                                      <input
                                        type="file"
                                        id="memorandumAndArticles"
                                        hidden
                                        onChange={handleFileChange}
                                      />
                                    </Button>
                                    <Typography>
                                      {filePreviews.memorandumAndArticles ? "File chosen" : "No file chosen"}
                                    </Typography>
                                  </Box>
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
                    </Grid>
                    <Grid item xs={12}>
                      <Box p={3} display="flex" justifyContent="flex-start">
                        <Button type="button" variant="contained" color="primary" onClick={handleRegisterCompanySubmit}>
                          {isRegisterCompanyLoading ? <CircularProgress size={24} thickness={5} sx={{ color: 'white' }} /> : 'Register Company'}
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}
                {isSubmitted && formData.entityType === "Public Law Entity" && (
                  <>
                    <Grid item xs={12}>
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
                                  <CustomFormLabel htmlFor="entityName">Entity Name</CustomFormLabel>
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
                                  <CustomFormLabel htmlFor="business_email">Business Email</CustomFormLabel>
                                  <TextField
                                    id="business_email"
                                    placeholder='Business Email'
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
                    </Grid>
                    <Grid item xs={12}>
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
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="group_owner_job_title">Group Owner job title</CustomFormLabel>
                                  <TextField
                                    id="group_owner_job_title"
                                    placeholder='Group Owner Job Title...'
                                    fullWidth
                                    onChange={handleInputChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="group_owner_business_email">Group Owner Business Email</CustomFormLabel>
                                  <TextField
                                    id="group_owner_business_email"
                                    placeholder='Group Owner Business Email...'
                                    fullWidth
                                    onChange={handleInputChange}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Box>
                        </ChildCard>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
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
                                  <CustomFormLabel htmlFor="legislation">Link to Constituting Legislation</CustomFormLabel>
                                  <TextField
                                    id="legislation"
                                    placeholder='https://'
                                    fullWidth
                                    onChange={handleInputChange}
                                  />
                                </Grid>
                                <Grid item xs={12}>
                                  <CustomFormLabel htmlFor="supervisoryBody">Link to Supervisory Body</CustomFormLabel>
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
                    </Grid>
                    <Grid item xs={12}>
                      <Box p={3} display="flex" justifyContent="flex-start">
                        <Button type="button" variant="contained" color="primary" onClick={handlePublicLawEntitySubmit}>
                          {isPublicLawEntityLoading ? <CircularProgress size={24} thickness={5} sx={{ color: 'white' }} /> : 'Submit Public Law Entity'}
                        </Button>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            )}
          </>
        ) : (
          <Grid container spacing={3}>
            {fetchingGroups ? (
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <CircularProgress />
              </Grid>
            ) : (

              <>
                <Box p={3}>
                  <Grid container spacing={3} sx={{ marginTop: '10px', marginBottom: '20px' }}>
                    {cardData.map((card) => (
                      <Grid item xs={12} md={4} lg={4} key={card.title}>
                        <BlankCard className="hoverCard" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                          <CardMedia component={'img'} height="220" alt={card.title} src={card.Icon} />
                          <Box p={3} sx={{ minHeight: '200px', flexGrow: 1 }}>
                            <Stack direction="row" gap={1}>
                              <Box>
                                <Typography variant="h6">{card.title}</Typography>
                                <Typography variant="caption" sx={{ minHeight: '60px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'normal', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                  {card.desc}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
                                  <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{card.value}</Typography>
                                    <Typography variant="body1" sx={{ color: 'gray' }}>{card.per}</Typography>
                                  </Box>
                                  <Link to={card.link} >
                                    <Button variant="contained" sx={{ textTransform: 'none' }}>
                                      Select
                                    </Button>
                                  </Link>
                                </Box>
                              </Box>
                            </Stack>
                          </Box>
                        </BlankCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>


                <GroupTable groups={groups} />
              </>
            )}
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default GalleryCard;
