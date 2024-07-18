import React from 'react';
import {
  Typography,
  Divider,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
  Box,
  Stack,
  Badge,
  useMediaQuery,
} from '@mui/material';
import { IconDotsVertical, IconMenu2, IconPhone, IconVideo, IconMessageCircle } from '@tabler/icons';
import Scrollbar from '../../../components/custom-scroll/Scrollbar';

const ChatContent = ({ group, messages, toggleChatSidebar }) => {
  const [open, setOpen] = React.useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  return (
    <Box flexGrow={1} display="flex" flexDirection="column">
      {group ? (
        <Box display="flex" flexDirection="column" height="100%">
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box display="flex" alignItems="center" p={2}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px',
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem key={group.adminId} dense disableGutters>
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
                    <Avatar alt={group.name} src={group.groupImage} />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">{group.name}</Typography>}
                  secondary={group.groupDescription}
                />
              </ListItem>
              <Stack direction={'row'}>
                <IconButton aria-label="call">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="video call">
                  <IconVideo stroke={1.5} />
                </IconButton>
                <IconButton aria-label="menu" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}
          <Box display="flex" flexGrow={1} height="0">
            {/* ------------------------------------------- */}
            {/* Chat Messages */}
            {/* ------------------------------------------- */}
            <Box width="100%">
              <Scrollbar sx={{ height: '400px', overflow: 'auto', maxHeight: '400px' }}>
                <Box p={3}>
                  {messages && messages.length > 0 ? (
                    messages.map((message, index) => (
                      <Box key={index}>
                        {message.Messages && message.Messages.SenderUserId ? (
                          group.adminId === message.Messages.SenderUserId ? (
                            <Box display="flex">
                              <ListItemAvatar>
                                <Avatar
                                  alt={group.name}
                                  src={group.groupImage}
                                  sx={{ width: 40, height: 40 }}
                                />
                              </ListItemAvatar>
                              <Box>
                                <Box
                                  mb={2}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'grey.100',
                                    mr: 'auto',
                                    maxWidth: '320px',
                                  }}
                                >
                                  {message.Messages.Description}
                                </Box>
                              </Box>
                            </Box>
                          ) : (
                            <Box
                              mb={1}
                              display="flex"
                              alignItems="flex-end"
                              flexDirection="row-reverse"
                            >
                              <Box alignItems="flex-end" display="flex" flexDirection={'column'}>
                                <Box
                                  mb={1}
                                  sx={{
                                    p: 1,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                    maxWidth: '320px',
                                  }}
                                >
                                  {message.Messages.Description}
                                </Box>
                              </Box>
                            </Box>
                          )
                        ) : (
                          <Typography variant="body2" color="error">
                            Invalid message format
                          </Typography>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography>No messages in this group</Typography>
                  )}
                </Box>
              </Scrollbar>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          textAlign="center"
          p={2}
        >
          <IconMessageCircle stroke={1.5} size={60} color="gray" />
          <Typography variant="h4" color="textSecondary" mt={2}>
            Select a Group to Start Chatting
          </Typography>
          <Typography variant="body1" color="textSecondary" mt={1}>
            Choose a group from the sidebar to view and send messages.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatContent;
