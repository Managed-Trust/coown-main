import * as React from 'react';
import { useState } from 'react';
import ChildCard from '../../../../shared/ChildCard';
import Voting from './voting';
import { Box } from '@mui/system';
import StakeholderTable from './StakeholderTable';
import ShareholderBook from './ShareholderBook';

const Stakeholder = ({ groupId }) => {
   
    return (
        <>
        <Voting/>
        <Box mt={2}></Box>
        <StakeholderTable groupId={groupId}/>
        <Box mt={2}></Box>
        <ShareholderBook/>
        </>
    );
};

export default Stakeholder;
