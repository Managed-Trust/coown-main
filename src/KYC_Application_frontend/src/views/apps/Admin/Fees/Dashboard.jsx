import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Button,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTransactionFee from './AddTransactionFee';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& td': {
    borderBottom: 'none',
  },
}));

export default function Dashboard({ openDrawer,transactionRules }) {
  const [showForm, setShowForm] = useState(false);

  const deleteTransactionRule = async (id) => {
    try {
      const response = await ledger.call('deleteTransactionRule', id);
      console.log('Transaction Rule Deleted:', response);
      setTransactionRule(transactionRule.filter((rule) => rule.id !== id));

    } catch (e) {
      console.log('Error deleting Transaction Rule:', e);
    }
  }
  return (
    <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      {showForm ? (
        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                Add Transaction rules
              </Typography>
            </Box>
            <Button
              onClick={() => setShowForm(false)}
              variant="outlined"
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#5d87ff',
                },
                boxShadow: 'none',
                padding: '8px 16px',
              }}
            >
              Back
            </Button>
          </Box>
          <AddTransactionFee onFormShow={setShowForm} />
        </Box>
      ) : (
        <>
          <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
            <Box>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                Standard transaction rules
              </Typography>
            </Box>
            <Button
              onClick={() => setShowForm(true)}
              variant="outlined"
              startIcon={<AddIcon />}
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#5d87ff',
                },
                boxShadow: 'none',
                padding: '8px 16px',
              }}
            >
              Add Transaction Rules
            </Button>
          </Box>


          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>ID</TableCell>
                  <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Rule Name</TableCell>
                  <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Total Fees</TableCell>
                  <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Asset Type</TableCell>
                  <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Operator Acceptance</TableCell>
                  <TableCell align="right" sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionRules && transactionRules.map((row) => (

                  <StyledTableRow>
                    <TableCell sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                          {row.id}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#1e293b', fontWeight: '500', fontSize: '14px' }}>{row.ruleName}</TableCell>
                    <TableCell sx={{ color: '#1e293b' }}>{row.totalFees}</TableCell>
                    <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
                      {row.assetType}
                    </TableCell>
                    <TableCell sx={{ color: '#1e293b' }}>{row.operatorAcceptance[0]}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                      // onClick={() => deleteTransactionRule(row.id)} 
                      size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}  onClick={() => openDrawer(row)}>
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
