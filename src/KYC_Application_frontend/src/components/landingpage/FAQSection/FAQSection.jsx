import React, { useState } from 'react';
import { Container, Card, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
  {
    id: '01',
    question: 'What documents are required for KYC verification?',
    answer: 'KYC verification typically requires a government-issued ID (such as a passport or driver’s license) and proof of address documents like a utility bill or bank statement.',
  },
  {
    id: '02',
    question: 'How long does the KYC verification process take?',
    answer: 'The KYC verification process usually takes between 24-48 hours, depending on the volume of requests and the accuracy of the submitted documents.',
  },
  {
    id: '03',
    question: 'Is my data secure during the KYC process?',
    answer: 'Yes, we ensure that your data is encrypted and securely stored. We comply with all relevant data protection regulations to safeguard your personal information.',
  },
  {
    id: '04',
    question: 'Why is KYC verification necessary?',
    answer: 'KYC is essential to prevent fraud, money laundering, and ensure compliance with regulatory standards. It helps verify the identity of customers using our platform.',
  },
  {
    id: '05',
    question: 'What is the admin dashboard?',
    answer: 'The admin dashboard gives business owners and administrators a comprehensive overview of their business. It provides real-time insights into sales, traffic, and other key metrics.',
  },
  {
    id: '06',
    question: 'What should an admin dashboard include?',
    answer: 'An admin dashboard should include key performance indicators, sales reports, user analytics, and other relevant business metrics.',
  },
  {
    id: '07',
    question: 'Why should I buy from AdminMart?',
    answer: 'AdminMart provides high-quality admin templates with cutting-edge designs and robust support, making it a great choice for your business.',
  },
  {
    id: '08',
    question: 'What is included in Support?',
    answer: 'Support includes regular updates, bug fixes, and access to our support team to assist with any issues you might face.',
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

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  }
  return (
    <Box mt={15} mb={5}>
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
          <Grid item xs={12} md={6}>
            {faqs.slice(0, 4).map((faq) => (     
              <Card key={faq.id} sx={{ mb: 2,p:0 }}>
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
                      '&:hover': {
                        backgroundColor: '#f5f5f5', // Slightly darker on hover
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
          <Grid item xs={12} md={6}>
            {faqs.slice(4, 8).map((faq) => (              
              <Card key={faq.id} sx={{ mb: 2,p:0 }}>
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
      </Container>
    </Box>
  );
};

export default FAQSection;
