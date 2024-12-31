import React, { useState } from 'react';
import { Button, Box, Collapse, Stack } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';
import Logo from "../../../layouts/full/shared/logo/Logo"
import DemosDD from './DemosDD';
import AppLinks from '../../../layouts/full/vertical/header/AppLinks';
import QuickLinks from '../../../layouts/full/vertical/header/QuickLinks';
import { NavLink } from 'react-router-dom';

const MobileSidebar = () => {

    return (
        <>
            <Box px={3}>
                <Logo />
            </Box>
            <Box p={3}>

                <Stack direction="column" spacing={2} >                    
                    <Button color="inherit" href="/product" sx={{
                        justifyContent: 'start'
                    }}>Product</Button>
                    
                    <Button color="inherit" href="/organization" sx={{
                        justifyContent: 'start'
                    }}>Organization</Button>
                    
                    <Button color="inherit" href="/ico" sx={{
                        justifyContent: 'start'
                    }}>Token</Button>
                    <Button color="inherit" href="/pricing" sx={{
                        justifyContent: 'start'
                    }}>Pricing</Button>
                    
                    <Button color="inherit" href="/contact-us" sx={{
                        justifyContent: 'start'
                    }}>Contact</Button>
                    <Button color="primary" variant="contained" component={NavLink} to="/user/prototype">Login</Button>
                </Stack>
            </Box>
        </>


    );
};

export default MobileSidebar;
