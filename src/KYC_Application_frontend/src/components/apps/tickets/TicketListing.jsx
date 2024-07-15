import React, { useState } from 'react';
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Button,
  Stack,
  Avatar,
  TextField,
  TableContainer,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserDetail from './UserDetail'; // Import the UserDetail component

import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Use a strong secret key

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};


const UserListing = ({ Users }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const formatId = (id) => {
    if (id.length <= 12) return id;
    return `${id.slice(0, 6)}...${id.slice(-6)}`;
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  const handleCloseDetails = () => {
    setSelectedUser(null);
  };

  return (
    <Box mt={4}>
      {selectedUser ? (
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" mb={2}>
            <Typography variant="h4">User Details</Typography>
          </Stack>
          <UserDetail user={selectedUser} onClose={handleCloseDetails} />
        </Box>
      ) : (
        <Box>
          <Box sx={{ maxWidth: '260px', ml: 'auto' }} mb={3}>
            <TextField
              size="small"
              label="Search"
              fullWidth
              onChange={(e) => {
                // Implement search functionality here
              }}
            />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Id</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Residency</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Role</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Phone</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Action</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Users && Users.length > 0 ? (
                  Users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>{formatId(user.id)}</TableCell>
                      <TableCell>
                        <Stack direction="row" gap="10px" alignItems="center">
                          <Avatar
                            src={user.image[0]}
                            alt={user.name}
                            width="35"
                            sx={{
                              borderRadius: '100%',
                            }}
                          />
                          <Typography variant="h6">{decryptData(user.given_name)} {decryptData(user.family_name)}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">{decryptData(user.residency)}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">{user.role}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6">{decryptData(user.phone)}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="contained"
                            onClick={() => handleViewDetails(user)}
                          >
                            View Details
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6">No users available</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default UserListing;
