import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Container, Paper, ThemeProvider, createTheme, CssBaseline, CircularProgress } from '@mui/material';
import { useConnect } from '@connect2ic/react';
import ic from 'ic0';
import { Principal } from '@dfinity/principal';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const theme = createTheme();

const GroupUserStatus = {
  Approved: 'Approved',
  Rejected: 'Rejected',
  Drafted: 'Drafted',
  Verified: 'Verified',
};

// Encode variant function
const encodeVariant = (status) => {
  return { [status]: null };
};

function GroupInvitation() {
  const { groupId, email } = useParams();
  const [invitationStatus, setInvitationStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  const handleAccept = async () => {
    setLoading(true);
    try {
      const response = await ledger.call("updateGroupUserStatus", groupId, email, encodeVariant(GroupUserStatus.Approved));
      alert(response);
      setInvitationStatus('accepted');
    } catch (e) {
      console.log("Error Accepting Invite:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const response = await ledger.call("updateGroupUserStatus", groupId, email, encodeVariant(GroupUserStatus.Rejected));
      alert(response);
      setInvitationStatus('rejected');
    } catch (e) {
      console.log("Error Rejecting Invite:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 16 }}>
        <Paper elevation={6} sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Group Invitation
          </Typography>
          {invitationStatus ? (
            <Typography variant="h6">
              {invitationStatus === 'accepted' ? 'You have accepted the invitation.' : 'You have rejected the invitation.'}
            </Typography>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                You have been invited to join the group: <strong>{groupId}</strong>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAccept}
                      sx={{ mx: 2, px: 2, py: 1, fontSize: '0.875rem', borderRadius: '8px' }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleReject}
                      sx={{ mx: 2, px: 2, py: 1, fontSize: '0.875rem', borderRadius: '8px' }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default GroupInvitation;
