import React from 'react';
import { Container, Grid, Box, Typography, TextField, MenuItem, Button, Select  } from '@mui/material';
import img from '../../../assets/images/landingpage/contact.png'; // Replace with the correct path
import CustomFormLabel from '../../forms/theme-elements/CustomFormLabel';

const ContactUs = () => {
  const subjects = [
    'ICO Participation',
    'Venture Capital',
    'Early Access',
    'Regional Operators',
    'Partnerships',
    'Support',
    'Customization',
];


  return (
    <Box mt={15} mb={10} id='contacts'>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h2" fontSize='36px' fontWeight={700} mt={2}>
              Get in touch
            </Typography>

            <form>
              <Grid container spacing={2} mb={-3}>
                <Grid item xs={12} sm={6}  mb={-3}>
                  <CustomFormLabel htmlFor="name">Your name</CustomFormLabel>
                  <TextField
                    id="name" placeholder="Your name"
                    fullWidth
                    InputProps={{
                      sx: { backgroundColor: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}  mb={-3}>
                  <CustomFormLabel htmlFor="email">Your email</CustomFormLabel>
                  <TextField
                    id="email" placeholder="Enter email"
                    fullWidth
                    InputProps={{
                      sx: { backgroundColor: 'white' },
                    }}
                  />
                </Grid>
                <Grid item xs={12}  mb={-3}>
                  <CustomFormLabel htmlFor="email">Subject* </CustomFormLabel>
                  <Select
                    fullWidth
                    value="Select subject"
                    sx={{
                      backgroundColor: 'white',
                      '& .MuiSelect-select': {
                        padding: '10px', // Adjust padding for better appearance
                      },
                    }}// Replace with the actual selected value
                  >
                    {subjects.map((subject) => (
                      <MenuItem key={subject} value={subject}>
                        {subject}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12}  mb={-1}>
                  <CustomFormLabel htmlFor="message">Your message </CustomFormLabel>
                  <TextField
                    fullWidth
                    placeholder="Leave your message"
                    multiline
                    rows={4}
                    variant="outlined"
                    InputProps={{
                      sx: { backgroundColor: 'white' },
                    }}
                  />
                </Grid>
                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          {/* Image Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} p={2} alignItems="center">
              <Box
                component="img"
                src={img}
                alt="Contact Us"
                sx={{
                  marginTop:'10px',
                  width: '100%',
                  maxHeight: '430px',
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

export default ContactUs;
