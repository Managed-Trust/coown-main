import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Box
} from "@mui/material";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@connect2ic/react";

// Improved Header with fixed size and enhanced styles
const Header = () => {
  return (
    <AppBar
      position="fixed"
      color="transparent"
      elevation={3}
      sx={{
        height: "70px", // Fixed height
        mb: 4,
        backdropFilter: "blur(10px)", // Slight blur for a modern look
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)", // Subtle bottom border
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Menu Icon for smaller screens (optional) */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" }, // Hide on larger screens
            }}
          >
            <Menu />
          </IconButton>

          {/* Title/Logo */}
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700, // Bold for logo emphasis
              fontSize: "1.8rem", // Larger size for logo
            }}
          >
            COOWN Prelaunch
          </Typography>

          {/* Navigation Buttons */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" }, // Show on medium to large screens
              gap: 3, // Even spacing between buttons
            }}
          >
            <Button
              color="inherit"
              component={Link}
              to="/prelaunch"
              sx={{
                textTransform: "none",
                fontWeight: 500, // Medium font weight for buttons
              }}
            >
              Token Swap
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/prelaunch-social"
              sx={{
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Social Reward
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/prelaunch-nft"
              sx={{
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              NFT
            </Button>
          </Box>

          {/* Wallet Connect Button */}
          <Box sx={{ ml: 2 }}>
            <ConnectButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
