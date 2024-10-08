import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import LpHeader from '../../../components/landingpage/header/Header';
import Footer from '../../../components/landingpage/footer/Footer';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Banner from "../../../components/product/banner/banner";
import Contact from "../../../components/ico/Contact/contact";
import Card from "../../../components/product/Card/card";
import AssetControl from '../../../components/product/AssetControl/AssetControl';
import LeanerCorporateTransactions from '../../../components/product/LeanerCorporateTransactions/LeanerCorporateTransactions';
import GroupMembersComponent from '../../../components/product/GroupMembersComponent/GroupMembersComponent';
import ShareHolderComponent from '../../../components/product/ShareHolderComponent/ShareHolderComponent';
import ShareControlComponent from '../../../components/product/ShareControlComponent/ShareControlComponent';
import IntegratedCommunication from '../../../components/product/IntegratedCommunication/IntegratedCommunication';
import DevelopmentPlan from '../../../components/landingpage/DevelopmentPlan/DevelopmentPlan';

const Product = () => {
    return (
        <>
            <PageContainer title="Product" description="this is Product">
                <LpHeader />
                <Banner/>
                <AssetControl />
                <Card />
                <LeanerCorporateTransactions />
                <GroupMembersComponent />
                <ShareHolderComponent />
                <ShareControlComponent />
                <IntegratedCommunication />
                <DevelopmentPlan/>
                <Contact />
                <C2a2 />
                <Footer />
            </PageContainer>
        </>
    );
}

export default Product;