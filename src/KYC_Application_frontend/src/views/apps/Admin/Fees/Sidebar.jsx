import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Switch,
  TextField,
  Drawer,
  Fab,
  Tooltip,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/system';
import { IconX, IconSettings } from '@tabler/icons';
import Scrollbar from '../../../../components/custom-scroll/Scrollbar';

const SidebarWidth = '420px';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: 'none',
  padding: theme.spacing(1, 2),
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.action.hover,
    fontWeight: 'bold',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Sidebar = ({ openDrawer, drawer,transaction }) => {
  return (
    <div>
      {/* Floating Button to Open Sidebar */}
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={() => openDrawer(null)}// Open the drawer
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => openDrawer(null)} // Close the drawer
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {transaction && (
        <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
          <Box px={3} pt={3} display="flex" justifyContent={'space-between'} alignItems="start" mt={3}>
            <Typography variant="h4">{transaction.ruleName}</Typography>
            <IconButton color="inherit" onClick={() => openDrawer(null)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Typography variant="subtitle1" gutterBottom px={3} pt={1}>
            <Chip
              label={`${transaction.totalFees}` + ' xBTC'}
              style={{
                backgroundColor: '#F4EFFF', color: '#9C80FF'
              }}
              sx={{
                fontWeight: '400',
                fontSize: '0.9rem',
                padding: '0 6px',
                height: '32px',
              }}
            />
          </Typography>
          {/* Sidebar Content */}
          <Box sx={{ maxWidth: 600, margin: 'auto', p: 3 }}>

            <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell colSpan={2}>
                      <Typography variant="h6">Rules</Typography>
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Operator acceptance</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.operatorAcceptance[0]}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Sending areas</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>All</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}></StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px'}}>Except {transaction.sendingAreas.flat().join(', ')}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Withdrawal/crypto</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.withdrawalCrypto[0] ?"Allowed":'Not Allowed'}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Receiving areas</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>All</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}></StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px'}}> Except {transaction.receivingAreas.flat().join(', ')}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Receiving industry</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.receivingIndustry[0]}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>$ amount range</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>${transaction.amountRange[0]}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Foundation fees
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Fee per transaction</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.foundationFees[0].feePerTransaction} xBTC</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Revenue Allocation Group Name</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}> {transaction.foundationFees[0].allocationGroup}</StyledTableCell>
                  </StyledTableRow>                  
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom>
            Staking fees 
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Fee per transaction</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.stakingFees[0].feePerTransaction} xBTC</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Revenue Allocation Group Name</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}> {transaction.stakingFees[0].allocationGroup}</StyledTableCell>
                  </StyledTableRow>                  
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom>
            Operator  fees
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Fee per transaction</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.operatorFees[0].feePerTransaction} xBTC</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Revenue Allocation Group Name</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}> {transaction.operatorFees[0].allocationGroup}</StyledTableCell>
                  </StyledTableRow>                  
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h6" gutterBottom>
            Third party fees
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ mb: 3 }}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Fee per transaction</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.thirdPartyFees[0].feePerTransaction} xBTC</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Revenue Allocation Group Name</StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}> {transaction.thirdPartyFees[0].allocationGroup}</StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell style={{ fontSize:'14px',color:'#5A6A85'}}>Third  party identifier mail </StyledTableCell>
                    <StyledTableCell style={{ fontSize:'14px',fontWeight:'700'}}>{transaction.thirdPartyFees[0].thirdPartyIdentifier} xBTC</StyledTableCell>
                  </StyledTableRow>                  
                </TableBody>
              </Table>
            </TableContainer>

            {/* Add Operator and Third Party Fees sections as necessary */}
          </Box>
        </Scrollbar>
        )}
      </Drawer>
    </div>
  );
};

export default Sidebar;
