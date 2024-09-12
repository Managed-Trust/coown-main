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

function App() {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              {/* Route for the Landing Page */}
              <Route path="/" element={<Landingpage />} />

              {/* Routes that use FullLayout */}
              <Route path="/*" element={<FullLayout />} />

              {/* Optional: Add a catch-all route for undefined paths */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </RTL>
    </ThemeProvider>
  );
}

export default App;
