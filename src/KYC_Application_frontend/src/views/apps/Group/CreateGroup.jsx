import React, { useState } from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChildCard from '../../../components/shared/ChildCard';
import { CopyAll as CopyIcon } from '@mui/icons-material';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Card, CardContent, Box, Grid, Typography, TextField, Radio, RadioGroup, MenuItem, Checkbox, Button, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions, FormControlLabel, Divider, Link,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { useParams } from 'react-router';
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
import { useUser } from '../../../userContext/UserContext';

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const BCrumb = [
  {
    to: '/',
    title: 'Group',
  },
  {
    title: 'Create Group',
  },
];

const CreateGroup = () => {
  const { groupType } = useParams();
  const { user, setUser } = useUser();
  const [isLoading,setLoading]=useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDialogOpen2, setDialogOpen2] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [groupLogo, setGroupLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [storage, setStorage] = useState('5GB');
  const [setupFee, setSetupFee] = useState(0);
  const [annualFee, setAnnualFee] = useState(168);
  const [storageFee, setStorageFee] = useState(72);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { isConnected, principal, disconnect } = useConnect({
    onConnect: () => {
        console.log("User connected!");
    },
    onDisconnect: () => {
        console.log("User disconnected!");
    },
});

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleOpenDailog2 = () => {
    setDialogOpen(false);
    setDialogOpen2(true);
  };

  const handleCloseDialog2 = () => {
    setDialogOpen2(false);
  };
  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setGroupLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleChange = (event) => {
    setStorage(event.target.value);
  };

  const generateRandom = (principal) => {
    // Get the first 5 digits of the principal
    const prefix = principal.slice(0, 5);
  
    // Generate a random number with 5 digits
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
  
    // Concatenate the prefix and random number
    return `${prefix}-${randomNumber}`;
  };
  
  const handleSubmit = async() => {
    setLoading(false);
    if(principal){
    const randomNumber = generateRandom(principal);
    console.log('data',user,randomNumber,groupName,groupType,groupLogo,storage,storageFee,setupFee,annualFee)
   
    }else {
      swal('Connect your wallet first','','success');
    } 
    try{
      // const response = await ledger.call('createGroup',user,randomNumber, groupName, groupType,groupLogo,storage, storageFee,setupFee,annualFee);
      
    }catch(error){
      console.log('error',error);
    }
    setLoading(true);

  };
  const initialCurrencyData = [
    { coin: "USD", symbol: "ckUSD", balance: "100 000", usd: "100 000 USD" },
    { coin: "Euro", symbol: "ckEURC", balance: "100 000", usd: "100 000 USD" },
    { coin: "Bitcoin", symbol: "ckBTC", balance: "100 000", usd: "100 000 USD" },
    { coin: "Ethereum", symbol: "ckETH", balance: "100 000", usd: "100 000 USD" },
    { coin: "Gold", symbol: "ckXAUt", balance: "100 000", usd: "100 000 USD" },
    { coin: "Utility token", symbol: "ICP", balance: "100 000", usd: "100 000 USD" },
  ];

  return (
    <PageContainer title="Create Private Group" description="this is Note page">
      <Breadcrumb title="Create Private Group" items={BCrumb} />
      <form onSubmit={handleSubmit}>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <ChildCard>
              <Box mt={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={4}>
                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                      Group Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="groupName">Group name</CustomFormLabel>
                        <TextField
                          id="groupName"
                          fullWidth
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="groupDescription">Group description</CustomFormLabel>
                        <TextField
                          id="groupDescription"
                          fullWidth
                          multiline
                          rows={4}
                          variant="outlined"
                          value={groupDescription}
                          onChange={(e) => setGroupDescription(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <CustomFormLabel htmlFor="groupLogo">Group logo</CustomFormLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button variant="contained" component="label">
                            Choose file
                            <input
                              type="file"
                              id="groupLogo"
                              hidden
                              onChange={handleLogoChange}
                            />
                          </Button>
                          {logoPreview && (
                            <Box
                              component="img"
                              sx={{ width: 100, height: 100, borderRadius: '8px' }}
                              src={logoPreview}
                              alt="Logo preview"
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </ChildCard>
            <Box mt={2}>
              <ChildCard >
                <Box mt={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={4}>
                      <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                        Storage capacity
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography sx={{ paddingTop: '10px' }} variant="body2" gutterBottom>
                            Expand file sharing capacity to allow members to easily send and share files directly within the group chat.
                          </Typography>
                        </Grid>

                        <Grid item xs={12}>
                          <Card variant="outlined">
                            <CardContent>
                              <RadioGroup value={storage} onChange={handleChange}>
                                <Box display="flex" flexDirection="column" gap={2}>
                                  <FormControlLabel
                                    value="500MB"
                                    control={<Radio />}
                                    label={
                                      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                        <Typography variant="body1" sx={{ marginRight: 'auto' }}>500MB</Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}> &nbsp; Free</Typography>
                                      </Box>
                                    }
                                  />
                                  <FormControlLabel
                                    value="5GB"
                                    control={<Radio />}
                                    label={
                                      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                        <Typography variant="body1" sx={{ marginRight: 'auto' }}>5GB</Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}> &nbsp; 72 USD / year</Typography>
                                      </Box>
                                    }
                                  />
                                  <FormControlLabel
                                    value="25GB"
                                    control={<Radio />}
                                    label={
                                      <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                                        <Typography variant="body1" sx={{ marginRight: 'auto' }}>25GB</Typography>
                                        <Typography variant="body1" sx={{ color: 'text.secondary' }}> &nbsp; 260 USD / year</Typography>
                                      </Box>
                                    }
                                  />
                                </Box>
                              </RadioGroup>
                            </CardContent>
                          </Card>
                        </Grid>

                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </ChildCard>
            </Box>

          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box sx={{ padding: 5, borderRadius: 2, boxShadow: 3, backgroundColor: '#fff' }}>
              {/* Order summary title */}
              <Typography variant="h6" gutterBottom>
                Order summary
              </Typography>

              {/* Description */}
              <Typography variant="body2" fontSize="14px" color="gray" gutterBottom>
                Setting up a registered company includes a KYC review of key stakeholder data by an AML Officer to ensure data quality and compliance. Additional transaction fees may apply.{' '}<br />
                <Link href="#" underline="hover">
                  Learn more
                </Link>
              </Typography>

              <Divider sx={{ my: 2 }} />

              {/* Fees */}
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="body2" fontSize="14px" color="gray">Setup fee</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontSize="14px" fontWeight="bold">0 USD</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" fontSize="14px" color="gray">Annual fee</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontSize="14px" fontWeight="bold">168 USD</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body2" fontSize="14px" color="gray">Annual storage fee</Typography>
                </Grid>
                <Grid item xs={6} textAlign="right">
                  <Typography variant="body2" fontSize="14px" fontWeight="bold">72 USD</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              {/* Subscription renewal notice */}
              <Box sx={{ padding: 2, backgroundColor: '#f0f4ff', borderRadius: 1 }}>
                <Typography variant="body2" color="primary" fontSize="14px">
                  Without recurrent payment from owner/admin, the group account suspends after a 3-month grace period.
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Total to pay */}
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography textAlign="right" variant="body1">
                    To pay today
                  </Typography>
                </Grid>
                <Grid item xs={12} textAlign="right">
                  <Typography variant="h5" fontWeight="bold">
                    240 USD
                  </Typography>
                </Grid>
              </Grid>

              {/* Confirm and pay button */}
              <Button
                onClick={handleOpenDialog} variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                Confirm and pay
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth='xs' // Make it larger and responsive
        PaperProps={{ style: { padding: '20px', borderRadius: '12px' } }} // Style the dialog box
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Select currency
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <RadioGroup>
            {initialCurrencyData.map((row, index) => (
              <Box
                key={row.coin}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
                p={2}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                  "&:hover": {
                    backgroundColor: "#eaeaea",
                  },
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <FormControlLabel
                    value={row.symbol}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" fontWeight="500">
                          {row.symbol}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {row.coin}
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight="500">
                    {row.balance}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {row.usd}
                  </Typography>
                </Box>
              </Box>
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={12}>
              <Button sx={{ width: '100%' }} onClick={handleOpenDailog2} variant="contained" color="primary">
                Pay 240 USD
              </Button></Grid>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDialogOpen2}
        onClose={handleCloseDialog2}
        fullWidth
        maxWidth='xs' // Make it larger and responsive
        PaperProps={{ style: { padding: '20px', borderRadius: '12px' } }} // Style the dialog box
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Not enough funds on your personal account
            </Typography>
            <IconButton onClick={handleCloseDialog2}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="body2">To pay for your group deposit funds to your personal COOWN  account. Copy or scan the address below.
              </Typography>
              <br />
              <Typography variant="body2">
                Supported currencies:<br />
                <b>ckUSDC, ckEURC, ckBTC, ckETH, ckXUAt, ICP</b>
              </Typography>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12} mb={1}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mt={2}
                p={2}
                bgcolor="#f7f9fc"
                borderRadius={1}
                width="100%"
              >
                <Typography
                  variant="body2"
                  color="#7C8FAC"
                  fontSize="14px"
                  style={{ marginLeft: 8 }}
                >
                  Network
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  style={{ marginRight: 16 }}
                >
                  ICP
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}  mt={1}
             display="flex"
             justifyContent="center"
             alignItems="center"
             width="100%" // Ensure it takes full width of the container
             height="auto">
                  <QRCodeCanvas
                    value="1A1zp1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                    size={300} // Adjust QR code size
                    level="H" // Set the error correction level for better readability
                  />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container>
            <Grid item xs={12}>
              <Button
                startIcon={<CopyIcon />} sx={{ width: '100%' }} onClick={handleSubmit} variant="contained" color="primary">
                1A1zP1...DivfNa
              </Button>

              <Button sx={{ width: '100%', mt: 2 }} onClick={handleCloseDialog2} variant="outlined" color="primary">
                Refresh
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};

export default CreateGroup;
