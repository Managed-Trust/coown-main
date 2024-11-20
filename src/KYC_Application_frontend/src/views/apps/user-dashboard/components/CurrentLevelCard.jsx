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
          variant="h6"
          sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
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
        sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
      >
        Upgrade your account to unlock all platform features
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#007BFF', fontSize: { xs: '20px', sm: '24px' } }} />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: '-20px', fontSize: { xs: '0.875rem', sm: '1rem' } }}
            primary="View group balance"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#007BFF', fontSize: { xs: '20px', sm: '24px' } }} />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: '-20px', fontSize: { xs: '0.875rem', sm: '1rem' } }}
            primary="Access group chat"
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#007BFF', fontSize: { xs: '20px', sm: '24px' } }} />
          </ListItemIcon>
          <ListItemText
            sx={{ ml: '-20px', fontSize: { xs: '0.875rem', sm: '1rem' } }}
            primary="Engage in group votes"
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default CurrentLevelCard;
