import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from './vertical/header/Header';
import HorizontalHeader from './horizontal/header/Header';
import Sidebar from './vertical/sidebar/Sidebar';
import Customizer from './shared/customizer/Customizer';
import Navigation from './horizontal/navbar/Navbar';
import Modern from '../../views/dashboard/Modern';
import EcommerceDash from '../../views/dashboard/Ecommerce.jsx';
import UserProfile from "../../views/apps/user-profile/UserProfile.jsx";
import Followers from "../../views/apps/user-profile/Followers.jsx";
import Friends from "../../views/apps/user-profile/Friends.jsx";
import Gallery from "../../views/apps/user-profile/Gallery.jsx";
import FormHorizontal from "../../views/forms/FormHorizontal";
import {
  ConnectDialog,
  
} from "@connect2ic/react";

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

const FullLayout = () => {
  const customizer = useSelector((state) => state.customizer);
  const theme = useTheme();

  return (
    <MainWrapper
      className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}
    >
      {customizer.isHorizontal ? '' : <Sidebar />}
      <PageWrapper
        className="page-wrapper"
        sx={{
          ...(customizer.isCollapse && {
            [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
          }),
        }}
      >
        {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
        {customizer.isHorizontal ? <Navigation /> : ''}
        <Container
          sx={{
            maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
          }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Routes>
              <Route path="/" element={<EcommerceDash />} />
              <Route path="/dashboards/modern" element={<Modern />} />
              <Route path="/apps/followers" element={<Followers />} />
              <Route path="/apps/friends" element={<Friends />} />
              <Route path="/apps/gallery" element={<Gallery />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/forms/form-horizontal" element={<FormHorizontal />} />
            </Routes>
          </Box>
        </Container>
        <Customizer />
        <ConnectDialog dark={false} />
      </PageWrapper>
    </MainWrapper>
  );
};

export default FullLayout;
