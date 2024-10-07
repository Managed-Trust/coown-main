import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Grid, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import PublicIcon from '@mui/icons-material/Public';
import Simon_Image from "../../../assets/images/organization/Simon_Kaiser.svg";

export default function Visionary() {
  return (
    <Box sx={{ maxWidth: 1000, margin: 'auto', p: 4 }}>
      <Typography variant="body2" display="block" align="center" gutterBottom color="primary" sx={{ fontSize:'14px',  fontWeight: 'semibold' }}>
        The Visionaries Behind COOWN
      </Typography>
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
        Foundation and Developers
      </Typography>
      <Typography variant="body1" align="center" paragraph sx={{ mb: 6,color: '#5A6A85' }}>
        With experience from the cybersecurity related of Swiss banks, our founders are passionate about creating an innovative digital asset management platform that blends security and user-friendliness. We aim to empower groups globally with the tools needed for efficient, cooperative financial management.
      </Typography>

      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, maxWidth: 1000, margin: 'auto' }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 200, sm: 'auto' } }}
          image={Simon_Image}
          alt="Simon Kaiser"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5" component="div" gutterBottom>
            Simon Kaiser
          </Typography>
          <Typography variant="subtitle1" color ='#5A6A85' fontWeight="bold" gutterBottom>
            Founder
          </Typography>
          <Typography variant="body2" paragraph color ='#5A6A85' fontSize="12px">
            Law and economics expert with a strong IT background and an award-winning MBA thesis on the cyber resilience of Swiss private banks. Proven success in software sales to enterprises and government entities, alongside experience in aviation industry, corporate law, rulemaking and oversight.
          </Typography>
          <Grid container spacing={1}>
            <Grid item>
              <IconButton aria-label="LinkedIn" size="small">
                <LinkedInIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="Telegram" size="small">
                <TelegramIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="GitHub" size="small">
                <GitHubIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton aria-label="Website" size="small">
                <PublicIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}