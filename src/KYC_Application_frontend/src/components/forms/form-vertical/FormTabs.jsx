import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Select,
  MenuItem,
  TextField,
  Tooltip,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ic from "ic0";
import WebcamCapture from "../../../WebCapture";
import Webcam from 'react-webcam';
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ParentCard from "../../../components/shared/ParentCard";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import swal from "sweetalert";
import { useUser } from "../../../userContext/UserContext";
import {
  FleekSdk,
  ApplicationAccessTokenService,
} from "@fleek-platform/sdk/browser";

import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from "@connect2ic/react";
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

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const countries = [
  { value: "IN", label: "India" },
  { value: "UK", label: "United Kingdom" },
  { value: "SL", label: "Sri Lanka" },
];

const initialState = {
  family_name: "",
  given_name: "",
  birth_date: "",
  birth_country: "",
  phone: "",
  referralCode: "",
  resident_address: "",
  resident_country: "",
  addressVerificationDoc: null,
  document_type: "",
  citizenship: [],
  document_number: "",
  issuing_country: "",
  issuance_date: "",
  expiry_date: "",
  identityDoc: null, // Store file as base64 string
};

const steps = [
  "Personal Details",
  "Residency Information",
  "Document Details",
  "Upload Document Photo",
  "Verify Your Identity",
];

