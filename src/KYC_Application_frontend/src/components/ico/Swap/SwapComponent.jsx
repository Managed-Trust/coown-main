// import React from 'react';
// import { Container, Grid, Box, Typography, TextField, Button, Link, Paper } from '@mui/material';
// import InfoOutlined from '@mui/icons-material/InfoOutlined';

// const SwapComponent = () => {

//   const handleClick = () => {
//     swal({
//       title: 'Swap Coming Soon!',
//       text: 'Stay tuned, the swap feature will be available soon.',
//       icon: 'info',
//       button: {
//         text: 'OK',
//         className: 'btn btn-primary',
//       },
//     });
//   };

//   return (
//     <Box mt={10} mb={15}>
//       <Container maxWidth="lg">
//         <Grid container spacing={4} >
//           {/* Text Section */}
//           <Grid item xs={12} md={6} mt={2}>
//             <Typography variant="h2" fontWeight="bold" gutterBottom mb={2}>
//               Swap ICP for COOWN tokens
//             </Typography>
//             <Typography variant="body1" color="#5A6A85" gutterBottom mb={2} fontSize={16}>
//               Exchange of $DUMMY token is locked during the crowdfunding and presale stages.
//               The initial exchange offering is planned in Q2–Q3, 2025.
//             </Typography>
//             <Typography variant="body2" color="primary" display={'flex'}>
//               <InfoOutlined color="primary" /> &nbsp; &nbsp;  <Typography variant="body1" color="primary" mt={0.2}> Learn about staking</Typography>
//             </Typography>
//           </Grid>

//           {/* Swap Form Section */}
//           <Grid item xs={12} md={6}>
//             <Paper elevation={2} sx={{ p: 3, bgcolor: '#F4F8FB' }}>
//               <Box mb={2}>
//                 <Typography variant="body1" fontWeight="bold" gutterBottom>
//                   Enter ICP Amount
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="ICP"
//                   style={{ background:'white' }}

//                 />
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="USD"
//                   style={{ marginTop:'10px',background:'white' }}
//                 />
//                 <Typography variant="body2" color="textSecondary" mt={1} fontSize={14} fontWeight={600}>
//                   You will receive  <Link href="#" color="primary" underline="hover">100 $DUMMY</Link> tokens
//                 </Typography>
//               </Box>
//               <Button
//             onClick={handleClick} variant="contained" color="primary" sx={{ py: 1.5,px:3,mt:3, borderRadius:'5px' }}>
//                 Swap (Comming Soon)
//               </Button>
//             </Paper>
//             <Box mt={3} display="flex" gap={2}>
//               <Box bgcolor="#F3F4F6" px={2} py={1} borderRadius={5}>
//                 <Typography variant="body2" fontWeight={600}>
//                   1 ICP = $9.15
//                 </Typography>
//               </Box>
//               <Box bgcolor="#F3F4F6" px={2} py={1} borderRadius={5}>
//                 <Typography variant="body2"  fontWeight={600}>
//                   1 $DUMMY = $0.50
//                 </Typography>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//   );
// };

// export default SwapComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from "@mui/material";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import { useConnect } from "@connect2ic/react";
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../../declarations/Token";
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Adjust as needed for your environment

