import React from 'react';
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
} from '@mui/material';

const accountData = [
    { coin: 'USD', symbol: 'ckUSDC', balance: '155 458.20', usd: '155 458 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: usdc },
    { coin: 'Bitcoin', symbol: 'ckBTC', balance: '6.157813', usd: '388 721.18 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: btc },
    { coin: 'Gold', symbol: 'ckXAUt', balance: '79.15', usd: '209 453.85 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: xaut },
    { coin: 'ICP', symbol: 'Platform utility', balance: '9 453.20', usd: '78 270.84 USD', lastWeek: '+1700', lastMonth: '-5000', percentage: '-7.11%', icon: icp },
    { coin: '$COOWN', symbol: 'Product utility', balance: '79.15', usd: '209 453.85 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: coown },
    { coin: '? USD ?', symbol: '?USDC - Ethereum?', balance: '79.85', usd: '80 USD', lastWeek: '+1700', lastMonth: '+1700', percentage: '7.11%', icon: usdc },
];

const AccountBalance = () => {
    return (
        <Paper
            elevation={3}
            style={{
                marginBottom:'40px',
                padding:'20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box>
                <Typography variant="h6" gutterBottom>
                    Account balance
                </Typography>
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
                            {accountData.map((row) => (
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
                                        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {row.lastWeek}
                                                </Typography>
                                                <Chip
                                                    label={
                                                        <Box display="flex" alignItems="center" gap={0.5}>
                                                            <span style={{ display: 'inline-block', transform: row.lastMonth.startsWith('-') ? 'rotate(90deg)' : '' }}>
                                                                ➚ &nbsp;
                                                            </span>
                                                            <Typography sx={{ fontSize: '12px' }}>7.11%</Typography>
                                                        </Box>
                                                    }
                                                    sx={{
                                                        backgroundColor: row.lastMonth.startsWith('-') ? 'rgba(255,0,0,0.1)' : 'rgba(76,175,80,0.15)',
                                                        color: row.lastMonth.startsWith('-') ? 'error.main' : 'success.main',
                                                        borderRadius: '16px',

                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="textSecondary">
                                                {row.usd}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                                            <Box display="flex" alignItems="center" gap={1}>
                                                <Typography variant="body1" fontWeight="bold">
                                                    {row.lastWeek}
                                                </Typography>
                                                <Chip
                                                    label={
                                                        <Box display="flex" alignItems="center" gap={0.5}>
                                                            <span style={{ display: 'inline-block', transform: row.lastMonth.startsWith('-') ? 'rotate(90deg)' : '' }}>
                                                                ➚ &nbsp;
                                                            </span>
                                                            <Typography sx={{ fontSize: '12px' }}>7.11%</Typography>
                                                        </Box>
                                                    }
                                                    sx={{
                                                        backgroundColor: row.lastMonth.startsWith('-') ? 'rgba(255,0,0,0.1)' : 'rgba(76,175,80,0.15)',
                                                        color: row.lastMonth.startsWith('-') ? 'error.main' : 'success.main',
                                                        borderRadius: '16px',

                                                    }}
                                                />
                                            </Box>
                                            <Typography variant="body2" color="textSecondary">
                                                {row.usd}
                                            </Typography>
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

export default AccountBalance;
