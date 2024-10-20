import { useState,useEffect } from "react";
import { Box, Menu, Typography, Button, Divider, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { IconChevronDown, IconHelp } from "@tabler/icons";
import AppLinks from "./AppLinks";
import QuickLinks from "./QuickLinks";
import React from "react";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";

import ic from "ic0";

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

const AppDD = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
 const navigate = useNavigate();
  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });
  // useEffect(() => {
  //   const checkUserProfile = async () => {
  //     if (isConnected && principal) {
  //       try {
  //         console.log("Principal:",principal);
  //         const profileResponse = await ledger.call("getUser", principal);
  //         const hasProfile = profileResponse[0];
  //         console.log("Profile:", profileResponse);
  //         if (!hasProfile) {
  //           navigate("/forms/form-horizontal");
  //         }
  //       } catch (e) {
  //         console.log("Error checking user profile:", e);
  //       }
  //     }
  //   };
  //   checkUserProfile();
  // }, [isConnected, principal, navigate]);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <>
      <Box>
        {/* <Button
          aria-label="show 11 new notifications"
          color="inherit"
          variant="text"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          sx={{
            bgcolor: anchorEl2 ? "primary.light" : "",
            color: anchorEl2
              ? "primary.main"
              : (theme) => theme.palette.text.secondary,
          }}
          onClick={handleClick2}
          endIcon={
            <IconChevronDown
              size="15"
              style={{ marginLeft: "-5px", marginTop: "2px" }}
            />
          }
        >
          Apps
        </Button> */}
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "850px",
            },
            "& .MuiMenu-paper ul": {
              p: 0,
            },
          }}
        >
          <Grid container>
            <Grid item sm={8} display="flex">
              <Box p={4} pr={0} pb={3}>
                <AppLinks />
                <Divider />
                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "flex",
                    },
                  }}
                  alignItems="center"
                  justifyContent="space-between"
                  pt={2}
                  pr={4}
                >
                  <Link to="/faq">
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      color="textPrimary"
                      display="flex"
                      alignItems="center"
                      gap="4px"
                    >
                      <IconHelp width={24} />
                      Frequently Asked Questions
                    </Typography>
                  </Link>
                  <Button variant="contained" color="primary">
                    Check
                  </Button>
                </Box>
              </Box>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item sm={4}>
              <Box p={4}>
                <QuickLinks />
              </Box>
            </Grid>
          </Grid>
        </Menu>
      </Box>
      {/* <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/apps/chats"
        component={Link}
      >
        Chat
      </Button> */}
      {/* <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/apps/calendar"
        component={Link}
      >
        Calendar
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        to="/apps/email"
        component={Link}
      >
        Email
      </Button> */}

      {/* <div
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
      > */}
        {/* <ConnectButton /> */}
        {/* <ConnectDialog dark={false} /> */}
      {/* </div> */}
    </>
  );
};

export default AppDD;
