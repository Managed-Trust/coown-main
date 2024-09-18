import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination,
  TableRow, Toolbar, Typography, TextField, InputAdornment, Grid
} from '@mui/material';
import { IconSearch } from '@tabler/icons';

const countryRiskData = [
  { country: "USA", residency: 7, citizenships: 7, industry: 0, pep: 7, criminalRecord: 7 },
  { country: "UK", residency: 6, citizenships: 6, industry: 2, pep: 6, criminalRecord: 5 },
  { country: "UAE", residency: 5, citizenships: 5, industry: 3, pep: 5, criminalRecord: 6 },
  { country: "India", residency: 4, citizenships: 4, industry: 3, pep: 4, criminalRecord: 5 },
  { country: "Pakistan", residency: 3, citizenships: 3, industry: 1, pep: 3, criminalRecord: 4 },
  // Additional country data...
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        {['Country', 'Residency', 'Citizenships', 'Industry', 'Politically Exposed Person', 'Criminal Record'].map((headCell) => (
          <TableCell
            key={headCell}
            align="center"
            sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
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
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px' }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Risk Analysis
      </Typography>
      <Grid container spacing={2} sx={{ width: 'auto', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Grid item>
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
            value={search}
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

  // Update filtered rows based on search input
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

  return (
    <Box mt={4}>
      <EnhancedTableToolbar
        search={search}
        handleSearch={handleSearch}
      />
      <TableContainer>
        <Table>
          <EnhancedTableHead />
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
              <TableRow key={`${data.country}-${index}`}>
                <TableCell align="center">{data.country}</TableCell>
                <TableCell align="center">{data.residency}</TableCell>
                <TableCell align="center">{data.citizenships}</TableCell>
                <TableCell align="center">{data.industry}</TableCell>
                <TableCell align="center">{data.pep}</TableCell>
                <TableCell align="center">{data.criminalRecord}</TableCell>
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
      />
    </Box>
  );
};

export default UserListing;
