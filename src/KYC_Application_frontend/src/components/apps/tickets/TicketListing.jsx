import React from 'react';
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
  Tooltip,
  TextField,
  TableContainer,
  IconButton
} from '@mui/material';
import { IconTrash } from '@tabler/icons';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const UserListing = ({ Users }) => {

  const { isConnected, principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });

  const handleVerify = async (userId) => {
    try {
      const response = await ledger.call("verifyCustomer", userId);
      alert(response);
    } catch (e) {
      console.log("Error Verifying:", e);
    }
    console.log(`Verify user with id: ${userId}`);
  };

  const handleReject = async (userId) => {
    console.log(`Reject user with id: ${userId}`);
  };

  const formatId = (id) => {
    if (id.length <= 12) return id;
    return `${id.slice(0, 6)}...${id.slice(-6)}`;
  };

  return (
    <Box mt={4}>
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
              <TableCell align="right">
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
                      <Typography variant="h6">{user.given_name} {user.family_name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{user.residency}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{user.role}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{user.phone}</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleVerify(user.id)}
                      >
                        Verify
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleReject(user.id)}
                      >
                        Reject
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
  );
};

export default UserListing;
