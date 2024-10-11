import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../declarations/Token";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";
// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
  },
});

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(4px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
}));

const GlowingTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textShadow: "0 0 10px rgba(63, 81, 181, 0.5)",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(1, 3),
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));


export default function ICPTokenSwap() {
  const [icpAmount, setIcpAmount] = useState("");
  const [coOwnTokens, setCoOwnTokens] = useState(0);
  const coOwnRate = 0.5; // 1 $COOWN is $0.50
  const [ICP_Price, setICPPrice] = useState(0);
  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    init();
    fetchICPPrice();
  }, []);

  const fetchICPPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "internet-computer",
            vs_currencies: "usd",
          },
        }
      );
      const price = response.data["internet-computer"].usd;
      setICPPrice(price);
    } catch (error) {
      console.error("Error fetching ICP price:", error);
    }
  };

  const init = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
    if (await client.isAuthenticated()) {
      handleAuthenticated(client);
    }
  };

  const handleAuthenticated = async (client) => {
    const identity = await client.getIdentity();
    setIdentity(identity);
  };

  const handleIcpChange = (event) => {
    const inputIcp = event.target.value;
    setIcpAmount(inputIcp);
    if (ICP_Price > 0) {
      const usdValue = inputIcp * ICP_Price;
      const calculatedCoOwn = (usdValue / coOwnRate).toFixed(2);
      setCoOwnTokens(calculatedCoOwn);
    }
  };

  const handleSwap = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    if (authClient) {
      const authenticatedCanister = createActor("ryjl3-tyaaa-aaaaa-aaaba-cai", {
        agentOptions: {
          identity,
        },
      });
      try {
        // let store2 = await authenticatedCanister.icrc1_transfer({
        //   from: {
        //     owner: Principal.fromText(principal),
        //     subaccount: [],
        //   },
        //   to: {
        //     owner: Principal.fromText(
        //       "xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe"
        //     ),
        //     subaccount: [],
        //   },
        //   fee: [10000n],
        //   memo: [],
        //   from_subaccount: [],
        //   created_at_time: [],
        //   amount: BigInt(parseInt(Number(icpAmount) * 10000)),
        // });
        // console.log(store2);
        alert(`You will receive ${coOwnTokens} $COOWN tokens.`);
        alert("Transaction Successful");
      } catch (error) {
        console.error("Error performing the token swap:", error);
        alert("Error performing the token swap.");
      }
    } else {
      console.log("Authentication client not initialized");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <ConnectDialog />
      <CssBaseline />
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />

        <Box sx={{ flexGrow: 1, p: 3 }}>
          <StyledCard sx={{ mb: 4 }}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={8}>
                  <GlowingTypography variant="h4" gutterBottom>
                    Swap ICP for $COOWN Tokens
                  </GlowingTypography>
                  <Typography variant="body1" color="text.secondary">
                    Exchange your ICP tokens for $COOWN tokens at the current
                    market rate.
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6">
                        ${ICP_Price.toFixed(2)}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Current ICP Price
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant="h6">$0.50</Typography>
                      <Typography variant="caption" color="text.secondary">
                        $COOWN Price
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Enter Swap Amount
                  </Typography>
                  <TextField
                    fullWidth
                    label="ICP Amount"
                    variant="outlined"
                    type="number"
                    value={icpAmount}
                    onChange={handleIcpChange}
                    sx={{ mb: 2 }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    You will receive: {coOwnTokens} $COOWN Tokens
                  </Typography>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSwap}
                    disabled={!isConnected || !icpAmount}
                  >
                    Swap Tokens
                  </StyledButton>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Swap Details
                  </Typography>
                  <TableContainer component={Paper} elevation={0}>
                    <Table size="small">
                      <TableBody>
                        <TableRow>
                          <TableCell>ICP Amount</TableCell>
                          <TableCell align="right">
                            {icpAmount || "0"} ICP
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>$COOWN Tokens</TableCell>
                          <TableCell align="right">
                            {coOwnTokens} $COOWN
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Exchange Rate</TableCell>
                          <TableCell align="right">
                            1 ICP = {(ICP_Price / coOwnRate).toFixed(2)} $COOWN
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
