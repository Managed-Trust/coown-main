import React from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/tickets/TicketSlice';

import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const BoxStyled = styled(Box)(() => ({
  padding: '30px',
  transition: '0.1s ease-in',
  cursor: 'pointer',
  color: 'inherit',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));
const BoxIcon = styled(Box)(() => ({
  padding: '5px',
  transition: '0.1s ease-in',
  cursor: 'pointer',
  color: 'inherit',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const TicketFilter = ({ Users = [] }) => {
  const dispatch = useDispatch();

  // Ensure Users is always an array
  const usersArray = Array.isArray(Users) ? Users : [];

  const totalUsers = usersArray.length;
  const pendingUsers = usersArray.filter((user) => !user.verified).length;
  const openUsers = usersArray.filter((user) => user.verified).length;

  return (
    <>    <Grid container spacing={3} textAlign="center">
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('total_tickets'))}
        >

          <BoxIcon sx={{ backgroundColor: '#E3F2FD', color: '#1E88E5' }}><PersonIcon sx={{ fontSize: 30 }} /></BoxIcon>

          <Box>
            <Typography variant="h6">Total Users</Typography>
            <Typography variant="h3">{totalUsers}</Typography>
          </Box>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Pending'))}
        >
          <BoxIcon sx={{ backgroundColor: '#FFF3E0', color: '#FB8C00' }}><WarningIcon sx={{ fontSize: 30 }} /></BoxIcon>

          <Box>
            <Typography variant="h6">Pending Users</Typography>
            <Typography variant="h3">{pendingUsers}</Typography>
          </Box>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Open'))}
        ><BoxIcon sx={{ backgroundColor: '#E8F5E9', color: '#43A047' }}><CheckCircleIcon sx={{ fontSize: 30 }} /></BoxIcon>

          <Box>
            <Typography variant="h6">Approved Users</Typography>
            <Typography variant="h3">{openUsers}</Typography>
          </Box>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Closed'))}
        >
          <BoxIcon sx={{ backgroundColor: '#FFEBEE', color: '#E53935' }}>
            <CancelIcon sx={{ fontSize: 30 }} />
          </BoxIcon>
          <Box>
            <Typography variant="h6">Declined Users</Typography>
            <Typography variant="h3">{0}</Typography>
          </Box>
        </BoxStyled>
      </Grid>
    </Grid>
      </>

  );
};

export default TicketFilter;
