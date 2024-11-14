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
  Collapse,
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupsIcon from '@mui/icons-material/Groups';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Coown_Logo from '../../../../assets/images/logos/coown-logo-group.jpg';

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
    id: '132456789',
    name: 'COOWN Foundation',
    totalMembers: 12,
    function: 'Foundation',
    since: 'Jan 1, 2024',
    isMain: true,
    subRows: [
      { id: '132456789', name: 'Steering committee', totalMembers: 4, function: 'Foundation - BU', since: 'Jan 1, 2024' },
      { id: '132456789', name: 'CEO office', totalMembers: 2, function: 'Foundation - BU', since: 'Jan 1, 2024' },
      { id: '132456789', name: 'Marketing', totalMembers: 5, function: 'Foundation - BU', since: 'Jan 1, 2024' },
      { id: '132456789', name: 'Advisory board', totalMembers: 7, function: 'Foundation - BU', since: 'Jan 1, 2024' },
      { id: '132456789', name: 'Quality', totalMembers: 2, function: 'Foundation - BU', since: 'Jan 1, 2024' },
    ],
  },
  {
    id: '987654321',
    name: 'Software Developers',
    totalMembers: 15,
    function: 'IT',
    since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  },
  {
    id: '123456789',
    name: 'Regional Operator "Sandbox"',
    totalMembers: 15,
    function: 'Regional Operator "Sandbox"',
    since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  },
  {
    id: '1122334455',
    name: 'Auditor company',
    totalMembers: 15,
    function: 'IT',
    since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  },
  {
    id: '9988776655',
    name: 'Banking partner',
    totalMembers: 15,
    function: 'Regional Operator',
    since: 'Jan 1, 2024',
    isMain: true,
    subRows: [],
  },
];

function Row({ row }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <StyledTableRow>
        <TableCell sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
            sx={{ visibility: row.subRows.length > 0 ? 'visible' : 'hidden' }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.isMain && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <img src={Coown_Logo} />
            </Box>
          )}
          <Box>
            <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
              {row.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              #{row.id}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.totalMembers}</TableCell>
        <TableCell sx={{ color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          {row.function}
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
        <TableCell sx={{ color: '#1e293b' }}>{row.since}</TableCell>
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.subRows.map((subRow) => (
                    <StyledTableRow key={subRow.name}>
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
                      <TableCell sx={{ color: '#1e293b' }}>{subRow.function}</TableCell>
                      <TableCell sx={{ color: '#1e293b' }}>{subRow.since}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" sx={{ color: '#94a3b8', '&:hover': { color: '#6366f1' } }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
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
        <Box>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 0.5 }}>
            Affiliates
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Groups of affiliates of the inner and outer circles
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
          Add affiliate
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Group name</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Total members</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Function</TableCell>
              <TableCell sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}>Since</TableCell>
              <TableCell align="right" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.875rem' }}></TableCell>
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
