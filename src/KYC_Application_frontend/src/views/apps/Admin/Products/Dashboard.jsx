import React, { useState } from 'react';
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
  Button,
  Paper,
  styled,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddIcon from '@mui/icons-material/Add';
import AddProduct from './AddProduct';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& td': {
    borderBottom: 'none',
  },
}));

const affiliatesData = [
  {
    rule_name: 'Send unlimited wrapped USD to anyone',
    totalFees: '$500',
    asset_type: 'Regional Operator',
    operator_acceptance: 'Any',
    subRows: [],
  },
  {
    rule_name: 'Send unlimited wrapped bitcoin to a system user',
    totalFees: '$3600',
    asset_type: 'Regional Operator',
    operator_acceptance: 'Any',
    subRows: [],
  },
  {
    rule_name: 'Send unlimited wrapped bitcoin to an unknown user',
    totalFees: '$0',
    asset_type: 'Regional Operator',
    operator_acceptance: 'dApp',
    subRows: [],
  },
  {
    rule_name: 'Send up to 1,000 € worth of ckBTC to a known user',
    totalFees: '$0',
    asset_type: 'Regional Operator',
    operator_acceptance: 'dApp',
    subRows: [],
  },
  {
    rule_name: 'Send more than 10,000 € worth of ckBTC to a known user',
    totalFees: '$0',
    asset_type: 'Regional Operator',
    operator_acceptance: 'dApp',
    subRows: [],
  },
  {
    rule_name: 'Sending ICP',
    totalFees: '$19',
    asset_type: 'DAO',
    operator_acceptance: 'dApp',
    subRows: [],
  },
  {
    rule_name: 'Send $COOWN',
    totalFees: '$169',
    asset_type: 'DAO',
    operator_acceptance: 'dApp',
    subRows: [],
  },
  {
    rule_name: 'Send custom NFT',
    totalFees: '$680',
    asset_type: 'DAO',
    operator_acceptance: 'dApp',
    subRows: [],
  },
  {
    rule_name: 'Sent to DEX where we get kick',
    totalFees: '0.000001 ckBTC',
    asset_type: 'DAO',
    operator_acceptance: 'dApp',
    subRows: [],
  },
];

const newTableData = [
  {
    product_name: 'Up to 3 hours custom training',
    price: '$72 USD GB/year',
    product_owner: 'Regional Operator',
    sales_channel: 'Any',
  },
  {
    product_name: 'Up to 32 hours config. support',
    price: '$72 USD GB/year',
    product_owner: 'Regional Operator',
    sales_channel: 'Any',
  },
  {
    product_name: 'Legal review for custom NFT minting',
    price: '$400/h',
    product_owner: 'Regional Operator',
    sales_channel: 'Coming soon',
  },
  {
    product_name: 'NFT minting',
    price: '$2400',
    product_owner: 'Developer',
    sales_channel: 'Coming soon',
  },
  {
    product_name: 'Whitelabel License',
    price: '$tbd',
    product_owner: 'IPHolder',
    sales_channel: 'Foundation',
  },
  {
    product_name: 'Set-up payment gateway / POS',
    price: '$169',
    product_owner: 'Developer',
    sales_channel: 'Ticket',
  },
];


function NewTableRow({ row }) {
  return (
    <StyledTableRow>
      <TableCell sx={{ color: '#1e293b', fontWeight: '500', fontSize: '14px' }}>{row.product_name}</TableCell>
      <TableCell sx={{ color: '#7C8FAC', fontSize: '14px' }}>{row.price}</TableCell>
      <TableCell sx={{ color: '#7C8FAC', fontSize: '14px' }}>{row.product_owner}</TableCell>
      <TableCell sx={{ color: '#7C8FAC', fontSize: '14px' }}>{row.sales_channel}</TableCell>
      <TableCell align="right">
        <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </StyledTableRow>
  );
}


function Row({ row, openDrawer }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow>
        <TableCell sx={{ color: '#1e293b', fontWeight: '500', fontSize: '14px', fontWeight: 'bold' }}>{row.rule_name}</TableCell>
        <TableCell sx={{ color: '#7C8FAC', fontSize: '14px' }}>{row.totalFees}</TableCell>
        <TableCell sx={{ color: '#7C8FAC', fontSize: '14px', display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.asset_type}
        </TableCell>
        <TableCell sx={{ color: '#7C8FAC', fontSize: '14px' }}>{row.operator_acceptance}</TableCell>
        <TableCell align="right">
          <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }} onClick={openDrawer}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </StyledTableRow>
    </>
  );
}

export default function Dashboard({ openDrawer, products }) {
  const [showForm, setShowForm] = useState(false);
  return (

    <>
      {showForm ?
        <>
          <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Box sx={{ p: 3 }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                    Add Product
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
              <AddProduct onFormShow={setShowForm} />
            </Box>
          </Box>
        </> :
        <>
          <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>

            <Box sx={{ px: 3, pt: 3, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                Products and Services distributed by Regional Operators
              </Typography>
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
                Add Product
              </Button>
            </Box>

            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                  <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Product ID</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Product Name</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Price</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Product Owner</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Sales channel</TableCell>
                    <TableCell align="right" sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products && products.map((row) => (
                    <StyledTableRow>
                      <TableCell sx={{ color: '#1e293b', fontWeight: '500', fontSize: '14px' }}>{row.id}</TableCell>
                      <TableCell sx={{ color: '#1e293b', fontWeight: '500', fontSize: '14px' }}>{row.name}</TableCell>
                      <TableCell sx={{ color: '#1e293b' }}>$ {Number(row.price)}</TableCell>
                      <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
                        {row.productOwner}
                      </TableCell>
                      <TableCell sx={{ color: '#1e293b' }}>{row.salesChannel}</TableCell>
                      <TableCell align="center">

                        {/* <IconButton
                          // onClick={() => deleteTransactionRule(row.id)}
                          size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton> */}
                        <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }} onClick={() => openDrawer(row)}>
                          <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <Box sx={{ px: 3, pt: 3, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
                Globally distributed Products and Services
              </Typography>
            </Box>

            <TableContainer component={Paper} elevation={0}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Product name</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Price</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Product Owner</TableCell>
                    <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Sales channel</TableCell>
                    <TableCell align="right" sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {newTableData.map((row, index) => (
                    <NewTableRow key={index} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box> */}
        </>
      }
    </>
  );
}
