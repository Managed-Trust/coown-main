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
import AddAffilities from './AddAffilities';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

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
  console.log("Row:",row[1].affiliate[0].affiliateGroup);
  return (
    <>
      <StyledTableRow>
        <TableCell sx={{ pl: 2, display: 'flex', alignItems: 'center', gap: 1, py: 2 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Box>
            <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 500 }}>
              {row[1].affiliate[0].affiliateGroup}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              #{row[0]}
            </Typography>
          </Box>
        </TableCell>
        {/* <TableCell sx={{ color: '#1e293b' }}>{row[1].affiliat[0].affiliateWebsite}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row[1].associateType}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.representedInCoordination ? "Yes" : "No"}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{row.representedInSteering ? "Yes" : "No"}</TableCell> */}
      </StyledTableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Sub Rows
              </Typography>
              <Table size="small" aria-label="sub-rows">
                <TableBody>
                  {row.focalPoint.map((fp, index) => (
                    <StyledTableRow key={`focalPoint-${index}`}>
                      <TableCell sx={{ pl: 8 }}>Focal Point</TableCell>
                      <TableCell>{fp.email}</TableCell>
                      <TableCell>{fp.mainContact}</TableCell>
                      <TableCell>{fp.phone}</TableCell>
                      <TableCell>{fp.preferredMessenger}</TableCell>
                      <TableCell>{fp.messengerIdentifier}</TableCell>
                    </StyledTableRow>
                  ))}
                  {row.sla.map((sla, index) => (
                    <StyledTableRow key={`sla-${index}`}>
                      <TableCell sx={{ pl: 8 }}>SLA</TableCell>
                      <TableCell>{sla.comments}</TableCell>
                      <TableCell>{sla.managementSystemActivities}</TableCell>
                      <TableCell>{sla.slaDocument}</TableCell>
                      <TableCell>{sla.workingDraft}</TableCell>
                    </StyledTableRow>
                  ))}
                  {row.localization.map((loc, index) => (
                    <StyledTableRow key={`localization-${index}`}>
                      <TableCell sx={{ pl: 8 }}>Localization</TableCell>
                      <TableCell colSpan={5}>{JSON.stringify(loc)}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </>
  );
}


export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [affiliates, setAffiliates] = useState(null);

  useEffect(() => {
    const fetchAfiliates = async () => {
      try {
        const response = await ledger.call("getAllDetails");
        console.log("Affiliate Response:", response);
        if (response.length > 0) {
          setAffiliates(response);
        }
      } catch (e) {
        console.log("Error Fetching Affiliates:", e);
      }
    }
    fetchAfiliates();
  }, [])
  return (
    <Box mt={4} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
      {showForm ? (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1e293b', mb: 2 }}>
            Add Affiliate
          </Typography>
          <Button
            onClick={() => setShowForm(false)}
            variant="outlined"
            sx={{
              mt: 2,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#5d87ff', color: 'white' },
            }}
          >
            Back to Affiliates
          </Button>
          <AddAffilities onFormShow={setShowForm} />
        </Box>
      ) : (
        <>
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
              Add Affiliate
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Affiliate Group</TableCell>
                  <TableCell>Affiliate Website</TableCell>
                  <TableCell>Associate Type</TableCell>
                  <TableCell>Represented in Coordination</TableCell>
                  <TableCell>Represented in Steering</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {affiliates && affiliates.map((affiliate, index) => (
                  <Row key={`affiliate-${index}`} row={affiliate} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
}
