import React from 'react';
import { Button, Stack, IconButton, styled, useMediaQuery } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn, Reddit } from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';

import BlankCard from '../../shared/BlankCard';

// Styled components
const ImgCard = styled(BlankCard)(() => ({
  marginTop: '-70px',
}));

const GuaranteeCard = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <ImgCard>
      <Stack
        direction='row'
        justifyContent="center"
        alignItems="center"
        spacing={isSmallScreen ? 1 : 3}
        mt={2}
        mb={2}
        sx={{
          padding: '10px 20px',
          borderRadius: '12px',
          flexWrap: 'wrap',
        }}
      >
        {/* Social Media Icons */}
        <IconButton href="https://t.me/+1hFUCL-Pg4gyMjZk" aria-label="telegram">
          <TelegramIcon fontSize="large" />
        </IconButton>
        <IconButton href="https://www.youtube.com/@coown" aria-label="youtube">
          <YouTube fontSize="large" />
        </IconButton>
        <IconButton href="https://www.linkedin.com/company/co-own-io/" aria-label="linkedin">
          <LinkedIn fontSize="large" />
        </IconButton>
        <IconButton href="https://www.facebook.com/people/COOWN/61557016146014/" aria-label="facebook">
          <Facebook fontSize="large" />
        </IconButton>
        <IconButton href="https://www.instagram.com/co_own_io_wallet/" aria-label="instagram">
          <Instagram fontSize="large" />
        </IconButton>
        <IconButton href="https://www.reddit.com/user/COOWN/" aria-label="reddit">
          <Reddit fontSize="large" />
        </IconButton>
      </Stack>
    </ImgCard>
  );
};

export default GuaranteeCard;
