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
  CircularProgress,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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

function Row({ row, openDrawer }) {
  const [open, setOpen] = useState(false);

  const affiliateGroup = row[1]?.affiliate?.[0]?.affiliateGroup || "Unknown Group";
  const affiliateWebsite = row[1]?.affiliate?.[0]?.affiliateWebsite || "Unknown Website";
  const associateType = row[1]?.affiliate?.[0]?.associateType || "Unknown Type";
  const representedInCoordination = row[1]?.affiliate?.[0]?.representedInCoordination ? "Yes" : "No";
  const representedInSteering = row[1]?.affiliate?.[0]?.representedInSteering ? "Yes" : "No";
  const id = row[0] || "Unknown ID";

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
              {affiliateGroup}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>
              #{id}
            </Typography>
          </Box>
        </TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{affiliateWebsite}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{associateType}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{representedInCoordination}</TableCell>
        <TableCell sx={{ color: '#1e293b' }}>{representedInSteering}</TableCell>
        <TableCell>
          <IconButton
            aria-label="edit"
            onClick={() => openDrawer()}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600, mb: 1, color: '#374151' }}>
                Focal Point
              </Typography>
              <Table size="small" aria-label="focal-point">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Main Contact</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Preferred Messenger</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Messenger Identifier</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <TableCell>{row[1]?.focalPoint?.[0]?.email || "N/A"}</TableCell>
                    <TableCell>{row[1]?.focalPoint?.[0]?.mainContact || "N/A"}</TableCell>
                    <TableCell>{row[1]?.focalPoint?.[0]?.phone || "N/A"}</TableCell>
                    <TableCell>{row[1]?.focalPoint?.[0]?.preferredMessenger || "N/A"}</TableCell>
                    <TableCell>{row[1]?.focalPoint?.[0]?.messengerIdentifier || "N/A"}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>

              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600, marginTop: 2, color: '#374151' }}>
                SLA
              </Typography>
              <Table size="small" aria-label="sla">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Comments</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Management Activities</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>SLA Document</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Working Draft</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <TableCell>{row[1]?.sla?.[0]?.comments || "N/A"}</TableCell>
                    <TableCell>{row[1]?.sla?.[0]?.managementSystemActivities || "N/A"}</TableCell>
                    <TableCell>{row[1]?.sla?.[0]?.slaDocument || "N/A"}</TableCell>
                    <TableCell>{row[1]?.sla?.[0]?.workingDraft || "N/A"}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>

              <Typography variant="h6" gutterBottom component="div" sx={{ fontWeight: 600, marginTop: 2, color: '#374151' }}>
                Localization
              </Typography>
              <Table size="small" aria-label="localization">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Acts in Specific Areas</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Licensed In</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Exclusive Areas</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#4B5563' }}>Non-Exclusive Areas</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <StyledTableRow>
                    <TableCell>{row[1]?.localization?.[0]?.actsInSpecificAreas ? "Yes" : "No"}</TableCell>
                    <TableCell>{row[1]?.localization?.[0]?.licensedIn?.join(", ") || "N/A"}</TableCell>
                    <TableCell>{row[1]?.localization?.[0]?.exclusiveAreas?.join(", ") || "N/A"}</TableCell>
                    <TableCell>{row[1]?.localization?.[0]?.nonExclusiveAreas?.join(", ") || "N/A"}</TableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function Dashboard({ openDrawer }) {
  const [showForm, setShowForm] = useState(false);
  const [affiliates, setAffiliates] = useState(null);
  const [filteredAffiliates, setFilteredAffiliates] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAffiliates = async () => {
      try {
        const response = await ledger.call("getAllDetails");
        console.log("Affiliate Response:", response);
        if (response.length > 0) {
          setAffiliates(response);
          setFilteredAffiliates(response);
        } else {
          setAffiliates([]);
          setFilteredAffiliates([]);
        }
      } catch (e) {
        console.log("Error Fetching Affiliates:", e);
        setAffiliates([]);
        setFilteredAffiliates([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAffiliates();
  }, [showForm]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);
    setFilteredAffiliates(
      affiliates.filter((affiliate) =>
        affiliate[1]?.affiliate?.[0]?.affiliateGroup?.toLowerCase().includes(value) ||
        affiliate[1]?.affiliate?.[0]?.affiliateWebsite?.toLowerCase().includes(value)
      )
    );
  };

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

          <Box sx={{ p: 3 }}>
            <TextField
              label="Search Affiliates"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearch}
            />
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : filteredAffiliates && filteredAffiliates.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Affiliate Group</TableCell>
                    <TableCell>Affiliate Website</TableCell>
                    <TableCell>Associate Type</TableCell>
                    <TableCell>Represented in Coordination</TableCell>
                    <TableCell>Represented in Steering</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredAffiliates.map((affiliate, index) => (
                    <Row key={`affiliate-${index}`} row={affiliate} openDrawer={openDrawer} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <Typography variant="body1" sx={{ color: '#64748b' }}>
                No data found.
              </Typography>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
