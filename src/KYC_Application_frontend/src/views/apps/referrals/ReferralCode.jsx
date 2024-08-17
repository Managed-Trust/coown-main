import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { format, isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import PageContainer from '../../../components/container/PageContainer';
import ProfileBanner from '../../../components/apps/userprofile/profile/ProfileBanner';
import { useConnect } from "@connect2ic/react";
import swal from 'sweetalert';
import {
  Box,
  Stack,
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
  CircularProgress,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Select,
  Grid, Chip
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons';
import { display } from '@mui/system';
import ic from 'ic0';
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister
// Dummy data similar to your image for demonstration
const rows = [
  { code: '123456781', id: 'Operations Fund', status: 'Used', date: '2024-08-17T17:46:00' },
  { code: '123456782', id: 'Research & Development Fund', status: 'Not Used', date: '2024-08-17T17:46:00' },
  { code: '123456783', id: 'Office daily needs', status: 'Not Used', date: '2024-08-13T17:46:00' },
  { code: '123456784', id: 'Marketing Budget', status: 'Used', date: '2024-08-17T17:46:00' },
  { code: '123456785', id: 'Operations Fund', status: 'Not Used', date: '2024-08-11T17:46:00' },
  { code: '123456786', id: 'Operations Fund', status: 'Used', date: '2024-07-30T17:46:00' },
  { code: '123456787', id: 'Research & Development Fund', status: 'Not Used', date: '2024-07-29T17:46:00' },
  { code: '123456788', id: 'Office daily needs', status: 'Not Used', date: '2024-07-31T17:46:00' },
  { code: '123456789', id: 'Marketing Budget', status: 'Used', date: '2024-07-07T17:46:00' },
  { code: '123456790', id: 'Operations Fund', status: 'Used', date: '2024-07-06T17:46:00' },
];

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
        {['Owner Id', 'Code', 'Status', 'Created at'].map((headCell) => (
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
        <Grid item xs={4}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search by Code"
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
        <Grid item xs={4}>
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
            <MenuItem value="Used">Used</MenuItem>
            <MenuItem value="Not Used">Not Used</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={4}>
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

const Galleryr = () => {
  const [loading, setLoading] = useState(false);
  const [newCode, setCode] = useState("");
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('ID');
  const [record, setRecord] = useState(null);
  const [fetchingRecord, setFetchingRecord] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ status: 'All Status', time: 'All time' });
  const [filteredRows, setFilteredRows] = useState([]);

  const { principal } = useConnect();
  useEffect(() => {
    if (principal) {
      fetchRecords();
    }
  }, [principal, newCode]);

  const fetchRecords = async () => {
    setFetchingRecord(true);
    try {
      const response = await ledger.call("getReferralCodesByUser", principal);
      console.log("records:", response);
      setRecord(response);
      setFilteredRows(response);

    } catch (e) {
      console.log("Error record:", e);
    }
    setFetchingRecord(false);
  };
  const handleGenerateCode = async () => {
    setLoading(true);
    try {
      const code = await ledger.call("generateReferralCode", principal);
      console.log("code:", code);
      swal("Success", "Referral code is " + code, "success");
      setCode(code);
    } catch (e) {
      console.log("Error generating code:", e);
    }
    setLoading(false);
  };

  useEffect(() => {

    if (record && record.length > 0) {
      let filteredData = record.filter((row) => row.code.toLowerCase().includes(search.toLowerCase()));

      if (filters.status !== 'All Status') {
        filteredData = filteredData.filter((row) => {
          const status = Number(row.usageCount) === 0 ? 'Not Used' : 'Used';
          return status === filters.status;
        });
      }

      if (filters.time !== 'All time') {
        filteredData = filteredData.filter((row) => {
          const date = new Date(Number(row.createdAt) / 1e6);
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
  }, [record, search, filters]);

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

  return (
    <PageContainer title="User Profile" description="this is User Profile page">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
        {/* Posts Card */}
        <Grid item sm={12} lg={12} xs={12}>
          <Box>
            <Grid item sm={12} lg={12}>
              <Stack direction="row" alignItems="center" mt={2} mb={4}>
                <Box>
                  <Typography variant="h3">
                    Referral Code
                  </Typography>
                </Box>
                <Box ml="auto">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ mr: 2 }}
                    onClick={() => handleGenerateCode()}
                  >
                    {loading ? "Generating ..." : "Generate Code"}
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Box p={2}>
              <EnhancedTableToolbar
                search={search}
                handleSearch={handleSearch}
                handleFilterChange={handleFilterChange}
                filters={filters}
              />
            </Box>
            {fetchingRecord ? (
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
            <Paper sx={{ mx: 2, mt: 1, p: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {record && filteredRows && filteredRows.length > 0 ? (
                      filteredRows.map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.ownerId}>
                          <TableCell sx={{ display: 'flex' }}>
                            <Typography variant="body2" m={1} color="textSecondary">
                              {row.ownerId}
                            </Typography>
                          </TableCell>
                          <TableCell>{row.code}</TableCell>
                          <TableCell>
                            <Chip
                              label={Number(row.usageCount) === 0 ? 'Not Used' : 'Used'}
                              sx={{
                                bgcolor: Number(row.usageCount) === 0 ? 'warning.main' : 'success.main',
                                color: Number(row.usageCount) === 0 ? 'warning.light' : 'success.light',
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            {new Date(Number(row.createdAt) / 1e6).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography variant="h6">No record available</Typography>
                        </TableCell>
                      </TableRow>
                    )}
                    {record && filteredRows && rowsPerPage - filteredRows.length > 0 && (
                      <TableRow
                        style={{
                          height: (53) * (rowsPerPage - filteredRows.length),
                        }}
                      >
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              {record && filteredRows && (
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredRows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </Paper>
            )}
          </Box>
        </Grid>
      </Grid>
    </PageContainer>

  );
};

export default Galleryr;
