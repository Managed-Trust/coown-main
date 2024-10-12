import React, { useEffect } from 'react';
import {
  Avatar,
  List,
  ListItemText,
  ListItemAvatar,
  Badge,
  ListItemButton,
  Typography,
  Button,
  Card,
  Grid,
  Box,
  Alert,
} from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChat, fetchChats } from '../../../../store/apps/chat/ChatSlice';
import chaticon from "../../../../assets/images/svgs/message-text-square-02.svg";
import dollarIcon from "../../../../assets/images/svgs/send-funds.svg";

const RecentContact = () => {
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

  return (
    <Card sx={{ p: { xs: 2, sm: 3 }, borderRadius: '8px' }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
        Recent Contacts
      </Typography>
      <List sx={{ px: 0 }}>
        {chats && chats.length ? (
          chats.slice(0, 4).map((chat) => (
            <ListItemButton
              key={chat.id}
              onClick={() => dispatch(SelectChat(chat.id))}
              sx={{
                py: { xs: 1, sm: 1.5 },
                px: { xs: 1, sm: 2 },
                alignItems: 'start',
              }}
              selected={activeChat === chat.id}
            >
              <ListItemAvatar>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <CircleIcon
                      sx={{
                        color: chat.isOnline ? '#19BB8D' : '#7C8FAC',
                        fontSize: 12,
                      }}
                    />
                  }
                >
                  <Avatar
                    alt={chat.name}
                    src={chat.thumb}
                    sx={{
                      width: { xs: 36, sm: 42 },
                      height: { xs: 36, sm: 42 },
                    }}
                  />
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    mb={0.5}
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    {chat.name}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="body2"
                    sx={{ color: chat.isOnline ? '#19BB8D' : '#7C8FAC', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {chat.isOnline ? 'Online' : 'Offline'}
                  </Typography>
                }
                sx={{ my: 0 }}
              />
              <Box sx={{ display: 'flex', gap: { xs: '1px', sm: '2px' }, alignItems: 'center' }}>
                <img src={dollarIcon} alt="dollar" />
                <img src={chaticon} alt="chat" />
              </Box>
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
      <Grid container justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          sx={{
            width: '100%',
            mt: 1,
            padding: { xs: '8px', sm: '12px' }, // Responsive button padding
          }}
        >
          Invite Member
        </Button>
      </Grid>
    </Card>
  );
};

export default RecentContact;
