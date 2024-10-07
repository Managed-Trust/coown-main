import React from 'react';
import { Container, Grid, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material';
import CorporateFareIcon from '@mui/icons-material/CorporateFare'; // for Corporations
import BusinessIcon from '@mui/icons-material/Business'; // for Business Units
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'; // for Institutions
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom'; // for Families
import { motion } from 'framer-motion';

const userGroups = [
  { icon: <CorporateFareIcon sx={{ color: '#5D87FF' }} />, title: 'Corporations', description: 'Digitize shares for raising capital, voting, and controlling executive spending.' },
  { icon: <BusinessIcon sx={{ color: '#5D87FF' }} />, title: 'Business Units', description: 'Manage resources with accounts for legal entities, employees, and affiliates.' },
  { icon: <AccountBalanceIcon sx={{ color: '#5D87FF' }} />, title: 'Institutions', description: 'Ensure transparency and efficiency, with the option for a dedicated network.' },
  { icon: <FamilyRestroomIcon sx={{ color: '#5D87FF' }} />, title: 'Families', description: 'Manage shared assets with daily and monthly spending limits.' },
];

const CoownAddress = () => {
  return (
    <Box mt={15} mb={10}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <motion.div
                initial={{ opacity: 0, translateY: 50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: '#5D87FF', fontWeight: 'bold' }}
                  mb={2}
                >
                  Tailored solutions for diverse user groups
                </Typography>
                <Typography
                  variant="h3"
                  fontWeight={700}
                  sx={{
                    fontSize: {
                      lg: '36px',
                      xs: '25px'
                    },
                    lineHeight: {
                      lg: '43px',
                      xs: '30px'
                    }
                  }}
                >
                  Coown addresses various organizational and financial needs
                </Typography>
              </motion.div>
            </Box>
          </Grid>

          {/* Right side list with icons */}
          <Grid item xs={12} md={6}>
            <List>
              {userGroups.map((group, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: '#ECF2FF' }}>
                      {group.icon}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={<Typography variant="h6" fontWeight={600}>{group.title}</Typography>}
                    secondary={<Typography variant="body2" color="textSecondary">{group.description}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoownAddress;