const SwapComponent = () => {
  const [icpAmount, setIcpAmount] = useState("");
  const [coOwnTokens, setCoOwnTokens] = useState(0);
  const [ICP_Price, setICPPrice] = useState(0);
  const coOwnRate = 0.5; // $DUMMY token rate in USD
  const { isConnected, principal } = useConnect();
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  // Initialize auth client and fetch ICP price on component mount
  useEffect(() => {
    init();
    fetchICPPrice();
  }, []);

  // Initialize AuthClient
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

  // Fetch ICP price from CoinGecko
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

  // Handle input change for ICP amount
  const handleIcpChange = (event) => {
    const inputIcp = event.target.value;
    setIcpAmount(inputIcp);

    if (ICP_Price > 0) {
      const usdValue = inputIcp * ICP_Price; // Convert ICP to USD
      const calculatedCoOwn = (usdValue / coOwnRate).toFixed(2); // USD to COOWN conversion
      setCoOwnTokens(calculatedCoOwn);
    }
  };

  // Handle the swap action
  const handleSwap = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    if (authClient) {
      try {
        const authenticatedCanister = createActor(
          "ryjl3-tyaaa-aaaaa-aaaba-cai",
          {
            agentOptions: {
              identity,
            },
          }
        );

        const transferResult = await authenticatedCanister.icrc1_transfer({
          from: {
            owner: Principal.fromText(principal),
            subaccount: [],
          },
          to: {
            owner: Principal.fromText(
              "xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe"
            ),
            subaccount: [],
          },
          fee: [10000n],
          memo: [],
          from_subaccount: [],
          created_at_time: [],
          amount: Number(parseInt(icpAmount * 10000)),
        });

        if (transferResult.Ok) {
          alert(
            `Swap Successful! You will receive ${coOwnTokens} $DUMMY tokens.`
          );
          try {

            // Call the backend function to perform the swap
            const result = await ledger.call(
              "sendTokensToUser",
              Principal.fromText(principal),
              coOwnTokens * 1000000000,
              "mysecret"
            );

            // Handle the response
            if (result.includes("Transfer successful")) {
              alert(result);
            } else {
              alert(`Swap failed: ${result}`);
            }
          } catch (error) {
            console.error("Error performing the token swap:", error);
            alert("Error performing the token swap.");
          }
        } else {
          alert(`Swap Failed: ${transferResult.Err}`);
        }
      } catch (error) {
        console.error("Error during the swap:", error);
        alert("An error occurred during the swap.");
      }
    }
  };

  return (
    <Box mt={10} mb={15}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Text Section */}
          <Grid item xs={12} md={6} mt={2}>
            <Typography variant="h2" fontWeight="bold" gutterBottom mb={2}>
              Swap ICP for COOWN tokens
            </Typography>
            <Typography
              variant="body1"
              color="#5A6A85"
              gutterBottom
              mb={2}
              fontSize={16}
            >
              Exchange of $DUMMY token is available now. Enter the ICP amount to
              swap.
            </Typography>
            <Typography variant="body2" color="primary" display={"flex"}>
              <InfoOutlined color="primary" /> &nbsp; &nbsp;{" "}
              <Typography variant="body1" color="primary" mt={0.2}>
                Learn about staking
              </Typography>
            </Typography>
          </Grid>

          {/* Swap Form Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: "#F4F8FB" }}>
              <Box mb={2}>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  Enter ICP Amount
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="ICP"
                  value={icpAmount}
                  onChange={handleIcpChange}
                  style={{ background: "white" }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  mt={1}
                  fontSize={14}
                  fontWeight={600}
                >
                  You will receive{" "}
                  <Link href="#" color="primary" underline="hover">
                    {coOwnTokens} $DUMMY
                  </Link>{" "}
                  tokens
                </Typography>
              </Box>
              <Button
                onClick={handleSwap}
                variant="contained"
                color="primary"
                sx={{ py: 1.5, px: 3, mt: 3, borderRadius: "5px" }}
              >
                Swap Tokens
              </Button>
            </Paper>
            <Box mt={3} display="flex" gap={2}>
              <Box bgcolor="#F3F4F6" px={2} py={1} borderRadius={5}>
                <Typography variant="body2" fontWeight={600}>
                  1 ICP = ${ICP_Price.toFixed(2)}
                </Typography>
              </Box>
              <Box bgcolor="#F3F4F6" px={2} py={1} borderRadius={5}>
                <Typography variant="body2" fontWeight={600}>
                  1 $DUMMY = $0.50
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SwapComponent;
