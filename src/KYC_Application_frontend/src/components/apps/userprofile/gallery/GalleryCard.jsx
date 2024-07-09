import React, { useState, useEffect } from 'react';
import {
  Box,
  Stack,
  Grid,
  Typography,
  Chip,
  TextField,
  IconButton,
  CardMedia,
  Skeleton,
  Button,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Menu,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BlankCard from '../../../../components/shared/BlankCard';
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../../../../store/apps/userProfile/UserProfileSlice';
import { IconDotsVertical } from '@tabler/icons';
import { format } from 'date-fns';
import emailjs from "@emailjs/browser";
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const initialState = {
  email: '',
  otp: '',
  groupName: '',
  groupId: '',
  entityType: '',
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
  name: '',
  contactPerson: '',
  address: '',
  mail: '',
  phone: '',
  website: '',
  inviteUserId: '',
  inviteGroupId: '',
  entityName: '',
  jurisdiction: '',
  establishmentDate: '',
  function: '',
  addressOfLegalEntity: '',
  residencyOfGroup: '',
  groupDescription: '',
  groupImage: '',
  caller: '',
  email: '',
  contactDetails: '',
  recordType: '',
};

const PersonalRecordType = {
  EconomicBeneficiary: "EconomicBeneficiary",
  ExecutiveMember: "ExecutiveMember",
  InvitedViewer: "InvitedViewer",
  LeadOperator: "LeadOperator",
  StaffMember: "StaffMember",
};

const GalleryCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const filterPhotos = (photos, cSearch) => {
    if (photos)
      return photos.filter((t) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));
    return photos;
  };

  const [search, setSearch] = useState('');
  const getPhotos = useSelector((state) => filterPhotos(state.userpostsReducer.gallery, search));
  const [isLoading, setLoading] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [filePreviews, setFilePreviews] = useState({});
  const [showCreateGroupForm, setShowCreateGroupForm] = useState(false);
  const [showInviteUserForm, setShowInviteUserForm] = useState(false);

  const { isConnected, principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setShowInviteUserForm(true);
  };

  const handleCardClick = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
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

  const generateGroupId = () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 10000);
    return `${principal}-${timestamp}-${randomNum}`;
  };

  const handleCreateGroupClick = () => {
    const groupId = generateGroupId();
    setFormData((prevData) => ({
      ...prevData,
      groupId: groupId,
    }));
    setShowCreateGroupForm(true);
    setShowInviteUserForm(false);
  };

  const handleInviteUserClick = () => {
    setShowInviteUserForm(true);
    setShowCreateGroupForm(false);
    handleMenuClose();
  };

  const handleCreateGroup = async () => {
    console.log("Create Group Data:", formData);
    try {
      const response = await ledger.call("createGroup", formData.groupName, principal, formData.groupId, formData.addressOfLegalEntity, formData.residencyOfGroup, formData.groupDescription, formData.groupImage);
      alert(response);

      if (formData.entityType === 'registerCompany') {
        const responseCompany = await ledger.call("declareGroupAsCompany", formData.groupId, principal, formData.companyName, formData.registrationNumber, formData.legalStructure, formData.registeredAddress, formData.taxID, formData.beneficialOwner, formData.incorporationCertificate, formData.memorandumAndArticles, formData.representativeFullName, formData.position, formData.idDocumentType, formData.idDocumentNumber, formData.idDocument, formData.proofOfAuthority, formData.email, formData.phoneNumber);
        alert(responseCompany);
      }

      if (formData.entityType === 'publicLawEntity') {
        const responsePublicLawEntity = await ledger.call("declareGroupAsPublicLawEntity", formData.groupId, formData.entityName, formData.jurisdiction, formData.establishmentDate, formData.function, formData.address, formData.phoneNumber, formData.email, formData.caller);
        alert(responsePublicLawEntity);
      }

    } catch (e) {
      console.log("Error Creating Group:", e);
    }
  };

  const handleInviteUser = async () => {
    console.log("Invite User Data:", formData);
    try {
      const response = await ledger.call(
        "addPersonalRecordToGroup",
        formData.groupId,
        'principalId', // Replace with actual principal ID or set as null if not available
        formData.email,
        formData.contactDetails,
        { [formData.recordType]: null }
      );
      console.log("Invite User Response:", response);
    } catch (e) {
      console.log("Error Inviting User:", e);
    }finally{
      const emailParams = {
        to_email: formData.email
      };

      emailjs
      .send('service_idh0h15', 'template_d21fhkr', emailParams, 'Y4QJDpwjrsdi3tQAR')
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      )
      .catch((error) => {
        console.log("Error sending Email:", error);
      })
      .finally(() => {
        alert("Email sent to " + formData.email);
      });
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <Stack direction="row" alignItems="center" mt={2}>
            <Box>
              <Typography variant="h3">
                Groups &nbsp;
                <Chip label={getPhotos.length} color="secondary" size="small" />
              </Typography>
            </Box>
            <Box ml="auto">
              <Button variant="contained" color="primary" onClick={handleCreateGroupClick} sx={{ mr: 2 }}>
                Create Group
              </Button>
            </Box>
          </Stack>
        </Grid>
        {showCreateGroupForm || showInviteUserForm ? (
          <>
            {showCreateGroupForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupId">Group ID</CustomFormLabel>
                  <TextField id="groupId" value={formData.groupId} fullWidth onChange={handleInputChange} disabled />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupName">Group Name</CustomFormLabel>
                  <TextField id="groupName" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="entityType">Group Type</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="entityType-label"
                      id="entityType"
                      name="entityType"
                      value={formData.entityType}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">Select Group Type</MenuItem>
                      <MenuItem value="registerCompany">Register Company</MenuItem>
                      <MenuItem value="publicLawEntity">Public Law Entity</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="addressOfLegalEntity">Address of Legal Entity</CustomFormLabel>
                  <TextField id="addressOfLegalEntity" fullWidth onChange={handleInputChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="residencyOfGroup">Residency of Group</CustomFormLabel>
                  <TextField id="residencyOfGroup" fullWidth onChange={handleInputChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupDescription">Group Description</CustomFormLabel>
                  <TextField id="groupDescription" fullWidth onChange={handleInputChange} />
                </Grid>

                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="groupImage">Group Image</CustomFormLabel>
                  <TextField
                    id="groupImage"
                    type="file"
                    fullWidth
                    onChange={handleFileChange}
                  />
                  {filePreviews.groupImage && (
                    <Paper elevation={3} sx={{ mt: 2, width: 100, height: 100 }}>
                      <img src={filePreviews.groupImage} alt="Group Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Paper>
                  )}
                </Grid>

                {formData.entityType === 'registerCompany' && (
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
                      <CustomFormLabel htmlFor="beneficialOwner">Beneficial Owner</CustomFormLabel>
                      <TextField id="beneficialOwner" fullWidth onChange={handleInputChange} />
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
                      <CustomFormLabel htmlFor="position">Representative Position</CustomFormLabel>
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
                      <CustomFormLabel htmlFor="emailRep">Email</CustomFormLabel>
                      <TextField id="emailRep" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="phoneNumber">Phone Number</CustomFormLabel>
                      <TextField id="phoneNumber" fullWidth onChange={handleInputChange} />
                    </Grid>
                  </>
                )}
                {formData.entityType === 'publicLawEntity' && (
                  <>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="entityName">Entity Name</CustomFormLabel>
                      <TextField
                        id="entityName"
                        fullWidth
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="jurisdiction">Jurisdiction</CustomFormLabel>
                      <TextField
                        id="jurisdiction"
                        fullWidth
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="establishmentDate">Establishment Date</CustomFormLabel>
                      <TextField
                        id="establishmentDate"
                        fullWidth
                        onChange={handleInputChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="function">Function</CustomFormLabel>
                      <TextField id="function" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="address">Address</CustomFormLabel>
                      <TextField id="address" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="phoneNumber">Phone Number</CustomFormLabel>
                      <TextField id="phoneNumber" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                      <TextField id="email" fullWidth onChange={handleInputChange} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <CustomFormLabel htmlFor="caller">Caller</CustomFormLabel>
                      <TextField id="caller" fullWidth onChange={handleInputChange} />
                    </Grid>
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
            {showInviteUserForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                  <TextField id="email" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="contactDetails">Contact Details</CustomFormLabel>
                  <TextField id="contactDetails" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="recordType">Record Type</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="recordType-label"
                      id="recordType"
                      name="recordType"
                      value={formData.recordType}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">Select Record Type</MenuItem>
                      <MenuItem value="EconomicBeneficiary">Economic Beneficiary</MenuItem>
                      <MenuItem value="ExecutiveMember">Executive Member</MenuItem>
                      <MenuItem value="InvitedViewer">Invited Viewer</MenuItem>
                      <MenuItem value="LeadOperator">Lead Operator</MenuItem>
                      <MenuItem value="StaffMember">Staff Member</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                    <Button variant="contained" color="primary" onClick={handleInviteUser}>
                      Invite User
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            )}
          </>
        ) : (
          <Grid container spacing={3}>
            <Grid item sm={12} lg={12}>
              <Stack direction="row" alignItems="center" mt={2}>
                <Box>
                  <Typography variant="h3">
                    Groups &nbsp;
                    <Chip label={getPhotos.length} color="secondary" size="small" />
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            {getPhotos.map((photo) => (
              <Grid item xs={12} lg={4} key={photo.id}>

                <BlankCard className="hoverCard cursor-pointer" onClick={() => handleCardClick(photo.id)}>
                  {isLoading ? (
                    <Skeleton variant="square" animation="wave" width="100%" height={220} />
                  ) : (
                    <CardMedia component={'img'} height="220" alt="Remy Sharp" src={photo.cover} />
                  )}
                  <Box p={3}>
                    <Stack direction="row" gap={1}>
                      <Box>
                        <Typography variant="h6">{photo.name}.jpg</Typography>
                        <Typography variant="caption">
                          {format(new Date(photo.time), 'E, MMM d, yyyy')}
                        </Typography>
                      </Box>
                      <Box ml={'auto'}>
                        <IconButton onClick={handleMenuClick}>
                          <IconDotsVertical size="16" />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleMenuClose}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                        >
                          <MenuItem onClick={handleMenuClose}>Invite User to Group</MenuItem>
                        </Menu>
                      </Box>
                    </Stack>
                  </Box>
                </BlankCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default GalleryCard;
