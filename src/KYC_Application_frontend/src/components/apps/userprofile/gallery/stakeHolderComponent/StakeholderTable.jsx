import React, { useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Stack,
    TablePagination,
    Avatar,
    Checkbox,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';

const BlueCheckbox = styled(Checkbox)({
    color: '#1976d2',
    '&.Mui-checked': {
        color: '#1976d2',
    },
    '& .MuiSvgIcon-root': {
        borderRadius: '50%',
    },
});

const StakeholderTable = ({ groupId }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const rows = [
        { name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Owner', status: 'Accepted', systemUser: true, executive: true, board: true, shareholder: true, auditor: false },
        { name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Member', status: 'Accepted', systemUser: true, executive: false, board: false, shareholder: true, auditor: false },
        { name: 'Carol White', email: 'carol.white@example.com', role: 'Viewer', status: 'Pending', systemUser: true, executive: true, board: false, shareholder: true, auditor: true },
        { name: 'David Lee', email: 'david.lee@example.com', role: 'Admin', status: 'Rejected', systemUser: true, executive: true, board: true, shareholder: true, auditor: false },
    ];

    const statusColors = {
        Accepted: 'success.main',
        Pending: 'warning.main',
        Rejected: 'error.main',
    };

    return (
        <Paper variant="outlined">
            <Box p={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="600">
                        Stakeholders
                    </Typography>
                    <Link to={`/group/${groupId}/add-stakeholder`}> <Button variant="contained" color="primary">
                        + Add stakeholder
                    </Button></Link>
                </Stack>

                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell>Stakeholder</TableCell>
                                <TableCell>Is system user</TableCell>
                                <TableCell>Designated role</TableCell>
                                <TableCell>Executive Manager</TableCell>
                                <TableCell>Board of Directors</TableCell>
                                <TableCell>Shareholder</TableCell>
                                <TableCell>Auditor</TableCell>
                                <TableCell>Record status</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={row.name} src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                                            <Box>
                                                <Typography fontWeight="bold">{row.name}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {row.email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <BlueCheckbox checked={row.systemUser} disabled />
                                    </TableCell>
                                    <TableCell>{row.role}</TableCell>
                                    <TableCell>
                                        <BlueCheckbox checked={row.executive} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <BlueCheckbox checked={row.board} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <BlueCheckbox checked={row.shareholder} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <BlueCheckbox checked={row.auditor} disabled />
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: statusColors[row.status],
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {row.status}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={handleMenuClick}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                                            <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Paper>
    );
};

export default StakeholderTable;
