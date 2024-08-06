import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Button,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Select,
  Grid, Chip,
  Stack
} from '@mui/material';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons';
import UserDetail from './UserDetail'; // Import the UserDetail component

import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Use a strong secret key

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

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

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {['Name', 'Residency', 'ID', 'Urgency', 'Request Received', 'Status'].map((headCell) => (
          <TableCell
            key={headCell}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell ? order : false}
          >
            {headCell}

          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { search, handleSearch, handleFilterChange, filters } = props;

  return (
    <Toolbar
      sx={{
        backgroundColor: '#F4F7FB',
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid container spacing={2} sx={{ maxWidth: '100%', width: '100%' }}>
        <Grid item xs={3}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search by ID"
            size="small"
            onChange={handleSearch}
            value={search}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            value={filters.residency}
            onChange={(e) => handleFilterChange('residency', e.target.value)}
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'white',
              },
            }}
          >
            <MenuItem value="All countries">All countries</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="Sri Lanka">Sri Lanka</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'white',
              },
            }}
          >
            <MenuItem value="All Status">All Status</MenuItem>
            <MenuItem value="true">Approved</MenuItem>
            <MenuItem value="false">Pending</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Select
            value={filters.time}
            onChange={(e) => handleFilterChange('time', e.target.value)}
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'white',
              },
            }}
          >
            <MenuItem value="All time">All time</MenuItem>
            <MenuItem value="Today">Today</MenuItem>
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

const UserListing = ({ Users }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ID');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ residency: 'All countries', status: 'All Status', time: 'All time' });
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {
    if (Users && Users.length > 0) {
      let filteredData = Users.filter((user) => user.id.toLowerCase().includes(search.toLowerCase()));

      if (filters.residency !== 'All countries') {
        filteredData = filteredData.filter((user) => decryptData(user.resident_country) === filters.residency);
      }

      if (filters.status !== 'All Status') {
        filteredData = filteredData.filter((user) => (user.verified ? 'Approved' : 'Pending') === filters.status);
      }

      if (filters.time !== 'All time') {
        filteredData = filteredData.filter((user) => {
          const date = parseISO(user.date);
          if (filters.time === 'Today') {
            return isToday(date);
          }
          if (filters.time === 'This Week') {
            return isThisWeek(date);
          }
          if (filters.time === 'This Month') {
            return isThisMonth(date);
          }
          return false;
        });
      }

      setFilteredRows(filteredData);
    }
  }, [Users, search, filters]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleFilterChange = (filterName, filterValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: filterValue,
    }));
  };

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

  const formatId = (id) => {
    if (id.length <= 12) return id;
    return `${id.slice(0, 6)}...${id.slice(-6)}`;
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <Box mt={4}>
      {selectedUser ? (
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h4">User Details</Typography>
          </Stack>
          <UserDetail user={selectedUser} onClose={handleCloseDetails} />
        </Box>
      ) : (
        <Box>
          <Typography variant="h3" mt={2} mb={2} display="flex" alignItems="flex-start" >Onboarding Request</Typography>
          <Box p={2}>
            <EnhancedTableToolbar
              search={search}
              handleSearch={handleSearch}
              handleFilterChange={handleFilterChange}
              filters={filters}
            />
          </Box>
          <TableContainer>
            <Table>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredRows && filteredRows.length > 0 ? (
                  filteredRows.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        <Stack direction="row" gap="10px" alignItems="center">
                          <Avatar
                            src={user.live_photo[0]}
                            alt="user image"
                            width="35"
                            sx={{
                              borderRadius: '100%',
                            }}
                          />
                          <Typography variant="h6">{decryptData(user.given_name)} {decryptData(user.family_name)}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">{decryptData(user.resident_country)}</Typography>
                      </TableCell>
                      <TableCell>{formatId(user.id)}</TableCell>
                      <TableCell>
                        <Typography variant="h6">{user.role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">{decryptData(user.phone)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.verified === true
                            ? 'Approved'
                            : 'Pending'}
                          sx={{
                            bgcolor:
                              user.verified === true
                                ? 'success.main'
                                : 'warning.main', // default color if none of the conditions match
                            color: user.verified === true
                              ? 'success.light'
                              : 'warning.light',
                          }}
                        />
                      </TableCell>
                      <TableCell> 
                        <Link to={`/apps/tickets/user-detail/${user.id}`}>
                        <Button variant="outlined" onClick={() => handleViewDetails(user)}>
                          {user.verified === true
                            ? 'View'
                            : 'Review'}</Button>
                            </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6">No users available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      )}
    </Box>
  );
};

UserListing.propTypes = {
  Users: PropTypes.array.isRequired,
};

export default UserListing;
