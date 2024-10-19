import React from 'react';


import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import img1 from '../../../../assets/images/profile/user-1.jpg';
import img2 from '../../../../assets/images/profile/user-2.jpg';
import img3 from '../../../../assets/images/profile/user-3.jpg';
import img4 from '../../../../assets/images/profile/user-4.jpg';
import img5 from '../../../../assets/images/profile/user-5.jpg';
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

const rows = [
    {
        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img1,
        customer: 'Sunil Joshi',
    },
    {
        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img2,
        customer: 'John Deo',
    },
    {

        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img3,
        customer: 'Mily Peter'
    },
    {

        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img4,
        customer: 'Andrew McDownland'
    },
    {

        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img5,
        customer: 'Christopher Jamil'
    },
    {
        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img2,
        customer: 'John Deo'
    },
    {

        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img3,
        customer: 'Mily Peter'
    },
    {

        id: '123456781',
        amount: '0.0156 ckBTC',
        usd: '1,000 USD',
        date: '15.08.2024 17:46',
        counterparty: '1A1zP1...DivfNa',
        imgsrc: img4,
        customer: 'Andrew McDownland'
    },
];

const PendingMember = () => {
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
                    Pending Member Transaction
                </Typography>
                <TableContainer component={Paper} sx={{ borderRadius: '12px' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Amount</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Date and time</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Counterparty</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', fontSize: '16px', color: 'gray' }}>Member</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <Typography sx={{ color: 'gray' }} variant="h6" fontWeight="400">
                                            {row.id}
                                        </Typography>
                                    </TableCell>

                                    <TableCell>
                                        <Typography variant="h6" >   {row.amount}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'gray' }}>
                                            {row.usd}
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ color: 'gray', fontSize: '16px' }}>{row.date}</TableCell>
                                    <TableCell>
                                        <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                            {row.counterparty}
                                        </Typography>
                                        <ContentCopyIcon fontSize="small" />
                                    </TableCell>

                                    <TableCell>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar
                                                src={row.imgsrc}
                                                alt={row.imgsrc}
                                                width="30"
                                            />
                                            <Typography variant="h6" fontWeight="600">
                                                {row.customer}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="flex-start">
                                            <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                                Approve
                                            </Button>
                                            <Button className="btn-decline" variant="contained" sx={{ color: 'white', backgroundColor: 'red' }}>
                                                Reject
                                            </Button>
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

export default PendingMember;
