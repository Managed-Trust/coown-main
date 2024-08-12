import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  Toolbar,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Tabs,
  Tab,
  TablePagination,
  TableFooter,
  Avatar,
  Chip,
} from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";
import { IconTrash, IconFilter } from "@tabler/icons";
import emailjs from "@emailjs/browser";
import CustomFormLabel from "../../../forms/theme-elements/CustomFormLabel";
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
import CryptoJS from "crypto-js";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DetailComponent from "./DetailComponent";
import Overview from "./overviewComponent/overview";
import ChatComponent from "./chatComponent/ChatComponent";
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai");

const secretKey = "your-secret-key"; // Use a strong secret key

const hashData = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const initialState = {
  email: "",
  contactDetails: "",
  recordType: "",
};

const PersonalRecordType = {
  EconomicBeneficiary: "EconomicBeneficiary",
  ExecutiveMember: "ExecutiveMember",
  InvitedViewer: "InvitedViewer",
  LeadOperator: "LeadOperator",
  StaffMember: "StaffMember",
};

const groupDetails = {
  name: "Tech Innovators Inc.",
  balances: [
    {
      currency: "ckBTC",
      amount: 1.715156,
      usd: 11193.91,
      change: 7.11,
    },
    {
      currency: "ckUSDC",
      amount: 25458,
      usd: 25458,
      change: -3.64,
    },
    {
      currency: "GLDT",
      amount: 120,
      usd: 9512.4,
      change: 7.11,
    },
    {
      currency: "ICP",
      amount: 120,
      usd: 9512.4,
      change: 7.11,
    },
    {
      currency: "$COOWN",
      amount: 120,
      usd: 9512.4,
      change: 7.11,
    },
  ],
  isAdmin: true,
  users: [
    {
      name: "John Doe",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
      role: "Member",
      status: "Inactive",
      limitPerTransaction: 100,
      dailyLimitation: 1000,
      monthlyLimitation: 30000,
      limitationPercentage: 5,
    },
    {
      name: "Jane Smith",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
      role: "Admin",
      status: "Active",
      limitPerTransaction: 200,
      dailyLimitation: 2000,
      monthlyLimitation: 60000,
      limitationPercentage: 10,
    },
    {
      name: "Sam Wilson",
      avatarUrl:
        "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
      role: "Moderator",
      status: "Pending",
      limitPerTransaction: 150,
      dailyLimitation: 1500,
      monthlyLimitation: 45000,
      limitationPercentage: 7,
    },
  ],
};

