import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import LpHeader from '../../../components/landingpage/header/Header';
import Footer from '../../../components/landingpage/footer/Footer';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import Banner from "../../../components/contactus/banner/banner";
import Contact from "../../../components/contactus/Contact/contact";
import ContactDetails from '../../../components/contactus/ContactDetails/ContactDetails';
import FAQs from '../../../components/contactus/FAQ/FAQ';
import OpenChatCommunity from '../../../components/contactus/OpenChatCommunity/openChatCommunity';

const ContactUs = () => {
    return (
        <>
            <PageContainer title="Contact Us" description="Contact Us">
                <LpHeader />
                <Banner/>
                {/* <Contact /> */}
                <OpenChatCommunity />
                <ContactDetails />
                <FAQs />
                <C2a2 />
                <Footer />
            </PageContainer>
        </>
    );
}

export default ContactUs;