// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Button,
//   Chip,
//   Stack,
//   LinearProgress,
//   ThemeProvider,
//   Tooltip,
//   Avatar,
// } from "@mui/material";
// import {
//   ContentCopy as CopyIcon,
//   Send as SendIcon,
//   SwapHoriz as SwapIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   AccountBalanceWallet as WalletIcon,
// } from "@mui/icons-material";
// import { theme } from "./theme";

// export default function WalletComponent() {
//   const [showBalance, setShowBalance] = useState(true);
//   const [copied, setCopied] = useState(false);

//   const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
//   const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(
//     -4
//   )}`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(walletAddress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Box
//         sx={{
//           minHeight: "100vh",
//           bgcolor: "background.default",
//           p: 3,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <Card
//           sx={{
//             maxWidth: 420,
//             width: "100%",
//             boxShadow: "0 8px 32px rgba(255, 215, 0, 0.1)",
//             position: "relative",
//             overflow: "visible",
//           }}
//         >
//           <Avatar
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dummyLogo-WC15dhMEOYOoRGBpskzeVvBE9nUePY.jpeg"
//             sx={{
//               width: 60,
//               height: 60,
//               position: "absolute",
//               top: -30,
//               left: "50%",
//               transform: "translateX(-50%)",
//               border: "4px solid",
//               borderColor: "background.default",
//             }}
//           />

//           <CardContent sx={{ mt: 4 }}>
//             <Stack spacing={3}>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" color="text.primary" gutterBottom>
//                   Dummy Token Wallet
//                 </Typography>
//                 <Chip
//                   label={shortAddress}
//                   onClick={handleCopy}
//                   onDelete={handleCopy}
//                   deleteIcon={
//                     copied ? (
//                       <Typography variant="caption" color="success">
//                         Copied!
//                       </Typography>
//                     ) : (
//                       <CopyIcon />
//                     )
//                   }
//                   sx={{
//                     bgcolor: "background.paper",
//                     "& .MuiChip-deleteIcon": {
//                       color: copied ? "success.main" : "primary.main",
//                     },
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Balance
//                   </Typography>
//                   <IconButton
//                     size="small"
//                     onClick={() => setShowBalance(!showBalance)}
//                     sx={{ color: "text.secondary" }}
//                   >
//                     {showBalance ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                   </IconButton>
//                 </Box>
//                 <Typography variant="h4" color="primary.main" sx={{ mb: 1 }}>
//                   {showBalance ? "1,234.56 DT" : "••••••• DT"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   ≈ $5,678.90 USD
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography
//                   variant="subtitle2"
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   Token Distribution
//                 </Typography>
//                 <LinearProgress
//                   variant="determinate"
//                   value={65}
//                   sx={{
//                     height: 8,
//                     borderRadius: 4,
//                     bgcolor: "background.paper",
//                     "& .MuiLinearProgress-bar": {
//                       bgcolor: "primary.main",
//                     },
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mt: 1,
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary">
//                     Staked: 65%
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Available: 35%
//                   </Typography>
//                 </Box>
//               </Box>

//               <Stack direction="row" spacing={2}>
//                 <Button
//                   variant="contained"
//                   startIcon={<SendIcon />}
//                   fullWidth
//                   sx={{
//                     bgcolor: "primary.main",
//                     color: "secondary.main",
//                     "&:hover": {
//                       bgcolor: "primary.dark",
//                     },
//                   }}
//                 >
//                   Send
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<SwapIcon />}
//                   fullWidth
//                   sx={{
//                     borderColor: "primary.main",
//                     color: "primary.main",
//                     "&:hover": {
//                       borderColor: "primary.dark",
//                       bgcolor: "rgba(255, 215, 0, 0.1)",
//                     },
//                   }}
//                 >
//                   Swap
//                 </Button>
//               </Stack>
//             </Stack>
//           </CardContent>
//         </Card>
//       </Box>
//     </ThemeProvider>
//   );
// }
// "use client";

// import { useState } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Button,
//   Chip,
//   Stack,
//   LinearProgress,
//   Tooltip,
//   Avatar,
//   Modal,
//   ThemeProvider,
// } from "@mui/material";
// import {
//   ContentCopy as CopyIcon,
//   Send as SendIcon,
//   SwapHoriz as SwapIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   AccountBalanceWallet as WalletIcon,
//   Close as CloseIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { theme } from "./theme";

// export default function WalletComponent() {
//   const [showBalance, setShowBalance] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [walletOpen, setWalletOpen] = useState(false);