const StyledPaper = styled(Paper)(({ theme, selected }) => ({
  padding: "16px",
  textAlign: "center",
  cursor: "pointer",
  backgroundColor: selected
    ? theme.palette.action.selected
    : theme.palette.background.paper,
  transition: "background-color 0.3s ease, maxHeight 0.3s ease",
  maxHeight: selected ? "250px" : "100px",
  overflow: "hidden",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const headCells = [
  { id: "member", label: "Member" },
  { id: "email", label: "Email" },
  { id: "contact ", label: "Contact" },
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
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.rowCount > 0 && props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
            inputProps={{
              "aria-label": "select all users",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={props.orderBy === headCell.id ? props.order : false}
          >
            <TableSortLabel
              active={props.orderBy === headCell.id}
              direction={props.orderBy === headCell.id ? props.order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {props.orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {props.order === "desc"
                    ? "sorted descending"
                    : "sorted ascending"}
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
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
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

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "1px solid",
  padding: "16px",
  color: theme.palette.text.primary,
  fontSize: "1rem",
}));

const PaginationTable = ({ rows }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" color="text.primary">Balance</Typography>
        <Button variant="contained" color="primary">Create New</Button>
      </Box>
      <TableContainer>
        <Table
          aria-label="custom pagination table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>Account name</StyledTableCell>
              <StyledTableCell>ckBTC</StyledTableCell>
              <StyledTableCell>ckUSDC</StyledTableCell>
              <StyledTableCell>GLDT</StyledTableCell>
              <StyledTableCell>Estimated Value (USD)</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index} hover>
                <StyledTableCell>{row.accountName}</StyledTableCell>
                <StyledTableCell>{row.ckBTC}</StyledTableCell>
                <StyledTableCell>{row.ckUSDC}</StyledTableCell>
                <StyledTableCell>{row.GLDT}</StyledTableCell>
                <StyledTableCell>{row.estimatedValueUSD}</StyledTableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

const rows = [
  {
    accountName: 'Operations Fund',
    ckBTC: '0.963248 ckBTC',
    ckUSDC: '0.963248 ckBTC',
    GLDT: '0.963248 ckBTC',
    estimatedValueUSD: '56556.06 USD'
  },
  {
    accountName: 'Research & Development Fund',
    ckBTC: '0.963248 ckBTC',
    ckUSDC: '0.963248 ckBTC',
    GLDT: '0.963248 ckBTC',
    estimatedValueUSD: '56556.06 USD'
  },
  {
    accountName: 'Office Daily Needs',
    ckBTC: '0.963248 ckBTC',
    ckUSDC: '0.963248 ckBTC',
    GLDT: '0.963248 ckBTC',
    estimatedValueUSD: '56556.06 USD'
  },
  {
    accountName: 'Marketing Budget',
    ckBTC: '0.963248 ckBTC',
    ckUSDC: '0.963248 ckBTC',
    GLDT: '0.963248 ckBTC',
    estimatedValueUSD: '56556.06 USD'
  },
  {
    accountName: 'Cool Monkey Images',
    ckBTC: '0.963248 ckBTC',
    ckUSDC: '0.963248 ckBTC',
    GLDT: '0.963248 ckBTC',
    estimatedValueUSD: '56556.06 USD'
  },
];

const GroupDetailPage = () => {
  const { groupId } = useParams();
  const [selectedBalance, setSelectedBalance] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [formData, setFormData] = useState(initialState);
  const [filePreviews, setFilePreviews] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [group, setGroup] = useState(null);
  const [fetchingGroup, setFetchingGroup] = useState(true);
  const [tabValue, setTabValue] = useState(0);

  const { isConnected, principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });

  const formatId = (id) => {
    if (id.length <= 12) return id;
    return `${id.slice(0, 6)}...${id.slice(-6)}`;
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

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
    alert("Wallet address copied to clipboard");
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
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
        selected.slice(selectedIndex + 1)
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

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - groupDetails.users.length)
      : 0;

  const handleInviteUser = async () => {
    console.log("Invite User Data:", encryptData(formData.email));
    try {
      const response = await ledger.call(
        "addPersonalRecordToGroup",
        groupId,
        "principal", // Replace with actual principal ID or set as null if not available
        formData.email,
        encryptData(formData.contactDetails),
        { [formData.recordType]: null }
      );
      console.log("Invite User Response:", response);
    } catch (e) {
      console.log("Error Inviting User:", e);
    } finally {
      const emailParams = {
        to_email: formData.email,
        contactDetails: formData.contactDetails,
        recordType: formData.recordType,
        groupId: groupId,
      };

      emailjs
        .send(
          "service_idh0h15",
          "template_d21fhkr",
          emailParams,
          "Y4QJDpwjrsdi3tQAR"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
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

  useEffect(() => {
    fetchGroup();
  }, [principal]);
  const fetchGroup = async () => {
    setFetchingGroup(true);
    try {
      if (principal) {
        const groupDetailResponse = await ledger.call("getGroup", groupId);
        setGroup(groupDetailResponse);
        console.log("Group", groupDetailResponse);
      }
    } catch (e) {
      console.log("Error fetching groups:", e);
    } finally {
      setFetchingGroup(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderFormContent = () => {
    switch (formType) {
      case "inviteUser":
        return (
          <Grid container spacing={3} mt={3}>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
              <TextField id="email" fullWidth onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="contactDetails">
                Contact Details
              </CustomFormLabel>
              <TextField
                id="contactDetails"
                fullWidth
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor="recordType">
                Record Type
              </CustomFormLabel>
              <FormControl fullWidth>
                <Select
                  labelId="recordType-label"
                  id="recordType"
                  name="recordType"
                  value={formData.recordType}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Select Record Type</MenuItem>
                  <MenuItem value="EconomicBeneficiary">
                    Economic Beneficiary
                  </MenuItem>
                  <MenuItem value="ExecutiveMember">Executive Member</MenuItem>
                  <MenuItem value="InvitedViewer">Invited Viewer</MenuItem>
                  <MenuItem value="LeadOperator">Lead Operator</MenuItem>
                  <MenuItem value="StaffMember">Staff Member</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={3}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleInviteUser}
                >
                  Invite User
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowForm(false)}
                >
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
      {fetchingGroup ? (
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
          {group && (
            <>
              <Card style={{ padding: "0px" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image="/images/groupCover/default.svg"
                  alt={groupDetails.name}
                />
                <CardContent
                  sx={{
                    position: "relative",
                    top: -140,
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <Card>
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="start"
                        mb={2}
                        gap={0.5}
                      >
                        <Typography variant="body2" color="textSecondary">
                          Groups • {groupDetails.name}
                        </Typography>
                        <Typography gutterBottom variant="h2" component="div">
                          {groupDetails.name}
                        </Typography>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          style={{
                            borderRadius: "12px",
                            textTransform: "none",
                            backgroundColor: "#E0E7FF",
                            color: "#3B82F6",
                          }}
                        >
                          Incorporation
                        </Button>
                      </Box>
                      <Box display="flex" justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ marginRight: "8px", height: "fit-content" }}
                        >
                          Edit details
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          style={{ height: "fit-content" }}
                        >
                          Edit cover
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card style={{ marginTop: "16px", paddingBottom: "0px" }}>
                    <Box mt={0}>
                      <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        aria-label="group detail tabs"
                      >
                        <Tab label="Overview" />
                        <Tab label="Account" />
                        <Tab label="Assets" />
                        <Tab label="Members" />
                        <Tab label="Chats" />
                        <Tab label="Rewards" />
                        <Tab label="Settings" />
                        <Tab label="Details" />
                      </Tabs>
                    </Box>
                  </Card>
                  <Card style={{ marginTop: "6px" }}>
                    <Box>
                      <CardContent>
                        {tabValue === 0 && (
                          <Box>
                            <Overview />
                          </Box>
                        )}
                        {tabValue === 1 && (
                          <Box>
                          <Grid container spacing={2} mb={2}>
                            {groupDetails.balances.map((balance, index) => (
                              <Grid item xs={12} sm={6} md={3} key={index}>
                                <StyledPaper
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "7px",
                                    justifyContent: "start",
                                    alignItems: "start",
                                    maxHeight: "unset",
                                    width: "100%",
                                  }}
                                >
                                  <Typography variant="h6" color="text.primary">
                                    {balance.currency}
                                  </Typography>
                                  <Typography variant="h2" color="text.secondary">
                                    {balance.amount} {balance.symbol}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    style={{ fontSize: "16px", color: "gray" }}
                                  >
                                    {balance.usd} USD
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color={
                                      balance.change > 0
                                        ? "success.main"
                                        : "error.main"
                                    }
                                    style={{ fontSize: "12px" }}
                                  >
                                    {balance.change > 0 ? "+" : ""}
                                    {balance.change}%
                                  </Typography>
                                </StyledPaper>
                              </Grid>
                            ))}
                          </Grid>

                          <PaginationTable rows={rows} />
                        </Box>
                        )}
                        {tabValue === 2 && (
                          <Box>
                            {/* Assets Component */}
                            <Typography>Assets Component</Typography>
                          </Box>
                        )}
                        {tabValue === 3 && (
                          <Box>
                            {/* Member Component */}
                            <Typography>Member Component</Typography>
                          </Box>
                        )}
                        {tabValue === 4 && (
                          <Box>
                            <ChatComponent/>
                        </Box>
                        )}
                        {tabValue === 5 && (
                          <Box>
                            {/* Reward Component */}
                            <Typography>Reward Component</Typography>
                          </Box>
                        )}
                        {tabValue === 6 && (
                          <Box>
                            {/* Setting Component */}
                            <Typography>Setting Component</Typography>
                          </Box>
                        )}
                        {tabValue === 7 && (
                          <Box>
                            {/* Details Component */}
                            <DetailComponent Group={group} />
                          </Box>
                        )}
                      </CardContent>
                    </Box>
                  </Card>
                  {groupDetails.isAdmin && (
                    <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                      >
                        <Link
                          to={`/group/${groupId}/add-stakeholder`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          Add StakeHolder
                        </Link>
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setFormType("inviteUser");
                          setShowForm(true);
                        }}
                      >
                        Invite User
                      </Button>
                    </Box>
                  )}
                  {showForm && <Box mt={2}>{renderFormContent()}</Box>}

                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
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
  return order === "desc"
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
