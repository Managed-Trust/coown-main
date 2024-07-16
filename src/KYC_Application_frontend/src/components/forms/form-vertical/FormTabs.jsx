import React, { useState } from "react";
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
  Checkbox,
  FormControlLabel,
  OutlinedInput,
  Alert,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ic from "ic0";
import WebcamCapture from "../../../WebCapture";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ParentCard from "../../../components/shared/ParentCard";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";

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

const ledger = ic.local("bkyz2-fmaaa-aaaaa-qaaaq-cai"); // Ledger canister

const countries = [
  { value: "IN", label: "India" },
  { value: "UK", label: "United Kingdom" },
  { value: "SL", label: "Sri Lanka" },
];

const initialState = {
  family_name: "",
  email: "",
  given_name: "",
  birth_date: "",
  age_over_18: true,
  gender: "",
  issuance_date: "",
  expiry_date: "",
  resident_address: "",
  resident_country: "",
  nationality: "",
  document_number: "",
  issuing_country: "",
  phone_number: "",
  openchat_id: "",
  document_file: null,
  role: "",
  phone: "",
  identityNumber: "",
  identityDoc: null, // Store file as base64 string
  citizenship: [],
  residency: "",
  resident_state: "",
  resident_city: "",
  resident_postal_code: "",
  resident_street: "",
  issuing_authority: "",
  issuing_jurisdiction: "",
  birth_place: "",
  birth_country: "",
  birth_state: "",
  birth_city: "",
};

const steps = [
  "Personal Details",
  "More Details",
  "Address Details",
  "Document Details",
  "Capture Image",
];

