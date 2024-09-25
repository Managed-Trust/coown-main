import React from 'react';
import { Container, Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
  

const FAQSection = () => {
  return (
    <Box mt={10} mb={5}>
      <Container maxWidth="lg">
        {/* Title Section */}
        <Typography
          variant="h4"
          fontWeight={700}
          mb={4}
          textAlign="center"
        >
          Frequently asked questions
        </Typography>

        {/* FAQ Accordion */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {faqs.slice(0, 4).map((faq) => (
              <Accordion key={faq.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${faq.id}-content`}
                  id={`panel${faq.id}-header`}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {faq.id}. {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {faqs.slice(4, 8).map((faq) => (
              <Accordion key={faq.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${faq.id}-content`}
                  id={`panel${faq.id}-header`}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {faq.id}. {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FAQSection;
