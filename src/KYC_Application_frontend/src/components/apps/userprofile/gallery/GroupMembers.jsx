import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
  Badge,
  Checkbox,
  Switch,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Stack,
  Grid,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconDotsVertical, IconPlus, IconMessageCircle } from '@tabler/icons';
import { EnhancedTableData } from './tableData';
import emailjs from '@emailjs/browser';
import CryptoJS from 'crypto-js';

// Define sorting and comparison functions
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

// Define EnhancedTableHead
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Member',
  },
  {
    id: 'isStakeholder',
    numeric: false,
    disablePadding: false,
    label: 'Is Stakeholder',
  },
  {
    id: 'accounts',
    numeric: true,
    disablePadding: false,
    label: 'Accounts',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'actions',
    numeric: false,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="subtitle2" fontWeight="600">
                {headCell.label}
              </Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// GroupMembers component
const secretKey = "your-secret-key"; // Use a strong secret key

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const initialState = {
  email: "",
  contactDetails: "",
  recordType: "",
};

const GroupMembers = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleInviteUser = async () => {
    try {
      const emailParams = {
        to_email: formData.email,
        contactDetails: formData.contactDetails,
        recordType: formData.recordType,
      };

      await emailjs.send(
        "service_idh0h15",
        "template_d21fhkr",
        emailParams,
        "Y4QJDpwjrsdi3tQAR"
      );

      alert(`Invitation sent to ${formData.email}`);
      setShowForm(false);
    } catch (error) {
      console.error("Error inviting user:", error);
      alert("Failed to send invitation.");
    }
  };

  const renderFormContent = () => (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Email</Typography>
          <TextField id="email" fullWidth onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Contact Details</Typography>
          <TextField id="contactDetails" fullWidth onChange={handleInputChange} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Record Type</Typography>
          <FormControl fullWidth>
            <Select
              labelId="recordType-label"
              id="recordType"
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
        <Grid item xs={12} md={12}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleInviteUser}>
              Invite User
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EnhancedTableData.length) : 0;

  return (
    <Paper variant="outlined">
      <Box p={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600">
            {showForm ? 'Invite Member' : 'Group Members'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={showForm ? null : <IconPlus />}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? 'Cancel' : 'Add Member'}
          </Button>
        </Stack>
        {showForm ? (
          renderFormContent()
        ) : (
          <>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {stableSort(EnhancedTableData, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>
                          <Stack spacing={2} direction="row" alignItems="center">
                            <Avatar src={row.imgsrc} alt={row.name} />
                            <Box>
                              <Typography variant="h6" fontWeight="600">
                                {row.name}
                              </Typography>
                              <Typography color="textSecondary" variant="body2">
                                {row.email}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Checkbox checked={row.isStakeholder} />
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body1">
                            {row.accounts}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1">
                            {row.role}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Stack spacing={1} direction="row" alignItems="center">
                            <Badge
                              color={
                                row.status === 'Active'
                                  ? 'success'
                                  : row.status === 'Pending'
                                  ? 'warning'
                                  : row.status === 'Deactivated'
                                  ? 'error'
                                  : 'secondary'
                              }
                              variant="dot"
                            ></Badge>
                            <Typography color="textSecondary" variant="body1">
                              {row.status}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Typography
                              variant="body2"
                              sx={{ color: 'primary.main', cursor: 'pointer' }}
                            >
                              Send funds
                            </Typography>
                            <IconButton size="small">
                              <IconMessageCircle size={20} />
                            </IconButton>
                            <IconButton size="small">
                              <IconDotsVertical />
                            </IconButton>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={EnhancedTableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box p={2}>
              <Switch checked={dense} onChange={handleChangeDense} />
              <Typography variant="body2">Dense padding</Typography>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default GroupMembers;
