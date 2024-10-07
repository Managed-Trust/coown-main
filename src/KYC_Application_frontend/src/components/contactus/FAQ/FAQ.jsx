import React, { useState } from 'react';
import { Container, Card, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    id: '01',
    question: 'How does COOWN ensure the security of my digital assets?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
  },
  {
    id: '02',
    question: 'Can COOWN accommodate various digital currencies?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
  },
  {
    id: '03',
    question: 'What sets COOWN apart in digital asset management?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
  },
  {
    id: '04',
    question: 'What is the localization and go-to-market strategy?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
  },
  {
    id: '05',
    question: 'Who can benefit from COOWN?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
  },
  {
    id: '06',
    question: 'How can I engage with COOWN?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
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

const FAQs = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  return (
    <Box mt={10} mb={5}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Typography
          variant="h2"
          fontWeight={700}
          mb={4}
          textAlign="center"
        >
          Frequently Asked Questions
        </Typography>

        {/* FAQ Accordion */}
        <Grid container spacing={2}>
            {faqs.map((faq) => (
          <Grid item xs={12} md={6}>
              <Card key={faq.id} sx={{ mb: 2, p: 0 }}>
                <Accordion elevation={0} sx={{ mb: 1 }}
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
                    <Typography>{faq.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQs;
