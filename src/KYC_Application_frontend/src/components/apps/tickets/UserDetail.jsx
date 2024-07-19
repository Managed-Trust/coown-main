import React, { useEffect } from 'react';
import { Box, Typography, Avatar, Divider, IconButton, Button, Grid, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';
import CryptoJS from "crypto-js";

const ledger = ic.local("bd3sg-teaaa-aaaaa-qaaba-cai"); // Ledger canister

const secretKey = "your-secret-key"; // Use a strong secret key

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const UserDetail = ({ user, onClose }) => {
  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  const handleVerify = async () => {
    try {
      const response = await ledger.call("verifyCustomer", user.id);
      alert(response);
    } catch (e) {
      console.log("Error Verifying:", e);
    }
  };

  useEffect(() => {
    if (user && user.identityDoc) {
      console.log(user.identityDoc);
      console.log("Birth City:",user.birth_city[0]);
    }
  }, [user]);

  if (!user) return null;

  return (
    <Box sx={{ backgroundColor: '#fff', padding: 3, borderRadius: 2, boxShadow: 3, position: 'relative' }}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon />
      </IconButton>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar src={decryptData(user.image[0])} alt={user.name} sx={{ width: 80, height: 80, boxShadow: 3 }} />
        <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
          {decryptData(user.given_name)} {decryptData(user.family_name)}
        </Typography>
      </Stack>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Residency</Typography>
          <Typography variant="body1">{decryptData(user.residency)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Role</Typography>
          <Typography variant="body1">{user.role}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Phone</Typography>
          <Typography variant="body1">{decryptData(user.phone)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Date of Birth</Typography>
          <Typography variant="body1">{decryptData(user.birth_date)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Birth City</Typography>
          <Typography variant="body1">{decryptData(user.birth_city[0])}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="h6">Birth Country</Typography>
          <Typography variant="body1">{decryptData(user.birth_country[0])}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6">Identity Document</Typography>
          {user.identityDoc && (
            <img
              src={`data:image/jpeg;base64,${decryptData(user.identityDoc)}`}
              alt="Identity Document"
              style={{ maxWidth: '100%',width:'150px', height: 'auto', marginTop: 10 }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleVerify}>
            Verify User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetail;
