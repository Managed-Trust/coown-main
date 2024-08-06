import * as React from 'react';
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
  IconButton,
  Tooltip,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  MenuItem,
  Select,
  Grid
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconDotsVertical, IconFilter, IconSearch, IconTrash } from '@tabler/icons';

// Dummy data similar to your image for demonstration
const rows = [
  { id: '123456781', account: 'Operations Fund', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Received', date: '2024-08-15T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '1 USD', member: 'https://via.placeholder.com/150', role: 'Admin' },
  { id: '123456782', account: 'Research & Development Fund', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Received', date: '2024-08-14T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '5 USD', member: 'https://via.placeholder.com/150', role: 'Member' },
  { id: '123456783', account: 'Office daily needs', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Sent', date: '2024-08-13T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '8 USD', member: 'https://via.placeholder.com/150', role: 'Owner' },
  { id: '123456784', account: 'Marketing Budget', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Received', date: '2024-08-12T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '11 USD', member: 'https://via.placeholder.com/150', role: 'Admin' },
  { id: '123456785', account: 'Operations Fund', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Sent', date: '2024-08-11T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '10 USD', member: 'https://via.placeholder.com/150', role: 'Member' },
  { id: '123456786', account: 'Operations Fund', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Received', date: '2024-07-30T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '1 USD', member: 'https://via.placeholder.com/150', role: 'Admin' },
  { id: '123456787', account: 'Research & Development Fund', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Received', date: '2024-07-29T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '5 USD', member: 'https://via.placeholder.com/150', role: 'Member' },
  { id: '123456788', account: 'Office daily needs', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Sent', date: '2024-07-31T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '8 USD', member: 'https://via.placeholder.com/150', role: 'Owner' },
  { id: '123456789', account: 'Marketing Budget', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Received', date: '2024-07-07T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '11 USD', member: 'https://via.placeholder.com/150', role: 'Admin' },
  { id: '123456790', account: 'Operations Fund', amount: '0.0156 ckBTC', usd: '1,000 USD', type: 'Sent', date: '2024-07-06T17:46:00', counterparty: '1A1zP1...DivfNa', fees: '10 USD', member: 'https://via.placeholder.com/150', role: 'Member' },
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
        {['ID', 'Account', 'Amount', 'Type', 'Date and time', 'Counterparty', 'Fees', 'Member'].map((headCell) => (
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
    <Grid container spacing={2} sx={{ maxWidth: '800px', width: '100%' }}>
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
          value={filters.role}
          onChange={(e) => handleFilterChange('role', e.target.value)}
          size="small"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'white',
            },
          }}
        >
          <MenuItem value="All members">All members</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
          <MenuItem value="Owner">Owner</MenuItem>
          <MenuItem value="Member">Member</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={3}>
        <Select
          value={filters.type}
          onChange={(e) => handleFilterChange('type', e.target.value)}
          size="small"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              backgroundColor: 'white',
            },
          }}
        >
          <MenuItem value="All types">All types</MenuItem>
          <MenuItem value="Received">Received</MenuItem>
          <MenuItem value="Sent">Sent</MenuItem>
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

const TransactionHistory = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('ID');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState('');
  const [filters, setFilters] = React.useState({ role: 'All members', type: 'All types', time: 'All time' });
  const [filteredRows, setFilteredRows] = React.useState(rows);

  React.useEffect(() => {
    let filteredData = rows.filter((row) => row.id.toLowerCase().includes(search.toLowerCase()));

    if (filters.role !== 'All members') {
      filteredData = filteredData.filter((row) => row.role === filters.role);
    }

    if (filters.type !== 'All types') {
      filteredData = filteredData.filter((row) => row.type === filters.type);
    }

    if (filters.time !== 'All time') {
      filteredData = filteredData.filter((row) => {
        const date = parseISO(row.date);
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
  }, [search, filters]);

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
    <Box>
      
      <Typography variant="h3" mt={2} mb={2} display="flex" alignItems="flex-start" >Transaction History</Typography>
      <EnhancedTableToolbar
        search={search}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        filters={filters}
      />
      <Paper sx={{ mx: 2, mt: 1, p: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(filteredRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.account}</TableCell>
                      <TableCell>
                        {row.amount}
                        <Typography variant="body2" color="textSecondary">
                          {row.usd}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{
                            color:
                              row.type === 'Received'
                                ? 'success.main'
                                : 'info.main',
                          }}
                        >
                          {row.type}
                        </Typography>
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.counterparty}</TableCell>
                      <TableCell>{row.fees}</TableCell>
                      <TableCell>
                        <Avatar src={row.member} alt="member" />
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton size="small">
                            <IconDotsVertical size="1.1rem" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {rowsPerPage - filteredRows.length > 0 && (
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default TransactionHistory;
