import React from 'react';
import { Box, Grid, Typography, styled } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setVisibilityFilter } from '../../../store/apps/tickets/TicketSlice';

const BoxStyled = styled(Box)(() => ({
  padding: '30px',
  transition: '0.1s ease-in',
  cursor: 'pointer',
  color: 'inherit',
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
    <Grid container spacing={3} textAlign="center">
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('total_users'))}
          sx={{ backgroundColor: 'primary.light', color: 'primary.main' }}
        >
          <Typography variant="h3">{totalUsers}</Typography>
          <Typography variant="h6">Total Users</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Pending'))}
          sx={{ backgroundColor: 'warning.light', color: 'warning.main' }}
        >
          <Typography variant="h3">{pendingUsers}</Typography>
          <Typography variant="h6">Pending Users</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Open'))}
          sx={{ backgroundColor: 'success.light', color: 'success.main' }}
        >
          <Typography variant="h3">{openUsers}</Typography>
          <Typography variant="h6">Verified Users</Typography>
        </BoxStyled>
      </Grid>
      <Grid item xs={12} sm={6} lg={3}>
        <BoxStyled
          onClick={() => dispatch(setVisibilityFilter('Closed'))}
          sx={{ backgroundColor: 'error.light', color: 'error.main' }}
        >
          <Typography variant="h3">{0}</Typography>
          <Typography variant="h6">Closed Users</Typography>
        </BoxStyled>
      </Grid>
    </Grid>
  );
};

export default TicketFilter;
