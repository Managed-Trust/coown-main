import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Switch,
  TextField,
  Drawer,
  Fab,
  Tooltip,
  IconButton,
  Tabs, Button, Grid,
  Tab,
  Checkbox, FormControlLabel, RadioGroup, FormControl, Radio
} from '@mui/material';
import { IconX, IconSettings } from '@tabler/icons';
import Scrollbar from '../../../../components/custom-scroll/Scrollbar';
import Coown_Logo from '../../../../assets/images/profile/user-5.jpg';
const SidebarWidth = '420px';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

const initialState = {
  actualPrice: 0,
  allowCryptoPayments: false,
  allowCardPayments: false,
  allowBankTransfer: false,
  allowVoucherPayments: false,
  voucherReference: "",
  annualRenewalFee: false,
  issueDate: "",

  foundationPart: 0,
  operatorPart: 0,
  stakingPart: 0,
  thirdPartyPart: 0,
  thirdPartyIdentifier: "",

  applyGeneralTerms: false,
  termsLink: "",

  countries: []

};

const TabPanel = ({ children, value, index }) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      sx={{ p: 3 }}
    >
      {value === index && children}
    </Box>
  );
};

const Sidebar = ({ openDrawer, drawer, product }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      console.log('product', product);
      if (product.terms.length > 0) {
        const applyGeneralTerms = product.terms[0].applyGeneralTerms;
        const termsLink = product.terms[0].termsLink[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          applyGeneralTerms,
        }));
        setFormData((prevFormData) => ({
          ...prevFormData,
          termsLink,
        }));
      } let paymentData = {};
      if (product.payment.length > 0) {
        const {
          actualPrice,
          allowBankTransfer,
          allowCardPayments,
          allowCryptoPayments,
          allowVoucherPayments,
          annualRenewalFee,
          issueDate,
          voucherReference,
        } = product.payment[0];
        paymentData = {
          actualPrice: Number(actualPrice), // Convert from BigInt
          allowBankTransfer: !!allowBankTransfer,
          allowCardPayments: !!allowCardPayments,
          allowCryptoPayments: !!allowCryptoPayments,
          allowVoucherPayments: !!allowVoucherPayments,
          annualRenewalFee: !!annualRenewalFee,
          issueDate: issueDate || "",
          voucherReference: voucherReference?.[0] || "", // Extract first voucher reference if array
        };
      }
      // Update form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...paymentData,
      }));
      if (product.profitSplit.length > 0) {
        const {
          foundationPart,
          operatorPart,
          stakingPart,
          thirdPartyIdentifier,
          thirdPartyPart,
        } = product.profitSplit[0];

        setFormData((prevFormData) => ({
          ...prevFormData,
          foundationPart: Number(foundationPart), // Convert from `10n` (BigInt) to number
          operatorPart: Number(operatorPart),
          stakingPart: Number(stakingPart),
          thirdPartyIdentifier: thirdPartyIdentifier || "",
          thirdPartyPart: Number(thirdPartyPart),
        }));
      }
      if (product.localization.length > 0) {
        console.log('here');
        const countries = product.localization[0]?.countries || [];
        setFormData((prevFormData) => ({
          ...prevFormData,
          countries,
        }));
      }
    }

  }, [product]);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleNubmerChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: parseFloat(value),
    }));
  };


  const handleSelectChange = (id) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: event.target.value,
    }));
  };

  const handleCheckedChange = (id) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: event.target.checked,
    }));
  };

  const handleArrayChange = (event) => {
    const inputValue = event.target.value;
    const countriesArray = inputValue.split(",").map((country) => country.trim());
    setFormData((prevState) => ({
      ...prevState,
      countries: countriesArray
    }));
  };


  const handlePayment = async () => {
    setLoading(true);
    const voucherReference = formData.voucherReference.trim() === "" ? null : formData.voucherReference;

    console.log('formData ', formData);

    try {
      const response = await ledger.call('configurePaymentOptions', product.id, formData.actualPrice, formData.allowCryptoPayments, formData.allowCardPayments, formData.allowBankTransfer, voucherReference,
        formData.allowVoucherPayments, formData.issueDate, formData.annualRenewalFee
      )
      if (response) {
        swal('Successfully', 'Payment Update Successfully', 'success')
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    } catch (e) {
      console.log('Error saving payment products:', e);
    }
    setLoading(false);
  }
  const handleProfitSplit = async () => {
    setLoading(true);
    try {
      const response = await ledger.call('configureProfitSplit', product.id, formData.foundationPart, formData.operatorPart, formData.stakingPart, formData.thirdPartyPart, formData.thirdPartyIdentifier);
      if (response) {
        swal('Successfully', 'Profit Split Update Successfully', 'success')
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    } catch (e) {
      console.log('Error saving profit split products:', e);
    }
    setLoading(false);
  }

  const handleTerm = async () => {
    setLoading(true);
    try {
      const response = await ledger.call('configureTerms', product.id, formData.applyGeneralTerms, formData.termsLink);
      if (response) {
        swal('Successfully', 'Profit Split Update Successfully', 'success')
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    } catch (e) {
      console.log('Error saving profit split products:', e);
    }
    setLoading(false);
  }

  const handleLocalization = async () => {
    setLoading(true);
    try {
      const response = await ledger.call('configureLocalization', product.id, formData.countries);
      if (response) {
        swal('Successfully', 'Profit Split Update Successfully', 'success')
      } else {
        swal({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error'
        });
      }
    } catch (e) {
      console.log('Error saving profit split products:', e);
    }
    setLoading(false);
  }

  return (
    <div>
      {product && (
        <>
          <Tooltip title="Settings">
            <Fab
              color="primary"
              aria-label="settings"
              sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
              onClick={() => openDrawer(null)}
            >
              <IconSettings stroke={1.5} />
            </Fab>
          </Tooltip>

          <Drawer
            anchor="right"
            open={drawer}
            onClose={() => openDrawer(null)}
            PaperProps={{
              sx: {
                width: SidebarWidth,
              },
            }}
          >
            <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
              {/* Header */}
              <Box
                px={3}
                pt={3}
                display="flex"
                justifyContent="space-between"
                alignItems="start"
              >
                <Typography variant="h5">Enterprise license for corporations</Typography>
                <IconButton color="inherit" onClick={() => openDrawer(null)}>
                  <IconX size="1rem" />
                </IconButton>
              </Box>

              {/* Tabs */}
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                sx={{ mt: 2, p: 3 }}
              >
                <Tab label="Payments" />
                <Tab label="ProfitSplit" />
                <Tab label="Terms" />
                <Tab label="Localization" />
              </Tabs>

              {/* Tab Panels */}
              <TabPanel value={tabIndex} index={0}>
                {/* Payments Section */}
                <Typography variant="h6" gutterBottom>
                  Payments
                </Typography>

                <Box mt={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Actual price (USD/year)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    id='actualPrice'
                    variant="outlined"
                    onChange={handleNubmerChange}
                    value={formData.actualPrice}
                    defaultValue="169"
                    sx={{ mt: 1 }}
                  />
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Default price: $169 / year
                  </Typography>
                </Box>

                <Box mt={3}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold' }}>Allow instant payments in crypto</Typography>
                    <Switch
                      id='allowCryptoPayments'
                      name='allowCryptoPayments'
                      onChange={handleCheckedChange("allowCryptoPayments")}
                      checked={formData.allowCryptoPayments}
                      color="primary"
                    />
                  </Box>
                  <Typography variant="caption" color="#7C8FAC" sx={{ fontSize: '13px' }}>
                    to Internet Identity of Operator Group, e.g., for sending ckUSDC
                  </Typography>
                </Box>

                <Box mt={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold' }}>Allow instant payments with Credit Card</Typography>
                    <Switch
                      id='allowCardPayments'
                      name='allowCardPayments'
                      onChange={handleCheckedChange("allowCardPayments")}
                      checked={formData.allowCardPayments}
                      color="primary"
                    />
                  </Box>
                  <Typography variant="caption" color="#7C8FAC" sx={{ fontSize: '13px' }}>
                    to the Treasury, using a reference code
                  </Typography>
                </Box>

                <Box mt={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                      Allow payments using bank wire transfers
                    </Typography>
                    <Switch
                      id='allowBankTransfer'
                      name='allowBankTransfer'
                      onChange={handleCheckedChange("allowBankTransfer")}
                      checked={formData.allowBankTransfer}
                      color="primary"
                    />
                  </Box>
                  <Typography variant="caption" color="#7C8FAC" sx={{ fontSize: '13px' }}>
                    to bank account of Treasury, using a reference code
                  </Typography>
                </Box>

                <Box mt={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold' }}>The product can be paid using a Voucher</Typography>
                    <Switch
                      id='allowVoucherPayments'
                      name='allowVoucherPayments'
                      onChange={handleCheckedChange("allowVoucherPayments")}
                      checked={formData.allowVoucherPayments}
                      color="primary"
                    />
                  </Box>
                  <Typography variant="caption" color="#7C8FAC" sx={{ fontSize: '13px' }}>
                    only available if enabled by the Software Developer
                  </Typography>
                </Box>
                {formData.allowVoucherPayments && (
                  <Box mt={2}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Reference to Voucher Code
                    </Typography>
                    <TextField
                      fullWidth
                      id="voucherReference"
                      type='text'
                      variant="outlined"
                      onChange={handleInputChange}
                      value={formData.voucherReference}
                      placeholder="https://"
                    />
                    <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                      Used to communicate with external databases
                    </Typography>
                  </Box>
                )}
                <Box mt={2}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold' }}>Annual recurrent fees are issued </Typography>
                    <Switch
                      id='annualRenewalFee'
                      name='annualRenewalFee'
                      onChange={handleCheckedChange("annualRenewalFee")}
                      checked={formData.annualRenewalFee}
                      color="primary"
                    />
                  </Box>
                </Box>
                {formData.annualRenewalFee && (
                  <Box mt={2}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        id='issueDate'
                        name='issueDate'
                        onChange={handleSelectChange("issueDate")}
                        value={formData.issueDate}
                      >
                        <FormControlLabel
                          value="on first of January"
                          control={<Radio />}
                          label="on first of January"
                        />
                        <FormControlLabel
                          value="on the calendar day of the initial purchase (29Feb => 28 Feb)"
                          control={<Radio />}
                          label="on the calendar day of the initial purchase (29Feb => 28 Feb)"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                )}
                <Box mt={2}>
                  <Grid item xs={12}>
                    <Button
                      onClick={handlePayment}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {loading ? " Saving " : "Save"}
                    </Button>
                  </Grid>
                </Box>
              </TabPanel>

              <TabPanel value={tabIndex} index={1}>

                <Box mt={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Foundation part (%)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id='foundationPart'
                    variant="outlined"
                    onChange={handleNubmerChange}
                    value={formData.foundationPart}
                    sx={{ mt: 1 }}
                  />
                </Box>

                <Box mt={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Operator  part (%)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id='operatorPart'
                    variant="outlined"
                    onChange={handleNubmerChange}
                    value={formData.operatorPart}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Staking  part (%)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id='stakingPart'
                    variant="outlined"
                    onChange={handleNubmerChange}
                    value={formData.stakingPart}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="h6" gutterBottom>
                    Third Party
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Third Party part (%)
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id='thirdPartyPart'
                    variant="outlined"
                    onChange={handleNubmerChange}
                    value={formData.thirdPartyPart}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Third Party Group ID
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id='thirdPartyIdentifier'
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.thirdPartyIdentifier}
                    sx={{ mt: 1 }}
                  />
                </Box>
                <Box mt={2}>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleProfitSplit}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >

                      {loading ? " Saving " : "Save"}
                    </Button>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value={tabIndex} index={2} pt={0}>

                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'bold' }}>Apply general Terms of Service</Typography>
                  <Switch
                    id='applyGeneralTerms'
                    name='applyGeneralTerms'
                    onChange={handleCheckedChange("applyGeneralTerms")}
                    checked={formData.applyGeneralTerms}
                    color="primary"
                  />
                </Box>

                <Box mt={2}>
                  <TextField
                    fullWidth
                    id="termsLink"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.termsLink}
                    placeholder="https://"
                    sx={{ mt: 1, fontSize: '14px', fontWeight: 'bold' }}
                  />
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                    Add here link to operator specific Terms of Service, if any.
                  </Typography>
                </Box>
                <Box mt={2}>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleTerm}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >

                      {loading ? " Saving " : "Save"}
                    </Button>
                  </Grid>
                </Box>
              </TabPanel>


              <TabPanel value={tabIndex} index={3}>
                {/* Localization Section */}
                <Typography variant="h6" gutterBottom>
                  Countries
                </Typography>
                <TextField
                  id="countries"
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="Enter countries separated by commas"
                  onChange={handleArrayChange}
                  value={formData.countries.join(", ")}
                />
                <Box mt={2}>
                  <Grid item xs={12}>
                    <Button
                      onClick={handleLocalization}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >

                      {loading ? " Saving " : "Save"}
                    </Button>
                  </Grid>
                </Box>
              </TabPanel>
            </Scrollbar>
          </Drawer>
        </>)}
    </div>
  );
};

export default Sidebar;