const FormTabs = () => {
  const { user, setUser } = useUser();
  const [userId, setUserId] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [addressDocumentPreview, setAddressDocumentPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const webcamRef = useRef(null);
  const intervalRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [preview, setPreview] = useState(null);
  const timeoutRef = useRef(null);
  const startTimeRef = useRef(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const handleDataAvailable = useCallback((event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    setElapsedTime(0); // Reset elapsed time
    startTimeRef.current = new Date().getTime(); // Record the start time

    const options = { mimeType: 'video/webm' };
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, options);
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();

    // Start interval to calculate elapsed time
    intervalRef.current = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = Math.floor((now - startTimeRef.current) / 1000); // Calculate elapsed seconds
      if (elapsed >= 60) {
        handleStopCaptureClick(); // Stop recording after 60 seconds
      } else {
        setElapsedTime(elapsed); // Update elapsed time
      }
    }, 1000);
  }, [handleDataAvailable]);

  const handleStopCaptureClick = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Clear timeout
      timeoutRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setCapturing(false);
    setRecorded(true);
  }, []);
  // Generate video preview
  const handlePreview = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setPreview(url);
    }
  }, [recordedChunks]);

  const handleRetake = (() => {
    setRecordedChunks([]);
    setPreview(null);
    setCapturing(false);
    setRecorded(false);
    setElapsedTime(0);
  });

  const isStepOptional = (step) => false;
  const isStepSkipped = (step) => skipped.has(step);

  const { isConnected, principal, activeProvider } = useConnect({
    onConnect: () => {
      // Signed in
    },
    onDisconnect: () => {
      // Signed out
    },
  });
  const applicationService = new ApplicationAccessTokenService({
    clientId: "client_NSez4i7UHB-0M6r2OJp-", // Use your actual client ID here
  });
  const fleekSdk = new FleekSdk({
    accessTokenService: applicationService,
  });
  const handleFleekFileChange = async (event) => {

    // const base64String = await readFileAsBase64(event.target.files[0]);
    setFile(event.target.files[0]);
    console.log('upp', event.target.files[0]);
    setDocumentPreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    setLoading(true);
    try {
      // Upload the file using the Fleek SDK
      const result = await fleekSdk.storage().uploadFile({
        file: file,
        onUploadProgress: (progress) => {
          console.log(`Upload progress: ${(progress.loaded / progress.total) * 100}%`);
        },
      });
      // setHash(result.pin.cid);
      console.log('result', result);
      console.log('params', userId, result.pin.cid);
      const response = await ledger.call("uploadDocumentPhoto", userId, result.pin.cid);
      console.log("Document Upload Response:", response);
      if (response == 'Success') {
        swal("Success", "Identity Details Stored Successfully!", "success");
        handleNext();
      } else {
        swal("Info", response, "info");
      }
    } catch (error) {
      console.log("Error uploading file:", error);
      alert("Failed to upload file.");
    }
    setLoading(false);
  };


  // const handleUpload = async () => {
  //   if (!file) {
  //     alert("Please select a file to upload");
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     // Upload the file using the Fleek SDK
  //     const result = await fleekSdk.storage().uploadFile({
  //       file: file,
  //       onUploadProgress: (progress) => {
  //         // const percentage = (progress.loaded / progress.total) * 100;
  //         // console.log(`Upload progress: ${percentage}%`);
  //       },
  //     });
  //     setHash(result.pin.cid);
  //     console.log('hash', result.pin.cid);
  //     // const response = await ledger.call("uploadDocumentPhoto", userId, file);
  //     // console.log("Document Upload Response:", response);
  //     // if(response == 'Success'){
  //     //   swal("Success", "Identity Details Stored Successfully!", "success");
  //     //   handleNext();
  //     // }else{
  //     //   swal("Info", response, "info");
  //     // }

  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     alert("Failed to upload file.");
  //   }
  //   setLoading(false);
  // };


  const fetchUser = async (e) => {
    console.log('user2', user);
    const response = await ledger.call("getUser", user);
    console.log("User records :", response);
    setUserId(response[0].email);

  }

  useEffect(() => {
    console.log('user1', user);
    fetchUser();
  }, [user, userId]);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    window.location.href = "/user-profile";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64String = await readFileAsBase64(file);

    setFormData((prevData) => ({
      ...prevData,
      identityDoc: base64String,
    }));
    setDocumentPreview(URL.createObjectURL(file));
  };

  const handleAddressFileChange = async (e) => {
    const file = e.target.files[0];
    const base64String = await readFileAsBase64(file);

    setFormData((prevData) => ({
      ...prevData,
      addressVerificationDoc: e.target.files[0],
    }));
    setAddressDocumentPreview(URL.createObjectURL(file));
  };

  const handleSelectChange = (id) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: event.target.value,
    }));
  };

  const handleAddCitizenship = (event) => {
    const value = event.target.value;
    if (value && !formData.citizenship.includes(value)) {
      setFormData((prevData) => ({
        ...prevData,
        citizenship: [...prevData.citizenship, value],
      }));
    }
  };

  const handleRemoveCitizenship = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      citizenship: prevData.citizenship.filter((item) => item !== value),
    }));
  };

  const isFormValid = (step) => {
    switch (step) {
      case 0:
        return (
          formData.given_name &&
          formData.family_name &&
          formData.birth_date &&
          formData.birth_country &&
          formData.phone
        );
      case 1:
        return (
          formData.resident_address &&
          formData.resident_country &&
          formData.addressVerificationDoc // Ensure address document upload is valid
        );
      case 2:
        return (
          formData.document_type !== "" &&
          formData.citizenship.length > 0 &&
          formData.document_number &&
          formData.issuing_country &&
          formData.issuance_date &&
          formData.expiry_date
        );
      case 3:
        return file;
      case 4:
        return preview;
      default:
        return false;
    }
  };
  const base64ToFile = (base64, fileName) => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
  }

  const handleCapture = async (imageSrc) => {
    setImage(imageSrc);
    try {
      console.log("Captured Image: ", imageSrc);
    } catch (error) {
      console.error("There was a problem with the capture operation:", error);
    }
  };

  const readFileAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  };

  const encryptArrayEntries = (array) => {
    return array.map((entry) => encryptData(entry));
  };

  const handlePersonalDetailsSubmit = async () => {
    console.log("Personal Details Submitted", formData);

    setLoading(true);
    try {
      // if(formData.referralCode){
      // const referralCode = await ledger.call('redeemReferralCode',formData.referralCode,principal);
      // console.log('referralCode',referralCode);
      // }
      console.log('user id', userId);
      const response = await ledger.call("addBasicInfoCustomer", userId, formData.family_name,
        formData.given_name, formData.birth_date, formData.birth_country, formData.phone, formData.referralCode);
      console.log("Personal Detail Result:", response);
      if (response == 'Success') {
        swal("Success", "Personal Record Stored Successfully!", "success");
        handleNext();
      } else {
        swal("Info", response, "info");
      }
    } catch (e) {
      console.log('error', e);
      swal("Error", e.message || e.toString(), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAddressDetailsSubmit = async () => {
    if (!formData.addressVerificationDoc) {
      alert("Please select a file to upload");
      return;
    }
    console.log("Address Details Submitted", formData);
    setLoading(true);

    try {
      const result = await fleekSdk.storage().uploadFile({
        file: formData.addressVerificationDoc,
        onUploadProgress: (progress) => {
          // console.log(`Upload progress: ${(progress.loaded / progress.total) * 100}%`);
        },
      });
      console.log('result', result);
      console.log('params', userId, result.pin.cid);
      const response = await ledger.call(
        "addResidencyCustomer",
        userId,
        formData.resident_address,
        formData.resident_country,
        result.pin.cid,
      );
      console.log("Address details response:", response);
      if (response == 'Success') {
        swal("Success", "Address Details Stored Successfully!", "success");
        handleNext();
      } else {
        swal("Info", response, "info");
      }
    } catch (e) {
      console.log('error', e);
      swal("Error", e.message || e.toString(), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentDetailsSubmit = async () => {

    console.log("Document Details Submitted", formData);
    const encryptedCitizenship = encryptArrayEntries(formData.citizenship);
    setLoading(true);

    try {
      const response = await ledger.call(
        "addDocumentDetailsCustomer",
        userId,
        formData.document_type,
        formData.citizenship,
        formData.document_number,
        formData.issuing_country,
        formData.issuance_date,
        formData.expiry_date,
      );
      if (response == 'Success') {
        swal("Success", "Document Details Stored Successfully!", "success");
        handleNext();
      } else {
        swal("Info", response, "info");
      }

    } catch (e) {
      swal("Error", e.message || e.toString(), "error");
    } finally {
      setLoading(false);
    }


  };

  const handleCaptureImageSubmit = async () => {

    const file = base64ToFile(image, 'live-image.jpg');
    console.log('params', userId, image);
    setLoading(true);
    try {
      const result = await fleekSdk.storage().uploadFile({
        file: file,
        onUploadProgress: (progress) => {
        },
      });
      console.log('result', result);
      console.log('params', userId, result.pin.cid);
      const response1 = await ledger.call("addImage", userId, result.pin.cid);
      // setResults(response.data.data);
      console.log('response', response1);

      if (response1 == 'Success') {
        swal({
          title: 'Success',
          text: 'Image Stored Successfully!',
          icon: 'success',
        });
        handleNext();
      } else {
        swal({
          title: 'Info',
          text: response1,
          icon: 'info',
        });
      }
    } catch (e) {
      // Convert the error to a string
      console.log('error', e);
      const errorMessage = e.message || 'An unexpected error occurred.';
      swal("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCaptureVideoSubmit = async () => {
    if (!preview) {
      console.error('No video to upload.');
      return;
    }
    console.log('preview',preview);
    setLoading(true);
    try {

    const response = await fetch(preview);
    const blob = await response.blob(); // Retrieve the actual blob data

    // Optionally, convert the blob to a file with a filename
    const file = new File([blob], 'recording.webm', { type: 'video/webm' });
    console.log('file',file);

      const result = await fleekSdk.storage().uploadFile({
        file: file,
        onUploadProgress: (progress) => {
        },
      });
      console.log('result', result);
      console.log('params', result.pin.cid);
      const response1 = await ledger.call("addImage", userId, result.pin.cid);
      // setResults(response.data.data);
      console.log('response', response1);

      if (response1 == 'Success') {
        swal({
          title: 'Success',
          text: 'Image Stored Successfully!',
          icon: 'success',
        });
        handleNext();
      } else {
        swal({
          title: 'Info',
          text: response1,
          icon: 'info',
        });
      }
    } catch (e) {
      // Convert the error to a string
      console.log('error', e);
      const errorMessage = e.message || 'An unexpected error occurred.';
      swal("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} lg={4}>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  Personal details
                </Typography>
                <Typography variant="body2" component="div" fontSize={16}>
                  Please enter your personal information
                </Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={6}>
                    <CustomFormLabel
                      htmlFor="given_name"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Given Name
                      <Tooltip
                        title="Given and middle names"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="given_name"
                      placeholder="John"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.given_name}
                    />
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <CustomFormLabel
                          htmlFor="birth_date"
                          sx={{ mt: 2 }}
                          className="center"
                        >
                          Date of Birth
                          <Tooltip
                            title="Day, month, and year on which the PID User was born."
                            placement="top"
                            cursor="pointer"
                          >
                            <InfoOutlined />
                          </Tooltip>
                        </CustomFormLabel>
                        <TextField
                          type="date"
                          id="birth_date"
                          fullWidth
                          onChange={handleInputChange}
                          value={formData.birth_date}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CustomFormLabel
                      htmlFor="family_name"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Family Name
                      <Tooltip
                        title="Current last name(s) or surname(s) of the PID User."
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="family_name"
                      placeholder="Doe"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.family_name}
                    />

                    <CustomFormLabel
                      htmlFor="birth_country"
                      sx={{ mt: 2 }}
                      className="center"
                    >
                      Birth Country
                      <Tooltip
                        title="Country of birth"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <Select
                      id="birth_country"
                      fullWidth
                      onChange={handleSelectChange("birth_country")}
                      value={formData.birth_country}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CustomFormLabel
                      htmlFor="phone"
                      sx={{ mt: 0 }}
                      className="center"
                    >
                      Phone Number
                      <Tooltip
                        title="User Phone Number"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="phone"
                      placeholder="+271-0099-221"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.phone}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CustomFormLabel
                      htmlFor="referralCode"
                      sx={{ mt: 0 }}
                      className="center"
                    >
                      Referral Code
                      <Tooltip
                        title="Referral Code"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="referralCode"
                      placeholder="Enter referral code if any"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.referralCode}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Box mt={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handlePersonalDetailsSubmit}
                disabled={!isFormValid(0) || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Next"}
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} lg={4}>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  Residency Information
                </Typography>
                <Typography variant="body2" component="div" fontSize={16}>
                  Provide your current residential details
                </Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <CustomFormLabel
                      htmlFor="resident_address"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Resident Address
                      <Tooltip
                        title="The full address of the place where the PID User currently resides and/or can be contacted (street name, house number, city etc.)."
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="resident_address"
                      placeholder="123 Main St"
                      fullWidth
                      onChange={handleInputChange}
                      multiline
                      rows={4}
                      value={formData.resident_address}
                    />
                    <CustomFormLabel
                      htmlFor="resident_country"
                      sx={{ mt: 2 }}
                      className="center"
                    >
                      Resident Country
                      <Tooltip
                        title="The country where the PID User currently resides, as an Alpha-2 country code as specified in ISO 3166-1."
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <Select
                      id="resident_country"
                      fullWidth
                      onChange={handleSelectChange("resident_country")}
                      value={formData.resident_country}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>

                  <Grid item xs={12} lg={12}>
                    <CustomFormLabel
                      htmlFor="address-upload"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Address Verification
                      <Tooltip
                        title="Please upload one of these documents, issued within the last 3 months"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <Typography variant="body2" mb={1}>
                      Please upload one of these documents, issued within the last 3 months:
                    </Typography>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      <li>✓ Utility bill.</li>
                      <li>✓ Bank statement.</li>
                      <li>✓ Government correspondence.</li>
                      <li>✓ Rental agreement.</li>
                      <li>✓ Insurance statement.</li>
                    </ul>
                    <Box
                      sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border 0.3s',
                        '&:hover': {
                          borderColor: '#666',
                        },
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAddressFileChange}
                        id="address-upload"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="address-upload" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Drag and drop file OR &nbsp;<span style={{ color: '#1976d2', textDecoration: 'underline' }}>SELECT</span>
                      </label>
                      {addressDocumentPreview && (
                        <Box mt={2}>
                          <img src={addressDocumentPreview} alt="Address Document Preview" style={{ width: '100%', maxWidth: '150px', maxHeight: '150px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }} />
                        </Box>
                      )}
                    </Box>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddressDetailsSubmit}
                disabled={!isFormValid(1) || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Next"}
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} lg={4}>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  Document Details
                </Typography>
                <Typography variant="body2" component="div" fontSize={16}>
                  Fill in the details of your identity document
                </Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                  <Grid item xs={12} lg={12}>
                    <CustomFormLabel htmlFor="document_type" className="center" sx={{ mt: 0 }}>
                      Document Type
                      <Tooltip
                        title="Document Formate of the User"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <Select
                      id="document_type"
                      fullWidth
                      onChange={handleSelectChange("document_type")}
                      value={formData.document_type}
                    >
                      <MenuItem value="Image">Image</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item sm={12} lg={12}>
                    <CustomFormLabel
                      htmlFor="citizenship"
                      sx={{ mt: 0 }}
                      className="center"
                    >
                      Citizenship
                      <Tooltip
                        title="Select one or multiple citizenships"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <Select
                      id="citizenship"
                      fullWidth
                      value=""
                      onChange={handleAddCitizenship}
                    >
                      {countries.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <Box mt={1}>
                      {formData.citizenship.map((citizen, index) => (
                        <Chip
                          key={index}
                          label={citizen}
                          onDelete={() => handleRemoveCitizenship(citizen)}
                          deleteIcon={<DeleteIcon />}
                          sx={{ margin: 0.5 }}
                        />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={12} lg={12} sx={{ mt: 0 }}>
                    <CustomFormLabel
                      htmlFor="document_number"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Document Number
                      <Tooltip
                        title="Document number"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="document_number"
                      placeholder="Document Number"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.document_number}
                    />
                  </Grid>

                  <Grid item xs={12} lg={12} sx={{ mt: 0 }}>
                    <CustomFormLabel
                      htmlFor="issuing_country"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Issuing Country
                      <Tooltip
                        title="Country that issued the document (ISO Alpha-2 code)"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      id="issuing_country"
                      placeholder="ISO Alpha-2 code"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.issuing_country}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CustomFormLabel
                      htmlFor="issuance_date"
                      className="center"
                      sx={{ mt: 0 }}
                    >
                      Issuance Date
                      <Tooltip
                        title="Issuance date of the document (ISO format)"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      type="date"
                      id="issuance_date"
                      placeholder="YYYY-MM-DD"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.issuance_date}
                    />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <CustomFormLabel htmlFor="expiry_date" className="center" sx={{ mt: 0 }}>
                      Expiry Date
                      <Tooltip
                        title="Expiry date of the document (ISO format)"
                        placement="top"
                        cursor="pointer"
                      >
                        <InfoOutlined />
                      </Tooltip>
                    </CustomFormLabel>
                    <TextField
                      type="date"
                      id="expiry_date"
                      placeholder="YYYY-MM-DD"
                      fullWidth
                      onChange={handleInputChange}
                      value={formData.expiry_date}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDocumentDetailsSubmit}
                disabled={!isFormValid(2) || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Next"}
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} lg={4}>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  Upload Document Photo
                </Typography>
                <Typography variant="body2" component="div" fontSize={16} lineHeight={1.5}>
                  Upload your document photo for AML check. Document verification may take up to 72 hours.
                </Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <Grid container spacing={3}>
                  <Typography variant="h6" mb={1}>
                    To avoid delays when verifying your document, ensure the following:
                  </Typography>
                  <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                    <li>✓ The document must not be expired.</li>
                    <li>✓ The document should be in good condition and clearly visible.</li>
                    <li>✓ Ensure there is no light glare and the text is readable.</li>
                  </ul>
                  <Grid item xs={12} lg={12}>
                    <Box
                      sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '10px',
                        padding: '20px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'border 0.3s',
                        '&:hover': {
                          borderColor: '#666',
                        },
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFleekFileChange}
                        id="file-upload"
                        style={{ display: 'none' }}
                      />
                      <label htmlFor="file-upload" style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                        Drag and drop file OR &nbsp;<span style={{ color: '#1976d2', textDecoration: 'underline' }}>SELECT</span>
                      </label>
                      {documentPreview && (
                        <Box mt={2}>
                          <img src={documentPreview} alt="Document Preview" style={{ width: '100%', maxWidth: '150px', maxHeight: '150px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }} />
                        </Box>
                      )}
                    </Box>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                disabled={!isFormValid(3) || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Next"}
              </Button>
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} lg={4}>
                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                  Verify your document
                </Typography>
                <Typography variant="body2" component="div" fontSize={16} lineHeight={1.5}>
                  Capture your video while holding your ID for live test
                </Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                {preview ? (
                  <div className="video-preview">
                    <video src={preview} controls />
                  </div>
                ) :
                  <>
                    <Webcam audio={false} ref={webcamRef} />
                  </>
                }
                <Box display='flex' justifyContent='center' mt={2} gap={2} >
                  {!preview ? <>
                    {capturing ? (
                      <>
                        <Box display='flex' flexDirection='column' justifyContent='center'>
                          <Typography sx={{ textAlign: 'center', color: 'blue' }}>0:{elapsedTime}s</Typography>

                          <Button onClick={handleStopCaptureClick} color="primary" variant="contained" >Stop Recording</Button>
                        </Box>
                      </>
                    ) : (
                      <Box display='flex' flexDirection='row' justifyContent='center' gap={2}>

                        {recorded ?
                          <>
                            <Button onClick={handlePreview} color="primary" variant="contained">Preview</Button>
                          </> :

                          <Button onClick={handleStartCaptureClick} color="primary" variant="contained" >Start Recording</Button>
                        }
                      </Box>
                    )}
                  </> :
                    <Box display='flex' flexDirection='row' justifyContent='center' gap={2}>

                      <Button  onClick={handleRetake}  color="primary" variant="contained">Retake</Button>

                    </Box>
                  }
                </Box>
                {/* {!image ? (
                  <div style={{ borderRadius: "10px" }}>
                    <WebcamCapture onCapture={handleCapture} />
                  </div>
                ) : (
                  <div>
                    <h2>Captured Image:</h2>
                    <img src={image} alt="Captured" />
                    <Button onClick={() => setImage(null)}>Retake</Button>
                  </div>
                )} */}
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                // onClick={handleCaptureImageSubmit}
                onClick={handleCaptureVideoSubmit}
                disabled={!isFormValid(4) || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Proceed"}
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <PageContainer>
      <Breadcrumb title="KYC Application" description="this is KYC page" />
      <ParentCard title="KYC">
        <Box width="100%">
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Stack spacing={2} mt={3}>
                <Alert severity="success" mt={2}>
                  All steps completed - you&apos;re record will be reviewed by the AML Officer
                  within 24 hours.
                </Alert>

                <Box textAlign="right">
                  <Button onClick={handleReset} variant="contained" color="success">
                    Move to Dashboard
                  </Button>
                </Box>
              </Stack>
            </>
          ) : (
            <>
              <Box>{handleSteps(activeStep)}</Box>
            </>
          )}
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default FormTabs;
