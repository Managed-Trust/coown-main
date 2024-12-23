import { styled, Container, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import AddStakeHolder from '../../components/apps/userprofile/gallery/stakeHolderComponent/AddStakeHolder.jsx';
import Faq from '../../views/pages/faq/Faq.jsx';
import UserApproval from '../../components/apps/tickets/UserApproval.jsx';
import Galleryr from '../../views/apps/referrals/ReferralCode.jsx';
import CreateGroup from '../../views/apps/Group/CreateGroup.jsx';
import PrivateGroup from '../../views/apps/Group/CreateGroup.jsx';
import RegisterCompany from '../../views/apps/Group/RegisterCompany.jsx';
import AdminMain from '../../views/apps/Admin/Dashboard/main.jsx';
import LocalizationMain from '../../views/apps/Admin/Localization/main.jsx';
import Fees from '../../views/apps/Admin/Fees/main.jsx';
import Products from '../../views/apps/Admin/Products/main.jsx';
import Management from '../../views/apps/Admin/Management/main.jsx';
import OperatorMain from '../../views/apps/Operator/Dashboard/main.jsx';
import OperatorTransectionFees from '../../views/apps/Operator/Transection_Rules/main.jsx';

import {
  ConnectDialog,
} from "@connect2ic/react";
import AmlSetting from '../../views/apps/AmlSetting/AmlSetting.jsx';
import UserDashboard from '../../views/apps/user-dashboard/UserDashboard.jsx';
import UserAccount from '../../views/apps/user-account/UserAccount.jsx';
import Profile from '../../views/apps/user-profile/Profile.jsx';
import UserSetting from '../../views/apps/user-setting/UserSetting.jsx';

import WarningBanner from './WarningBanner';

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

      <MainWrapper className={customizer.activeMode === 'dark' ? 'darkbg mainwrapper' : 'mainwrapper'}>
        {!customizer.isHorizontal && <Sidebar />}

        <PageWrapper
          className="page-wrapper"
          sx={{
            ...(customizer.isCollapse && {
              [theme.breakpoints.up('lg')]: { ml: `${customizer.MiniSidebarWidth}px` },
            }),
          }}
        >
          <WarningBanner />
          {customizer.isHorizontal ? <HorizontalHeader /> : <Header />}
          {customizer.isHorizontal && <Navigation />}
          <Container
            sx={{
              maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
            }}
          >
            <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
              <Routes>
                <Route path="/dashboards/ecommerce" element={<EcommerceDash />} />
                <Route path="/dashboards/modern" element={<Modern />} />
                <Route path="/apps/followers" element={<Followers />} />
                <Route path="/apps/friends" element={<Friends />} />
                <Route path="/apps/gallery" element={<Gallery />} />
                <Route path="/apps/private" element={<PrivateGroup />} />
                <Route path="/group/registerCompany/:groupId" element={<RegisterCompany />} />
                <Route path="/user-profile" element={<Profile />} />
                <Route path="/apps/user-setting" element={<UserSetting />} />
                <Route path="/app/user-dashboard" element={<UserDashboard />} />
                <Route path="/app/user-accounts" element={<UserAccount />} />
                <Route path="/referral" element={<Galleryr />} />
                <Route path="/account" element={<Account />} />
                <Route path="/user-profile/Settings" element={<Settings />} />
                <Route path="/forms/form-horizontal" element={<FormHorizontal />} />
                <Route path="/create-group/:groupType" element={<PrivateGroup />} />
                <Route path="/group/:groupId" element={<GroupDetailPage />} />
                <Route path="/group/:groupId/add-stakeholder" element={<AddStakeHolder />} />
                <Route path="/group/create-group" element={<CreateGroup />} />
                <Route path="/apps/chats" element={<Chats />} />
                <Route path="/group-invitation/:groupId/:email" element={<GroupInvitation />} />
                <Route path="/apps/tickets" element={<Tickets />} />
                <Route path="/apps/aml-setting" element={<AmlSetting />} />
                <Route path="/apps/tickets/user-detail/:id" element={<UserApproval />} />
                <Route path="/pages/faq" element={<Faq />} />
                <Route path="/pages/admin-dashboard" element={<AdminMain />} />
                <Route path="/pages/admin-localization" element={<LocalizationMain />} />
                <Route path="/pages/admin-fees" element={<Fees />} />
                <Route path="/pages/admin-products" element={<Products />} />
                <Route path="/pages/admin-management" element={<Management />} />
                <Route path="/pages/operator-dashboard" element={<OperatorMain />} />
                <Route path="/pages/operator-transection-rules" element={<OperatorTransectionFees />} />
                <Route path="*" element={<Navigate to="/404" />} /> {/* Catch-all route for 404 */}
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
