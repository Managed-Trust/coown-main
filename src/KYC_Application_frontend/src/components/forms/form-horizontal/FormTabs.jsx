import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Tab,
  TextField,
  Stack
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import BlankCard from '../../shared/BlankCard';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import emailjs from "@emailjs/browser";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";
import ic from "ic0";
const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const initialState = {
  email: '',
  otp: ''
};

const FormTabs = () => {
  const [value, setValue] = useState('1');
  const [formData, setFormData] = useState(initialState);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');

  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    }
  });

  const handleChange = (event, newValue) => {
    if (newValue === '2' && !isEmailDisabled) {
      alert('Please submit your email first');
      return;
    }
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const sendOTP = async () => {
    try {
      const response = await ledger.call("generateOTP", '12');
      setGeneratedOtp(response);
      console.log("Generated OTP:", response);
    } catch (e) {
      console.log("Error Generation OTP:", e);
    }
  };

  // Effect to handle sending the email when generatedOtp changes
  useEffect(() => {
    if (generatedOtp) {
      const emailParams = {
        email: formData.email,
        otp: generatedOtp,
      };

      emailjs
        .send('service_idh0h15', 'template_3d2t5lb', emailParams, 'Y4QJDpwjrsdi3tQAR')
        .then(
          () => {
            console.log('SUCCESS!');
            setIsEmailDisabled(true);
          },
          (error) => {
            console.log('FAILED...', error.text);
          }
        )
        .catch((error) => {
          console.log("Error sending OTP:", error);
        })
        .finally(() => {
          alert("OTP sent to your email " + formData.email);
          setIsEmailDisabled(true); // Disable email input
          setValue('2'); // Switch to the OTP Verification tab
        });
    }
  }, [generatedOtp]); // This effect runs whenever generatedOtp changes

  const handleEmailSubmit = () => {
    if (formData.email.trim() === '') {
      alert('Email cannot be empty');
      return;
    }
    sendOTP();
  };

  const handleOtpSubmit = async () => {
    if (formData.otp === generatedOtp) {
      try{
        const response = await ledger.call("verifyOTP","12",generatedOtp);
        if(response){
          alert("Email address verified...");
        }else{
          alert("Invalid OTP");
        }
        
      }catch(e){
        console.log("Error Verifying:",e);
      }finally{
        console.log("end verification");
      }
      
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div>
      <BlankCard>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: (theme) => theme.palette.divider }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" scrollButtons="auto">
              <Tab label="Email" value="1" />
              <Tab label="OTP Verification" value="2" disabled={!isEmailDisabled} />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel htmlFor="email" className="center" style={{ marginTop: '0px' }}>
                  Email Address
                </CustomFormLabel>
                <TextField
                  id="email"
                  placeholder="user@gmail.com"
                  fullWidth
                  onChange={handleInputChange}
                  disabled={isEmailDisabled}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3} mb={5}>
              <Button variant="contained" color="primary" onClick={handleEmailSubmit}>
                Send OTP
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel htmlFor="otp" className="center" style={{ marginTop: '0px' }}>
                  Enter OTP
                </CustomFormLabel>
                <TextField id="otp" placeholder="Enter 6 digit OTP" fullWidth onChange={handleInputChange} />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button variant="contained" color="primary" onClick={handleOtpSubmit}>
                Verify OTP
              </Button>
            </Stack>
          </TabPanel>
        </TabContext>
      </BlankCard>
    </div>
  );
};

export default FormTabs;
