import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoDark from '../../../../assets/images/logos/logo_full.jpg';
import LogoDarkRTL from '../../../../assets/images/logos/logo_full.jpg';
import LogoLight from '../../../../assets/images/logos/dark_full.png';
import LogoLightRTL from '../../../../assets/images/logos/dark_full.png';
import { styled } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled to="/" style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        {customizer.activeMode === 'dark' ? (
          <img src={LogoLight} alt="Logo" style={{ width:'180px', height:'42.13px' }}/>
        ) : (
          <img src={LogoDark} alt="Logo" style={{ width:'180px', height:'42.13px' }}/>
        )}
      </LinkStyled>
    );
  }
  return (
    <LinkStyled to="/" style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      {customizer.activeMode === 'dark' ? (
        <img src={LogoDarkRTL} alt="Logo" />
      ) : (
        <img src={LogoLightRTL} alt="Logo" />
      )}
    </LinkStyled>
  );
};

export default Logo;
