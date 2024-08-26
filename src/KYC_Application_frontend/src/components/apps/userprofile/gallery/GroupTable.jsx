import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Typography,
    IconButton,
    Collapse,
    Box,
    Button,
} from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ChildCard from '../../../shared/ChildCard';

function GroupTable({ groups }) {
    const [openRows, setOpenRows] = React.useState({});

    const handleToggleRow = (rowName) => {
        setOpenRows((prev) => ({ ...prev, [rowName]: !prev[rowName] }));
    };

    const renderGroupRows = (rowData) => {
        return rowData.map((row) => (
            <React.Fragment key={row[0].groupName}>
                <TableRow>
                    <TableCell sx={{ width: '30%' }}>
                        <Box display="flex" alignItems="center">
                            {row[0].subgroups && row[0].subgroups.length > 0 && (
                                <IconButton onClick={() => handleToggleRow(row[0].groupName)}>
                                    {openRows[row[0].groupName] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            )}
                            <Avatar src={row[0].ownerAvatar} sx={{ marginRight: 2, width: 40, height: 40 }} />
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                {row[0].groupName}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell sx={{ width: '15%', fontSize: '14px', color: 'gray' }}>
                        {row[0].personalRecords.length}
                    </TableCell>
                    <TableCell sx={{ width: '15%', fontSize: '14px', color: 'gray' }}>
                        0$
                    </TableCell>
                    <TableCell sx={{ width: '20%', fontSize: '14px', color: 'gray' }}>
                        <Box display="flex" alignItems="center">
                            <Avatar src={row.ownerAvatar} sx={{ marginRight: 2, width: 40, height: 40 }} />
                        </Box>
                    </TableCell>
                    <TableCell sx={{ width: '15%' }}>
                        <Link to={`/group/${row[0].adminId}`} style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary">
                                View Details
                            </Button>
                        </Link>
                    </TableCell>
                </TableRow>
                {row[0].subgroups && row[0].subgroups.length > 0 && (
                    <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                            <Collapse in={openRows[row[0].groupName]} timeout="auto" unmountOnExit>
                                <Table size="small">
                                    <TableBody>
                                        {row[0].subgroups.map((subgroup) => (
                                            <TableRow key={subgroup.groupName}>
                                                <TableCell sx={{ width: '30%' }}>
                                                    <Box display="flex" alignItems="center" sx={{ marginLeft: 3 }}>
                                                        <Avatar src={subgroup.ownerAvatar} sx={{ marginRight: 2, width: 30, height: 30 }} />
                                                        <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                                                            {subgroup.groupName}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ width: '20%', fontSize: '14px', color: 'gray' }}>
                                                    {subgroup.members}
                                                </TableCell>
                                                <TableCell sx={{ width: '20%', fontSize: '14px', color: 'gray' }}>
                                                    {subgroup.balance}
                                                </TableCell>
                                                <TableCell sx={{ width: '20%', fontSize: '14px', color: 'gray' }}>
                                                    <Box display="flex" alignItems="center">
                                                        <Avatar src={subgroup.ownerAvatar} sx={{ marginRight: 2, width: 30, height: 30 }} />
                                                        <Box>
                                                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }}>
                                                                {subgroup.ownerName}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: '12px', color: 'gray' }}>
                                                                {subgroup.ownerEmail}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ width: '15%', padding: '0px' }}>
                                                    <Link to={`/group/${subgroup.adminId}`} style={{ textDecoration: 'none' }}>
                                                        <Button variant="contained" color="primary">
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                )}
            </React.Fragment>
        ));
    };

    return (
        <>
            {/* Private Groups */}
            <Box p={3} width="100%">
                <ChildCard sx={{ backgroundColor: 'white' }}>
                    <Typography variant="h6" gutterBottom>Private Groups</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Group Name</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Total Members</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Balance</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Group Owner</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderGroupRows(groups.filter(group => group[0].groupType === 'Private Group' || group[0].groupType === 'Default'))}
                        </TableBody>
                    </Table>
                </ChildCard>
            </Box>

            {/* Registered Companies */}
            <Box sx={{ backgroundColor: 'white', marginTop: '30px' }} p={3} width="100%">
                <ChildCard sx={{ backgroundColor: 'white' }}>
                    <Typography variant="h6" gutterBottom>Registered Companies</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Group Name</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Total Members</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Balance</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Group Owner</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderGroupRows(groups.filter(group => group[0].groupType === 'Registered Company'))}
                        </TableBody>
                    </Table>
                </ChildCard>
            </Box>

            {/* Public Law Entities */}
            <Box sx={{ backgroundColor: 'white', marginTop: '30px' }} p={3} width="100%">
                <ChildCard sx={{ backgroundColor: 'white' }}>
                    <Typography variant="h6" gutterBottom>Public Law Entities</Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Group Name</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Total Members</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Balance</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}>Group Owner</TableCell>
                                <TableCell sx={{ fontSize: '14px', color: 'gray' }}></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderGroupRows(groups.filter(group => group[0].groupType === 'Public Law Entity'))}
                        </TableBody>
                    </Table>
                </ChildCard>
            </Box>
        </>
    );
}

export default GroupTable;
