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
} from '@mui/material';
import BlankCard from '../../../../components/shared/BlankCard';
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPhotos } from '../../../../store/apps/userProfile/UserProfileSlice';
import { IconDotsVertical } from '@tabler/icons';
import { format } from 'date-fns';
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
  inviteGroupId: ''
};

const GalleryCard = () => {
  const dispatch = useDispatch();
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
  const [showJoinGroupForm, setShowJoinGroupForm] = useState(false);
  const [showInviteUserForm, setShowInviteUserForm] = useState(false);

  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

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

  const handleCreateGroupClick = () => {
    setShowCreateGroupForm(true);
    setShowJoinGroupForm(false);
    setShowInviteUserForm(false);
  };

  const handleJoinGroupClick = () => {
    setShowJoinGroupForm(true);
    setShowCreateGroupForm(false);
    setShowInviteUserForm(false);
  };

  const handleInviteUserClick = () => {
    setShowInviteUserForm(true);
    setShowCreateGroupForm(false);
    setShowJoinGroupForm(false);
  };

  const handleCreateGroup = async () => {
    console.log("Create Group Data:", formData);
    try {
      const response = await ledger.call(
        "createGroup",
        principal,
        formData.groupName,
        formData.groupId,
        formData.registerCompany,
        formData.companyName,
        formData.registrationNumber,
        formData.legalStructure,
        formData.registeredAddress,
        formData.taxID,
        formData.incorporationCertificate,
        formData.memorandumAndArticles,
        formData.representativeFullName,
        formData.position,
        formData.idDocumentType,
        formData.idDocumentNumber,
        formData.idDocument,
        formData.proofOfAuthority,
        formData.emailRep,
        formData.phoneNumber,
        formData.ecnomicOwner,
        formData.beneficialOwner,
        formData.publicLawEntity,
        formData.publicLawEntity ? formData.name : null,
        formData.publicLawEntity ? formData.contactPerson : null,
        formData.publicLawEntity ? formData.address : null,
        formData.publicLawEntity ? formData.mail : null,
        formData.publicLawEntity ? formData.phone : null,
        formData.publicLawEntity ? formData.website : null
      );
      console.log("Create Group Response:", response);
    } catch (e) {
      console.log("Error Creating Group:", e);
    }
  };

  const handleJoinGroup = async () => {
    console.log("Join Group Data:", formData);
    try {
      const response = await ledger.call(
        "joinGroup",
        principal,
        formData.groupId,
        formData.registerCompany,
        formData.representativeFullName,
        formData.position,
        formData.idDocumentType,
        formData.idDocumentNumber,
        formData.idDocument,
        formData.proofOfAuthority,
        formData.emailRep,
        formData.phoneNumber
      );
      console.log("Join Group Response:", response);
    } catch (e) {
      console.log("Error Creating Group:", e);
    }
  };

  const handleInviteUser = async () => {
    console.log("Invite User Data:", formData);
    try {
      const response = await ledger.call(
        "addUsersToGroup",
        principal,
        formData.inviteUserId,
        formData.inviteGroupId
      );
      console.log("Invite User Response:", response);
    } catch (e) {
      console.log("Error Inviting User:", e);
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
              <Button variant="contained" color="secondary" onClick={handleJoinGroupClick} sx={{ mr: 2 }}>
                Join Group
              </Button>
              <Button variant="contained" color="info" onClick={handleInviteUserClick}>
                Invite User to Group
              </Button>
            </Box>
          </Stack>
        </Grid>
        {showCreateGroupForm || showJoinGroupForm || showInviteUserForm ? (
          <>
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
                  <CustomFormLabel htmlFor="entityType">Entity Type</CustomFormLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="entityType-label"
                      id="entityType"
                      name="entityType"
                      value={formData.entityType}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="">Select Entity Type</MenuItem>
                      <MenuItem value="registerCompany">Register Company</MenuItem>
                      <MenuItem value="publicLawEntity">Public Law Entity</MenuItem>
                    </Select>
                  </FormControl>
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
                  </>
                )}
                {formData.entityType === 'publicLawEntity' && (
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
            {showInviteUserForm && (
              <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="inviteUserId">User ID</CustomFormLabel>
                  <TextField id="inviteUserId" fullWidth onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomFormLabel htmlFor="inviteGroupId">Group ID</CustomFormLabel>
                  <TextField id="inviteGroupId" fullWidth onChange={handleInputChange} />
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
          getPhotos.map((photo) => (
            <Grid item xs={12} lg={4} key={photo.id}>
              <BlankCard className="hoverCard">
                {isLoading ? (
                  <>
                    <Skeleton variant="square" animation="wave" width="100%" height={220} />
                  </>
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
                      <IconButton>
                        <IconDotsVertical size="16" />
                      </IconButton>
                    </Box>
                  </Stack>
                </Box>
              </BlankCard>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default GalleryCard;
