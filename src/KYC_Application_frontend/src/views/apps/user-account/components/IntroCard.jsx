import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import lefticon from '../../../../assets/images/svgs/lefticon.svg';
import righticon from '../../../../assets/images/svgs/RightIcon.svg';
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

const IntroCard = () => {
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box display="flex" flexDirection="column" gap="30px" pt={2} mb={2}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card
                        sx={{
                            background: 'linear-gradient(135deg, #1C2944, #314f7b)', // Adjust the gradient colors to match the design
                            color: 'white',
                            borderRadius: '13px', // Adjust the border radius as needed
                            padding: 1, // Add padding for consistent spacing
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' // Add subtle shadow if needed
                        }}
                    >
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                <Box>
                                    <Typography variant="h2">100 556 USD</Typography>
                                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" fontSize="14px" mt={0.5}>Estimated total</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="flex-start" mt={6}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        background: '#1A73E8',
                                        color: 'white',
                                        textTransform: 'none',
                                        padding: '8px 16px',
                                        borderRadius: '5px'
                                    }}
                                    startIcon={<IconSend />}
                                >
                                    Send
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box
                            display="flex"
                            flexDirection={isMobile ? 'column' : 'row'}
                            justifyContent="space-between"
                            mb={1}
                            width="100%"
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems={isMobile ? 'center' : 'start'}
                                mt={1}
                                width={isMobile ? '100%' : '65%'}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6" color="textPrimary">
                                            Receive funds
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            Personal account
                                        </Typography>
                                    </Grid><Grid item xs={6} display="flex" alignItems='end' justifyContent='flex-end'>
                                        <img src={lefticon} alt="" />
                                        <img src={righticon} alt="" />
                                    </Grid>
                                </Grid>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    mt={8}
                                    p={1}
                                    bgcolor="#f7f9fc"
                                    borderRadius={1}
                                    width="100%"
                                >
                                    <Typography
                                        variant="body2"
                                        color="#7C8FAC"
                                        fontSize="14px"
                                        style={{ marginLeft: 8 }}
                                    >
                                        Network
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        fontWeight="bold"
                                        style={{ marginRight: 16 }}
                                    >
                                        ICP
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 10, width: '100%' }}
                                >
                                    1A1zp1...DivfNa
                                </Button>
                            </Box>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                width={isMobile ? '100%' : '25%'}
                                mt={isMobile ? 2 : 0} // Adjust margin for spacing on mobile
                            >
                                <QRCodeCanvas value="1A1zp1eP5QGefi2DMPTfTL5SLmv7DivfNa" size={128} />
                            </Box>
                        </Box>
                    </Card>
                </Grid>
            </Grid>


        </Box>
    );
};

export default IntroCard;
