import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import LpHeader from '../../../components/landingpage/header/Header';
import Footer from '../../../components/landingpage/footer/Footer';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Banner from "../../../components/organization/banner/banner";
import Card from "../../../components/organization/Card/card";
import Visionary from '../../../components/organization/Visionaries/visionary';
import Contact from "../../../components/ico/Contact/contact";

const Organization = () => {
    return (
        <>
            <PageContainer title="Organization" description="this is Organization">
                <LpHeader />
                <Banner/>
                <Card />
                <Visionary />
                {/* <Contact /> */}
                <C2a2 />
                <Footer />
            </PageContainer>
        </>
    );
}

export default Organization;