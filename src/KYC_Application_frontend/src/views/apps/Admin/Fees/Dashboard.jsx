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
  Paper,
  Collapse,
  styled,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
    rule_name: 'Send unlimited wrapped bitcoin to a system user',
    totalFees: '0.01%+0.002 ICP',
    asset_type: 'ckBTC',
    operator_acceptance: 'Operator F, Operator G, Operator J',
    subRows: [
      { id: '1a', name: 'Sub rule 1', totalMembers: '100', since: '2021' },
      { id: '1b', name: 'Sub rule 2', totalMembers: '50', since: '2020' },
    ],
  },
  {
    id: '2',
    rule_name: 'Send unlimited wrapped bitcoin to an unknown user',
    totalFees: '0.01%+0.002 ICP',
    asset_type: 'ckBTC',
    operator_acceptance: 'Operator F, Operator J',
    subRows: [
      { id: '2a', name: 'Sub rule 3', totalMembers: '30', since: '2022' },
    ],
  },
  {
    id: '3',
    rule_name: 'Send up to 1,000 Euro worth of ckBTC to a known user',
    totalFees: '0.01%+0.002 ICP',
    asset_type: 'ckBTC',
    operator_acceptance: 'Operator J',
    subRows: [],
  },
];

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow>
        <TableCell sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
              {row.id}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ color: '#1e293b',fontWeight:'500',fontSize:'14px' }}>{row.rule_name}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.totalFees}</TableCell>
        <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.asset_type}
        </TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.operator_acceptance}</TableCell>
        <TableCell align="right">
          <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.subRows.map((subRow) => (
                    <StyledTableRow key={subRow.id}>
                      <TableCell sx={{ pl: 6, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
                            {subRow.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#64748b' }}>
                            #{subRow.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ color: '#1e293b' }}>{subRow.totalMembers}</TableCell>
                      <TableCell sx={{ color: '#1e293b' }}>{subRow.since}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
                          <ArrowForwardIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Dashboard() {
  return (
    <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
          Standard transaction rules
        </Typography>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>ID</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Rule Name</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Total Fees</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Asset Type</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Operator Acceptance</TableCell>
              <TableCell align="right" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {affiliatesData.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
