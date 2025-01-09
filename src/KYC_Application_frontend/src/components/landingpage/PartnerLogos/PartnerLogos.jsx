import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import logo1 from '../../../assets/images/partnerlogo/logoo1.png';
import logo2 from '../../../assets/images/partnerlogo/logoo2.png';
import logo3 from '../../../assets/images/partnerlogo/logoo3.png';
import logo4 from '../../../assets/images/partnerlogo/logoo4.png';
import logo5 from '../../../assets/images/partnerlogo/logoo5.png';
import logo6 from '../../../assets/images/partnerlogo/logoo6.jpg';
import logo7 from '../../../assets/images/partnerlogo/logoo7.jpg';
import logo8 from '../../../assets/images/partnerlogo/logoo8.jpg';
import logo9 from '../../../assets/images/partnerlogo/logoo9.jpg';
import logo10 from '../../../assets/images/partnerlogo/logoo10.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PartnerLogos = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 8000, // Adjusted for normal continuous scrolling speed
        slidesToShow: 1, // Single logo per "scroll unit"
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0, // For continuous sliding
        cssEase: 'linear', // Smooth continuous scrolling
        variableWidth: true, // Allows dynamic spacing
        arrows: false, // Hides the previous and next buttons
    };

    const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10]; // Duplicate for seamless loop

    return (
        <Box sx={{ textAlign: 'center', margin: '40px 0 80px', padding: '10px 0' }}>
            <Typography variant="h2" sx={{ fontWeight: 'bold', marginBottom: '20px',fontSize:'36px', letterSpacing:'-1.35px' }}>
                Our friends
            </Typography>
            <Slider {...settings}>
                {logos.map((logo, index) => (
                    <Box key={index} sx={{ padding: '0 50px' }}> {/* Increased spacing */}
                        <img
                            src={logo}
                            alt={`Logo ${index + 1}`}
                            style={{ height: '40px', width: 'auto', display: 'block', margin: '0 auto' }}
                        />
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default PartnerLogos;
