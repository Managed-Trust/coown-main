import React from 'react';
import { Typography, Box, Button, styled, CardContent, Stack, IconButton } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn,Reddit} from '@mui/icons-material'; // Replace with appropriate icons
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
          <IconButton href="https://www.reddit.com/user/COOWN/" aria-label="Reddit">
            <Reddit fontSize="large" />
          </IconButton>
        </Stack>
    </ImgCard>
  );
};

export default GuaranteeCard;