//   const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
//   const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(
//     -4
//   )}`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(walletAddress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleDisconnect = () => {
//     // Add your disconnect logic here
//     alert("Wallet disconnected.");
//     setWalletOpen(false);
//   };

//   const toggleWallet = () => {
//     setWalletOpen(!walletOpen);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Tooltip title="Open Wallet">
//         <IconButton
//           onClick={toggleWallet}
//           sx={{
//             position: "fixed",
//             bottom: 30,
//             right: 30,
//             bgcolor: "primary.main",
//             color: "secondary.main",
//             "&:hover": { bgcolor: "primary.dark" },
//             boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//           }}
//         >
//           <WalletIcon />
//         </IconButton>
//       </Tooltip>

//       <Modal open={walletOpen} onClose={toggleWallet} closeAfterTransition>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             maxWidth: 420,
//             width: "100%",
//             bgcolor: "background.default",
//             boxShadow: 24,
//             borderRadius: 2,
//             p: 3,
//             outline: "none",
//           }}
//         >
//           <IconButton
//             onClick={toggleWallet}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               color: "text.secondary",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <Avatar
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dummyLogo-WC15dhMEOYOoRGBpskzeVvBE9nUePY.jpeg"
//             sx={{
//               width: 60,
//               height: 60,
//               position: "absolute",
//               top: -30,
//               left: "50%",
//               transform: "translateX(-50%)",
//               border: "4px solid",
//               borderColor: "background.default",
//             }}
//           />

//           <CardContent sx={{ mt: 4 }}>
//             <Stack spacing={3}>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" color="text.primary" gutterBottom>
//                   Dummy Token Wallet
//                 </Typography>
//                 <Chip
//                   label={shortAddress}
//                   onClick={handleCopy}
//                   onDelete={handleCopy}
//                   deleteIcon={
//                     copied ? (
//                       <Typography variant="caption" color="success">
//                         Copied!
//                       </Typography>
//                     ) : (
//                       <CopyIcon />
//                     )
//                   }
//                   sx={{
//                     bgcolor: "background.paper",
//                     "& .MuiChip-deleteIcon": {
//                       color: copied ? "success.main" : "primary.main",
//                     },
//                   }}
//                 />
//               </Box>

//               <Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 1,
//                   }}
//                 >
//                   <Typography variant="subtitle2" color="text.secondary">
//                     Balance
//                   </Typography>
//                   <IconButton
//                     size="small"
//                     onClick={() => setShowBalance(!showBalance)}
//                     sx={{ color: "text.secondary" }}
//                   >
//                     {showBalance ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                   </IconButton>
//                 </Box>
//                 <Typography variant="h4" color="primary.main" sx={{ mb: 1 }}>
//                   {showBalance ? "1,234.56 DT" : "••••••• DT"}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   ≈ $5,678.90 USD
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography
//                   variant="subtitle2"
//                   color="text.secondary"
//                   gutterBottom
//                 >
//                   Token Distribution
//                 </Typography>
//                 <LinearProgress
//                   variant="determinate"
//                   value={65}
//                   sx={{
//                     height: 8,
//                     borderRadius: 4,
//                     bgcolor: "background.paper",
//                     "& .MuiLinearProgress-bar": {
//                       bgcolor: "primary.main",
//                     },
//                   }}
//                 />
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     mt: 1,
//                   }}
//                 >
//                   <Typography variant="caption" color="text.secondary">
//                     Staked: 65%
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary">
//                     Available: 35%
//                   </Typography>
//                 </Box>
//               </Box>

//               <Stack direction="row" spacing={2}>
//                 <Button
//                   variant="contained"
//                   startIcon={<SendIcon />}
//                   fullWidth
//                   sx={{
//                     bgcolor: "primary.main",
//                     color: "secondary.main",
//                     "&:hover": {
//                       bgcolor: "primary.dark",
//                     },
//                   }}
//                 >
//                   Send
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   startIcon={<SwapIcon />}
//                   fullWidth
//                   sx={{
//                     borderColor: "primary.main",
//                     color: "primary.main",
//                     "&:hover": {
//                       borderColor: "primary.dark",
//                       bgcolor: "rgba(255, 215, 0, 0.1)",
//                     },
//                   }}
//                 >
//                   Swap
//                 </Button>
//               </Stack>

//               <Button
//                 variant="text"
//                 startIcon={<LogoutIcon />}
//                 fullWidth
//                 onClick={handleDisconnect}
//                 sx={{
//                   color: "error.main",
//                   "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
//                 }}
//               >
//                 Disconnect
//               </Button>
//             </Stack>
//           </CardContent>
//         </Box>
//       </Modal>
//     </ThemeProvider>
//   );
// }

