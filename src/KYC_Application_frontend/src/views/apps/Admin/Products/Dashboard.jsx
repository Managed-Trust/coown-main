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
