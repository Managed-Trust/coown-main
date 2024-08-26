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
  Input,
  Avatar,
  Chip,
  InputBase,
} from "@mui/material";
// Tabler icons
import {
  IconCircle,
  IconChartLine,
  IconSend,
  IconHeart, IconPhone, IconUser
} from '@tabler/icons';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Chart from 'react-apexcharts';
import { QRCodeCanvas } from 'qrcode.react';
import BlankCard from '../../../shared/BlankCard';
import ChildCard from '../../../shared/ChildCard';
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
import GroupMembers from "./GroupMembers";
import Overview from "./overviewComponent/overview";
import ChatComponent from "./chatComponent/ChatComponent";
import Setting from "./settingComponent/setting";
import Stakeholder from "./StakeHolder";

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


  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
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

  const [stakeholders, setStakeholders] = useState([]);
  const [newStakeholder, setNewStakeholder] = useState({ name: "", role: "" });

  const { isConnected, principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });


  const transactionData = [
    {
      id: '123456789',
      amount: '0.0156 ckBTC',
      usd: '1,000',
      type: 'Received',
      dateTime: '15.08.2024 17:46',
      counterparty: '1A1zP1...DivFNa',
      fees: '10 USD',
      status: 'Complete',
      member: {
        avatar: 'https://via.placeholder.com/32',
        name: 'Alice Johnson'
      }
    },
    {
      id: '987654321',
      amount: '0.0050 ckBTC',
      usd: '500',
      type: 'Sent',
      dateTime: '15.08.2024 15:30',
      counterparty: '1Q2w3E...L4k5Mn',
      fees: '5 USD',
      status: 'Pending',
      member: {
        avatar: 'https://via.placeholder.com/32',
        name: 'John Doe'
      }
    },
    {
      id: '112233445',
      amount: '0.0200 ckBTC',
      usd: '1,250',
      type: 'Received',
      dateTime: '14.08.2024 12:15',
      counterparty: '1BvBMZ...7ZzXN',
      fees: '8 USD',
      status: 'Declined',
      member: {
        avatar: 'https://via.placeholder.com/32',
        name: 'Emma Watson'
      }
    },
    {
      id: '998877665',
      amount: '0.0300 ckBTC',
      usd: '2,000',
      type: 'Sent',
      dateTime: '13.08.2024 08:22',
      counterparty: '1P3RoW...Y4vGT',
      fees: '12 USD',
      status: 'Complete',
      member: {
        avatar: 'https://via.placeholder.com/32',
        name: 'Michael Brown'
      }
    },
    {
      id: '445566778',
      amount: '0.0100 ckBTC',
      usd: '700',
      type: 'Received',
      dateTime: '12.08.2024 09:50',
      counterparty: '1DnEpZ...L5kJ3',
      fees: '6 USD',
      status: 'Complete',
      member: {
        avatar: 'https://via.placeholder.com/32',
        name: 'Sophia Davis'
      }
    }
  ];




  const ckBTCColor = '#9C80FF';
  const USDColor = '#bdbdbd';

  const optionsareachart = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: '#adb0bb',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: '2',
      curve: 'smooth',
    },
    colors: [ckBTCColor, USDColor],
    fill: {
      type: 'solid',
      opacity: 0,  // This removes the fill color under the line
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00',
        '2018-09-19T01:30:00',
        '2018-09-19T02:30:00',
        '2018-09-19T03:30:00',
        '2018-09-19T04:30:00',
        '2018-09-19T05:30:00',
        '2018-09-19T06:30:00',
      ],
      labels: {
        show: true,
        format: 'MMM',
      },
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
      title: {
        text: 'ICP',
        style: {
          color: '#adb0bb',
          fontWeight: 600,
        },
      },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
      offsetX: -10,
    },
    grid: {
      show: true,
      borderColor: '#e0e0e0',
      strokeDashArray: 5,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  const seriesareachart = [
    {
      name: 'ckBTC',
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: 'Value in USD',
      data: [15, 30, 45, 55, 65, 75, 85],
    },
  ];

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

  const handleStakeholderInputChange = (e) => {
    const { name, value } = e.target;
    setNewStakeholder({ ...newStakeholder, [name]: value });
  };

  const handleAddStakeholder = () => {
    setStakeholders([...stakeholders, newStakeholder]);
    setNewStakeholder({ name: "", role: "" });
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
                        <Box display="flex" alignItems="center" gap={2}>
                          <Avatar
                            alt={groupDetails.name}
                            src="/images/logos/appleLogo.svg" // Replace with the actual avatar URL or path
                            style={{ width: 120, height: 120 }}
                          />
                          <Box display="flex" alignItems="start" flexDirection="column">
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
                              Registered Company
                            </Button>
                          </Box>

                        </Box>

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
                  {group[0] &&
                    <>
                      {group[0] && group[0].groupType === "Registered Company" ?
                        <>
                          <Card style={{ marginTop: "16px", paddingBottom: "0px" }}>
                            <Box mt={0}>

                              <Tabs value={tabValue} onChange={handleTabChange} aria-label="group detail tabs" >
                                <Tab label="Overview" />
                                <Tab label="Account" />
                                <Tab label="Assets" />
                                <Tab label="Members" />
                                <Tab label="Chats" />
                                <Tab label="Stakeholders" />
                                <Tab label="Subgroups" />
                                <Tab label="Rewards" />
                                <Tab label="Details" />
                                <Tab label="Settings" />
                                <Tab label="Rewards" />
                                <Tab label="Details" />
                                <Tab label="Settings" />

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
                                  <Box display="flex" flexDirection="column" gap="30px">
                                    <Box>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                          <Card sx={{ background: 'linear-gradient(to right, #2A3547, #2A3547, #2A3547)', color: 'white' }} borderRadius="40px">
                                            <CardContent>
                                              <Box display="flex" justifyContent="start" alignItems="center" mb={2}>
                                                <Box>
                                                  <Typography variant="h2">1.715156 USD</Typography>
                                                  <Typography variant="body1" display="flex" alignItems="flex-start" >Estimated Total</Typography>
                                                </Box>
                                              </Box>
                                              <Box display="flex" alignItems="flex-start" mt={10}>
                                                <Button variant="contained" sx={{ background: '#1A73E8', color: 'white' }} startIcon={<IconSend />}>
                                                  Send
                                                </Button>
                                              </Box>
                                            </CardContent>
                                          </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <Card>
                                            <Box display="flex" justifyContent="space-between" mb={1}>
                                              <Box display="flex" flexDirection="column" alignItems="start" mt={1}>
                                                <Typography variant="h3" display="flex" alignItems="flex-start">Receive funds</Typography>
                                                <Box display="flex" alignItems="center" justifyContent="center" mt={8} mb={3} position="relative">
                                                  <Input
                                                    placeholder="Network"
                                                    style={{ width: 200, marginRight: 8 }}
                                                    inputProps={{ 'aria-label': 'network' }}
                                                  />
                                                  <Typography variant="body2" style={{ position: 'absolute', right: 10 }}>IPC</Typography>
                                                </Box>
                                                <Button variant="contained" color="primary" style={{ marginTop: 10, width: '100%' }}>
                                                  1A1zp1...DivfNa
                                                </Button>
                                              </Box>
                                              <Box display="flex" alignItems="center" justifyContent="center">
                                                <QRCodeCanvas value="1A1zp1eP5QGefi2DMPTfTL5SLmv7DivfNa" size={128} />
                                              </Box>
                                            </Box>
                                          </Card>
                                        </Grid>
                                      </Grid>
                                    </Box>
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
                                            <Chip
                                              label={`${balance.change > 0 ? '+' : ''}${balance.change}%`}
                                              color={balance.change > 0 ? 'success' : 'error'}
                                              size="small" // Makes the chip smaller
                                              sx={{
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                margin: '2px', // Adjust margin around the chip
                                              }}
                                            />
                                          </StyledPaper>
                                        </Grid>
                                      ))}
                                    </Grid>

                                    <Card title="Area Chart">
                                      <Box display="flex" flexDirection="column" alignItems="start" p={2}>
                                        <Typography variant="h5" color="textSecondary">
                                          Balance History
                                        </Typography>
                                        <Box display="flex" alignItems="center" mt={1}>
                                          <Typography variant="body1" color="textPrimary" mr={1}>
                                            Overview of Profit
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
                                    </Card>

                                    <Box mt={2}>
                                      <Typography variant="h5" gutterBottom>
                                        Transaction history
                                      </Typography>
                                      <Box sx={{ backgroundColor: '#DFE5EF', p: 1, borderRadius: '8px', mb: 3 }}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                          <InputBase
                                            placeholder="Search for transaction"
                                            sx={{
                                              pl: 2,
                                              flex: 1,
                                              border: '1px solid #d0d7de',
                                              borderRadius: '8px',
                                              height: '48px',
                                              fontSize: '16px',
                                              backgroundColor: 'white',
                                            }}
                                          />
                                          <FormControl sx={{ minWidth: 120 }}>
                                            <Select
                                              defaultValue="Status"
                                              displayEmpty
                                              sx={{
                                                height: '48px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                              }}
                                            >
                                              <MenuItem value="Status">Status</MenuItem>
                                              <MenuItem value="Complete">Complete</MenuItem>
                                              <MenuItem value="Pending">Pending</MenuItem>
                                              <MenuItem value="Declined">Declined</MenuItem>
                                            </Select>
                                          </FormControl>
                                          <FormControl sx={{ minWidth: 120 }}>
                                            <Select
                                              defaultValue="Filter"
                                              displayEmpty
                                              sx={{
                                                height: '48px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                              }}
                                            >
                                              <MenuItem value="Filter">Filter</MenuItem>
                                              <MenuItem value="Sent">Sent</MenuItem>
                                              <MenuItem value="Received">Received</MenuItem>
                                            </Select>
                                          </FormControl>
                                          <FormControl sx={{ minWidth: 140 }}>
                                            <Select
                                              defaultValue="All time"
                                              displayEmpty
                                              sx={{
                                                height: '48px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                              }}
                                            >
                                              <MenuItem value="All time">All time</MenuItem>
                                              <MenuItem value="Last week">Last week</MenuItem>
                                              <MenuItem value="Last month">Last month</MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Box>
                                      </Box>
                                      <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
                                        <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>ID</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Amount</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Type</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Date and time</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Counterparty</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Fees</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Status</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Member</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {transactionData.map((row) => (
                                              <TableRow key={row.id}>
                                                <TableCell sx={{ color: 'gray', fontSize: '16px' }}>{row.id}</TableCell>
                                                <TableCell>
                                                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px' }}>{row.amount}</Typography>
                                                  <Typography variant="body2" sx={{ color: 'gray', fontSize: '12px' }}>{row.usd} USD</Typography>
                                                </TableCell>
                                                <TableCell>
                                                  <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                      borderRadius: '12px',
                                                      backgroundColor: row.type === 'Received' ? '#E6FFFA' : '#E0E7FF',
                                                      color: row.type === 'Received' ? '#2B8A3E' : '#1A73E8',
                                                      textTransform: 'none',
                                                      fontSize: '14px',
                                                      '&:hover': {
                                                        backgroundColor: row.type === 'Received' ? '#E6FFFA' : '#E0E7FF',
                                                      },
                                                    }}
                                                  >
                                                    {row.type}
                                                  </Button>
                                                </TableCell>
                                                <TableCell sx={{ color: 'gray', fontSize: '16px' }}>{row.dateTime}</TableCell>
                                                <TableCell>
                                                  <Typography
                                                    variant="body2"
                                                    sx={{
                                                      whiteSpace: 'nowrap',
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      maxWidth: '160px',
                                                      color: 'gray',
                                                      fontSize: '12px',
                                                    }}
                                                  >
                                                    {row.counterparty}
                                                  </Typography>
                                                  <ContentCopyIcon fontSize="small" />
                                                </TableCell>
                                                <TableCell sx={{ color: 'gray', fontSize: '12px' }}>{row.fees}</TableCell>
                                                <TableCell>
                                                  <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                      borderRadius: '12px',
                                                      backgroundColor:
                                                        row.status === 'Complete' ? '#E6FFFA' :
                                                          row.status === 'Pending' ? '#FFF7E0' :
                                                            '#FFE0E0',
                                                      color:
                                                        row.status === 'Complete' ? '#2B8A3E' :
                                                          row.status === 'Pending' ? '#E6A800' :
                                                            '#E60000',
                                                      textTransform: 'none',
                                                      fontSize: '14px',
                                                      '&:hover': {
                                                        backgroundColor:
                                                          row.status === 'Complete' ? '#E6FFFA' :
                                                            row.status === 'Pending' ? '#FFF7E0' :
                                                              '#FFE0E0',
                                                      }
                                                    }}
                                                  >
                                                    {row.status}
                                                  </Button>
                                                </TableCell>
                                                <TableCell>
                                                  <Box display="flex" alignItems="center">
                                                    <Avatar src={row.member.avatar} alt={row.member.name} sx={{ width: 36, height: 36 }} />
                                                    <Typography sx={{ marginLeft: '8px', fontSize: '16px' }}>{row.member.name}</Typography>
                                                  </Box>
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Box>

                                    {/* <PaginationTable rows={rows} /> */}
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
                                    <GroupMembers />
                                  </Box>
                                )}
                                {tabValue === 4 && (
                                  <Box>
                                    <ChatComponent />
                                  </Box>
                                )}
                                {tabValue === 5 && (
                                  <>
                                    <Box>
                                      <Stakeholder groupId={groupId} />
                                    </Box>
                                  </>
                                )}
                                {tabValue === 6 && (
                                  <>
                                    <Box>
                                      <Typography>Subgroups Component</Typography>
                                    </Box>
                                  </>
                                )}
                                {tabValue === 7 && (
                                  <Box>
                                    {/* Reward Component */}
                                    <Typography>Reward Component</Typography>
                                  </Box>
                                )}
                                {tabValue === 8 && (
                                  <Box>
                                    {/* Details Component */}
                                    <DetailComponent Group={group} />
                                  </Box>
                                )}
                                {tabValue === 9 && (
                                  <Box>
                                    {/* Setting Component */}
                                    <Setting />
                                  </Box>
                                )}
                              </CardContent>
                            </Box>
                          </Card>
                        </> : <>
                          <Card style={{ marginTop: "16px", paddingBottom: "0px" }}>
                            <Box mt={0}>

                              <Tabs value={tabValue} onChange={handleTabChange} aria-label="group detail tabs" >
                                <Tab label="Overview" />
                                <Tab label="Account" />
                                <Tab label="Assets" />
                                <Tab label="Members" />
                                <Tab label="Chats" />
                                <Tab label="Rewards" />
                                <Tab label="Details" />
                                <Tab label="Settings" />
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
                                  <Box display="flex" flexDirection="column" gap="30px">
                                    <Box>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                          <Card sx={{ background: 'linear-gradient(to right, #2A3547, #2A3547, #2A3547)', color: 'white' }} borderRadius="40px">
                                            <CardContent>
                                              <Box display="flex" justifyContent="start" alignItems="center" mb={2}>
                                                <Box>
                                                  <Typography variant="h2">1.715156 USD</Typography>
                                                  <Typography variant="body1" display="flex" alignItems="flex-start" >Estimated Total</Typography>
                                                </Box>
                                              </Box>
                                              <Box display="flex" alignItems="flex-start" mt={10}>
                                                <Button variant="contained" sx={{ background: '#1A73E8', color: 'white' }} startIcon={<IconSend />}>
                                                  Send
                                                </Button>
                                              </Box>
                                            </CardContent>
                                          </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <Card>
                                            <Box display="flex" justifyContent="space-between" mb={1}>
                                              <Box display="flex" flexDirection="column" alignItems="start" mt={1}>
                                                <Typography variant="h3" display="flex" alignItems="flex-start">Receive funds</Typography>
                                                <Box display="flex" alignItems="center" justifyContent="center" mt={8} mb={3} position="relative">
                                                  <Input
                                                    placeholder="Network"
                                                    style={{ width: 200, marginRight: 8 }}
                                                    inputProps={{ 'aria-label': 'network' }}
                                                  />
                                                  <Typography variant="body2" style={{ position: 'absolute', right: 10 }}>IPC</Typography>
                                                </Box>
                                                <Button variant="contained" color="primary" style={{ marginTop: 10, width: '100%' }}>
                                                  1A1zp1...DivfNa
                                                </Button>
                                              </Box>
                                              <Box display="flex" alignItems="center" justifyContent="center">
                                                <QRCodeCanvas value="1A1zp1eP5QGefi2DMPTfTL5SLmv7DivfNa" size={128} />
                                              </Box>
                                            </Box>
                                          </Card>
                                        </Grid>
                                      </Grid>
                                    </Box>
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
                                              style={{ fontSize: "14px", color: "gray" }}
                                            >
                                              {balance.usd} USD
                                            </Typography>
                                            <Chip
                                              label={`${balance.change > 0 ? '+' : ''}${balance.change}%`}
                                              color={balance.change > 0 ? 'success' : 'error'}
                                              size="small" // Makes the chip smaller
                                              sx={{
                                                fontSize: '12px',
                                                fontWeight: 'bold',
                                                margin: '2px', // Adjust margin around the chip
                                              }}
                                            />
                                          </StyledPaper>
                                        </Grid>
                                      ))}
                                    </Grid>

                                    <Card title="Area Chart">
                                      <Box display="flex" flexDirection="column" alignItems="start" p={2}>
                                        <Typography variant="h5" color="textSecondary">
                                          Balance History
                                        </Typography>
                                        <Box display="flex" alignItems="center" mt={1}>
                                          <Typography variant="body1" color="textPrimary" mr={1}>
                                            Overview of Profit
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
                                    </Card>


                                    <Box mt={2}>
                                      <Typography variant="h5" gutterBottom>
                                        Transaction history
                                      </Typography>
                                      <Box sx={{ backgroundColor: '#DFE5EF', p: 1, borderRadius: '8px', mb: 3 }}>
                                        <Box display="flex" alignItems="center" gap={2}>
                                          <InputBase
                                            placeholder="Search for transaction"
                                            sx={{
                                              pl: 2,
                                              flex: 1,
                                              border: '1px solid #d0d7de',
                                              borderRadius: '8px',
                                              height: '48px',
                                              fontSize: '16px',
                                              backgroundColor: 'white',
                                            }}
                                          />
                                          <FormControl sx={{ minWidth: 120 }}>
                                            <Select
                                              defaultValue="Status"
                                              displayEmpty
                                              sx={{
                                                height: '48px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                              }}
                                            >
                                              <MenuItem value="Status">Status</MenuItem>
                                              <MenuItem value="Complete">Complete</MenuItem>
                                              <MenuItem value="Pending">Pending</MenuItem>
                                              <MenuItem value="Declined">Declined</MenuItem>
                                            </Select>
                                          </FormControl>
                                          <FormControl sx={{ minWidth: 120 }}>
                                            <Select
                                              defaultValue="Filter"
                                              displayEmpty
                                              sx={{
                                                height: '48px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                              }}
                                            >
                                              <MenuItem value="Filter">Filter</MenuItem>
                                              <MenuItem value="Sent">Sent</MenuItem>
                                              <MenuItem value="Received">Received</MenuItem>
                                            </Select>
                                          </FormControl>
                                          <FormControl sx={{ minWidth: 140 }}>
                                            <Select
                                              defaultValue="All time"
                                              displayEmpty
                                              sx={{
                                                height: '48px',
                                                fontSize: '16px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                              }}
                                            >
                                              <MenuItem value="All time">All time</MenuItem>
                                              <MenuItem value="Last week">Last week</MenuItem>
                                              <MenuItem value="Last month">Last month</MenuItem>
                                            </Select>
                                          </FormControl>
                                        </Box>
                                      </Box>
                                      <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: '0px 3px 6px rgba(0,0,0,0.1)' }}>
                                        <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
                                          <TableHead>
                                            <TableRow>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>ID</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Amount</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Type</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Date and time</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Counterparty</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Fees</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Status</TableCell>
                                              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Member</TableCell>
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                            {transactionData.map((row) => (
                                              <TableRow key={row.id}>
                                                <TableCell sx={{ color: 'gray', fontSize: '16px' }}>{row.id}</TableCell>
                                                <TableCell>
                                                  <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '16px' }}>{row.amount}</Typography>
                                                  <Typography variant="body2" sx={{ color: 'gray', fontSize: '12px' }}>{row.usd} USD</Typography>
                                                </TableCell>
                                                <TableCell>
                                                  <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                      borderRadius: '12px',
                                                      backgroundColor: row.type === 'Received' ? '#E6FFFA' : '#E0E7FF',
                                                      color: row.type === 'Received' ? '#2B8A3E' : '#1A73E8',
                                                      textTransform: 'none',
                                                      fontSize: '14px',
                                                      '&:hover': {
                                                        backgroundColor: row.type === 'Received' ? '#E6FFFA' : '#E0E7FF',
                                                      },
                                                    }}
                                                  >
                                                    {row.type}
                                                  </Button>
                                                </TableCell>
                                                <TableCell sx={{ color: 'gray', fontSize: '16px' }}>{row.dateTime}</TableCell>
                                                <TableCell>
                                                  <Typography
                                                    variant="body2"
                                                    sx={{
                                                      whiteSpace: 'nowrap',
                                                      overflow: 'hidden',
                                                      textOverflow: 'ellipsis',
                                                      maxWidth: '160px',
                                                      color: 'gray',
                                                      fontSize: '12px',
                                                    }}
                                                  >
                                                    {row.counterparty}
                                                  </Typography>
                                                  <ContentCopyIcon fontSize="small" />
                                                </TableCell>
                                                <TableCell sx={{ color: 'gray', fontSize: '12px' }}>{row.fees}</TableCell>
                                                <TableCell>
                                                  <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                      borderRadius: '12px',
                                                      backgroundColor:
                                                        row.status === 'Complete' ? '#E6FFFA' :
                                                          row.status === 'Pending' ? '#FFF7E0' :
                                                            '#FFE0E0',
                                                      color:
                                                        row.status === 'Complete' ? '#2B8A3E' :
                                                          row.status === 'Pending' ? '#E6A800' :
                                                            '#E60000',
                                                      textTransform: 'none',
                                                      fontSize: '14px',
                                                      '&:hover': {
                                                        backgroundColor:
                                                          row.status === 'Complete' ? '#E6FFFA' :
                                                            row.status === 'Pending' ? '#FFF7E0' :
                                                              '#FFE0E0',
                                                      }
                                                    }}
                                                  >
                                                    {row.status}
                                                  </Button>
                                                </TableCell>
                                                <TableCell>
                                                  <Box display="flex" alignItems="center">
                                                    <Avatar src={row.member.avatar} alt={row.member.name} sx={{ width: 36, height: 36 }} />
                                                    <Typography sx={{ marginLeft: '8px', fontSize: '16px' }}>{row.member.name}</Typography>
                                                  </Box>
                                                </TableCell>
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </TableContainer>
                                    </Box>

                                    {/* <PaginationTable rows={rows} /> */}
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
                                    <GroupMembers />
                                  </Box>
                                )}
                                {tabValue === 4 && (
                                  <Box>
                                    <ChatComponent />
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
                                    {/* Details Component */}
                                    <DetailComponent Group={group} />
                                  </Box>
                                )}
                                {tabValue === 7 && (
                                  <Box>
                                    {/* Setting Component */}
                                    <Setting />
                                  </Box>
                                )}
                              </CardContent>
                            </Box>
                          </Card>
                        </>}
                    </>}
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
    : (a, b) => -descendingComparator(a[0], b[0]);
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
