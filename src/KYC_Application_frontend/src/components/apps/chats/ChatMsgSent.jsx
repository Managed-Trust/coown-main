import React from 'react';
import { IconButton, InputBase, Box, Popover, CircularProgress } from '@mui/material';
import Picker from 'emoji-picker-react';
import { IconMoodSmile, IconPaperclip, IconPhoto, IconSend } from '@tabler/icons';

const ChatMsgSent = ({ selectedGroup, onSendMessage, disabled }) => {
  const [msg, setMsg] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const onEmojiClick = (_event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChatMsgChange = (e) => {
    setMsg(e.target.value);
  };

  const onChatMsgSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (selectedGroup && msg.trim()) {
      const newMsg = { groupId: selectedGroup.adminId, msg, senderId: 'currentUserId', createdAt: new Date() }; // Ensure to replace 'currentUserId' with actual user id
      console.log("Message:", newMsg);
      onSendMessage(newMsg);
      setMsg('');
    }
  };

  return (
    <Box p={2} position="relative">
      {disabled && (
        <Box position="absolute" top={0} bottom={0} left={0} right={0} display="flex" justifyContent="center" alignItems="center" bgcolor="rgba(255,255,255,0.7)" zIndex={1}>
          <CircularProgress />
        </Box>
      )}
      <form
        onSubmit={onChatMsgSubmit}
        style={{ display: 'flex', gap: '10px', alignItems: 'center', opacity: disabled ? 0.5 : 1 }}
      >
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls="long-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleClick}
          disabled={disabled}
        >
          <IconMoodSmile />
        </IconButton>
        <Popover
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <Picker onEmojiClick={onEmojiClick} native />
          <Box p={2}>Selected: {chosenEmoji ? chosenEmoji.emoji : ''}</Box>
        </Popover>
        <InputBase
          id="msg-sent"
          fullWidth
          value={msg}
          placeholder="Type a Message"
          size="small"
          type="text"
          inputProps={{ 'aria-label': 'Type a Message' }}
          onChange={handleChatMsgChange}
          disabled={disabled}
        />
        <IconButton
          aria-label="send"
          type="submit"
          disabled={!msg.trim() || disabled}
          color="primary"
        >
          <IconSend stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="photo" disabled={disabled}>
          <IconPhoto stroke={1.5} size="20" />
        </IconButton>
        <IconButton aria-label="attachment" disabled={disabled}>
          <IconPaperclip stroke={1.5} size="20" />
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatMsgSent;
