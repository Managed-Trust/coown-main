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
    height: 'auto',
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
          <img src={LogoLight} alt="Logo" style={{ height:'auto' }}/>
        ) : (
          <img src={LogoDark} alt="Logo" style={{ height:'auto' }}/>
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
        <img src={LogoDarkRTL} alt="Logo" style={{ height:'auto' }} />
      ) : (
        <img src={LogoLightRTL} alt="Logo" style={{ height:'auto' }} />
      )}
    </LinkStyled>
  );
};

export default Logo;
