import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, Toolbar, Typography, TextField, InputAdornment, Grid, Button, Paper
} from '@mui/material';
import { IconSearch } from '@tabler/icons';

const countryRiskData = [
  { country: "USA", residency: 7, citizenships: 7, industry: 0, pep: 7, criminalRecord: 7 },
  { country: "UK", residency: 6, citizenships: 6, industry: 2, pep: 6, criminalRecord: 5 },
  { country: "UAE", residency: 5, citizenships: 5, industry: 3, pep: 5, criminalRecord: 6 },
  { country: "India", residency: 4, citizenships: 4, industry: 3, pep: 4, criminalRecord: 5 },
  { country: "Pakistan", residency: 3, citizenships: 3, industry: 1, pep: 3, criminalRecord: 4 },
];

function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {['Country', 'Residency', 'Citizenships', 'Action'].map((headCell) => (
          <TableCell
            key={headCell}
            sx={{ fontWeight: 'bold', color: '#6b7280', borderBottom: 'none', padding: '10px 16px' }}
          >
            {headCell}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = ({ search, handleSearch }) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0' }}>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs={3}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search by Country"
            size="small"
            onChange={handleSearch}
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '10px',
                backgroundColor: 'white',
              },
            }}
          />
        </Grid>
      </Grid>
    </Toolbar>
  );
};

const UserListing = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filteredRows, setFilteredRows] = useState(countryRiskData);
  const [selectedRow, setSelectedRow] = useState(null);  // Stores the currently selected row for editing
  const [formData, setFormData] = useState({
    industry: '',
    pep: '',
    criminalRecord: ''
  }); // Independent form data

  useEffect(() => {
    let filteredData = countryRiskData;

    if (search) {
      filteredData = filteredData.filter((data) =>
        data.country.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredRows(filteredData);
  }, [search]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (row) => {
    setSelectedRow(row.country === selectedRow?.country ? null : row);  // Toggle selected row
  };

  const handleRowChange = (event) => {
    const { name, value } = event.target;
    setSelectedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    setFilteredRows((prev) =>
      prev.map((row) =>
        row.country === selectedRow.country ? selectedRow : row
      )
    );
    setSelectedRow(null);  // Close the form after saving
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mt={4}>
      <Paper elevation={3} sx={{ padding: '16px', borderRadius: '10px' }}>
        <EnhancedTableToolbar search={search} handleSearch={handleSearch} />

        <TableContainer>
          <Table>
            <EnhancedTableHead />
            <TableBody>
              {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
                <TableRow key={index} hover>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', borderBottom: 'none' }}>
                    <Typography sx={{ fontWeight: 'bold' }}>{data.country}</Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="residency"
                      value={selectedRow?.country === data.country ? selectedRow.residency : data.residency}
                      onChange={handleRowChange}
                      disabled={selectedRow?.country !== data.country}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="citizenships"
                      value={selectedRow?.country === data.country ? selectedRow.citizenships : data.citizenships}
                      onChange={handleRowChange}
                      disabled={selectedRow?.country !== data.country}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    {selectedRow?.country === data.country ? (
                      <>
                        <Button
                          variant="outlined"
                          sx={{ marginRight: 1, borderRadius: '12px', textTransform: 'none' }}
                          onClick={handleSaveClick}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{ borderRadius: '12px', textTransform: 'none' }}
                          onClick={() => setSelectedRow(null)}
                        >
                          Close
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{ borderRadius: '12px', textTransform: 'none' }}
                        onClick={() => handleEditClick(data)}
                      >
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiTablePagination-toolbar': {
              padding: '8px 16px',
            },
            '& .MuiTablePagination-select': {
              padding: '8px',
            },
          }}
        />
      </Paper>

      {/* Independent Form for Industry, PEP, and Criminal Record */}
      <Box mt={4} component="form">
        <Typography variant="h6" mb={2}>Additional Fields (Independent of Country)</Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Industry"
              name="industry"
              value={formData.industry}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Politically Exposed Person (PEP)"
              name="pep"
              value={formData.pep}
              onChange={handleFormChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Criminal Record"
              name="criminalRecord"
              value={formData.criminalRecord}
              onChange={handleFormChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserListing;
