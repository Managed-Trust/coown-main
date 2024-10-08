import React from 'react';
import PageContainer from '../../../components/container/PageContainer';

// components
import Banner from '../../../components/landingpage/banner/Banner';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Footer from '../../../components/landingpage/footer/Footer';
import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../components/landingpage/header/Header';
import PartnerLogos from '../../../components/landingpage/PartnerLogos/PartnerLogos';
import Countdown from '../../../components/landingpage/Countdown/Countdown';
import AssetControl from '../../../components/landingpage/AssetControl/AssetControl';
import PerformanceMetrics from '../../../components/landingpage/PerformanceMetrics/PerformanceMetrics';
import CoownAddress from '../../../components/landingpage/CoownAddress/CoownAddress';
import FeaturesGrid from '../../../components/landingpage/FeaturesGrid/FeaturesGrid';
import DevelopmentPlan from '../../../components/landingpage/DevelopmentPlan/DevelopmentPlan';
import QuickStartGuide from '../../../components/landingpage/QuickStartGuide/QuickStartGuide';
import ContactUs from '../../../components/landingpage/ContactUs/ContactUs';
import FAQSection from '../../../components/landingpage/FAQSection/FAQSection';

const Landingpage = () => {
  return (
    <PageContainer title="COOWN - wallets for your groups" description="COOWN - wallets for your groups">
      <LpHeader />
      <Banner />
      <PartnerLogos/>
      <Countdown/>
      <AssetControl/>
      <PerformanceMetrics/>
      <CoownAddress/>
      <Frameworks />
      <FeaturesGrid/>
      {/* <DevelopmentPlan/> */}
      <QuickStartGuide/>
      <ContactUs/>
      <FAQSection/>
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
