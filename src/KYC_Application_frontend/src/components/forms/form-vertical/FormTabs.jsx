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
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import ic from "ic0";
import WebcamCapture from "../../../WebCapture";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ParentCard from "../../../components/shared/ParentCard";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from "../../../layouts/full/shared/breadcrumb/Breadcrumb";
import swal from "sweetalert";

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
// const ledger = ic("sifoc-qqaaa-aaaap-ahorq-cai"); // Production canister

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
  addressVerificationDoc: null, // Store address verification file as base64 string
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
  documet_type: "",
};

const steps = [
  "Personal Details",
  "Residency Information",
  "Document Details",
  "Upload Document Photo",
  "Verify Your Identity",
];

const FormTabs = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [addressDocumentPreview, setAddressDocumentPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [skipped, setSkipped] = useState(new Set());
  const [loading, setLoading] = useState(false);

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
      addressVerificationDoc: base64String,
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
        return formData.identityDoc;
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
      const encryptedIdentityDoc6 = formData.identityDoc;
      const encryptedCitizenship = encryptArrayEntries(formData.citizenship);

      const response = await ledger.call(
        "addBasicInfoCustomer",
        principal,
        encryptData(formData.family_name),
        encryptData(formData.given_name),
        encryptData(formData.birth_date),
        encryptData(formData.phone),
        encryptData(formData.identityNumber),
        encryptData(encryptedIdentityDoc6),
        encryptedCitizenship,
        encryptData(formData.residency)
      );

      swal("Success", "Personal Record Stored Successfully!", "success");
    } catch (e) {
      swal("Error", e, "error");
    } finally {
      setLoading(false);
      handleNext();
    }
  };

  const handleMoreDetailsSubmit = async () => {
    console.log("More Details Submitted", formData);
    setLoading(true);

    try {
      const response = await ledger.call(
        "addFamilyCustomer",
        principal,
        encryptData(formData.birth_place),
        encryptData(formData.birth_country),
        encryptData(formData.birth_state),
        encryptData(formData.birth_city)
      );
      swal("Success", "Details Stored Successfully!", "success");
    } catch (e) {
      swal("Error", e, "error");
    } finally {
      setLoading(false);
      handleNext();
    }
  };

  const handleAddressDetailsSubmit = async () => {
    console.log("Address Details Submitted", formData);
    setLoading(true);

    try {
      const response = await ledger.call(
        "addResidencyCustomer",
        principal,
        encryptData(formData.resident_address),
        encryptData(formData.resident_country),
        encryptData(formData.resident_state),
        encryptData(formData.resident_city),
        encryptData(formData.resident_postal_code),
        encryptData(formData.resident_street),
        encryptData(formData.addressVerificationDoc) // Add address verification document
      );
      swal("Success", "Details Stored Successfully!", "success");
    } catch (e) {
      swal("Error", e, "error");
    } finally {
      setLoading(false);
      handleNext();
    }
  };

  const handleDocumentDetailsSubmit = async () => {
    console.log("Document Details Submitted", formData);
    setLoading(true);

    try {
      const response = await ledger.call(
        "addOtherInfoCustomer",
        principal,
        Number(formData.gender),
        encryptData(formData.nationality),
        encryptData(formData.issuance_date),
        encryptData(formData.expiry_date),
        encryptData(formData.issuing_authority),
        encryptData(formData.document_number),
        encryptData(formData.issuing_country),
        encryptData(formData.issuing_jurisdiction)
      );
      swal("Success", "Details Stored Successfully!", "success");
    } catch (e) {
      swal("Error", e, "error");
    } finally {
      setLoading(false);
      handleNext();
    }
  };

  const handleCaptureImageSubmit = async () => {
    console.log("Image Captured", image);
    setLoading(true);

    try {
      const response = await ledger.call(
        "addImage",
        principal,
        encryptData(image)
      );
      swal("Success", "Details Stored Successfully!", "success");
    } catch (e) {
      swal("Error", e, "error");
    } finally {
      setLoading(false);
      handleNext();
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
                  <Grid item xs={12} lg={12}>
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
                      <MenuItem value={0}>Image</MenuItem>
                      <MenuItem value={1}>Other</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item sx={12} lg={12}>
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
                        onChange={handleFileChange}
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
                onClick={handleDocumentDetailsSubmit}
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
                  Capture the photo of you holding the document you uploaded
                </Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                {!image ? (
                  <div style={{ borderRadius: "10px" }}>
                    <WebcamCapture onCapture={handleCapture} />
                  </div>
                ) : (
                  <div>
                    <h2>Captured Image:</h2>
                    <img src={image} alt="Captured" />
                    <Button onClick={() => setImage(null)}>Retake</Button>
                  </div>
                )}
              </Grid>
            </Grid>
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="inherit" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCaptureImageSubmit}
                disabled={!isFormValid(4) || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Finish"}
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
