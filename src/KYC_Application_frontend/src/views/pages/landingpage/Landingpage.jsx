import React from 'react';
import PageContainer from '../../../components/container/PageContainer';

// components
import Banner from '../../../components/landingpage/banner/Banner';
import C2a from '../../../components/landingpage/c2a/C2a';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import DemoSlider from '../../../components/landingpage/demo-slider/DemoSlider';
import Features from '../../../components/landingpage/features/Features';
import Footer from '../../../components/landingpage/footer/Footer';
import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';
import PartnerLogos from '../../../components/landingpage/PartnerLogos/PartnerLogos';
import Countdown from '../../../components/landingpage/Countdown/Countdown';
import AssetControl from '../../../components/landingpage/AssetControl/AssetControl';

const Landingpage = () => {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      <Banner />
      <PartnerLogos/>
      <Countdown/>
      <AssetControl/>
      {/* <DemoSlider /> */}
      <Frameworks />
      <Testimonial />
      <Features />
      <C2a />
      <C2a2 />
      <Footer />
    </PageContainer>
  );
};

export default Landingpage;
