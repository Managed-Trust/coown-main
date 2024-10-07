import React,{useState } from 'react';
import { Container, Card, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { motion } from 'framer-motion';
import img from '../../../assets/images/products/Frame 1000004276.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
      id: '01',
      question: 'Our concept',
      answer: 'Empowering groups to manage assets as a team within a multi signature wallet using the latest blockchain technology.',
    },
    {
      id: '02',
      question: 'User Group',
      answer: 'Empowering groups to manage assets as a team within a multi signature wallet using the latest blockchain technology.',
   },
    {
      id: '03',
      question: 'Shared assets',
      answer: 'Empowering groups to manage assets as a team within a multi signature wallet using the latest blockchain technology.',
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

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    }

    return (
        <Box mt={10} mb={5}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
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
                                <Typography variant="body" sx={{ color: '#5D87FF' }} gap={1} mb={2}>
                                    A solution for managing assets as a team
                                </Typography>
                                <Typography variant="h2" fontWeight={700} >
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
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            {faqs.slice(0, 3).map((faq) => (
                                                <Card key={faq.id} sx={{ mb: 2, p: 0 }}>
                                                    <Accordion elevation={0} sx={{ mb: 2 }}
                                                        expanded={expanded === faq.id}
                                                        onChange={handleChange(faq.id)} >
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
                                                                    {expanded === faq.id ? (
                                                                        <ExpandMoreIcon sx={{ color: '#fff' }} />
                                                                    ) : (
                                                                        <ExpandMoreIcon sx={{ color: '#c7bfbf' }} />
                                                                    )}
                                                                </Box>
                                                            }
                                                            aria-controls={`panel${faq.id}-content`}
                                                            id={`panel${faq.id}-header`}
                                                            sx={{
                                                                backgroundColor: '#fff', // Light background color
                                                                borderRadius: '8px'
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
                                                            <Typography>{faq.answer}</Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Card>
                                            ))}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            {faqs.slice(4, 8).map((faq) => (
                                                <Card key={faq.id} sx={{ mb: 2, p: 0 }}>
                                                    <Accordion key={faq.id} elevation={0} sx={{ mb: 1 }}
                                                        expanded={expanded === faq.id}
                                                        onChange={handleChange(faq.id)}>
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
                                                                    {expanded === faq.id ? (
                                                                        <ExpandMoreIcon sx={{ color: '#fff' }} />
                                                                    ) : (
                                                                        <ExpandMoreIcon sx={{ color: '#c7bfbf' }} />
                                                                    )}
                                                                </Box>
                                                            }
                                                            aria-controls={`panel${faq.id}-content`}
                                                            id={`panel${faq.id}-header`}
                                                            sx={{
                                                                backgroundColor: '#fff',
                                                                borderRadius: '8px',
                                                                '&:hover': {
                                                                    backgroundColor: '#f5f5f5',
                                                                },
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
                                                            <Typography>{faq.answer}</Typography>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </Card>
                                            ))}
                                        </Grid>
                                    </Grid>
                                </motion.div>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid container spacing={1} p={2} alignItems="center">
                            <Box
                                component="img"
                                src={img}
                                alt="Tech Innovators"
                                sx={{
                                    width: '55%',
                                    maxHeight: '500px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
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