// "use client";

// import React, { useEffect, useState } from "react";
// import { Principal } from "@dfinity/principal";
// import {
//   Box,
//   CardContent,
//   Typography,
//   IconButton,
//   Button,
//   Chip,
//   Stack,
//   LinearProgress,
//   Tooltip,
//   Avatar,
//   Modal,
//   ThemeProvider,
//   TextField,
//   MenuItem,
// } from "@mui/material";
// import {
//   ContentCopy as CopyIcon,
//   Visibility as VisibilityIcon,
//   VisibilityOff as VisibilityOffIcon,
//   AccountBalanceWallet as WalletIcon,
//   Close as CloseIcon,
//   Logout as LogoutIcon,
// } from "@mui/icons-material";
// import { useConnect } from "@connect2ic/react";

// import { createActor } from "../../../declarations/Token";
// import { theme } from "./theme";

// const canisterIds = {
//   icp: "ryjl3-tyaaa-aaaaa-aaaba-cai",
//   dummy: "qtpy4-kqaaa-aaaap-antha-cai", // Dummy token canister
// };

// export default function WalletComponent() {
//   const [showBalance, setShowBalance] = useState(true);
//   const [copied, setCopied] = useState(false);
//   const [walletOpen, setWalletOpen] = useState(false);
//   const [balances, setBalances] = useState({});
//   const [balanceLoading, setBalanceLoading] = useState(false);
//   const [identity, setIdentity] = useState(null);
//   const [to, setTo] = useState("");
//   const [amount, setAmount] = useState("");
//   const [tokenType, setTokenType] = useState("icp");
//   const [loading, setLoading] = useState(false);

//   const { isConnected, activeProvider, principal, disconnect } = useConnect({
//     onConnect: () => {
//       // Signed in
//     },
//     onDisconnect: () => {
//       // Signed out
//     },
//   });

//   const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
//   const shortAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(
//     -4
//   )}`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(walletAddress);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const toggleWallet = () => {
//     setWalletOpen(!walletOpen);
//   };

//   const handleDisconnect = () => {
//     alert("Wallet disconnected.");
//     setWalletOpen(false);
//   };

//   // Fetch token balances
//   const fetchAllBalances = async () => {
//     setBalanceLoading(true);
//     const newBalances = {};
//     for (const [type, canisterId] of Object.entries(canisterIds)) {
//       try {
//         const actor = createActor(canisterId, {
//           agentOptions: { identity },
//         });
//         const balance = await actor.icrc1_balance_of({
//           owner: Principal.fromText(walletAddress),
//           subaccount: [],
//         });
//         newBalances[type] = Number(balance) / 100000000; // Adjust for token decimals
//       } catch (error) {
//         console.error(`Failed to fetch balance for ${type}:`, error);
//         newBalances[type] = 0;
//       }
//     }
//     setBalances(newBalances);
//     setBalanceLoading(false);
//   };

//   useEffect(() => {
//     fetchAllBalances();
//   }, [walletOpen]);

//   // Handle token transfer
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const canisterId = canisterIds[tokenType];
//       if (!canisterId) {
//         throw new Error(`Unsupported token type: ${tokenType}`);
//       }
//       const actor = createActor(canisterId, {
//         agentOptions: { identity },
//       });
//       await actor.icrc1_transfer({
//         to: {
//           owner: Principal.fromText(to),
//           subaccount: [],
//         },
//         fee: [10000n],
//         memo: [],
//         from_subaccount: [],
//         created_at_time: [],
//         amount: BigInt(amount * 100000), // Adjust for token decimals
//       });
//       alert("Transaction Successful");
//       fetchAllBalances(); // Refresh balances
//     } catch (error) {
//       console.error("Transfer failed:", error);
//       alert("Failed to transfer tokens.");
//     }
//     setLoading(false);
//     setTo("");
//     setAmount("");
//     setTokenType("icp");
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Tooltip title="Open Wallet">
//         <IconButton
//           onClick={toggleWallet}
//           sx={{
//             position: "fixed",
//             bottom: 30,
//             right: 30,
//             bgcolor: "primary.main",
//             color: "secondary.main",
//             "&:hover": { bgcolor: "primary.dark" },
//             boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//           }}
//         >
//           <WalletIcon />
//         </IconButton>
//       </Tooltip>

