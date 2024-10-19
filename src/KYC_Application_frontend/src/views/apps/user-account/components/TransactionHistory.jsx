import React from 'react';
import usdc from '../../../../assets/images/svgs/usdc pic.svg';
import xaut from '../../../../assets/images/svgs/XAUT.svg';
import btc from '../../../../assets/images/svgs/btc-pic.svg';
import coown from '../../../../assets/images/svgs/coown-pic.svg';
import icp from '../../../../assets/images/svgs/icp-pic.svg';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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
    useMediaQuery
} from "@mui/material";
import img1 from '../../../../assets/images/profile/user-1.jpg';
import img2 from '../../../../assets/images/profile/user-2.jpg';
import img3 from '../../../../assets/images/profile/user-3.jpg';
import img4 from '../../../../assets/images/profile/user-4.jpg';
import img5 from '../../../../assets/images/profile/user-5.jpg';

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
            avatar: img1,
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
            avatar: img2,
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
            avatar: img3,
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
            avatar: img4,
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
            avatar: img5,
            name: 'Sophia Davis'
        }
    }
];

const TransactionHistory = () => {
    return (
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
                <Typography variant="h5" gutterBottom>
                    Transaction history
                </Typography>
                <Box sx={{ backgroundColor: '#DFE5EF', p: 1, borderRadius: '8px', mb: 3 }}>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2}
                        flexWrap="wrap" // Allows wrapping for smaller screens
                        sx={{
                            flexDirection: {
                                xs: 'column', // Stack vertically on extra small screens (mobile)
                                sm: 'row', // Horizontal layout on small screens and above
                            },
                        }}
                    >
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
                                width: {
                                    xs: '100%', // Full width on small screens
                                    sm: 'auto', // Auto width on larger screens
                                },
                            }}
                        />
                        <FormControl sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                            <Select
                                defaultValue="Status"
                                displayEmpty
                                sx={{
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    width: '100%',
                                }}
                            >
                                <MenuItem value="Status">Status</MenuItem>
                                <MenuItem value="Complete">Complete</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Declined">Declined</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                            <Select
                                defaultValue="Filter"
                                displayEmpty
                                sx={{
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    width: '100%',
                                }}
                            >
                                <MenuItem value="Filter">Filter</MenuItem>
                                <MenuItem value="Sent">Sent</MenuItem>
                                <MenuItem value="Received">Received</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: { xs: '100%', sm: 140 } }}>
                            <Select
                                defaultValue="All time"
                                displayEmpty
                                sx={{
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    width: '100%',
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
        </Paper>
    );
};

export default TransactionHistory;
