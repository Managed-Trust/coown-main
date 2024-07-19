import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Tab,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  Select,
  Paper,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BlankCard from "../../shared/BlankCard";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import emailjs from "@emailjs/browser";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";
import ic from "ic0";
const ledger = ic.local("bd3sg-teaaa-aaaaa-qaaba-cai"); // Ledger canister
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

import CryptoJS from "crypto-js";

const secretKey = "your-secret-key"; // Use a strong secret key

const hashData = (data) => {
  return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const initialState = {
  email: "",
  otp: "",
  registerCompany: false,
  companyName: "",
  registrationNumber: "",
  legalStructure: "",
  registeredAddress: "",
  taxID: "",
  incorporationCertificate: [],
  memorandumAndArticles: [],
  representativeFullName: "",
  position: "",
  idDocumentType: "",
  idDocumentNumber: "",
  idDocument: [],
  proofOfAuthority: [],
  emailRep: "",
  phoneNumber: "",
  ecnomicOwner: "",
  beneficialOwner: "",
  publicLawEntity: false,
  name: "",
  contactPerson: "",
  address: "",
  mail: "",
  phone: "",
  website: "",
};

const FormTabs = () => {
  const [value, setValue] = useState("1");
  const [formData, setFormData] = useState(initialState);
  const [isEmailDisabled, setIsEmailDisabled] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [filePreviews, setFilePreviews] = useState({});

  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });

  const handleChange = (event, newValue) => {
    if ((newValue === "2" || newValue === "3") && !isEmailDisabled) {
      alert("Please submit your email first");
      return;
    }
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { id, value, name } = e.target;
    const inputId = id || name; // for Select component
    setFormData((prevData) => ({
      ...prevData,
      [inputId]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const { id, files } = e.target;
    const file = files[0];
    const blob = await file.arrayBuffer();
    setFormData((prevData) => ({
      ...prevData,
      [id]: new Uint8Array(blob),
    }));
    setFilePreviews((prev) => ({
      ...prev,
      [id]: URL.createObjectURL(file),
    }));
  };

  const createUser = async () => {
    try {
      const response = await ledger.call(
        "createUser",
        principal,
        encryptData(formData.email)
      );
      console.log("User created:", formData.email);
      alert(response);
    } catch (e) {
      console.log("Error creating user:", e);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await ledger.call("generateOTP", principal);
      setGeneratedOtp(response);
      console.log("Generated OTP:", response);
    } catch (e) {
      console.log("Error Generation OTP:", e);
    }
  };

  useEffect(() => {
    if (generatedOtp) {
      const emailParams = {
        email: formData.email,
        otp: generatedOtp,
      };

      emailjs
        .send(
          "service_idh0h15",
          "template_3d2t5lb",
          emailParams,
          "Y4QJDpwjrsdi3tQAR"
        )
        .then(
          () => {
            console.log("SUCCESS!");
            setIsEmailDisabled(true);
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        )
        .catch((error) => {
          console.log("Error sending OTP:", error);
        })
        .finally(() => {
          alert("OTP sent to your email " + formData.email);
          setValue("3");
        });
    }
  }, [generatedOtp]);

  const handleEmailSubmit = async () => {
    if (formData.email.trim() === "") {
      alert("Email cannot be empty");
      return;
    }
    await createUser();
    setIsEmailDisabled(true);
    setValue("2");
  };

  const handleOtpSubmit = async () => {
    if (formData.otp === generatedOtp) {
      try {
        const response = await ledger.call(
          "verifyOTP",
          principal,
          formData.otp
        );
        if (response) {
          alert("Email address verified...");
        } else {
          alert("Invalid OTP");
        }
      } catch (e) {
        console.log("Error Verifying:", e);
      } finally {
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
          <Box
            sx={{
              borderBottom: 1,
              borderColor: (theme) => theme.palette.divider,
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Enter Email" value="1" />
              <Tab label="Verify Email" value="2" disabled={!isEmailDisabled} />
              <Tab
                label="OTP Verification"
                value="3"
                disabled={!isEmailDisabled}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel
                  htmlFor="email"
                  className="center"
                  style={{ marginTop: "0px" }}
                >
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
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              mt={3}
              mb={5}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleEmailSubmit}
              >
                Create User
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel
                  htmlFor="email"
                  className="center"
                  style={{ marginTop: "0px" }}
                >
                  Email Address
                </CustomFormLabel>
                <TextField
                  id="email"
                  value={formData.email}
                  fullWidth
                  disabled
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-end"
              mt={3}
              mb={5}
            >
              <Button variant="contained" color="primary" onClick={sendOTP}>
                Send OTP
              </Button>
            </Stack>
          </TabPanel>
          <TabPanel value="3">
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <CustomFormLabel
                  htmlFor="otp"
                  className="center"
                  style={{ marginTop: "0px" }}
                >
                  Enter OTP
                </CustomFormLabel>
                <TextField
                  id="otp"
                  placeholder="Enter 6 digit OTP"
                  fullWidth
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOtpSubmit}
              >
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
