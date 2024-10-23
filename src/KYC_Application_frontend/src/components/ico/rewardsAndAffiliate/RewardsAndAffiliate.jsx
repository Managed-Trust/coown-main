import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ForumIcon from '@mui/icons-material/Forum';

const RewardItem = ({ icon, title, description, buttonText }) => (
  <Card
    variant="outlined"
    sx={{
      mb: 2,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      borderRadius: 2,
      border: '1px solid #e2e8f0',
    }}
  >
    <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ mr: 2 }}>
          {icon}
        </IconButton>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
      <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

export default function RewardsAndAffiliate() {
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, px: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
            Rewards
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: '#64748b', mb: 4,fontSize:'14px' }}>
            Participate in community tasks to earn rewards! Engage in various activities,
            collaborate with others, and contribute to community goals to unlock special
            bonuses.
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <RewardItem
            icon={<img src='/images/RewardImages/COOWN_IMAGE.svg' />}
            title="Complete group tasks"
            description="Participate in tasks and earn rewards"
            buttonText="Start"
          />
          <RewardItem
            icon={<img src='/images/RewardImages/TWITTER.svg' />}
            title="Follow COOWN on X"
            description="Follow us for more updates and rewards"
            buttonText="Follow"
          />
          <RewardItem
            icon={<img src='/images/RewardImages/YOUTUBE.svg' />}
            title="Follow COOWN on Youtube"
            description="Follow us for more updates and rewards"
            buttonText="Follow"
          />
          <RewardItem
            icon={<img src='/images/RewardImages/DISCORD.svg' />}
            title="Follow COOWN on Discord"
            description="Follow us for more updates and rewards"
            buttonText="Follow"
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={5}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
            Affiliate Link
          </Typography>
          <Typography variant="body2" paragraph sx={{ color: '#64748b', mb: 2,fontSize:'14px' }}>
            Create a custom invite code. If others use it to sign-up, you will get a one-time
            bonus when your affiliates upgrade to our enterprise plan.
          </Typography>
          <FormControlLabel
            control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
            label="Get rewards for invites"
            sx={{ mb: 2, '& .MuiTypography-root': { color: '#64748b' } }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              border: '1px solid #e2e8f0',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
                Create invite code
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Share this code with your friends
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Invite code"
                sx={{ mb: 2, mt: 2, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
              />
              <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
                Create code
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
