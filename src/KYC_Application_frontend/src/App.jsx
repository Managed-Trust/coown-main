window.process = {
  env: {
    NODE_ENV: 'production', // or 'development', depending on your environment
  },
  versions: {}, // Optional, in case the library is checking versions
};
import { useState } from 'react';
import { KYC_Application_backend } from 'declarations/KYC_Application_backend';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import { CssBaseline, ThemeProvider } from '@mui/material';
import FullLayout from './layouts/full/FullLayout';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landingpage from './views/pages/landingpage/Landingpage';
import LoginPage from './views/pages/login/LoginPage';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import Organization from './views/pages/Organization/Organization';
import ICO from './views/pages/ICO/ICO';
import Product from './views/pages/Product/Product';
import Pricing from './views/pages/Pricing/Pricing';
import ContactUs from './views/pages/ContactUs/ContactUs';
import ConnectPage from './views/pages/connect/ConnectPage';
import AtlasDashboard from './PreSale/Socials';
import NFTPresaleMarketplace from './PreSale/Nft';
import ICPTokenSwap from './PreSale/kycapp';
import SignUpPage from './views/pages/signup/SignUpPage';
import LoginUser from './views/pages/loginuser/LoginUser';

function App() {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  return (
    <GoogleOAuthProvider clientId="725664575664-3tboqhepr5uggob4mitv569jj9vfv362.apps.googleusercontent.com">
      <ThemeProvider theme={theme}>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <BrowserRouter>
            <ScrollToTop>
              <Routes>
                {/* Route for the Landing Page */}

                <Route path="/" element={<Landingpage />} />
                <Route path="/organization" element={<Organization />} /> 
                <Route path="/ico" element={<ICO/>} /> 
                <Route path="/product" element={<Product/>} /> 
                <Route path="/pricing" element={<Pricing />} /> 
                <Route path="/contact-us" element={<ContactUs/>} /> 
                <Route path='/user/sign-up' element={<LoginPage />} />
                <Route path='/user/login' element={<LoginUser />} />
                <Route path='/user/connect' element={<ConnectPage/>} />
                <Route path="/prelaunch" element={<ICPTokenSwap />} />
                <Route path="/prelaunch-social" element={<AtlasDashboard />} />
                <Route path="/prelaunch-nft" element={<NFTPresaleMarketplace />} />
                {/* <Route path="/user/sign-up" element={<SignUpPage />} /> */}
                {/* Routes that use FullLayout */}
                <Route path="/*" element={<FullLayout />} />

                {/* Optional: Add a catch-all route for undefined paths */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </ScrollToTop>
          </BrowserRouter>
        </RTL>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
