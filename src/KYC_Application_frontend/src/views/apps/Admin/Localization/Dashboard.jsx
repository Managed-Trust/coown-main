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
  Button,
  IconButton,
  Paper,
  Avatar,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Coown_Logo from '../../../../assets/images/profile/user-5.jpg';

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
    id: '1',
    name: 'Operator  F',
    totalMembers: 15,
    Balance: '$100 000',
    total_revenue: '$100 000',
    Licensedin: 'FR',
    Non_exclusive_areas: 'FR,ES,BE',
    Exclusive_areas: 'FR',
    Since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  },
  {
    id: '2',
    name: 'Operator  G',
    totalMembers: 15,
    Balance: '$100 000',
    total_revenue: '$100 000',
    Licensedin: 'XY',
    Non_exclusive_areas: '-',
    Exclusive_areas: 'XY',
    Since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  },
  {
    id: '3',
    name: 'Operator J',
    totalMembers: 15,
    Balance: '$100 000',
    total_revenue: '$100 000',
    Licensedin: 'JR',
    Non_exclusive_areas: 'TW',
    Exclusive_areas: 'JR',
    Since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  }
];

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow>
        <TableCell sx={{ color: '#1e293b' }}>{row.id}</TableCell>
        <TableCell sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
          {row.isMain && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <Avatar
                src={Coown_Logo}
                alt={Coown_Logo}
                width="30"
              />
            </Box>
          )}
          <Box>
            <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              GROUP ID
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.totalMembers}</TableCell>
        <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.Balance}
          {row.name === 'Marketing' && (
            <Box
              component="span"
              sx={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': {
                    boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.4)',
                  },
                  '70%': {
                    boxShadow: '0 0 0 10px rgba(239, 68, 68, 0)',
                  },
                  '100%': {
                    boxShadow: '0 0 0 0 rgba(239, 68, 68, 0)',
                  },
                },
              }}
            />
          )}
        </TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.total_revenue}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.Licensedin}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.Non_exclusive_areas}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.Exclusive_areas}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.Since}</TableCell>
        <TableCell align="right">
          <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </StyledTableRow>
    </>
  );
}

export default function Dashboard() {
  return (
    <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
            Operators
          </Typography>

        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            backgroundColor: '#6366f1',
            '&:hover': {
              backgroundColor: '#4f46e5',
            },
            boxShadow: 'none',
            padding: '8px 16px',
          }}
        >
          + Add Operator
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>ID</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Group name</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Staff</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Balance</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Total Revenue</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Licensed in</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Non-exclusive areas</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Exclusive areas</TableCell>
              <TableCell sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}>Since</TableCell>
              <TableCell align="right" sx={{ color: '#7C8FAC', fontWeight: 500, fontSize: '0.875rem' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {affiliatesData.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
