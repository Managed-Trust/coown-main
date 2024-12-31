import React, { useState } from 'react';
import { Box, Button, Divider, Grid, styled, Paper } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';
import AppLinks from '../../../layouts/full/vertical/header/AppLinks';
import QuickLinks from '../../../layouts/full/vertical/header/QuickLinks';
import DemosDD from './DemosDD';
import { NavLink } from 'react-router-dom';

const Navigations = () => {
  const StyledButton = styled(Button)(({ theme }) => ({
    fontSize: '16px',
    color: theme.palette.text.secondary,
  }));

  // demos
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // pages

  const [open2, setOpen2] = useState(false);

  const handleOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  return (
    <>
      <StyledButton color="inherit" variant="text" href="/product">
      Product
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="/organization">
        Organization
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="/ico">
        Token
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="/pricing">
      Pricing
      </StyledButton>
      <StyledButton color="inherit" variant="text" href="/contact-us">
      Contact
      </StyledButton>
      <Button color="primary" target="_blank" variant="contained" component={NavLink} to="/user/prototype">
        Sign In
      </Button>
    </>
  );
};

export default Navigations;
