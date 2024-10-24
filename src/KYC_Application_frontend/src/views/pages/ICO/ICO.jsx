import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, styled, useMediaQuery, useTheme } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import LpHeader from '../../../components/landingpage/header/Header';
import Footer from '../../../components/landingpage/footer/Footer';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Countdown from '../../../components/ico/Countdown/Countdown';
import Banner from "../../../components/ico/banner/banner";
import Contact from "../../../components/ico/Contact/contact";
import DoughnutChart from '../../../components/ico/Chart/chart';
import SwapComponent from '../../../components/ico/Swap/SwapComponent';
import TokenDistribution from '../../../components/ico/TokenDistribution/TokenDistribution';
import TokenPlan from '../../../components/ico/TokenPlan/TokenPlan';
import COOWN from '../../../components/ico/Coown/coown';
import Connect from '../../../components/ico/Connect/connect';
import RewardsAndAffiliate from '../../../components/ico/rewardsAndAffiliate/RewardsAndAffiliate';
import NFTSwap from '../../../components/ico/NFTSwap/nftswap';

const StyledTab = styled(Tab)(({ theme }) => ({
  color: '#94a3b8',
  minWidth: '120px', // Reduce width to bring tabs closer
  minHeight: '60px', // Increase height
  fontSize: '16px',  // Increase font size for better readability
  '&.Mui-selected': {
    color: '#60a5fa',
    borderBottom: '2px solid #60a5fa',
  },
  '&:hover': {
    color: '#60a5fa', // Match hover color to selected tab color
    borderBottom: '2px solid #60a5fa', // Match hover border to selected tab border
  },
}));

const ICO = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect screen sizes smaller than 'sm'

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <PageContainer title="Organization" description="this is Organization">
      <LpHeader />
      <Banner />
      <Countdown />
      <COOWN />

      <AppBar position="static" color="transparent" elevation={0} sx={{ marginTop: '30px' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? 'scrollable' : 'fullWidth'} // Switch to scrollable for mobile
          scrollButtons={isMobile ? 'auto' : 'off'} // Enable scroll buttons in mobile view
          sx={{
            bgcolor: '#1e293b',
            '& .MuiTabs-indicator': { display: 'none' },
            '& .MuiTabs-flexContainer': {
              justifyContent: isMobile ? 'flex-start' : 'space-around', // Align tabs for mobile and desktop
              overflowX: isMobile ? 'auto' : 'visible', // Allow horizontal scrolling on mobile
            },
          }}
        >
          <StyledTab label="Token Swap" />
          <StyledTab label="Social Rewards" />
          <StyledTab label="NFT" />
          <StyledTab label="About" />
        </Tabs>
      </AppBar>

      <Connect />
      <Box sx={{ p: 3 }}>
        {value === 0 && <SwapComponent />}
        {value === 1 && <RewardsAndAffiliate />}
        {value === 2 && <NFTSwap />}
        {value === 3 && (
          <>
            <DoughnutChart />
            <TokenDistribution />
            <TokenPlan />
          </>
        )}
      </Box>

      <Contact />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

export default ICO;
