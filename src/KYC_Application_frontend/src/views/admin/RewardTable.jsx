import React, { useState, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Button,
    TablePagination,
    styled,
    IconButton,
    Collapse,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, CircularProgress
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '& td': {
        borderBottom: 'none',
    },
}));


const RewardTable = () => {
    const [page, setPage] = useState(0); // Current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
    const [rewards, setReward] = useState([]);
    const [cnloading, setCnLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openStates, setOpenStates] = useState({});
    const [approveState, setApproveState] = useState({});
    const [selectedTask, setSelectedTask] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [reason, setReason] = useState(null);
    const [renderState, setRenderState] = useState(false);

    const handleOpenDialog = (task, id) => {
        setSelectedTask(task);
        setSelectedId(id);
        setOpenDialog(true);
    };
    const toggleRow = (id) => {
        console.log('Toggling ID:', id, 'Current State:', openStates[id]);
        setOpenStates(prev => {
            const newState = { ...prev, [id]: !prev[id] };
            console.log('New State:', newState);
            return newState;
        });
    };

    const getData = async () => {
        setCnLoading(true);
        try {
            const response = await ledger.call("getAllRewardClaims");
            console.log("res", response);
            setReward(response);
        } catch (error) {
            console.log('error', error);
        }
        setCnLoading(false);
    }
    useEffect(() => {
        getData();
    }, [renderState]);
    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const handleApprove = async (id, task) => {
        const claimKey = `${id}:${task}`;
        setApproveState(prev => ({ ...prev, [claimKey]: true })); // Start loading

        try {
            const response = await ledger.call('approveRewardClaim', "", claimKey);
            if (response === 'Reward claim approved and tokens transferred successfully.') {
                swal('Approved', response, 'success');
            } else {
                swal(response, '', 'info');
            }
        } catch (error) {
            console.error('Error', error);
            swal('Error', 'Failed to approve reward claim.', 'error');
        }
        setRenderState(!renderState);
        setApproveState(prev => ({ ...prev, [claimKey]: false })); // End loading
    };

    const handleDecline = async () => {

        setLoading(true);
        const claim = `${selectedId}:${selectedTask}`
        console.log('params', claim);
        try {
            const response = await ledger.call('rejectRewardClaim', "", claim, reason);
            if (response.startsWith('Reward claim rejected with reason:')) {
                swal('Reward claim rejected', response, 'success');
            } else {
                swal(response, '', 'info')
            }
        } catch (error) {
            console.log('Error', error);
        }
        setRenderState(!renderState);
        setLoading(false);
        setOpenDialog(false);
        setSelectedId(null);
        setSelectedTask(null);
    }

    // Paginated data
    const paginatedData = rewards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (

        <>
            <Paper
                elevation={3}
                style={{
                    marginBottom: '40px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box mt={2}>
                    <Typography variant="h3" mb={2} fontSize="28px" fontWeight="600">
                        Social Rewards
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Task</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Proof</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Time</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Token Value</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Status</TableCell>
                                    <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rewards && rewards.length > 0 && paginatedData.map((row,index) => (
                                    <>
                                        <StyledTableRow key={index}>
                                            <TableCell sx={{ color: 'gray', fontSize: '14px', fontWeight: '400', display: 'flex', gap: '4px' }} >
                                                <IconButton size="small" onClick={() => toggleRow(index)}>
                                                    {openStates[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                                <Box>
                                                    <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                                                        {row.principal.slice(0, 6)}...${row.principal.slice(-4)}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '600' }}>{row.task}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        maxWidth: '160px',
                                                        color: 'gray',
                                                        fontSize: '14px',
                                                        fonrWeight: '400',
                                                    }}
                                                >
                                                    {row.proof}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'gray',
                                                        fontSize: '14px',
                                                        fonrWeight: '400',
                                                    }}
                                                >
                                                    {new Date(Number(row.timestamp) / 1_000_000).toLocaleString()}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ color: 'gray', fontSize: '14px', fontWeight: '400' }} align="center">  {Number(row.tokenValue)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    sx={{
                                                        borderRadius: '12px',
                                                        backgroundColor:
                                                            row.status === 'Approved' ? '#E6FFFA' :
                                                                row.status === 'Pending' ? '#FFF7E0' :
                                                                    '#FFE0E0',
                                                        color:
                                                            row.status === 'Approved' ? '#2B8A3E' :
                                                                row.status === 'Pending' ? '#E6A800' :
                                                                    '#E60000',
                                                        textTransform: 'none',
                                                        fontSize: '14px',
                                                        '&:hover': {
                                                            backgroundColor:
                                                                row.status === 'Approved' ? '#E6FFFA' :
                                                                    row.status === 'Pending' ? '#FFF7E0' :
                                                                        '#FFE0E0',
                                                        },
                                                    }}
                                                >
                                                    {row.status}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Box display="flex" justifyContent="flex-start">
                                                    {row.status ==='Pending' ?
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            style={{ marginRight: '10px' }}
                                                            onClick={() => handleApprove(row.principal, row.task)}
                                                            disabled={approveState[`${row.principal}:${row.task}`]} // Disable button while loading
                                                        >
                                                            {approveState[`${row.principal}:${row.task}`]
                                                                ? <CircularProgress color="inherit" size={24} />
                                                                : 'Approve'
                                                            }
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            sx={{ color: 'white' }}
                                                            onClick={() => handleOpenDialog(row.task, row.principal)}
                                                            style={{ backgroundColor: '#FF695E' }}
                                                        >
                                                            Decline
                                                        </Button>
                                                    </>
                                                    :  <>
                                                    <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor:
                                                            row.status === 'Approved' ? '#5d87ff' :
                                                                row.status === 'Pending' ? '#FFF7E0' :
                                                                    '#ff695e',
                                                        color:'#fff',                                                            
                                                        textTransform: 'none',
                                                        fontSize: '14px',
                                                    }}
                                                >
                                                   Already {row.status}
                                                </Button>
                                                    </>}
                                                </Box>
                                            </TableCell>
                                        </StyledTableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                <Collapse in={openStates[index]} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600, mb: 1, color: '#374151' }}>
                                                            Proof of Work
                                                        </Typography>
                                                        <Typography variant="subtitle1" gutterBottom component="div" sx={{ mb: 2, color: '#374151' }}>
                                                            {row.proof}
                                                        </Typography>
                                                        {row.img &&
                                                            <img src={`https://ipfs.io/ipfs/${row.img}`} alt="" />
                                                        }
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[3, 5, 10]}
                        component="div"
                        count={rewards.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </Paper>
            <Dialog open={openDialog}
                fullWidth PaperProps={{
                    sx: {
                        borderRadius: "15px",
                        p: 4,
                        maxWidth: "463px",
                    },
                }} onClose={() => setOpenDialog(false)}>
                <DialogTitle>    Reason to Deline</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" gutterBottom>
                        Task: {selectedTask}
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Describe the reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        sx={{
                            mt: 1,
                            "& .MuiOutlinedInput-root": { bgcolor: "#f8fafc" },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={() => setOpenDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDecline}
                        variant="contained"
                        sx={{ color: 'white' }}
                        style={{ backgroundColor: '#FF695E' }}
                    >
                        {loading ? <CircularProgress color="inherit" size={24} /> : "Decline"}
                    </Button>
                </DialogActions>
            </Dialog></>
    );
};

export default RewardTable;
