import React, { useState, useEffect } from 'react';
import usdc from '../../../../assets/images/svgs/usdc pic.svg';
import usdt from '../../../../assets/images/svgs/usdt.svg';
import xaut from '../../../../assets/images/svgs/GLDT.svg';
import btc from '../../../../assets/images/svgs/btc-pic.svg';
import coown from '../../../../assets/images/svgs/coown-pic.svg';
import icp from '../../../../assets/images/svgs/icp-pic.svg';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Switch,
    IconButton,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Principal } from "@dfinity/principal";
import { useConnect } from "@connect2ic/react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../../../declarations/Token";

const initialCurrencyData = [
    { coin: 'USD', symbol: 'ckUSDC', balance: '0', usd: '0 USD', icon: usdt, isVisible: true },
    { coin: 'Bitcoin', symbol: 'ckBTC', balance: '0', usd: '0 USD', icon: btc, isVisible: true },
    { coin: 'Gold', symbol: 'ckXAUt', balance: '0', usd: '0 USD', icon: xaut, isVisible: true },
    { coin: 'ICP', symbol: 'Platform utility', balance: '0', usd: '0 USD', icon: icp, isVisible: true },
    { coin: '$COOWN', symbol: 'Product utility', balance: '0', usd: '0 USD', icon: coown, isVisible: true },
    { coin: 'Ethereum', symbol: 'ckETH', balance: '0', usd: '0 USD', icon: usdc, isVisible: true },
];

const canisterIds = {
    icp: "ryjl3-tyaaa-aaaaa-aaaba-cai",
    dummy: "qtpy4-kqaaa-aaaap-antha-cai",
    ckbtc: "mxzaz-hqaaa-aaaar-qaada-cai",
    cketh: "ss2fx-dyaaa-aaaar-qacoq-cai",
    ckusdc: "xevnm-gaaaa-aaaar-qafnq-cai",
    ckxaut: "nza5v-qaaaa-aaaar-qahzq-cai",
};

