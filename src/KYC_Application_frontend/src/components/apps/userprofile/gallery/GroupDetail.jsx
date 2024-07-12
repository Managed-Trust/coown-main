import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react';
import {
  Container,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Checkbox,
  Badge,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { visuallyHidden } from '@mui/utils';
import { IconTrash, IconFilter } from '@tabler/icons';
import emailjs from "@emailjs/browser";
import CustomFormLabel from '../../../forms/theme-elements/CustomFormLabel';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const initialState = {
  email: '',
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
  beneficialOwner: '',
  publicLawEntity: false,
  entityName: '',
  jurisdiction: '',
  establishmentDate: '',
  function: '',
  address: '',
  phone: '',
  caller: '',
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

const groupDetails = {
  name: 'Group Title',
  description: 'Description of the group.',
  imageUrl: 'https://as2.ftcdn.net/v2/jpg/03/18/25/19/1000_F_318251936_EukIhmw8bEqECFwhePbp11c6gWJ1ChNG.jpg',
  balances: [
    { currency: 'Bitcoin', amount: 1.5, symbol: 'ckBTC', address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { currency: 'USD', amount: 10, symbol: 'ckUSDC', address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e' },
    { currency: 'Gold', amount: 25, symbol: 'GLDT', address: 'LcWoJ66bmxL1fycdGp81uYgG9cXRxE7eS3' },
  ],
  isAdmin: true,
  users: [
    { name: 'John Doe', avatarUrl: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg', role: 'Member', status: 'Inactive', limitPerTransaction: 100, dailyLimitation: 1000, monthlyLimitation: 30000, limitationPercentage: 5 },
    { name: 'Jane Smith', avatarUrl: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg', role: 'Admin', status: 'Active', limitPerTransaction: 200, dailyLimitation: 2000, monthlyLimitation: 60000, limitationPercentage: 10 },
    { name: 'Sam Wilson', avatarUrl: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg', role: 'Moderator', status: 'Pending', limitPerTransaction: 150, dailyLimitation: 1500, monthlyLimitation: 45000, limitationPercentage: 7 },
  ],
};

const StyledPaper = styled(Paper)(({ theme, selected }) => ({
  padding: '16px',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: selected ? theme.palette.action.selected : theme.palette.background.paper,
  transition: 'background-color 0.3s ease, maxHeight 0.3s ease',
  maxHeight: selected ? '250px' : '100px',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const headCells = [
  { id: 'member', label: 'Member' },
  { id: 'role', label: 'Role' },
  { id: 'status', label: 'Status' },
  { id: 'limitPerTransaction', label: 'Limit per Transaction' },
  { id: 'dailyLimitation', label: 'Daily Limitation' },
  { id: 'monthlyLimitation', label: 'Monthly Limitation' },
  { id: 'limitationPercentage', label: 'Limitation in Percentage' },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={props.numSelected > 0 && props.numSelected < props.rowCount}
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
            inputProps={{
              'aria-label': 'select all users',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={props.orderBy === headCell.id ? props.order : false}
          >
            <TableSortLabel
              active={props.orderBy === headCell.id}
              direction={props.orderBy === headCell.id ? props.order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {props.orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {props.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Group Members
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <IconTrash width={18} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <IconFilter width={18} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const [selectedBalance, setSelectedBalance] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formData, setFormData] = useState(initialState);
  const [filePreviews, setFilePreviews] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);

  const { isConnected, principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });

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

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert('Wallet address copied to clipboard');
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = groupDetails.users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groupDetails.users.length) : 0;

  const handleCreateGroup = async () => {
    console.log("Create Group Data:", formData);
    console.log("GroupId:",groupId);
    try {
      if (formData.entityType === 'registerCompany') {
        const responseCompany = await ledger.call("declareGroupAsCompany", groupId, principal, formData.companyName, formData.registrationNumber, formData.legalStructure, formData.registeredAddress, formData.taxID, formData.beneficialOwner, formData.incorporationCertificate, formData.memorandumAndArticles, formData.representativeFullName, formData.position, formData.idDocumentType, formData.idDocumentNumber, formData.idDocument, formData.proofOfAuthority, formData.email, formData.phoneNumber);
        alert(responseCompany);
      } else if (formData.entityType === 'publicLawEntity') {
        const responsePublicLawEntity = await ledger.call("declareGroupAsPublicLawEntity", groupId, formData.entityName, formData.jurisdiction, formData.establishmentDate, formData.function, formData.address, formData.phoneNumber, formData.email, formData.caller);
        alert(responsePublicLawEntity);
      }
    } catch (e) {
      console.log("Error Creating Group:", e);
    } finally {
      setShowForm(false);
    }
  };

  const handleInviteUser = async () => {
    console.log("Invite User Data:", formData);
    try {
      const response = await ledger.call(
        "addPersonalRecordToGroup",
        groupId,
        principal, // Replace with actual principal ID or set as null if not available
        formData.email,
        formData.contactDetails,
        { [formData.recordType]: null }
      );
      console.log("Invite User Response:", response);
    } catch (e) {
      console.log("Error Inviting User:", e);
    } finally {
      const emailParams = {
        to_email: formData.email,
        contactDetails: formData.contactDetails,
        recordType: formData.recordType
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
          setShowForm(false);
        });
    }
  };

  const renderFormContent = () => {
    switch (formType) {
      case 'createGroup':
        return (
          <Grid container spacing={3} mt={3}>
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
                <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        );
      case 'inviteUser':
        return (
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
                <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </Stack>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={groupDetails.imageUrl}
          alt={groupDetails.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            {groupDetails.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {groupDetails.description}
          </Typography>
          <Box mt={2}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" color="text.primary">
                  <AccountBalanceWalletIcon /> Balances
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {groupDetails.balances.map((balance, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <StyledPaper
                        elevation={3}
                        selected={selectedBalance === index}
                        onClick={() => setSelectedBalance(selectedBalance === index ? null : index)}
                      >
                        <Typography variant="h6" color="text.primary">
                          {balance.currency}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {balance.amount} {balance.symbol}
                        </Typography>
                        {selectedBalance === index && (
                          <Box mt={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography variant="body2" color="text.primary" style={{ wordBreak: 'break-all', fontWeight: 'bold' }}>
                              {balance.address}
                            </Typography>
                            <Tooltip title="Copy Address">
                              <IconButton onClick={() => handleCopyAddress(balance.address)}>
                                <ContentCopyIcon fontSize="small" color="primary" />
                              </IconButton>
                            </Tooltip>
                            <Box mt={1}>
                              <QRCode value={balance.address} size={64} />
                            </Box>
                          </Box>
                        )}
                      </StyledPaper>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent>
      </Card>

      {groupDetails.isAdmin && (
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="primary" onClick={() => { setFormType('createGroup'); setShowForm(true); }}>
            Create Group
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { setFormType('inviteUser'); setShowForm(true); }}>
            Invite User
          </Button>
        </Box>
      )}

      {showForm && (
        <Box mt={2}>
          {renderFormContent()}
        </Box>
      )}

      <Box mt={2}>
        <Paper>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="large">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={groupDetails.users.length}
              />
              <TableBody>
                {stableSort(groupDetails.users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user, index) => {
                    const isItemSelected = isSelected(user.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, user.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={user.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          <Box display="flex" alignItems="center">
                            <Avatar src={user.avatarUrl} alt={user.name} />
                            <Box ml={2}>
                              <Typography variant="body1">{user.name}</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="left">{user.role}</TableCell>
                        <TableCell align="left">
                          <Stack spacing={1} direction="row" alignItems="center">
                            <Badge
                              color={
                                user.status === 'Active'
                                  ? 'success'
                                  : user.status === 'Pending'
                                  ? 'warning'
                                  : user.status === 'Inactive'
                                  ? 'error'
                                  : 'secondary'
                              }
                              variant="dot"
                            ></Badge>
                            <Typography color={'textSecondary'} variant="body1">
                              {user.status}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" fontWeight="bold">
                            {user.limitPerTransaction}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" fontWeight="bold">
                            {user.dailyLimitation}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" fontWeight="bold">
                            {user.monthlyLimitation}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" fontWeight="bold">
                            {user.limitationPercentage}%
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={8} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={groupDetails.users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default GroupDetailPage;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
