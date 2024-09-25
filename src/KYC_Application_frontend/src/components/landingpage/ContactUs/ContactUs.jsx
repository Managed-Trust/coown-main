import React from 'react';
import { Container, Grid, Box, Typography, TextField, MenuItem, Button, TextareaAutosize } from '@mui/material';
import img from '../../../assets/images/landingpage/contact.png'; // Replace with the correct path

const ContactUs = () => {
  const [subject, setSubject] = React.useState('');

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  return (
    <Box mt={10} mb={5} id='contacts'>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Form Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" fontWeight={700} mt={2} mb={3}>
              Get in touch
            </Typography>
            
            <form>
              <Grid container spacing={2} >
                {/* Name Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your name"
                    variant="outlined"
                    required
                  />
                </Grid>
                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your email"
                    variant="outlined"
                    required
                    type="email"
                  />
                </Grid>
                {/* Subject Field */}
                <Grid item xs={12}  mt={2}>
                  <TextField
                    fullWidth
                    select
                    label="Subject"
                    value={subject}
                    onChange={handleSubjectChange}
                    variant="outlined"
                    required
                  >
                    <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                    <MenuItem value="Support">Support</MenuItem>
                    <MenuItem value="Feedback">Feedback</MenuItem>
                  </TextField>
                </Grid>
                {/* Message Field */}
                <Grid item xs={12} mt={2}>
                  <TextareaAutosize
                    minRows={5}
                    placeholder="Leave your message"
                    style={{
                      width: '100%',
                      padding: '16.5px 14px',
                      borderRadius: '4px',
                      borderColor: 'rgba(0, 0, 0, 0.23)',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      fontSize: '16px',
                      fontFamily: 'Arial, sans-serif',
                    }}
                    required
                  />
                </Grid>
                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button variant="contained" color="primary"  sx={{ mt: 2 }}>
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
                  width: '100%',
                  maxHeight: '400px',
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
