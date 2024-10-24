import React, { useState } from 'react';
import usdc from '../../../../assets/images/svgs/usdc pic.svg';
import xaut from '../../../../assets/images/svgs/XAUT.svg';
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
    Chip,
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
import ListAltIcon from '@mui/icons-material/ListAlt'; // Import the List icon

const initialCurrencyData = [
    { coin: 'USD', symbol: 'ckUSDC', balance: '155 458.20', usd: '155 458 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: usdc, isVisible: true },
    { coin: 'Bitcoin', symbol: 'ckBTC', balance: '6.157813', usd: '388 721.18 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: btc, isVisible: true },
    { coin: 'Gold', symbol: 'ckXAUt', balance: '79.15', usd: '209 453.85 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: xaut, isVisible: true },
    { coin: 'ICP', symbol: 'Platform utility', balance: '9 453.20', usd: '78 270.84 USD', lastWeek: '+1700', lastMonth: '-5000', percentage: '-7.11%', icon: icp, isVisible: true },
    { coin: '$COOWN', symbol: 'Product utility', balance: '79.15', usd: '209 453.85 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: coown, isVisible: true },
    { coin: '? USD ?', symbol: '?USDC - Ethereum?', balance: '79.85', usd: '80 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: usdc, isVisible: true },
];

const AccountBalance = () => {
    const [currencyData, setCurrencyData] = useState(initialCurrencyData);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
            elevation={3}
            style={{
                marginBottom: '40px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>
                    Account balance
                </Typography>
                <Button 
                    variant="outlined" 
                    onClick={handleOpenDialog}
                    startIcon={<ListAltIcon />} // Add the icon here
                >
                    Manage List
                </Button>
            </Box>

            <TableContainer>
                <Table aria-label="account balance table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Coin</TableCell>
                            <TableCell>Balance</TableCell>
                            <TableCell align="center">Last week</TableCell>
                            <TableCell align="center">Last month</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currencyData
                            .filter((row) => row.isVisible)
                            .map((row, index) => (
                                <TableRow key={row.coin}>
                                    <TableCell component="th" scope="row">
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
                                        <Typography variant="body2" color="textSecondary">
                                            {row.usd}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip label={row.lastWeek} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Chip label={row.lastMonth} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Popup Dialog */}
            <Dialog 
                open={isDialogOpen} 
                onClose={handleCloseDialog}
                fullWidth
                maxWidth={isMobile ? 'xs' : 'md'} // Make it larger and responsive
                PaperProps={{ style: { padding: '20px', borderRadius: '12px' } }} // Style the dialog box
            >
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5" fontWeight="bold">
                            Select Currencies
                        </Typography>
                        <IconButton onClick={handleCloseDialog}>
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
                    <Button onClick={handleCloseDialog} variant="contained" color="primary">
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default AccountBalance;
