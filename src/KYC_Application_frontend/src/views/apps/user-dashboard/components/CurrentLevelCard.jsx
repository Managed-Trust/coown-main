import React from 'react';
import { Paper, Typography, Box, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const CurrentLevelCard = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2, sm: 3 },
        maxWidth: { xs: '100%', sm: '400px' },
        margin: 'auto',
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
        <Typography
          variant="h5"
          sx={{ fontSize: '18px' }}
        >
          Your current level
        </Typography>
        <Chip
          icon={<StarIcon style={{ color: 'white' }} />}
          label="2"
          sx={{
            backgroundColor: '#19BB8D',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '14px',
          }}
        />
      </Box>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
        sx={{ fontSize: '14px',lineHeight: '1.5', color:'#5A6A85' }} 
      >
        Upgrade your account to unlock all platform features
      </Typography>

      <List>
        <ListItem style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#5D87FF', fontSize: { xs: '20px', sm: '24px' } }} />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: '-20px', fontSize: '14px' }}
            primary="View group balance"
          />
        </ListItem>
        <ListItem style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#5D87FF', fontSize: { xs: '20px', sm: '24px' } }} />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: '-20px', fontSize: '14px' }}
            primary="Access group chat"
          />
        </ListItem>
        <ListItem style={{paddingLeft: '0px', paddingRight: '0px'}}>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#5D87FF', fontSize: { xs: '20px', sm: '24px' } }} />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: '-20px', fontSize: '14px' }}
            primary="Engage in group votes"
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default CurrentLevelCard;
