import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "@mui/material";
// Tabler icons
import {
    IconCircle,
    IconChartLine,
    IconSend,
    IconHeart, IconPhone, IconUser
} from '@tabler/icons';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Chart from 'react-apexcharts';
import { QRCodeCanvas } from 'qrcode.react';
import { alpha, styled, useTheme } from "@mui/material/styles";
import ic from "ic0";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
// Use a strong secret key

import img1 from '../../../../../assets/images/profile/user-1.jpg';
import img2 from '../../../../../assets/images/profile/user-2.jpg';
import img3 from '../../../../../assets/images/profile/user-3.jpg';
import img4 from '../../../../../assets/images/profile/user-4.jpg';
import img5 from '../../../../../assets/images/profile/user-5.jpg';

const groupDetails = {
    name: "Tech Innovators Inc.",
    balances: [
        {
            currency: "ckBTC",
            amount: 1.715156,
            usd: 11193.91,
            change: 7.11,
        },
        {
            currency: "ckUSDC",
            amount: 25458,
            usd: 25458,
            change: -3.64,
        },
        {
            currency: "ICP",
            amount: 120,
            usd: 9512.4,
            change: 7.11,
        },
        {
            currency: "$COOWN",
            amount: 120,
            usd: 9512.4,
            change: 7.11,
        },
    ],
    isAdmin: true,
    users: [
        {
            name: "John Doe",
            avatarUrl:
                "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
            role: "Member",
            status: "Inactive",
            limitPerTransaction: 100,
            dailyLimitation: 1000,
            monthlyLimitation: 30000,
            limitationPercentage: 5,
        },
        {
            name: "Jane Smith",
            avatarUrl:
                "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
            role: "Admin",
            status: "Active",
            limitPerTransaction: 200,
            dailyLimitation: 2000,
            monthlyLimitation: 60000,
            limitationPercentage: 10,
        },
        {
            name: "Sam Wilson",
            avatarUrl:
                "https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg",
            role: "Moderator",
            status: "Pending",
            limitPerTransaction: 150,
            dailyLimitation: 1500,
            monthlyLimitation: 45000,
            limitationPercentage: 7,
        },
    ],
};

const StyledPaper = styled(Paper)(({ theme, selected }) => ({
    padding: "16px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: selected
        ? theme.palette.action.selected
        : theme.palette.background.paper,
    transition: "background-color 0.3s ease, maxHeight 0.3s ease",
    maxHeight: selected ? "250px" : "100px",
    overflow: "hidden",
    "&:hover": {
        backgroundColor: theme.palette.action.hover,
    },
}));

