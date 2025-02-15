import React, { useState } from 'react';
import { Container, Card, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        id: '01',
        question: 'Our concept',
        answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into revenue, budget, expenses, and other key metrics.',
        videoUrl: 'https://bafybeibe7djq4kjzbg3szxgpeuf2dw4ekbjtvzcnolgoxgckowracx7kny.ipfs.flk-ipfs.xyz/',
    },
    {
        id: '02',
        question: 'Why Group Wallets?',
        answer: 'Group wallets are a multi-purpose solution. They can be used to securely and efficiently manage assets that belong to a legal entity, or to allocate funds to business units and allow team members implementing smaller payments.',
        videoUrl: 'https://bafybeihxswn3ablhdzzcdfrxpwfupuavoji245pfpjmaajaci34umphd3q.ipfs.flk-ipfs.xyz/',
    },
    {
        id: '03',
        question: 'Digital Assets',
        answer: 'Inside our wallets you can hold Bitcoin, USD and gold related token, other stable currencies, and your own digitalized shares will follow soon.',
        videoUrl: 'https://bafybeid4muptcduroxoaekbrzr34mbmbxagvesnk3nwsf6svnn2wgzqpcu.ipfs.flk-ipfs.xyz/',
    },
];

const CircularBadge = ({ number, active }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '2px solid #d9dbdf',
                color: active ? '#3B82F6' : '#000', // Active color blue, inactive black
                fontWeight: 'bold',
                fontSize: '14px',
                marginRight: '10px', // Space between badge and text
            }}
        >
            {number}
        </Box>
    );
};

const AssetControl = () => {
    const [expanded, setExpanded] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(faqs[0].videoUrl); // Default video

    const handleChange = (panel, videoUrl) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        if (isExpanded) setSelectedVideo(videoUrl);
    };

    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6} p={4}>
                        <Box mt={10}>
                            <motion.div
                                initial={{ opacity: 0, translateY: 550 }}
                                animate={{ opacity: 1, translateY: 0 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 150,
                                    damping: 30,
                                }}
                            >
                                <Typography variant="body" sx={{ color: '#5D87FF', fontSize: '16px', fontWeight: '600' }} gap={1} mb={2}>
                                    A solution for managing assets as a team
                                </Typography>
                                <Typography variant="h2" fontWeight={700} fontSize="36px">
                                    Decentralized application running fully on ICP’s blockchain
                                </Typography>
                            </motion.div>
                            <Box pt={3} pb={3}>
                                <motion.div
                                    initial={{ opacity: 0, translateY: 550 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 150,
                                        damping: 30,
                                        delay: 0.2,
                                    }}
                                >
                                    {faqs.map((faq) => (
                                        <Card key={faq.id} sx={{ mb: 2, p: 0 }}>
                                            <Accordion
                                                elevation={0}
                                                sx={{ mb: 2 }}
                                                expanded={expanded === faq.id}
                                                onChange={handleChange(faq.id, faq.videoUrl)}
                                            >
                                                <AccordionSummary
                                                    expandIcon={
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                width: '36px',
                                                                height: '36px',
                                                                borderRadius: '50%',
                                                                border: '1px solid #d9dbdf',
                                                                backgroundColor: expanded === faq.id ? '#3B82F6' : '#fff', // Active color
                                                                transition: 'background-color 0.3s',
                                                            }}
                                                        >
                                                            <ExpandMoreIcon sx={{ color: expanded === faq.id ? '#fff' : '#c7bfbf' }} />
                                                        </Box>
                                                    }
                                                    aria-controls={`panel${faq.id}-content`}
                                                    id={`panel${faq.id}-header`}
                                                    sx={{
                                                        backgroundColor: '#fff', // Light background color
                                                        borderRadius: '8px',
                                                    }}
                                                >
                                                    <Box display="flex" alignItems="center">
                                                        <CircularBadge number={faq.id} active={expanded === faq.id} />
                                                        <Typography sx={{ fontWeight: 'bold', color: '#000' }}>
                                                            {faq.question}
                                                        </Typography>
                                                    </Box>
                                                </AccordionSummary>
                                                <AccordionDetails sx={{ backgroundColor: '#fff' }}>
                                                    <Typography color="#5A6A85">{faq.answer}</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </Card>
                                    ))}
                                </motion.div>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Grid container spacing={1} p={2} justifyContent="center" alignItems="center">
                            <Box
                                component="video"
                                src={selectedVideo}
                                controls
                                playsInline
                                title="Video"
                                sx={{
                                    width: { xs: '80%', md: '55%' }, // Responsive width
                                    maxHeight: '500px',             // Limit maximum height
                                    aspectRatio: '9 / 16',          // Modern browsers support this
                                    objectFit: 'cover',             // Ensure proper video fitting
                                    borderRadius: '12px',           // Add rounded corners
                                    margin: '0 auto',               // Center on smaller screens
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default AssetControl;
