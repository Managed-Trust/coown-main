import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
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
  Typography,
  Avatar,
  Stack,
  Button,
  Chip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconDotsVertical, IconPlus, IconCheck, IconX } from '@tabler/icons-react';

// Define static data for table
const EnhancedTableData = [
  {
    stakeholder: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    imgsrc: 'https://i.pravatar.cc/300?img=1', // Placeholder avatar image
    isSystemUser: true,
    designatedRole: 'Owner',
    shareholder: true,
    executiveManager: true,
    recordStatus: 'Accepted',
  },
  {
    stakeholder: 'Bob Smith',
    email: 'bob.smith@example.com',
    imgsrc: 'https://i.pravatar.cc/300?img=2',
    isSystemUser: false,
    designatedRole: 'Member',
    shareholder: false,
    executiveManager: false,
    recordStatus: 'Pending',
  },
  {
    stakeholder: 'Carol White',
    email: 'carol.white@example.com',
    imgsrc: 'https://i.pravatar.cc/300?img=3',
    isSystemUser: true,
    designatedRole: 'Viewer',
    shareholder: false,
    executiveManager: false,
    recordStatus: 'Rejected',
  },
  {
    stakeholder: 'David Lee',
    email: 'david.lee@example.com',
    imgsrc: 'https://i.pravatar.cc/300?img=4',
    isSystemUser: true,
    designatedRole: 'Admin',
    shareholder: true,
    executiveManager: true,
    recordStatus: 'Accepted',
  },
];

// Sorting and comparison functions
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
  { id: 'stakeholder', label: 'Stakeholder' },
  { id: 'isSystemUser', label: 'Is system user' },
  { id: 'designatedRole', label: 'Designated role' },
  { id: 'shareholder', label: 'Shareholder' },
  { id: 'executiveManager', label: 'Executive manager' },
  { id: 'recordStatus', label: 'Record status' },
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
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography variant="body1" fontWeight="600" color="textPrimary">
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

// Stakeholder Component
const Stakeholder = ({ groupId }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('stakeholder');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Box p={3}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight="600">
            Stakeholders
          </Typography>
          <Link to={`/group/${groupId}/add-stakeholder`}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<IconPlus />}
              sx={{ textTransform: 'none' }}
            >
              + Add stakeholder
            </Button>
          </Link>
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(EnhancedTableData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell>
                      <Stack spacing={2} direction="row" alignItems="center">
                        <Avatar
                          src={row.imgsrc}
                          alt={row.stakeholder}
                          sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                          }}
                        />
                        <Box>
                          <Typography variant="body2" fontWeight="600">
                            {row.stakeholder}
                          </Typography>
                          <Typography color="textSecondary" variant="body2">
                            {row.email}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {row.isSystemUser ? (
                        <IconCheck color="green" />
                      ) : (
                        <IconX color="red" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {row.designatedRole}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {row.shareholder ? (
                        <IconCheck color="green" />
                      ) : (
                        <IconX color="red" />
                      )}
                    </TableCell>
                    <TableCell>
                      {row.executiveManager ? (
                        <IconCheck color="green" />
                      ) : (
                        <IconX color="red" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.recordStatus}
                        color={getStatusColor(row.recordStatus)}
                        size="small"
                        sx={{ minWidth: 80, color: 'white' }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size="small">
                        <IconDotsVertical />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
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
          sx={{ '.MuiTablePagination-actions': { ml: 2 } }}
        />
      </Box>
    </Paper>
  );
};

export default Stakeholder;