const AccountBalance = () => {
    const [currencyData, setCurrencyData] = useState(initialCurrencyData);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [sendDialogData, setSendDialogData] = useState(null);
    const [receiveDialogData, setReceiveDialogData] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [balances, setBalances] = useState({});
    const [identity, setIdentity] = useState(null);
    const { isConnected, principal, disconnect } = useConnect();

    const initAuthClient = async () => {
        const client = await AuthClient.create();
        if (await client.isAuthenticated()) {
            setIdentity(await client.getIdentity());
        }
    };


    const fetchBalances = async () => {
        if (!principal) return;

        const updatedBalances = {};
        for (const [symbol, canisterId] of Object.entries(canisterIds)) {
            try {
                const actor = createActor(canisterId, {});
                const balance = await actor.icrc1_balance_of({
                    owner: Principal.fromText(principal),
                    subaccount: [],
                });
                updatedBalances[symbol.toLowerCase()] = Number(balance) / 100000000;
            } catch (error) {
                console.error(`Error fetching balance for ${symbol}:`, error);
                updatedBalances[symbol.toLowerCase()] = 0;
            }
        }

        // Update the state
        setBalances(updatedBalances);

        // Use `updatedBalances` to update `currencyData`
        const updatedCurrencyData = initialCurrencyData.map((currency) => {
            const balance = updatedBalances[currency.symbol.toLowerCase()] || 0;
            return {
                ...currency,
                balance: balance.toFixed(2),
                usd: `${(balance * 1).toFixed(2)} USD`, // Replace with actual USD conversion rate if needed
            };
        });

        console.log("Currency Data", updatedCurrencyData);

        setCurrencyData(updatedCurrencyData);
    };


    useEffect(() => {
        initAuthClient();
        if (isConnected) {
            fetchBalances();
        }
    }, [isConnected]);

    const handleSend = (row) => setSendDialogData(row);
    const handleReceive = (row) => setReceiveDialogData(row);

    const handleCloseSendDialog = () => setSendDialogData(null);
    const handleCloseReceiveDialog = () => setReceiveDialogData(null);
    const handleToggleVisibility = (index) => {
        const updatedData = [...currencyData];
        updatedData[index].isVisible = !updatedData[index].isVisible;
        setCurrencyData(updatedData);
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    return (
        <Paper
            style={{
                marginBottom: '40px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                marginTop: '40px',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
                    <Typography variant="h5" fontSize="16px" fontWeight="500" color="#5A6A85">
                        Estimated Total
                    </Typography>
                    <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
                        <Typography variant="h2" fontSize="44px" fontWeight="500" color="#2A3547">
                            100,567
                        </Typography>
                        <Typography variant="h5" fontSize="18px" fontWeight="600" color="#2A3547">
                            USD
                        </Typography>
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => setDialogOpen(true)}
                    startIcon={<ListAltIcon />}
                >
                    Manage List
                </Button>
            </Box>

            <TableContainer>
                <Table aria-label="account balance table">
                    <TableHead>
                        <TableRow>
                            <TableCell color="#7C8FAC" style={{ fontSize: '14px', fontWeight: '500' }}>Coin</TableCell>
                            <TableCell color="#7C8FAC" style={{ fontSize: '14px', fontWeight: '500' }}>Balance</TableCell>
                            <TableCell color="#7C8FAC" style={{ fontSize: '14px', fontWeight: '500' }}>Estimated Value</TableCell>
                            <TableCell color="#7C8FAC" style={{ fontSize: '14px', fontWeight: '500' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currencyData
                            .filter((row) => row.isVisible)
                            .map((row) => (
                                <TableRow key={row.coin}>
                                    <TableCell>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <img src={row.icon} alt={row.coin} />
                                            <Box>
                                                <Typography variant="h6">{row.coin}</Typography>
                                                <Typography variant="body2" color="textSecondary">
                                                    {row.symbol}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6" fontWeight="bold">
                                            {row.balance}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" color="#5A6A85">
                                            {row.usd}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Box display="flex" gap={1}>
                                            <Button
                                                variant="outlined"
                                                style={{ color: '#7C8FAC', borderColor: '#DFE5EF' }}
                                                onClick={() => handleReceive(row)}
                                                size="large"
                                            >
                                                Receive
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                style={{ color: '#7C8FAC', borderColor: '#DFE5EF' }}
                                                onClick={() => handleSend(row)}
                                                size="large"
                                            >
                                                Send
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Send Dialog */}
            <Dialog open={!!sendDialogData} onClose={handleCloseSendDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Send {sendDialogData?.coin}</Typography>
                        <IconButton onClick={handleCloseSendDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>Send functionality for {sendDialogData?.coin}.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSendDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Receive Dialog */}
            <Dialog open={!!receiveDialogData} onClose={handleCloseReceiveDialog} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Receive {receiveDialogData?.coin}</Typography>
                        <IconButton onClick={handleCloseReceiveDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography>Receive functionality for {receiveDialogData?.coin}.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReceiveDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Manage List Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth={isMobile ? 'xs' : 'md'}>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" fontWeight="bold">
                            Select Currencies
                        </Typography>
                        <IconButton onClick={() => setDialogOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    {currencyData.map((row, index) => (
                        <Box
                            key={row.coin}
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                            mb={2}
                            p={1}
                            sx={{
                                borderRadius: '8px',
                                backgroundColor: '#f9f9f9',
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={2}>
                                <img src={row.icon} alt={row.coin} width="30" />
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="500">{row.coin}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {row.balance} USD
                                    </Typography>
                                </Box>
                            </Box>
                            <Switch
                                checked={row.isVisible}
                                onChange={() => handleToggleVisibility(index)}
                                color="primary"
                            />
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} variant="contained" color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default AccountBalance;
