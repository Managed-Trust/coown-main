import React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import sponsoring from '../../../assets/images/svgs/sponsoring.svg';
import Utopia from '../../../assets/images/svgs/Utopia.svg';

const FeatureItem = ({ title, description, icon }) => (
    <Box mb={3} sx={{ display: 'flex',flexDirection:'column' }}>
        <Box component="img" src={icon} alt={title} sx={{ width: 48, height: 48, m: 2, ml:0 }} />
        <Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {title}
            </Typography>
            <Typography sx={{ fontSize: '13px' }} color="#5A6A85">
                {description}
            </Typography>
        </Box>
    </Box>
);


const CustomSolution = () => {

    return (
        <Box mt={10} mb={10}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography
                            variant="h2"
                            sx={{ fontWeight: 'bold' }}
                        >Custom solutions for your unique needs
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{ mt: 2, fontSize: '14px', color: '#5A6A85' }}
                        >Feel free to contact as via form below.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureItem
                            title="Feature sponsoring"
                            description="Need a custom feature? Request a quote to sponsor and implement a new feature tailored specifically to your needs."
                            icon={sponsoring}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FeatureItem
                            title="Clone in Utopia"
                            description="Get your own white-labeled instance of our platform on a private network, fully branded and configured just for you."
                            icon={Utopia}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default CustomSolution;
