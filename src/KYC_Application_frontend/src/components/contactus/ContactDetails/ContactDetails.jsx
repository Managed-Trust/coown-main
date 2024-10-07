import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Container, Link } from '@mui/material';
import building from '../../../assets/images/svgs/building-05.svg';
import mail from '../../../assets/images/svgs/mail-01.svg';
import message from '../../../assets/images/svgs/message-chat-circle.svg';

const EntityBox = ({ icon, title, description, link }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      borderRadius: '16px',
    }}
  >
    <Avatar
      src={icon}
      sx={{ width: 40, height: 40, mb: 2, bgcolor: 'white',border:'1px solid #DFE5EF',p:1 }}
      variant="circular"
    />
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    {link ? (
      <Link href={link} underline="none" sx={{ color: '#3b82f6', fontWeight: '500' }}>
        {description}
      </Link>
    ) : (
      <Typography variant="body2" sx={{ color: '#5A6A85' }}>
        {description}
      </Typography>
    )}
  </Paper>
);

export default function ContactDetails() {
  return (
    <Container sx={{ margin: 'auto', p: 6 }}>
      <Box sx={{ position: 'relative' }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={building}
              title="Coown init s.r.l."
              description="San josé, los yoses, 8-10 ave, 39 st, ly center, Costa Rica"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={mail}
              title="Contact email"
              description="coown@dmail.ai"
              link="mailto:coown@dmail.ai"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EntityBox
              icon={message}
              title="OpenChat"
              description="Send message ↗"
              link="#"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
