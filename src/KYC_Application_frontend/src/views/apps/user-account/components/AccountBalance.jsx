import React, { useState, useEffect } from 'react';
import usdc from '../../../../assets/images/svgs/usdc pic.svg';
import usdt from '../../../../assets/images/svgs/usdt.svg';
import xaut from '../../../../assets/images/svgs/GLDT.svg';
import btc from '../../../../assets/images/svgs/btc-pic.svg';
import coown from '../../../../assets/images/svgs/coown-pic.svg';
import icp from '../../../../assets/images/svgs/icp-pic.svg';
import dummy from '../../../../assets/images/svgs/dummyLogo.svg';
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
    CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Principal } from "@dfinity/principal";
import { useConnect } from "@connect2ic/react";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../../../declarations/Token";

const initialCurrencyData = [
    { coin: 'USD', symbol: 'ckusdc', balance: '0', usd: '0 USD', icon: usdt, isVisible: true },
    { coin: 'Bitcoin', symbol: 'ckbtc', balance: '0', usd: '0 USD', icon: btc, isVisible: true },
    { coin: 'Gold', symbol: 'ckxaut', balance: '0', usd: '0 USD', icon: xaut, isVisible: true },
    { coin: 'ICP', symbol: 'icp', balance: '0', usd: '0 USD', icon: icp, isVisible: true },
    // { coin: '$COOWN', symbol: 'Product utility', balance: '0', usd: '0 USD', icon: coown, isVisible: true },
    { coin: 'Ethereum', symbol: 'cketh', balance: '0', usd: '0 USD', icon: usdc, isVisible: true },
    { coin: 'Dummy', symbol: 'dummy', balance: '0', usd: '0 USD', icon: dummy, isVisible: true },
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
    const [to, setTo] = useState("");
    const [amount, setAmount] = useState("");
    const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
    const initAuthClient = async () => {
        const client = await AuthClient.create();
        if (await client.isAuthenticated()) {
            setIdentity(await client.getIdentity());
        }
    };
    const [loading, setLoading] = useState(false);

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
        console.log("Balances", updatedBalances);
        // Use `updatedBalances` to update `currencyData`
        const updatedCurrencyData = initialCurrencyData.map((currency) => {
            const balance = updatedBalances[currency.symbol.toLowerCase()] || 0;
            return {
                ...currency,
                balance: balance.toFixed(5),
                usd: `${(balance * 1).toFixed(5)} USD`, // Replace with actual USD conversion rate if needed
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


    const handleTokenSend = async (tokenType) => {
        if (!principal) return;

        setLoading(true);
        try {
            const canisterId = canisterIds[tokenType];
            if (!canisterId) {
                throw new Error(`Unsupported token type: ${tokenType}`);
            }

            const actor = createActor(canisterId, {
                agentOptions: { identity },
            });

            //   const actor = createActor(canisterId, {});
            await actor.icrc1_transfer({
                to: {
                    owner: Principal.fromText(to),
                    subaccount: [],
                },
                fee: [10000n],
                memo: [],
                from_subaccount: [],
                created_at_time: [],
                amount: BigInt(amount * 100000000), // Adjust for token decimals
            });
            alert("Transaction Successful");
            fetchAllBalances(); // Refresh balances
        } catch (error) {
            console.error("Transfer failed:", error);
            alert("Failed to transfer tokens.");
        } finally {
            setLoading(false);
            setTo("");
            setAmount("");
            handleClosePreviewDialog();
        }

    };


    const handleSend = (row) => setSendDialogData(row);
    const handleReceive = (row) => setReceiveDialogData(row);

    const handleCloseSendDialog = () => setSendDialogData(null);
    const handleCloseReceiveDialog = () => setReceiveDialogData(null);

    const handleClosePreviewDialog = () => setIsPreviewDialogOpen(false);

    // Function to handle clicking "Preview Transaction"
    const handlePreviewTransaction = () => {
        console.log("Data:", sendDialogData);
        // setSendDialogData(null); 
        setIsPreviewDialogOpen(true); // Open the preview dialog
    };

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
                                                sx={{
                                                    color: '#7C8FAC',
                                                    borderColor: '#DFE5EF',
                                                    '&:hover': {
                                                        color: '#FFFFFF', // Change text color to white
                                                        backgroundColor: '#7C8FAC', // Optional: Change background color
                                                        borderColor: '#7C8FAC', // Optional: Change border color
                                                    },
                                                }}
                                                onClick={() => handleReceive(row)}
                                                size="large"
                                            >
                                                Receive
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    color: '#7C8FAC',
                                                    borderColor: '#DFE5EF',
                                                    '&:hover': {
                                                        color: '#FFFFFF', // Change text color to white
                                                        backgroundColor: '#7C8FAC', // Optional: Change background color
                                                        borderColor: '#7C8FAC', // Optional: Change border color
                                                    },
                                                }}
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

            <Dialog open={!!sendDialogData} onClose={handleCloseSendDialog} fullWidth maxWidth="xs">
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold">
                            Send {sendDialogData?.symbol}
                        </Typography>
                        <IconButton onClick={handleCloseSendDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box display="flex" flexDirection="column" gap={3}>
                        {/* Recipient’s Address */}
                        <Box>
                            <Typography variant="subtitle2" color="#5A6A85" fontWeight="bold">
                                Recipient’s Address
                            </Typography>
                            <input
                                type="text"
                                placeholder="Address"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #DFE5EF',
                                    borderRadius: '8px',
                                    marginTop: '8px',
                                    fontSize: '14px',
                                    color: '#2A3547',
                                    outline: 'none',
                                }}
                            />
                        </Box>

                        {/* Network */}
                        <Box>
                            <Typography variant="subtitle2" color="#5A6A85" fontWeight="bold">
                                Network
                            </Typography>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '12px',
                                    border: '1px solid #DFE5EF',
                                    borderRadius: '8px',
                                    backgroundColor: '#F9FAFC',
                                    marginTop: '8px',
                                }}
                            >
                                <Typography color="#2A3547">Internet Computer</Typography>
                            </Box>
                        </Box>

                        {/* Select Recipient from Contacts */}
                        <Button
                            variant="outlined"
                            style={{
                                textTransform: 'none',
                                color: '#7C8FAC',
                                borderColor: '#DFE5EF',
                                padding: '10px 12px',
                                fontSize: '14px',
                            }}
                        >
                            Select recipient from contacts
                        </Button>

                        {/* Amount Input */}
                        <Box>
                            <Typography variant="subtitle2" color="#5A6A85" fontWeight="bold">
                                Select Amount
                            </Typography>

                            {/* Token Amount */}
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '1px solid #DFE5EF',
                                    borderRadius: '8px',
                                    marginTop: '8px',
                                    padding: '12px',
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="1 100"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    style={{
                                        width: '70%',
                                        fontSize: '14px',
                                        border: 'none',
                                        outline: 'none',
                                        color: '#2A3547',
                                    }}
                                />
                                <Typography style={{ fontSize: '14px', color: '#2A3547' }}>
                                    {sendDialogData?.symbol}
                                </Typography>
                            </Box>

                            {/* USD Amount */}
                            <Box
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    border: '1px solid #DFE5EF',
                                    borderRadius: '8px',
                                    marginTop: '8px',
                                    padding: '12px',
                                }}
                            >
                                <input
                                    type="text"
                                    placeholder="1 100"
                                    style={{
                                        width: '70%',
                                        fontSize: '14px',
                                        border: 'none',
                                        outline: 'none',
                                        color: '#2A3547',
                                    }}
                                />
                                <Typography style={{ fontSize: '14px', color: '#2A3547' }}>USD</Typography>
                            </Box>

                            {/* Exchange Rate */}
                            <Typography
                                variant="body2"
                                color="#5A6A85"
                                style={{ marginTop: '8px', fontSize: '12px' }}
                            >
                                1 {sendDialogData?.symbol} = 1 USD
                            </Typography>
                        </Box>

                        {/* Transaction Fee */}
                        <Typography
                            variant="body2"
                            color="#5A6A85"
                            style={{
                                fontSize: '12px',
                                textAlign: 'center',
                            }}
                        >
                            Fees: 0.0005 ICP per transaction
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions style={{ padding: '16px' }}>
                    <Button
                        variant="contained"
                        onClick={handlePreviewTransaction} // Open Preview Transaction Dialog
                        style={{
                            backgroundColor: '#4C6FFF',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            width: '100%',
                            padding: '12px',
                            fontSize: '16px',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                        }}
                    >
                        Preview Transaction
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isPreviewDialogOpen} onClose={handleClosePreviewDialog} fullWidth maxWidth="xs">
                <DialogTitle sx={{ pb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight="bold" color="#2A3547">
                            Send {sendDialogData?.symbol}
                        </Typography>
                        <IconButton onClick={handleClosePreviewDialog}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    <Typography variant="subtitle2" color="#5A6A85" sx={{ mt: 1 }}>
                        Confirm the transaction
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{ pt: 2 }}>
                    <Box display="flex" flexDirection="column" gap={3}>
                        {/* From Section */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <img
                                src="/images/logos/tech-logo-black.jpg"
                                alt="From Icon"
                                style={{ width: 40, height: 40 }}
                            />
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" color="#5A6A85">
                                    From
                                </Typography>
                                <Typography variant="body2" color="#2A3547">
                                    Tech Innovators
                                </Typography>
                            </Box>
                        </Box>

                        {/* To Section */}
                        <Box display="flex" alignItems="center" gap={2}>
                            <img
                                src="/images/logos/wallet.svg"
                                alt="To Icon"
                                style={{ width: 40, height: 40 }}
                            />
                            <Box>
                                <Typography variant="subtitle2" fontWeight="bold" color="#5A6A85">
                                    To
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="#2A3547"
                                    sx={{
                                        wordBreak: "break-word",
                                    }}
                                >
                                    {to}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Network Section */}
                        <Box>
                            <Typography variant="subtitle2" fontWeight="bold" color="#5A6A85">
                                Network
                            </Typography>
                            <Box
                                sx={{
                                    padding: "10px 12px",
                                    border: "1px solid #DFE5EF",
                                    borderRadius: "8px",
                                    backgroundColor: "#F9FAFC",
                                    mt: 1,
                                }}
                            >
                                <Typography variant="body2" color="#2A3547">
                                    Internet Computer
                                </Typography>
                            </Box>
                        </Box>

                        {/* Transaction Details */}
                        <Box
                            sx={{
                                padding: "12px",
                                border: "1px solid #DFE5EF",
                                borderRadius: "8px",
                                backgroundColor: "#F9FAFC",
                            }}
                        >
                            <Typography variant="subtitle2" fontWeight="bold" color="#5A6A85">
                                Total to be deducted
                            </Typography>
                            <Typography variant="body2" color="#2A3547">
                                {amount} {sendDialogData?.symbol}
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="bold" color="#5A6A85" sx={{ mt: 2 }}>
                                Received amount
                            </Typography>
                            <Typography variant="body2" color="#2A3547">
                                {amount} {sendDialogData?.symbol}
                            </Typography>
                            <Typography variant="subtitle2" fontWeight="bold" color="#5A6A85" sx={{ mt: 2 }}>
                                Received value
                            </Typography>
                            <Typography variant="body2" color="#2A3547">
                                {amount} USD
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ flexDirection: "column", gap: 2, px: 3, pb: 3 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => {
                            handleTokenSend(sendDialogData?.symbol); // Call the transaction function
                        }}
                        disabled={loading} // Disable button when loading
                        sx={{
                            backgroundColor: loading ? "#A5B4FC" : "#4C6FFF",
                            color: "#FFFFFF",
                            textTransform: "none",
                            fontSize: "16px",
                            borderRadius: "8px",
                            fontWeight: "bold",
                            py: 1.5,
                        }}
                    >
                        {loading ? (
                            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                <CircularProgress size={20} style={{ color: "#FFFFFF" }} /> Sending...
                            </Box>
                        ) : (
                            "Confirm and Send"
                        )}
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            setIsPreviewDialogOpen(false); // Close preview dialog
                            setSendDialogData(sendDialogData); // Reopen send dialog
                        }}
                        disabled={loading} // Disable "Back" button while loading
                        sx={{
                            textTransform: "none",
                            fontSize: "16px",
                            borderRadius: "8px",
                            color: "#4C6FFF",
                            borderColor: "#4C6FFF",
                            py: 1.5,
                        }}
                    >
                        Back
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
