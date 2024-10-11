// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Grid,
//   Container,
//   Box,
//   Chip,
//   TextField,
//   Select,
//   MenuItem,
//   Modal,
//   Fade,
//   Backdrop,
//   ThemeProvider,
//   createTheme,
//   CssBaseline,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import { Wallet, Search, Filter, Clock, Menu } from "lucide-react";
// import { Link } from "react-router-dom";
// import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import Coown32 from "./assets/images/NFT/COOWN32.png";
// import Coown66 from "./assets/images/NFT/COOWN66.png";
// import Coown175 from "./assets/images/NFT/COOWN175.png";

// const nftCollections = [
//   {
//     id: 1,
//     name: "$COOWN-32",
//     Type: "Prelaunch NFTs",
//     price: 10,
//     image: Coown32,
//   },
//   {
//     id: 2,
//     name: "$COOWN-66",
//     Type: "Prelaunch NFTs",
//     price: 25,
//     image: Coown66,
//   },
//   {
//     id: 3,
//     name: "$COOWN-175",
//     Type: "Prelaunch NFTs",
//     price: 55,
//     image: Coown175,
//   },
// ];
// // Create a dark theme
// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#6C5CE7",
//     },
//     secondary: {
//       main: "#00D2D3",
//     },
//     background: {
//       default: "#0C0E1B",
//       paper: "#1A1C2A",
//     },
//   },
//   typography: {
//     fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
//   },
// });

// // Styled components
// const StyledCard = styled(Card)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: theme.shape.borderRadius * 2,
//   transition: "0.3s",
//   "&:hover": {
//     transform: "translateY(-5px)",
//     boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
//   },
// }));

// const GlowingButton = styled(Button)(({ theme }) => ({
//   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//   border: 0,
//   borderRadius: 20,
//   color: "white",
//   padding: "10px 20px",
//   boxShadow: "0 0 10px rgba(108, 92, 231, 0.5)",
//   "&:hover": {
//     boxShadow: "0 0 20px rgba(108, 92, 231, 0.8)",
//   },
// }));

// // Header Component
// function Header() {
//   const { isConnected, principal } = useConnect({
//     onConnect: () => {},
//     onDisconnect: () => {},
//   });

//   return (
//     <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
//       <Container>
//         <Toolbar>
//           {/* Menu Icon */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <Menu />
//           </IconButton>

//           {/* Title or Logo */}
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             NFT Presale Marketplace
//           </Typography>

//           {/* Navigation Buttons */}
//           <Button
//             color="inherit"
//             component={Link}
//             to="/prelaunch"
//             sx={{ textTransform: "none", "&:hover": { color: "primary.main" } }}
//           >
//             Token Swap
//           </Button>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/prelaunch-social"
//             sx={{ textTransform: "none", "&:hover": { color: "primary.main" } }}
//           >
//             Social Reward
//           </Button>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/prelaunch-nft"
//             sx={{ textTransform: "none", "&:hover": { color: "primary.main" } }}
//           >
//             NFT
//           </Button>

