import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography, Button, Link } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { Download } from '@mui/icons-material'; // Import an appropriate icon for the download button

const Sales = () => {
  const theme = useTheme();

  return (
    <DashboardCard>
      <Box display="flex" flexDirection="column" alignItems="center" p={2}>
        <Typography variant="h6">
          Token Name: <Link href="#" color="primary" underline="none">TokenWiz</Link>
        </Typography>
        <Typography variant="h6" mt={1}>
          Ticket Symbol: <Link href="#" color="primary" underline="none">TWZ</Link>
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<Download />}
          sx={{ mt: 3 }}
          href="#"
        >
          Download Whitepaper
        </Button>
      </Box>
    </DashboardCard>
  );
};

export default Sales;
