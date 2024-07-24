import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LogoDark from '../../../../assets/images/logos/dark-logo.svg';
import LogoDarkRTL from '../../../../assets/images/logos/dark-rtl-logo.svg';
import LogoLight from '../../../../assets/images/logos/light-logo.svg';
import LogoLightRTL from '../../../../assets/images/logos/light-logo-rtl.svg';
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
          <img src={LogoLight} alt="Logo" />
        ) : (
          <img src={LogoDark} alt="Logo" />
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
