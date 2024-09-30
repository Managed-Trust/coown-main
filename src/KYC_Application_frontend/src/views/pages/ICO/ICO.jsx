import React from 'react';
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

const ICO = () => {
    return (
        <>
            <PageContainer title="Organization" description="this is Organization">
                <LpHeader />
                <Banner/>
                <Countdown/>
                <DoughnutChart/>
                <SwapComponent/>
                <TokenDistribution/>
                <TokenPlan/>
                <Contact />
                <C2a2 />
                <Footer />
            </PageContainer>
        </>
    );
}

export default ICO;