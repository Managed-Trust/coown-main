import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Avatar,
  Button,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const TransactionDialog = ({ open, onClose, transaction }) => {
  const agreePercentage = 30.77;
  const disagreePercentage = 15.43;
  const timeLeft = "1d 12h 15m";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '15px',
          p: 4,
          maxWidth: '563px'
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Pending executive transaction vote</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography color="text.secondary" gutterBottom>
                Transaction by
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={transaction.imgsrc} sx={{ width: 24, height: 24 }} />
                <Typography>{transaction.customer}</Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Typography color="text.secondary" gutterBottom>
                Account
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar src={transaction.logo} sx={{ width: 24, height: 24 }} />
                <Typography>{transaction.logoName}</Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Typography color="text.secondary" gutterBottom>
                Amount
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{transaction.amount}</Typography>
              <Typography color="text.secondary" variant="body2">
                {transaction.usd}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography color="text.secondary" gutterBottom>
                Transaction date
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>{transaction.date}</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography color="text.secondary" gutterBottom>
                Counterparty
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography>{transaction.counterparty}</Typography>
                <IconButton size="small">
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Typography color="text.secondary" gutterBottom>
                Limit exceeded
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>Monthly limit</Typography>
              <Typography color="text.secondary" variant="body2">
                5,345.15 / 5,000 USD
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography>Agree</Typography>
            <Typography>Time left</Typography>
            <Typography>Disagree</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h6">{agreePercentage}%</Typography>
            <Typography variant="h6">{timeLeft}</Typography>
            <Typography variant="h6">{disagreePercentage}%</Typography>
          </Box>
          <Box sx={{ position: 'relative', height: 4, bgcolor: 'grey.100', borderRadius: 2 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${agreePercentage}%`,
                bgcolor: '#19BB8D',
                borderRadius: 2,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                height: '100%',
                width: `${disagreePercentage}%`,
                bgcolor: '#FF695E',
                borderRadius: 2,
              }}
            />
          </Box>
        </Box>

        <Box display="flex" gap={2} mb={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onClose}
          >
            Approve
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: '#FF695E' }}
            onClick={onClose}
          >
            Decline
          </Button>
        </Box>
        <Box sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: '#7C8FAC', fontSize: '14px' }} >
            A vote is decided either when 50% of the total voting power supports one option, or after 72 hours based on the votes received.
          </Typography>
        </Box>

      </DialogContent>
    </Dialog>
  );
};

export default TransactionDialog;

