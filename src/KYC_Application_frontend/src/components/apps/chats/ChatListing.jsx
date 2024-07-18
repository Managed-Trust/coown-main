import React, { useState, useEffect } from 'react';
import {
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  TextField,
  Box,
  Alert,
  Badge,
  ListItemButton,
  Typography,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import { useConnect } from '@connect2ic/react';
import { IconChevronDown, IconSearch } from '@tabler/icons';
import user1 from '../../../assets/images/profile/user-1.jpg';
import Scrollbar from '../../custom-scroll/Scrollbar';
import ic from 'ic0';

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const ChatListing = ({ onSelectGroup }) => {
  const [groups, setGroups] = useState([]);
  const [fetchingGroups, setFetchingGroups] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const { principal } = useConnect({
    onConnect: () => { },
    onDisconnect: () => { },
  });

  useEffect(() => {
    const fetchGroup = async () => {
      setFetchingGroups(true);
      try {
        if (principal) {
          const response = await ledger.call('getGroupIdsByUserId', principal);
          if (response != null) {
            const groupDetails = await Promise.all(
              response.map(async (groupId) => {
                try {
                  const groupDetailResponse = await ledger.call('getGroup', groupId);
                  return groupDetailResponse;
                } catch (e) {
                  console.error(`Error fetching group details for group ID ${groupId}:`, e);
                  return null;
                }
              })
            );
            const validGroups = groupDetails.filter(group => group !== null);
            setGroups(validGroups[0]);
            console.log("Groups:", validGroups);
          }
        }
      } catch (e) {
        console.log('Error fetching groups:', e);
      } finally {
        setFetchingGroups(false);
      }
    };

    fetchGroup();
  }, [principal]);

  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredGroups = groups.filter(group =>
    group.name && group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* ------------------------------------------- */}
      {/* Profile */}
      {/* ------------------------------------------- */}
      <Box display={'flex'} alignItems="center" gap="10px" p={3}>
        <Badge
          variant="dot"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          overlap="circular"
          color="success"
        >
          <Avatar alt="Remy Sharp" src={user1} sx={{ width: 54, height: 54 }} />
        </Badge>
        <Box>
          <Typography variant="body1" fontWeight={600}>
            John Deo
          </Typography>
          <Typography variant="body2">Marketing Manager</Typography>
        </Box>
      </Box>
      {/* ------------------------------------------- */}
      {/* Search */}
      {/* ------------------------------------------- */}
      <Box px={3} py={1}>
        <TextField
          id="outlined-search"
          placeholder="Search groups"
          size="small"
          type="search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }}
          fullWidth
          onChange={handleSearchChange}
        />
      </Box>
      {/* ------------------------------------------- */}
      {/* Group List */}
      {/* ------------------------------------------- */}
      <List sx={{ px: 0 }}>
        <Box px={2.5} pb={1}>
          <Button
            id="basic-button"
            aria-controls={anchorEl ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorEl ? 'true' : undefined}
            onClick={handleClick}
            color="inherit"
          >
            Groups <IconChevronDown size="16" />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Sort By Name</MenuItem>
            <MenuItem onClick={handleClose}>Sort By Date</MenuItem>
          </Menu>
        </Box>
        <Scrollbar sx={{ height: { lg: 'calc(100vh - 100px)', md: '100vh' }, maxHeight: '600px' }}>
          {fetchingGroups ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : filteredGroups && filteredGroups.length ? (
            filteredGroups.map((group) => (
              <ListItemButton
                key={group.adminId} // Assuming each group has an `adminId` property
                sx={{
                  mb: 0.5,
                  py: 2,
                  px: 3,
                  alignItems: 'start',
                }}
                onClick={() => onSelectGroup(group)}
              >
                <ListItemAvatar>
                  <Badge
                    color="secondary"
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    overlap="circular"
                  >
                    <Avatar alt={group.name} src={group.groupImage} sx={{ width: 42, height: 42 }} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {group.name}
                    </Typography>
                  }
                  secondary={group.groupDescription}
                  secondaryTypographyProps={{
                    noWrap: true,
                  }}
                  sx={{ my: 0 }}
                />
              </ListItemButton>
            ))
          ) : (
            <Box m={2}>
              <Alert severity="error" variant="filled" sx={{ color: 'white' }}>
                No Groups Found!
              </Alert>
            </Box>
          )}
        </Scrollbar>
      </List>
    </div>
  );
};

export default ChatListing;
