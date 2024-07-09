import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const groupDetails = {
  name: 'Group Title',
  description: 'Description of the group.',
  imageUrl: 'https://as2.ftcdn.net/v2/jpg/03/18/25/19/1000_F_318251936_EukIhmw8bEqECFwhePbp11c6gWJ1ChNG.jpg',
  balances: [
    { currency: 'Bitcoin', amount: 1.5, symbol: 'BTC' },
    { currency: 'Ethereum', amount: 10, symbol: 'ETH' },
    { currency: 'Litecoin', amount: 25, symbol: 'LTC' },
  ],
  isAdmin: true, // Assume the user is an admin for demonstration
  users: [
    { name: 'John Doe', avatarUrl: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg', role: 'Member' },
    { name: 'Jane Smith', avatarUrl: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg', role: 'Admin' },
    { name: 'Sam Wilson', avatarUrl: 'https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg', role: 'Moderator' },
  ],
};

const GroupDetailPage = () => {
  const { groupId } = useParams();

  // You can fetch the group details based on groupId here

  return (
    <Container>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={groupDetails.imageUrl}
          alt={groupDetails.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h2" component="div">
            {groupDetails.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {groupDetails.description}
          </Typography>
          <Box mt={2}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" color="text.primary">
                  <AccountBalanceWalletIcon /> Balances
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  {groupDetails.balances.map((balance, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper elevation={3} style={{ padding: '16px', textAlign: 'center' }}>
                        <Typography variant="h6" color="text.primary">
                          {balance.currency}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {balance.amount} {balance.symbol}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>
        </CardContent>
      </Card>
      
      {groupDetails.isAdmin && (
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="primary">
            Add Member
          </Button>
          <Button variant="contained" color="secondary">
            Remove Member
          </Button>
        </Box>
      )}
      
      <Typography variant="h4" component="div" style={{ marginTop: '20px' }}>
        Group Members
      </Typography>
      <List>
        {groupDetails.users.map((user, index) => (
          <ListItem key={index} secondaryAction={groupDetails.isAdmin && (
            <Button variant="outlined" color="secondary" size="small">
              Remove
            </Button>
          )}>
            <ListItemAvatar>
              <Avatar src={user.avatarUrl} alt={user.name} />
            </ListItemAvatar>
            <ListItemText 
              primary={user.name} 
              secondary={user.role} 
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GroupDetailPage;
