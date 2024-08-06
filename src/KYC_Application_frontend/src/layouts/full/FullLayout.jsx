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
import Account from "../../views/apps/account/Account.jsx";
import Followers from "../../views/apps/user-profile/Followers.jsx";
import Friends from "../../views/apps/user-profile/Friends.jsx";
import Gallery from "../../views/apps/user-profile/Gallery.jsx";
import FormHorizontal from "../../views/forms/FormHorizontal";
import Settings from '../../views/apps/user-profile/Settings.jsx';
import GroupDetailPage from '../../components/apps/userprofile/gallery/GroupDetail.jsx';
import Chats from '../../views/apps/chat/Chat.jsx';
import GroupInvitation from '../../views/pages/group-invitation/group-invitation.jsx';
import Tickets from '../../views/apps/tickets/Tickets.jsx';
import AddStakeHolder from '../../views/apps/stakeholder/AddStakeHolder.jsx';
import Faq from '../../views/pages/faq/Faq.jsx';
import UserApproval from '../../components/apps/tickets/UserApproval.jsx';

import {
  ConnectDialog,

} from "@connect2ic/react";
import CreateGroup from '../../views/apps/Group/CreateGroup.jsx';

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
    <>
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
                <Route path="/account" element={<Account />} />
                <Route path="/user-profile/Settings" element={<Settings />} />
                <Route path="/forms/form-horizontal" element={<FormHorizontal />} />
                <Route path="/group/:groupId" element={<GroupDetailPage />} />
                <Route path="/group/:groupId/add-stakeholder" element={<AddStakeHolder/>} />
                <Route path="/group/create-group" element={<CreateGroup/>} />
                <Route path="/apps/chats" element={<Chats />} />
                <Route path="/group-invitation/:groupId/:email" element={<GroupInvitation />} />
                <Route path="/apps/tickets" element={<Tickets />} />
                <Route path="/apps/tickets/user-detail/:id" element={<UserApproval />} />
                <Route path="/pages/faq" element={<Faq />} />
              </Routes>
            </Box>
          </Container>
          <Customizer />
          <ConnectDialog dark={false} />
        </PageWrapper>
      </MainWrapper>
    </>

  );
};

export default FullLayout;
