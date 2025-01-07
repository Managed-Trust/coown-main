import React from 'react';
import { Button, Stack, IconButton, styled, useMediaQuery } from '@mui/material';
import { Facebook, Instagram, YouTube, LinkedIn, Reddit } from '@mui/icons-material';
import TelegramIcon from '@mui/icons-material/Telegram';
import OpenChat from '../../../assets/images/logos/OpenChat.svg';
import Discord from '../../../assets/images/logos/Discord.svg';
import Twitter from '../../../assets/images/logos/Twitter.svg';
import Github from '../../../assets/images/logos/Github.svg';
import Youtube from '../../../assets/images/logos/Youtube.svg';
import LinkedInIcon from '../../../assets/images/logos/LinkedIn.svg';
import FacebookIcon from '../../../assets/images/logos/Facebook.svg';
import Telegram from '../../../assets/images/logos/Telegram.svg';
import BlankCard from '../../shared/BlankCard';

// Styled components
const ImgCard = styled(BlankCard)(() => ({
  marginTop: '-50px',
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
          gap: '15px',
        }}
      >
        {/* Social Media Icons */}
        <a href="#" aria-label="OpenChat">
          <img src={OpenChat}/>
        </a>
        <a href="https://www.youtube.com/@coown" target='_blank' aria-label="Youtube">
          <img src={Youtube}/>
        </a>

        <a href="https://t.me/+1hFUCL-Pg4gyMjZk" target='_blank' aria-label="Telegram">
          <img src={Telegram}/>
        </a>

        <a href="https://www.linkedin.com/company/co-own-io/" target='_blank' aria-label="linkedin">
          <img src={LinkedInIcon}/>
        </a>

        <a href="https://www.facebook.com/people/COOWN/61557016146014/" target='_blank' aria-label="FacebookIcon">
          <img src={FacebookIcon}/>
        </a>

        <a href="#" aria-label="Discord">
          <img src={Discord}/>
        </a>
        <a href="#" aria-label="Twitter">
          <img src={Twitter}/>
        </a>
        <a href="#" aria-label="Github">
          <img src={Github}/>
        </a>
      </Stack>
    </ImgCard>
  );
};

export default GuaranteeCard;
