import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box } from '@mui/material';
import DashboardCard from '../../../../components/shared/DashboardCard';
import { IconDatabase, IconMail, IconMapPin, IconPhone, IconScreenShare } from '@tabler/icons';
import img1 from '../../../../assets/images/profile/user-1.jpg';
import img2 from '../../../../assets/images/profile/user-2.jpg';
import img3 from '../../../../assets/images/profile/user-3.jpg';

const Management = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const warning = theme.palette.warning.main;
  const warninglight = theme.palette.warning.light;
  const secondary = theme.palette.secondary.main;
  const secondarylight = theme.palette.secondary.light;
  const success = theme.palette.success.main;
  const successlight = theme.palette.success.light;

  const stats = [
    {
      title: 'Alice Johnson',
      subtitle: 'Operator group owner',
      color: primary,
      lightcolor: primarylight,
      icon: img1,
    },
    {
      title: 'Bob Smith',
      subtitle: 'AML group admin',
      color: secondary,
      lightcolor: secondarylight,
      icon: img2,
    },
    {
      title: 'David Lee',
      subtitle: 'CRM group admin',
      color: warning,
      lightcolor: warninglight,
      icon: img3,
    },
  ];

  return (
    <DashboardCard title="Management" subtitle='Operator s and Administrators '>
      <>
        <Stack spacing={3} mt={5}>
          {stats.map((stat, i) => (
            <Stack
              direction="row"
              spacing={3}
              justifyContent="space-between"
              alignItems="center"
              key={i}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: stat.lightcolor, color: stat.color, width: 40, height: 40 }}
                  src={stat.icon}
                />
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <img src='/images/logos/message-icon.jpg'/>
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Management;
