import React from 'react';
import { Typography, Box, Button, styled, CardContent, Stack, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn } from '@mui/icons-material'; // Replace with appropriate icons
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';// If you need a custom icon, you can use an SVG or similar library

import BlankCard from '../../shared/BlankCard';
import badgeImg from '../../../assets/images/landingpage/shape/badge.svg';
import lineImg from '../../../assets/images/landingpage/shape/line-bg-2.svg';

const ImgCard = styled(BlankCard)(() => ({
  marginTop: '-70px',
}));

const StyledButton = styled(Button)(() => ({
  padding: '13px 34px',
  fontSize: '16px',
}));

const GuaranteeCard = () => {
  return (
    <ImgCard>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={3}
          mt={2}
          mb={2}
          sx={{
            padding: '10px 20px',
            borderRadius: '12px',
          }}
        >
          <IconButton href="#" aria-label="telegram">
            <TelegramIcon fontSize="large" />
          </IconButton>
          <IconButton href="#" aria-label="youtube">
            <YouTube fontSize="large" />
          </IconButton>
          <IconButton href="#" aria-label="linkedin">
            <LinkedIn fontSize="large" />
          </IconButton>
          <IconButton href="#" aria-label="facebook">
            <Facebook fontSize="large" />
          </IconButton>
          <IconButton href="#" aria-label="instagram">
            <Instagram fontSize="large" />
          </IconButton>
          <IconButton href="#" aria-label="twitter">
            <TwitterIcon fontSize="large" />
          </IconButton>
        </Stack>
    </ImgCard>
  );
};

export default GuaranteeCard;
