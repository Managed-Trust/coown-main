import React, { useState } from 'react';
import { Box, Button, Typography, Container, Paper, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const theme = createTheme();

function GroupInvitation() {
  const [invitationStatus, setInvitationStatus] = useState(null);

  const handleAccept = () => {
    setInvitationStatus('accepted');
    // Additional logic for accepting the invitation can be added here
    console.log('Invitation accepted');
  };

  const handleReject = () => {
    setInvitationStatus('rejected');
    // Additional logic for rejecting the invitation can be added here
    console.log('Invitation rejected');
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
                You have been invited to join the group: <strong>Awesome Group</strong>
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
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
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default GroupInvitation;