const FormTabs = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [skipped, setSkipped] = useState(new Set());

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
    window.location.href = "/";
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked,
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
          formData.phone &&
          formData.identityNumber &&
          formData.citizenship.length &&
          formData.residency
        );
      case 1:
        return (
          formData.birth_place &&
          formData.birth_country &&
          formData.birth_state &&
          formData.birth_city
        );
      case 2:
        return (
          formData.resident_address &&
          formData.resident_country &&
          formData.resident_state &&
          formData.resident_city &&
          formData.resident_postal_code &&
          formData.resident_street
        );
      case 3:
        return (
          formData.gender !== "" &&
          formData.nationality &&
          formData.issuance_date &&
          formData.expiry_date &&
          formData.issuing_authority &&
          formData.document_number &&
          formData.issuing_country &&
          formData.issuing_jurisdiction
        );
      case 4:
        return image;
      default:
        return false;
    }
  };

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
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
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

  const encryptBlob = async (blob) => {
    // console.log("1", blob);
    // const arrayBuffer = await blob.arrayBuffer();
    // console.log("2",arrayBuffer);

    const base64String = arrayBufferToBase64(blob);
    // console.log("2", base64String);

    const encryptedBase64String = encryptData(base64String);
    // console.log("3", encryptedBase64String);

    const encryptedArrayBuffer = base64ToArrayBuffer(encryptedBase64String);
    // return new Blob([encryptedArrayBuffer], { type: blob.type });
    return new Uint8Array(encryptedArrayBuffer);
  };

  const decryptArrayEntries = (encryptedArray) => {
    return encryptedArray.map((entry) => decryptData(entry));
  };

  const handlePersonalDetailsSubmit = async () => {
    console.log("Personal Details Submitted", formData);

    try {
      const hashedIdentityNumber = hashData(formData.identityNumber);
      console.log("Hash Identity Doc:", hashedIdentityNumber);
      const encryptedIdentityDoc = encryptData(formData.family_name);
      const encryptedIdentityDoc1 = encryptData(formData.given_name);
      const encryptedIdentityDoc2 = encryptData(formData.birth_date);
      const encryptedIdentityDoc3 = encryptData(formData.phone);
      const encryptedIdentityDoc4 = encryptData(formData.identityNumber);
      const encryptedIdentityDoc5 = encryptData(formData.residency);
      const encryptedIdentityDoc6 = formData.identityDoc;
      const encryptedCitizenship = encryptArrayEntries(formData.citizenship);

      console.log("Encrypted Identity Doc:", encryptedCitizenship);
            // const encryptedIdentityDoc7 = encryptData(identityDocBase64);
      // console.log("EnCrypted Identity Doc:", encryptedIdentityDoc7);

      // const encryptedCitizenship = encryptData(
      //   JSON.stringify(formData.citizenship)
      // );

      console.log("EnCrypted Identity Doc:", encryptedCitizenship);
      const response = await ledger.call(
        "addBasicInfoCustomer",
        principal,
        encryptData(formData.family_name),
        encryptData(formData.given_name),
        encryptData(formData.birth_date),
        encryptData(formData.phone),
        encryptData(formData.identityNumber),
        encryptedIdentityDoc6,
        encryptedCitizenship,
        encryptData(formData.residency)
      );

      const decryptedIdentityDoc = decryptData(encryptedIdentityDoc);
      const decryptedIdentityDoc1 = decryptData(encryptedIdentityDoc1);
      const decryptedIdentityDoc2 = decryptData(encryptedIdentityDoc2);
      const decryptedIdentityDoc3 = decryptData(encryptedIdentityDoc3);
      const decryptedIdentityDoc4 = decryptData(encryptedIdentityDoc4);
      const decryptedIdentityDoc5 = decryptData(encryptedIdentityDoc5);
      const decryptedCitizenship = decryptArrayEntries(encryptedCitizenship);

      console.log(
        "Decrypted Identity Doc:",
        decryptedIdentityDoc,
        decryptedIdentityDoc1,
        decryptedIdentityDoc2,
        decryptedIdentityDoc3,
        decryptedIdentityDoc4,
        decryptedIdentityDoc5,
        decryptedCitizenship
      );
      alert(response);
    } catch (e) {
      console.log("Error creating user:", e);
    } finally {
      handleNext();
    }
  };

  const handleMoreDetailsSubmit = async () => {
    console.log("More Details Submitted", formData);

    try {
      const response = await ledger.call(
        "addFamilyCustomer",
        principal,
        formData.birth_place,
        formData.birth_country,
        formData.birth_state,
        formData.birth_city
      );
      alert(response);
    } catch (e) {
      console.log("Error adding family details:", e);
    } finally {
      handleNext();
    }
  };

  const handleAddressDetailsSubmit = async () => {
    console.log("Address Details Submitted", formData);

    try {
      const response = await ledger.call(
        "addResidencyCustomer",
        principal,
        formData.resident_address,
        formData.resident_country,
        formData.resident_state,
        formData.resident_city,
        formData.resident_postal_code,
        formData.resident_street
      );
      alert(response);
    } catch (e) {
      console.log("Error adding residency details:", e);
    } finally {
      handleNext();
    }
  };

  const handleDocumentDetailsSubmit = async () => {
    console.log("Document Details Submitted", formData);
    try {
      const response = await ledger.call(
        "addOtherInfoCustomer",
        principal,
        formData.gender,
        formData.nationality,
        formData.issuance_date,
        formData.expiry_date,
        formData.issuing_authority,
        formData.document_number,
        formData.issuing_country,
        formData.issuing_jurisdiction
      );
      alert(response);
    } catch (e) {
      console.log("Error adding document details:", e);
    } finally {
      handleNext();
    }
  };

  const handleCaptureImageSubmit = async () => {
    console.log("Image Captured", image);

    try {
      const response = await ledger.call("addImage", principal, image);
      alert(response);
    } catch (e) {
      console.log("Error adding image:", e);
    } finally {
      handleNext();
    }
  };

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel
                  htmlFor="given_name"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Given Name
                  <Tooltip
                    title="Given and middle names"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
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
                        <ErrorOutlineIcon />
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
                <CustomFormLabel htmlFor="family_name" className="center">
                  Family Name
                  <Tooltip
                    title="Current last name(s) or surname(s) of the PID User."
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
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
                  htmlFor="identityDoc"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Upload Identity Document
                  <Tooltip
                    title="Upload your identity document"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <Box
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: "10px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "border 0.3s",
                    "&:hover": {
                      borderColor: "#666",
                    },
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="file-upload"
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="file-upload"
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    Drag and drop file OR &nbsp;
                    <span
                      style={{ color: "#1976d2", textDecoration: "underline" }}
                    >
                      SELECT
                    </span>
                  </label>
                  {documentPreview && (
                    <Box mt={2}>
                      <img
                        src={documentPreview}
                        alt="Document Preview"
                        style={{
                          width: "100%",
                          maxWidth: "50px",
                          maxHeight: "50px",
                          height: "auto",
                          borderRadius: "10px",
                          border: "1px solid #ccc",
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel
                  htmlFor="phone"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Phone Number
                  <Tooltip
                    title="User Phone Number"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="phone"
                  placeholder="+271-0099-221"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.phone}
                />

                <CustomFormLabel
                  htmlFor="identityNumber"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Identity Number
                  <Tooltip
                    title="User's identity number"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="identityNumber"
                  placeholder="Identity Number"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.identityNumber}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel
                  htmlFor="citizenship"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Citizenship
                  <Tooltip
                    title="Select one or multiple citizenships"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
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
                <Box mt={2}>
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

                <CustomFormLabel
                  htmlFor="residency"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Residency
                  <Tooltip
                    title="User's residency"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="residency"
                  placeholder="Residency"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.residency}
                />
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
                disabled={!isFormValid(0)}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel
                  htmlFor="birth_place"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Birth Place
                  <Tooltip
                    title="Place of birth"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="birth_place"
                  placeholder="Birth Place"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.birth_place}
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
                    <ErrorOutlineIcon />
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
              <Grid item xs={12} lg={6} mt={2}>
                <CustomFormLabel
                  htmlFor="birth_city"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Birth City
                  <Tooltip
                    title="City of birth"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="birth_city"
                  placeholder="Birth City"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.birth_city}
                />

                <CustomFormLabel
                  htmlFor="birth_state"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Birth State
                  <Tooltip
                    title="State of birth"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="birth_state"
                  placeholder="Birth State"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.birth_state}
                />
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleMoreDetailsSubmit}
                disabled={!isFormValid(1)}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="resident_address" className="center">
                  Resident Address
                  <Tooltip
                    title="The full address of the place where the PID User currently resides and/or can be contacted (street name, house number, city etc.)."
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
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
                    <ErrorOutlineIcon />
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

                <CustomFormLabel
                  htmlFor="resident_state"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Resident State
                  <Tooltip
                    title="The state where the PID User currently resides."
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="resident_state"
                  placeholder="State"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.resident_state}
                />
              </Grid>
              <Grid item xs={12} lg={6} mt={2}>
                <CustomFormLabel
                  htmlFor="resident_city"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Resident City
                  <Tooltip
                    title="The city where the PID User currently resides."
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="resident_city"
                  placeholder="City"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.resident_city}
                />

                <CustomFormLabel
                  htmlFor="resident_postal_code"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Resident Postal Code
                  <Tooltip
                    title="The postal code where the PID User currently resides."
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="resident_postal_code"
                  placeholder="Postal Code"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.resident_postal_code}
                />

                <CustomFormLabel
                  htmlFor="resident_street"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Resident Street
                  <Tooltip
                    title="The street where the PID User currently resides."
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="resident_street"
                  placeholder="Street"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.resident_street}
                />
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
                disabled={!isFormValid(2)}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="gender" className="center">
                  Gender
                  <Tooltip
                    title="Gender of the user"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <Select
                  id="gender"
                  fullWidth
                  onChange={handleSelectChange("gender")}
                  value={formData.gender}
                >
                  <MenuItem value={0}>Unspecified</MenuItem>
                  <MenuItem value={1}>Male</MenuItem>
                  <MenuItem value={2}>Female</MenuItem>
                </Select>

                <CustomFormLabel htmlFor="nationality" className="center">
                  Nationality
                  <Tooltip
                    title="Nationality of the user (ISO Alpha-2 code)"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="nationality"
                  placeholder="ISO Alpha-2 code"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.nationality}
                />

                <CustomFormLabel htmlFor="issuance_date" className="center">
                  Issuance Date
                  <Tooltip
                    title="Issuance date of the document (ISO format)"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
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

                <CustomFormLabel htmlFor="expiry_date" className="center">
                  Expiry Date
                  <Tooltip
                    title="Expiry date of the document (ISO format)"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
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
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="issuing_authority" className="center">
                  Issuing Authority
                  <Tooltip
                    title="Authority that issued the document"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="issuing_authority"
                  placeholder="Issuing Authority"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.issuing_authority}
                />

                <CustomFormLabel htmlFor="document_number" className="center">
                  Document Number
                  <Tooltip
                    title="Document number"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="document_number"
                  placeholder="Document Number"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.document_number}
                />

                <CustomFormLabel htmlFor="issuing_country" className="center">
                  Issuing Country
                  <Tooltip
                    title="Country that issued the document (ISO Alpha-2 code)"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="issuing_country"
                  placeholder="ISO Alpha-2 code"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.issuing_country}
                />

                <CustomFormLabel
                  htmlFor="issuing_jurisdiction"
                  className="center"
                >
                  Issuing Jurisdiction
                  <Tooltip
                    title="Jurisdiction that issued the document"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="issuing_jurisdiction"
                  placeholder="Issuing Jurisdiction"
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.issuing_jurisdiction}
                />
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
                disabled={!isFormValid(3)}
              >
                Next
              </Button>
            </Box>
          </Box>
        );
      case 4:
        return (
          <Box>
            {!image ? (
              <div style={{ paddingTop: "20px", borderRadius: "10px" }}>
                <WebcamCapture onCapture={handleCapture} />
              </div>
            ) : (
              <div>
                <h2>Captured Image:</h2>
                <img src={image} alt="Captured" />
                <Button onClick={() => setImage(null)}>Retake</Button>
              </div>
            )}
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCaptureImageSubmit}
                disabled={!isFormValid(4)}
              >
                Finish
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
                  All steps completed - you&apos;re finished
                </Alert>

                <Box textAlign="right">
                  <Button
                    onClick={handleReset}
                    variant="contained"
                    color="success"
                  >
                    Move to Home Page
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
