import React from 'react';
import {
    Box,
    Stack,
    Grid,
    Typography,
    Chip,
    TextField,
    CardMedia,
    Button,
    Container
} from "@mui/material";
import { Link } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import BlankCard from '../../shared/BlankCard';
import img from '../../../assets/images/landingpage/image94.png';
import mygroup1 from '../../../assets/images/group/mygroup1.svg';
import mygroup2 from '../../../assets/images/group/mygroup2.svg';
import mygroup3 from '../../../assets/images/group/mygroup3.svg';


const EnterpriseEdtionComponent = () => {

    const cardData = [
        { title: "Additional private association", desc: "Add  more user groups with separate accounts as informal private associations, where you are considered as the sole economic beneficiary.", Icon: mygroup1, value: '19 USD', per: 'per year', link: '/' },
        { title: "Registered company", desc: "Following the KYC for legal entities, shareholder voting, limited transaction power of executives, and subgroups for business units become available.", Icon: mygroup2, value: '168 USD', per: 'per year', link: '/' },
        { title: "Public law entity", desc: "Get all the benefits of registered company groups with additional KYC data verification by a legal expert to ensure legitimacy and data quality.", Icon: mygroup3, value: '680 USD', per: 'per year', link: '/' }
    ];


    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                <Box textAlign="center">
                    <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
                        Enterprise edition
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'gray', mt: 1 }}>
                        Suitable for larger structures and enterprises.
                    </Typography>
                </Box>
                <Grid container spacing={4} sx={{ padding: '30px' }}>
                    {cardData.map((card) => (
                        <Grid item xs={12} sm={4} md={4} lg={4} key={card.title}>
                            <BlankCard className="hoverCard" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardMedia component={'img'} height="120" alt={card.title} src={card.Icon} />
                                <Box p={3} sx={{ minHeight: '200px', flexGrow: 1 }}>
                                    <Stack direction="row" gap={1}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>
                                            <Typography variant="h6">{card.title}</Typography>
                                            <Typography variant="caption" sx={{ minHeight: '60px', color: '#5A6A85', fontSize: '13px', display: 'block', overflow: 'hidden', marginTop: 1, textOverflow: 'ellipsis', whiteSpace: 'normal', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                                                {card.desc}
                                            </Typography>
                                            <Box>
                                                <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 2 }}>{card.value}*</Typography>
                                                <Typography variant="body1" sx={{ color: 'gray' }}>{card.per}</Typography>
                                            </Box>

                                            {/* <Box sx={{ width: '100%', marginTop: 2 }}>
                                                <Link to={card.link} >
                                                    <Button variant="contained" sx={{ width: '100%', marginTop: 2, textTransform: 'none' }}>
                                                        Get Started
                                                    </Button>
                                                </Link>
                                            </Box> */}
                                        </Box>
                                    </Stack>
                                </Box>
                            </BlankCard>
                        </Grid>
                    ))}
                </Grid>
                <Box>
                    <Typography variant="caption" fontSize="14px" color="textSecondary">
                        * The above prices are applied by the       <Typography variant="caption" gutterBottom sx={{ color: '#5D87FF' }}>
                            sandbox operator  </Typography>to early adopters for testing and launching the product with residents and companies of selected countries. Prices provided by your regional operator may differ.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default EnterpriseEdtionComponent;
