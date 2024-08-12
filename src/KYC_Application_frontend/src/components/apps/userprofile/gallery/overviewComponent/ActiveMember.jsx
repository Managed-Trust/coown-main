import React, { useEffect } from 'react';
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
  Grid,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChat,fetchChats } from '../../../../../store/apps/chat/ChatSlice';
import { last } from 'lodash';
import DashboardCard from '../../../../../components/shared/DashboardCard';

const ActiveMember = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector((state) => state.chatReducer.chatContent);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  const filterChats = (chats, cSearch) => {
    if (chats)
      return chats.filter((t) => t.name.toLocaleLowerCase().includes(cSearch.toLocaleLowerCase()));

    return chats;
  };

  const chats = useSelector((state) =>
    filterChats(state.chatReducer.chats, state.chatReducer.chatSearch),
  );

  const getDetails = (conversation) => {
    let displayText = '';

    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (lastMessage) {
      const sender = lastMessage.senderId === conversation.id ? 'You: ' : '';
      const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.msg;
      displayText = `${sender}${message}`;
    }

    return displayText;
  };

  const lastActivity = (chat) => last(chat.messages)?.createdAt;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    
    <DashboardCard title="Most active members" subtitle="Members with most transactions">
      <List sx={{ px: 0 }}>
          {chats && chats.length ? (
            chats.slice(0, 4).map((chat) => (
              <ListItemButton
                key={chat.id}
                onClick={() => dispatch(SelectChat(chat.id))}
                sx={{
                  py: 1.5,
                  px: 2,
                  alignItems: 'start',
                }}
                selected={activeChat === chat.id}
              >
                <ListItemAvatar>
                  
                    <Avatar alt="Remy Sharp" src={chat.thumb} sx={{ width: 42, height: 42 }} />
                  
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" fontWeight={600} mb={0.5}>
                      {chat.name}
                    </Typography>
                  }
                  secondary={getDetails(chat)}
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
                No Contacts Found!
              </Alert>
            </Box>
          )}
          
      </List> 
          <Grid xs={12}>
      <Button variant="outlined" color="primary" sx={{width:'100%', mt: "30px !important"}}>
            View all members
          </Button></Grid>
    </DashboardCard>
  );
};

export default ActiveMember;