//       <Modal open={walletOpen} onClose={toggleWallet} closeAfterTransition>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             maxWidth: 500,
//             width: "100%",
//             bgcolor: "background.default",
//             boxShadow: 24,
//             borderRadius: 2,
//             p: 3,
//             outline: "none",
//           }}
//         >
//           <IconButton
//             onClick={toggleWallet}
//             sx={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               color: "text.secondary",
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <Avatar
//             src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dummyLogo-WC15dhMEOYOoRGBpskzeVvBE9nUePY.jpeg"
//             sx={{
//               width: 60,
//               height: 60,
//               position: "absolute",
//               top: -30,
//               left: "50%",
//               transform: "translateX(-50%)",
//               border: "4px solid",
//               borderColor: "background.default",
//             }}
//           />

//           <CardContent sx={{ mt: 4 }}>
//             <Stack spacing={3}>
//               <Box sx={{ textAlign: "center" }}>
//                 <Typography variant="h6" color="text.primary" gutterBottom>
//                   Dummy Token Wallet
//                 </Typography>
//                 <Chip
//                   label={shortAddress}
//                   onClick={handleCopy}
//                   onDelete={handleCopy}
//                   deleteIcon={
//                     copied ? (
//                       <Typography variant="caption" color="success">
//                         Copied!
//                       </Typography>
//                     ) : (
//                       <CopyIcon />
//                     )
//                   }
//                   sx={{
//                     bgcolor: "background.paper",
//                     "& .MuiChip-deleteIcon": {
//                       color: copied ? "success.main" : "primary.main",
//                     },
//                   }}
//                 />
//               </Box>

//               {/* Balances */}
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary">
//                   Balances:
//                 </Typography>
//                 {balanceLoading ? (
//                   <Typography>Loading...</Typography>
//                 ) : (
//                   <Stack spacing={1}>
//                     {Object.entries(balances).map(([type, balance]) => (
//                       <Typography key={type}>
//                         {type.toUpperCase()}: {balance}
//                       </Typography>
//                     ))}
//                   </Stack>
//                 )}
//               </Box>

//               {/* Transfer Form */}
//               <form onSubmit={handleFormSubmit}>
//                 <TextField
//                   fullWidth
//                   label="To (Principal ID)"
//                   value={to}
//                   onChange={(e) => setTo(e.target.value)}
//                   sx={{ mb: 2 }}
//                   required
//                 />
//                 <TextField
//                   fullWidth
//                   label="Amount"
//                   type="number"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   sx={{ mb: 2 }}
//                   required
//                 />
//                 <TextField
//                   fullWidth
//                   select
//                   label="Token Type"
//                   value={tokenType}
//                   onChange={(e) => setTokenType(e.target.value)}
//                   sx={{ mb: 2 }}
//                 >
//                   {Object.keys(canisterIds).map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type.toUpperCase()}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   sx={{
//                     bgcolor: "primary.main",
//                     "&:hover": { bgcolor: "primary.dark" },
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? "Transferring..." : "Transfer"}
//                 </Button>
//               </form>

//               <Button
//                 variant="text"
//                 fullWidth
//                 onClick={handleDisconnect}
//                 sx={{
//                   color: "error.main",
//                   "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
//                 }}
//               >
//                 Disconnect
//               </Button>
//             </Stack>
//           </CardContent>
//         </Box>
//       </Modal>
//     </ThemeProvider>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import {
  Box,
  CardContent,
  Typography,
  IconButton,
  Button,
  Chip,
  Stack,
  LinearProgress,
  Tooltip,
  Avatar,
  Modal,
  ThemeProvider,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  ContentCopy as CopyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  AccountBalanceWallet as WalletIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useConnect } from "@connect2ic/react";

import { createActor } from "../../../declarations/Token";
import { theme } from "./theme";

const canisterIds = {
  icp: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  dummy: "qtpy4-kqaaa-aaaap-antha-cai",
  ckbtc: "mxzaz-hqaaa-aaaar-qaada-cai",
  cketh: "ss2fx-dyaaa-aaaar-qacoq-cai",
  ckusdc: "xevnm-gaaaa-aaaar-qafnq-cai",
  ckxaut: "nza5v-qaaaa-aaaar-qahzq-cai",
};

