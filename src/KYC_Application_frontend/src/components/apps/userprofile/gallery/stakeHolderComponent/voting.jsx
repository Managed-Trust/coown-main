import * as React from 'react';
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
    Paper,
    Button,
    Typography,
    Stack,
    Select,
    MenuItem,
} from '@mui/material';

const Voting = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filter, setFilter] = useState('all');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setPage(0); // Reset to the first page when filter changes
    };

    const rows = [
        { name: 'Leading text', startedAt: '15.08.2024 17:46', timeLeft: '2d 23h 37m', votes: '70% / 30%', participated: '25%', status: 'Vote' },
        { name: 'Leading text', startedAt: '15.08.2024 17:46', timeLeft: '2d 17h 37m', votes: '70% / 30%', participated: '25%', status: 'Decline' },
        { name: 'Leading text', startedAt: '15.08.2024 17:46', timeLeft: '1d 5h 17m', votes: '70% / 30%', participated: '35%', status: 'Approve' },
        { name: 'Leading text', startedAt: '15.08.2024 17:46', timeLeft: '15h 43m', votes: '70% / 30%', participated: '65%', status: 'Approve' },
    ];

    // Filter rows based on selected filter value
    const filteredRows = rows.filter((row) => {
        if (filter === 'active') {
            return row.status === 'Vote'; // Show only rows with status 'Vote' when 'Active votings' is selected
        }else if(filter ==='closed'){
            return row.status !=='Vote';
        }
        else{
            return true;
        }
    });

    return (
        <Paper variant="outlined">
            <Box p={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight="600">
                        Voting
                    </Typography>
                    <Select
                        variant="outlined"
                        value={filter}
                        onChange={handleFilterChange}
                        size="small"
                        sx={{ minWidth: 150 }}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="active">Active votings</MenuItem>
                        <MenuItem value="closed">Closed votings</MenuItem>
                    </Select>
                </Stack>

                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                        <TableHead>
                            <TableRow>
                                <TableCell>Voting Name</TableCell>
                                <TableCell>Started at</TableCell>
                                <TableCell>Time Left</TableCell>
                                <TableCell>Votes</TableCell>
                                <TableCell>Participated</TableCell>
                                <TableCell>Your Vote</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow hover key={index}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.startedAt}</TableCell>
                                    <TableCell>{row.timeLeft}</TableCell>
                                    <TableCell>{row.votes}</TableCell>
                                    <TableCell>{row.participated}</TableCell>
                                    <TableCell>
                                        {row.status === 'Vote' ? (
                                           <></>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color={row.status === 'Approve' ? 'success' : 'error'}
                                                size="small"
                                            >
                                                {row.status}
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {row.status === 'Vote' ? (
                                            <Button variant="contained" color="primary" size="small">
                                                {row.status}
                                            </Button>
                                        ) : (
                                            <Button variant="text" size="small">View</Button>
                                        )}
                                        
                                    </TableCell>
                                </TableRow>
                            ))}
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
        </Paper>
    );
};

export default Voting;
