import React from 'react';
import DashboardCard from '../../../../../components/shared/DashboardCard';
import {
  Typography,
  Avatar,
  ListItemAvatar,
  Grid,
  Button,
  Box,
} from '@mui/material';
import userImg from '../../../../../assets/images/profile/user-1.jpg';


const RecentChat = ({ }) => {



  return (

    <DashboardCard title="Recent Transaction" subtitle="Balance change">
     
        <Box>

          <Box display="flex">
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box width="100%">
              <Box display="flex">
                <ListItemAvatar>

                  <Avatar src={userImg} alt="img" sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <Box>
                  <Typography variant="body2" color="grey.400" mb={1}>
                    Andrew,{' '}
                    2 hours
                    ago
                  </Typography>

                  <Box
                    mb={2}
                    sx={{
                      p: 1,
                      backgroundColor: 'grey.100',
                      mr: 'auto',
                      maxWidth: '320px',
                    }}
                  >
                    if I don't like something. I'll stay away from it
                  </Box>

                </Box>
              </Box>
              <Box display="flex">
                <ListItemAvatar>

                  <Avatar src={userImg} alt="img" sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <Box>
                  <Typography variant="body2" color="grey.400" mb={1}>
                    Andrew,{' '}
                    2 hours
                    ago
                  </Typography>

                  <Box
                    mb={2}
                    sx={{
                      p: 1,
                      backgroundColor: 'grey.100',
                      mr: 'auto',
                      maxWidth: '320px',
                    }}
                  >
                    if I don't like something. I'll stay away from it
                  </Box>

                </Box>
              </Box>
              <Box display="flex">
                <ListItemAvatar>

                  <Avatar src={userImg} alt="img" sx={{ width: 40, height: 40 }} />
                </ListItemAvatar>
                <Box>
                  <Typography variant="body2" color="grey.400" mb={1}>
                    Andrew,{' '}
                    2 hours
                    ago
                  </Typography>

                  <Box
                    mb={2}
                    sx={{
                      p: 1,
                      backgroundColor: 'grey.100',
                      mr: 'auto',
                      maxWidth: '320px',
                    }}
                  >
                    if I don't like something
                  </Box>

                </Box>
              </Box>
              <Grid xs={12}>
                <Button variant="outlined" color="primary" sx={{ width: '100%', mt: "35px !important" }}>
                  Open group chat
                </Button></Grid>

            </Box>
            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
          </Box>
        </Box>
     
    </DashboardCard>
  );
};

export default RecentChat;
