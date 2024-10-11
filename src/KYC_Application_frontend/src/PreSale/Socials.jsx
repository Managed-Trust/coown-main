import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  ThemeProvider,
  createTheme,
  CssBaseline,
  InputAdornment,
  AppBar,
  Toolbar,
  IconButton,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { Magnet, Info, Copy, Twitter, Menu } from "lucide-react";
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import Header from "./Components/Header";
// Custom dark theme for the ICP/COOWN branding
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00B7C2", // COOWN's color branding
    },
    secondary: {
      main: "#FFD700", // Accent color for highlights
    },
    background: {
      default: "#0E0E0E", // Dark background for better contrast
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body2: {
      color: "#BBBBBB",
    },
  },
});

// Styled components with improved UI
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px 0 rgba(0, 183, 194, 0.4)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 50px 0 rgba(0, 183, 194, 0.7)",
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(90deg, #00B7C2 0%, #FFD700 100%)",
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: "white",
  height: 48,
  padding: "0 30px",
  fontWeight: 600,
  "&:hover": {
    background: "linear-gradient(90deg, #FFD700 0%, #00B7C2 100%)",
  },
}));

const StatsCard = styled(Card)(({ theme, color }) => ({
  backgroundColor: color,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(2),
  boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
  "& h4": {
    fontWeight: 700,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));


export default function COOWNDashboard() {
  const [inviteCode, setInviteCode] = useState("");

  return (
    <ThemeProvider theme={darkTheme}>
      <ConnectDialog />
      <CssBaseline />
      <Header />
      <Box sx={{ flexGrow: 1, minHeight: "100vh", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          COOWN Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to COOWN, a decentralized platform where you can manage group
          wallets, participate in shareholder voting, and enjoy seamless, secure
          decentralized operations on the Internet Computer (ICP) blockchain.
        </Typography>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Follow COOWN on Social Media and Earn Rewards
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6">
                  Follow Us on Twitter <Twitter size={16} />
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Follow COOWN on Twitter and earn rewards.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Twitter />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Follow and Earn
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
          {/* Add more socials like Instagram, Discord, etc. */}
          <Grid item xs={12} sm={6} md={3}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6">
                  Invite Code <Info size={16} />
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter Code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  sx={{ mt: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button>Submit</Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Community Tasks
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">Complete Group Tasks</Typography>
                    <Typography variant="body2">
                      Participate in tasks and earn rewards.
                    </Typography>
                  </Box>
                  <Button variant="contained">Start Task</Button>
                </Box>
              </CardContent>
            </StyledCard>
            <StyledCard sx={{ mt: 2 }}>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h6">Stay Updated</Typography>
                    <Typography variant="body2">
                      Follow COOWN for updates and more rewards.
                    </Typography>
                  </Box>
                  <Button variant="contained" startIcon={<Twitter />}>
                    Follow
                  </Button>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
