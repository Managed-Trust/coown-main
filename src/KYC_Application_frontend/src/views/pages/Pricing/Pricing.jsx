import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import LpHeader from '../../../components/landingpage/header/Header';
import Footer from '../../../components/landingpage/footer/Footer';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Banner from "../../../components/pricing/banner/banner";
import Contact from "../../../components/ico/Contact/contact";
import FileSharingComponent from '../../../components/pricing/FileSharingComponent/FileSharingComponent';
import CommunityEdition from '../../../components/pricing/CommunityEdition/CommunityEdition';
import EnterpriseEdtionComponent from '../../../components/pricing/EnterpriseEdtionComponent/EnterpriseEdtionComponent';
import AssetMiningComponent from '../../../components/pricing/AssetMiningComponent/AssetMiningComponent';
import LiveSupportComponent from '../../../components/pricing/LiveSupportComponent/LiveSupportComponent';
import CustomSolution from '../../../components/pricing/CustomSolution/CustomSolution';

const Pricing = () => {
    return (
        <>
            <PageContainer title="Pricing" description="this is Pricing section">
                <LpHeader />
                <Banner/>
                <CommunityEdition/>
                <EnterpriseEdtionComponent />
                <FileSharingComponent />
                <AssetMiningComponent />
                <LiveSupportComponent />
                <CustomSolution />
                {/* <Contact /> */}
                <C2a2 />
                <Footer />
            </PageContainer>
        </>
    );
}

export default Pricing;