export default function WalletComponent() {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [balances, setBalances] = useState({});
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenType, setTokenType] = useState("icp");
  const [loading, setLoading] = useState(false);

  const { isConnected, principal, disconnect } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });

  const shortPrincipal = principal
    ? `${principal.slice(0, 6)}...${principal.slice(-4)}`
    : "Not connected";

  const toggleWallet = () => {
    setWalletOpen(!walletOpen);
  };

  const handleCopy = () => {
    if (principal) {
      navigator.clipboard.writeText(principal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = async () => {
     disconnect();
    alert("Wallet disconnected.");
    setWalletOpen(false);
  };

  const fetchAllBalances = async () => {
    if (!principal) return;

    setBalanceLoading(true);
    const newBalances = {};
    for (const [type, canisterId] of Object.entries(canisterIds)) {
      try {
        const actor = createActor(canisterId, {});
        const balance = await actor.icrc1_balance_of({
          owner: Principal.fromText(principal),
          subaccount: [],
        });
        console.log("balance",balance)
        newBalances[type] = Number(balance) / 100000000; // Adjust for token decimals
      } catch (error) {
        console.error(`Failed to fetch balance for ${type}:`, error);
        newBalances[type] = 0;
      }
    }
    setBalances(newBalances);
    setBalanceLoading(false);
  };

  useEffect(() => {
    if (walletOpen && isConnected) {
      fetchAllBalances();
    }
  }, [walletOpen, isConnected]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!principal) return;

    setLoading(true);
    try {
      const canisterId = canisterIds[tokenType];
      if (!canisterId) {
        throw new Error(`Unsupported token type: ${tokenType}`);
      }
      const actor = createActor(canisterId, {});
      await actor.icrc1_transfer({
        to: {
          owner: Principal.fromText(to),
          subaccount: [],
        },
        fee: [10000n],
        memo: [],
        from_subaccount: [],
        created_at_time: [],
        amount: BigInt(amount * 100000), // Adjust for token decimals
      });
      alert("Transaction Successful");
      fetchAllBalances(); // Refresh balances
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Failed to transfer tokens.");
    }
    setLoading(false);
    setTo("");
    setAmount("");
    setTokenType("icp");
  };

  return (
    <ThemeProvider theme={theme}>
      <Tooltip title="Open Wallet">
        <IconButton
          onClick={toggleWallet}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 30,
            bgcolor: "primary.main",
            color: "secondary.main",
            "&:hover": { bgcolor: "primary.dark" },
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <WalletIcon />
        </IconButton>
      </Tooltip>

      <Modal open={walletOpen} onClose={toggleWallet} closeAfterTransition>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: 500,
            width: "100%",
            bgcolor: "background.default",
            boxShadow: 24,
            borderRadius: 2,
            p: 3,
            outline: "none",
          }}
        >
          <IconButton
            onClick={toggleWallet}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Avatar
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dummyLogo-WC15dhMEOYOoRGBpskzeVvBE9nUePY.jpeg"
            sx={{
              width: 60,
              height: 60,
              position: "absolute",
              top: -30,
              left: "50%",
              transform: "translateX(-50%)",
              border: "4px solid",
              borderColor: "background.default",
            }}
          />

          <CardContent sx={{ mt: 4 }}>
            <Stack spacing={3}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Token Wallet
                </Typography>
                <Chip
                  label={shortPrincipal}
                  onClick={handleCopy}
                  onDelete={handleCopy}
                  deleteIcon={
                    copied ? (
                      <Typography variant="caption" color="success">
                        Copied!
                      </Typography>
                    ) : (
                      <CopyIcon />
                    )
                  }
                  sx={{
                    bgcolor: "background.paper",
                    "& .MuiChip-deleteIcon": {
                      color: copied ? "success.main" : "primary.main",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Balances:
                </Typography>
                {balanceLoading ? (
                  <Typography>Loading...</Typography>
                ) : (
                  <Stack spacing={1}>
                    {Object.entries(balances).map(([type, balance]) => (
                      <Typography key={type}>
                        {type.toUpperCase()}: {balance}
                      </Typography>
                    ))}
                  </Stack>
                )}
              </Box>

              <form onSubmit={handleFormSubmit}>
                <TextField
                  fullWidth
                  label="To (Principal ID)"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  select
                  label="Token Type"
                  value={tokenType}
                  onChange={(e) => setTokenType(e.target.value)}
                  sx={{ mb: 2 }}
                >
                  {Object.keys(canisterIds).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.toUpperCase()}
                    </MenuItem>
                  ))}
                </TextField>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: "primary.main",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                  disabled={loading}
                >
                  {loading ? "Transferring..." : "Transfer"}
                </Button>
              </form>

              <Button
                variant="text"
                fullWidth
                onClick={handleDisconnect}
                sx={{
                  color: "error.main",
                  "&:hover": { bgcolor: "rgba(255, 0, 0, 0.1)" },
                }}
              >
                Disconnect
              </Button>
            </Stack>
          </CardContent>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