//           {/* Wallet Connect Button */}
//           {/* <GlowingButton
//             variant="contained"
//             color="primary"
//             startIcon={<AccountBalanceWalletIcon />}
//           >
//             {isConnected
//               ? `${principal.slice(0, 5)}...${principal.slice(-5)}`
//               : "Connect Wallet"}
//           </GlowingButton> */}
//           <ConnectButton />
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default function NFTPresaleMarketplace() {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });
//   const [selectedNFT, setSelectedNFT] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortBy, setSortBy] = useState("name");

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const difference =
//         new Date("2024-12-31").getTime() - new Date().getTime();
//       setTimeLeft({
//         days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//         hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//         minutes: Math.floor((difference / 1000 / 60) % 60),
//         seconds: Math.floor((difference / 1000) % 60),
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleNFTClick = (nft) => {
//     setSelectedNFT(nft);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//   };

//   const filteredAndSortedNFTs = nftCollections
//     .filter(
//       (nft) =>
//         nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         nft.Type.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortBy === "name") return a.name.localeCompare(b.name);
//       if (sortBy === "price") return a.price - b.price;
//       return 0;
//     });

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <ConnectDialog />
//       <CssBaseline />
//       <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
//         {/* Header Component */}
//         <Header />

//         <Container maxWidth="xl" sx={{ mt: 4 }}>
//           <Typography variant="h3" align="center" gutterBottom>
//             Exclusive NFT Presale
//           </Typography>
//           <Typography
//             variant="h5"
//             align="center"
//             color="textSecondary"
//             paragraph
//           >
//             Be among the first to own these unique digital artworks
//           </Typography>

//           {/* Countdown Timer */}
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 2,
//               mb: 4,
//               alignItems: "center",
//             }}
//           >
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h4">{timeLeft.days}</Typography>
//               <Typography variant="body2">Days</Typography>
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h4">{timeLeft.hours}</Typography>
//               <Typography variant="body2">Hours</Typography>
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h4">{timeLeft.minutes}</Typography>
//               <Typography variant="body2">Minutes</Typography>
//             </Box>
//             <Box sx={{ textAlign: "center" }}>
//               <Typography variant="h4">{timeLeft.seconds}</Typography>
//               <Typography variant="body2">Seconds</Typography>
//             </Box>
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
//             <TextField
//               label="Search NFTs"
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               InputProps={{
//                 startAdornment: <Search />,
//               }}
//             />
//             <Select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               displayEmpty
//               variant="outlined"
//             >
//               <MenuItem value="name">Sort by Name</MenuItem>
//               <MenuItem value="price">Sort by Price</MenuItem>
//             </Select>
//           </Box>

//           <Grid container spacing={4}>
//             {filteredAndSortedNFTs.map((nft) => (
//               <Grid item key={nft.id} xs={12} sm={6} md={4}>
//                 <StyledCard onClick={() => handleNFTClick(nft)}>
//                   <CardMedia
//                     component="img"
//                     height="300"
//                     image={nft.image}
//                     alt={nft.name}
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="div">
//                       {nft.name}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       by {nft.Type}
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         mt: 2,
//                       }}
//                     >
//                       <GlowingButton size="small">Buy Now</GlowingButton>
//                     </Box>
//                   </CardContent>
//                 </StyledCard>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>

//         <Modal
//           open={isModalOpen}
//           onClose={handleCloseModal}
//           closeAfterTransition
//           BackdropComponent={Backdrop}
//           BackdropProps={{
//             timeout: 500,
//           }}
//         >
//           <Fade in={isModalOpen}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: 400,
//                 bgcolor: "background.paper",
//                 border: "2px solid #000",
//                 boxShadow: 24,
//                 p: 4,
//               }}
//             >
//               {selectedNFT && (
//                 <>
//                   <Typography variant="h6" component="h2">
//                     {selectedNFT.name}
//                   </Typography>
//                   <Typography sx={{ mt: 2 }}>
//                     Type: {selectedNFT.Type}
//                   </Typography>
//                   <Typography sx={{ mt: 2 }}>
//                     Price: {selectedNFT.price} ETH
//                   </Typography>
//                   <Box
//                     sx={{
//                       mt: 3,
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <Button onClick={handleCloseModal}>Close</Button>
//                     <GlowingButton>Purchase NFT</GlowingButton>
//                   </Box>
//                 </>
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Box>
//     </ThemeProvider>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Container,
  Box,
  TextField,
  Select,
  MenuItem,
  Modal,
  Fade,
  Backdrop,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Wallet, Search, Filter, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { ConnectButton, ConnectDialog, useConnect } from "@connect2ic/react";
import Coown32 from "../assets/images/NFT/COOWN32.png";
import Coown66 from "../assets/images/NFT/COOWN66.png";
import Coown175 from "../assets/images/NFT/COOWN175.png";
import Header from "./Components/Header";
// Mock ICP NFT collections for display
const nftCollections = [
  {
    id: 1,
    name: "ICP Genesis",
    type: "Launch NFTs",
    price: 10,
    image: Coown32,
  },
  {
    id: 2,
    name: "ICP Hero",
    type: "Limited Edition NFTs",
    price: 25,
    image: Coown66,
  },
  {
    id: 3,
    name: "ICP Master",
    type: "Exclusive NFTs",
    price: 55,
    image: Coown175,
  },
];

// Dark theme setup
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5", // ICP's main theme color
    },
    secondary: {
      main: "#00D2D3",
    },
    background: {
      default: "#0C0E1B",
      paper: "#1A1C2A",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 20px rgba(0, 0, 0, 0.2)",
  },
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  border: 0,
  borderRadius: 20,
  color: "white",
  padding: "10px 20px",
  boxShadow: "0 0 10px rgba(108, 92, 231, 0.5)",
  "&:hover": {
    boxShadow: "0 0 20px rgba(108, 92, 231, 0.8)",
  },
}));

// const Header = () => {

//   return (
//     <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 4 }}>
//       <Container>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <Menu />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             ICP NFT Marketplace
//           </Typography>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/prelaunch"
//             sx={{ textTransform: "none" }}
//           >
//             Token Swap
//           </Button>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/prelaunch-social"
//             sx={{ textTransform: "none" }}
//           >
//             Social Reward
//           </Button>
//           <Button
//             color="inherit"
//             component={Link}
//             to="/prelaunch-nft"
//             sx={{ textTransform: "none" }}
//           >
//             NFT
//           </Button>
//           <ConnectButton />
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

export default function ICPNFTMarketplace() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const timer = setInterval(() => {
      const difference =
        new Date("2024-12-31").getTime() - new Date().getTime();
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNFTClick = (nft) => {
    setSelectedNFT(nft);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const filteredAndSortedNFTs = nftCollections
    .filter(
      (nft) =>
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  return (
    <ThemeProvider theme={darkTheme}>
      <ConnectDialog />
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
        <Header />

        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Exclusive ICP NFTs Presale
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Own exclusive digital assets on the Internet Computer (ICP)
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              mb: 4,
              alignItems: "center",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">{timeLeft.days}</Typography>
              <Typography variant="body2">Days</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">{timeLeft.hours}</Typography>
              <Typography variant="body2">Hours</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">{timeLeft.minutes}</Typography>
              <Typography variant="body2">Minutes</Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h4">{timeLeft.seconds}</Typography>
              <Typography variant="body2">Seconds</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
            <TextField
              label="Search NFTs"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search />,
              }}
            />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
              variant="outlined"
            >
              <MenuItem value="name">Sort by Name</MenuItem>
              <MenuItem value="price">Sort by Price</MenuItem>
            </Select>
          </Box>

          <Grid container spacing={4}>
            {filteredAndSortedNFTs.map((nft) => (
              <Grid item key={nft.id} xs={12} sm={6} md={4}>
                <StyledCard onClick={() => handleNFTClick(nft)}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={nft.image}
                    alt={nft.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {nft.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {nft.type}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <GlowingButton size="small">Buy Now</GlowingButton>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isModalOpen}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              {selectedNFT && (
                <>
                  <Typography variant="h6" component="h2">
                    {selectedNFT.name}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Type: {selectedNFT.type}
                  </Typography>
                  <Typography sx={{ mt: 2 }}>
                    Price: {selectedNFT.price} ICP
                  </Typography>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button onClick={handleCloseModal}>Close</Button>
                    <GlowingButton>Purchase NFT</GlowingButton>
                  </Box>
                </>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
    </ThemeProvider>
  );
}
