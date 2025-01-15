import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
  Button,
} from "@mui/material";
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
import swal from "sweetalert";
import WalletComponent from "../../../wallet/wallet";

export default function Connect() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect mobile view

  const { isConnected, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });

  const handleClick = () => {
    swal({
      title: "Swap Coming Soon!",
      text: "Stay tuned, the swap feature will be available soon.",
      icon: "info",
      button: {
        text: "OK",
        className: "btn btn-primary",
      },
    });
  };

  // Function to determine which provider is connected
  const getConnectedProvider = () => {
    if (isConnected) {
      if (activeProvider?.meta.id === "plug") {
        return { name: "Plug Wallet", icon: "/images/logos/plug_pic.svg" };
      } else if (activeProvider?.meta.id === "ii") {
        return { name: "Internet Identity", icon: "/images/logos/icp_pic.svg" };
      }
    }
    return null;
  };

  const connectedProvider = getConnectedProvider();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 1000,
          bgcolor: "#F8F6FF",
          borderRadius: 3,
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "space-between", // Center content on mobile
            flexDirection: isMobile ? "column" : "row", // Column layout for mobile
            gap: isMobile ? 2 : 0, // Add gap between elements on mobile
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mr: isMobile ? 0 : 2, // Adjust margin for mobile
                mb: isMobile ? 2 : 0, // Add margin bottom on mobile
                gap: "10px",
              }}
            >
              {/* Show either Plug or Internet Identity icon and name if connected */}
              {connectedProvider ? (
                <img
                  src={connectedProvider.icon}
                  alt={`${connectedProvider.name} Logo`}
                />
              ) : (
                <>
                  <img src="/images/logos/icp_pic.svg" alt="ICP Logo" />
                  {/* <img src="/images/logos/plug_pic.svg" alt="Plug Wallet Logo" /> */}
                </>
              )}
            </Box>
            <Box textAlign={isMobile ? "center" : "left"}>
              {" "}
              {/* Center text on mobile */}
              {connectedProvider ? (
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  {connectedProvider.name} is connected
                </Typography>
              ) : (
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Connect with Internet Identity
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Your $COOWN will be saved to this wallet, and may remain hidden
                initially
              </Typography>
            </Box>
          </Box>
          {/* <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '20px',
              padding: '6px 16px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
          >
            Coming Soon
          </Button> */}
          {isConnected ? (
            <>
              <WalletComponent />
            </>
          ) : (
            <>
              {" "}
              <ConnectButton />
            </>
          )}
          {/* <ConnectButton /> */}
          <ConnectDialog dark={false} />
        </CardContent>
      </Card>
    </Box>
  );
}