const Accounts = () => {
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

    const ckBTCColor = '#9C80FF';
    const USDColor = '#bdbdbd';

    const optionsareachart = {
        chart: {
            id: 'area-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            width: '2',
            curve: 'smooth',
        },
        colors: [ckBTCColor, USDColor],
        fill: {
            type: 'solid',
            opacity: 0,  // This removes the fill color under the line
        },
        xaxis: {
            type: 'datetime',
            categories: [
                '2018-09-19T00:00:00',
                '2018-09-19T01:30:00',
                '2018-09-19T02:30:00',
                '2018-09-19T03:30:00',
                '2018-09-19T04:30:00',
                '2018-09-19T05:30:00',
                '2018-09-19T06:30:00',
            ],
            labels: {
                show: true,
                format: 'MMM',
            },
        },
        yaxis: {
            opposite: false,
            labels: {
                show: true,
            },
            title: {
                text: 'ICP',
                style: {
                    color: '#adb0bb',
                    fontWeight: 600,
                },
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            offsetX: -10,
        },
        grid: {
            show: true,
            borderColor: '#e0e0e0',
            strokeDashArray: 5,
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };
    const seriesareachart = [
        {
            name: 'ckBTC',
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: 'Value in USD',
            data: [15, 30, 45, 55, 65, 75, 85],
        },
    ];





    return (
        <Box display="flex" flexDirection="column" gap="30px">
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card sx={{ background: 'linear-gradient(to right, #2A3547, #2A3547, #2A3547)', color: 'white' }} borderRadius="40px">
                            <CardContent>
                                <Box display="flex" justifyContent="start" alignItems="center" mb={2}>
                                    <Box>
                                        <Typography variant="h2">1.715156 USD</Typography>
                                        <Typography variant="body1" display="flex" alignItems="flex-start" >Estimated Total</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="flex-start" mt={10}>
                                    <Button variant="contained" sx={{ background: '#1A73E8', color: 'white' }} startIcon={<IconSend />}>
                                        Send
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <Box display="flex" justifyContent="space-between" mb={1}>
                                <Box display="flex" flexDirection="column" alignItems="start" mt={1}>
                                    <Typography variant="h3" display="flex" alignItems="flex-start">Receive funds</Typography>
                                    <Box display="flex" alignItems="center" justifyContent="center" mt={8} mb={3} position="relative">
                                        <Input
                                            placeholder="Network"
                                            style={{ width: 200, marginRight: 8 }}
                                            inputProps={{ 'aria-label': 'network' }}
                                        />
                                        <Typography variant="body2" style={{ position: 'absolute', right: 10 }}>IPC</Typography>
                                    </Box>
                                    <Button variant="contained" color="primary" style={{ marginTop: 10, width: '100%' }}>
                                        1A1zp1...DivfNa
                                    </Button>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <QRCodeCanvas value="1A1zp1eP5QGefi2DMPTfTL5SLmv7DivfNa" size={128} />
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={2} mb={2}>
                {groupDetails.balances.map((balance, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StyledPaper
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "7px",
                                justifyContent: "start",
                                alignItems: "start",
                                maxHeight: "unset",
                                width: "100%",
                            }}
                        >
                            <Typography variant="h6" color="text.primary">
                                {balance.currency}
                            </Typography>
                            <Typography variant="h2" color="text.secondary">
                                {balance.amount} {balance.symbol}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                style={{ fontSize: "16px", color: "gray" }}
                            >
                                {balance.usd} USD
                            </Typography>
                            <Chip
                                label={`${balance.change > 0 ? '+' : ''}${balance.change}%`}
                                color={balance.change > 0 ? 'success' : 'error'}
                                size="small" // Makes the chip smaller
                                sx={{
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    margin: '2px', // Adjust margin around the chip
                                }}
                            />
                        </StyledPaper>
                    </Grid>
                ))}
            </Grid>

            <Card title="Area Chart">
                <Box display="flex" flexDirection="column" alignItems="start" p={2}>
                    <Typography variant="h5" color="textSecondary">
                        Balance History
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1}>
                        <Typography variant="body1" color="textPrimary" mr={1}>
                            Overview of Profit
                        </Typography>
                    </Box>
                </Box>
                <Chart options={optionsareachart} series={seriesareachart} type="area" height="300px" />
            </Card>
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
            <Box mt={2}>
                <Typography variant="h5" gutterBottom>
                    Transaction history
                </Typography>
                <Box sx={{ backgroundColor: '#DFE5EF', p: 1, borderRadius: '8px', mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
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
                            }}
                        />
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                defaultValue="Status"
                                displayEmpty
                                sx={{
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                }}
                            >
                                <MenuItem value="Status">Status</MenuItem>
                                <MenuItem value="Complete">Complete</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Declined">Declined</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <Select
                                defaultValue="Filter"
                                displayEmpty
                                sx={{
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                }}
                            >
                                <MenuItem value="Filter">Filter</MenuItem>
                                <MenuItem value="Sent">Sent</MenuItem>
                                <MenuItem value="Received">Received</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 140 }}>
                            <Select
                                defaultValue="All time"
                                displayEmpty
                                sx={{
                                    height: '48px',
                                    fontSize: '16px',
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
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

            {/* <PaginationTable rows={rows} /> */}
        </Box>
    );
};

export default Accounts;
