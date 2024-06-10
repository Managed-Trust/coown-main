import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Typography, Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { CurrencyExchange } from '@mui/icons-material'; // You can use any suitable icon

const Expence = () => {
  const theme = useTheme();

  return (
    <DashboardCard>
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        <CurrencyExchange style={{ fontSize: 40, color: theme.palette.primary.main }} />
        <Typography variant="h5" mt={1}>
          1 ETH = 1000 TWZ
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          1 ETH = 254.05 USD
        </Typography>
      </Box>
    </DashboardCard>
  );
};

export default Expence;
