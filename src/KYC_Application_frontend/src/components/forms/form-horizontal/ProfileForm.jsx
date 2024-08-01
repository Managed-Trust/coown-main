import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import CustomFormLabel from "../theme-elements/CustomFormLabel";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ParentCard from "../../../components/shared/ParentCard";
import PageContainer from "../../../components/container/PageContainer";
import { useConnect } from "@connect2ic/react";

import ic from "ic0";
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
  phone: "",
  openchat_id: "",
  document_file: null,
  role: "",
  identityNumber: "",
  citizenship: [],
  residency: "",
  verified: false,
};

const steps = [
  "Personal Details",
  "Address Details",
  "Document Details",
];

const ProfileForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState(initialState);
  const [documentPreview, setDocumentPreview] = useState(null);
  const [profile, setProfile] = useState(null);
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const { principal } = useConnect();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ledger.call("getCustomer", principal);
        console.log("Profile:", response);
        const profileData = response[0];
        setProfile(profileData);
        setFormData({
          ...formData,
          ...profileData,
          citizenship: profileData.citizenship || [],
        });
      } catch (e) {
        console.log("Error Fetching Profile:", e);
      }
    };
    if (principal) {
      fetchProfile();
    }
  }, [principal]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const arrayBuffer = fileReader.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      setFormData((prevData) => ({
        ...prevData,
        document_file: uint8Array,
      }));
      setDocumentPreview(
        URL.createObjectURL(new Blob([uint8Array], { type: file.type }))
      );
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleSelectChange = (id) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: event.target.value,
    }));
  };

  const handleCitizenshipAdd = (event) => {
    const newCitizenship = event.target.value;
    if (newCitizenship && !formData.citizenship.includes(newCitizenship)) {
      setFormData((prevData) => ({
        ...prevData,
        citizenship: [...prevData.citizenship, newCitizenship],
      }));
    }
  };

  const handleCitizenshipRemove = (citizenship) => {
    setFormData((prevData) => ({
      ...prevData,
      citizenship: prevData.citizenship.filter((item) => item !== citizenship),
    }));
  };

  const handleSubmitPersonalDetails = async () => {
    console.log("Personal Details Submitted", formData);
    try {
      const response = await ledger.call(
        "addBasicInfoCustomer",
        principal,
        formData.family_name,
        formData.given_name,
        formData.birth_date,
        formData.age_over_18,
        formData.role,
        formData.phone,
        formData.identityNumber,
        formData.document_file,
        false,
        formData.citizenship,
        formData.residency
      );
      console.log("Response:", response);
      alert(response);
    } catch (e) {
      console.error("Error submitting personal details:", e);
    }
  };

  const handleSubmitAddressDetails = async () => {
    console.log("Address Details Submitted", formData);
    try {
      const response = await ledger.call(
        "addResidencyCustomer",
        principal,
        encryptData(formData.resident_address),
        encryptData(formData.resident_country),
        encryptData(formData.resident_state),
        encryptData(formData.resident_city),
        encryptData(formData.resident_postal_code),
        encryptData(formData.resident_street)
      );
      console.log("Response:", response);
      alert(response);
    } catch (e) {
      console.error("Error submitting More details:", e);
    }
  };

  const handleSubmitDocumentDetails = async () => {
    console.log("Document Details Submitted", formData);
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
      console.log("Response:", response);
      alert(response);
    } catch (e) {
      console.error("Error submitting More details:", e);
    }
  };

  const renderTabContent = (tab) => {
    if (!profile) {
      return <p>Loading...</p>;
    }
    switch (tab) {
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
                  value={decryptData(formData.given_name)}
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
                      value={decryptData(formData.birth_date)}
                    />
                  </Grid>
                </Grid>

                <CustomFormLabel
                  htmlFor="phone"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Phone
                  <Tooltip
                    title="User's Phone Number"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="phone"
                  placeholder="+123456789"
                  fullWidth
                  onChange={handleInputChange}
                  value={decryptData(formData.phone)}
                />
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
                  value={decryptData(formData.family_name)}
                />

                <CustomFormLabel
                  htmlFor="citizenship"
                  sx={{ mt: 2 }}
                  className="center"
                >
                  Citizenship
                  <Tooltip
                    title="User's Citizenship"
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
                  onChange={handleCitizenshipAdd}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Citizenship
                  </MenuItem>
                  {countries.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={decryptData(option.value)}
                    >
                      {decryptData(option.label)}
                    </MenuItem>
                  ))}
                </Select>
                <Box mt={2}>
                  {formData.citizenship.map((citizenship) => (
                    <Chip
                      key={citizenship}
                      label={decryptData(citizenship)}
                      onDelete={() => handleCitizenshipRemove(citizenship)}
                      sx={{ marginRight: 1, marginBottom: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmitPersonalDetails}
              >
                Save
              </Button>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="resident_address" className="center">
                  Resident Address
                  <Tooltip
                    title="The full address of the place where the PID User currently resides and/or can be contacted."
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
                  value={decryptData(formData.resident_address)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="resident_country" className="center">
                  Resident Country
                  <Tooltip
                    title="The country where the PID User currently resides."
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
                  value={decryptData(formData.resident_country)}
                >
                  {countries.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmitAddressDetails}
              >
                Save
              </Button>
            </Box>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="issuance_date" className="center">
                  Issuance Date
                  <Tooltip
                    title="Date when the document was issued (ISO format)"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  type="date"
                  id="issuance_date"
                  fullWidth
                  onChange={handleInputChange}
                  value={decryptData(formData.issuance_date)}
                />

                <CustomFormLabel htmlFor="expiry_date" className="center">
                  Expiry Date
                  <Tooltip
                    title="Date when the document will expire (ISO format)"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  type="date"
                  id="expiry_date"
                  fullWidth
                  onChange={handleInputChange}
                  value={decryptData(formData.expiry_date)}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CustomFormLabel htmlFor="document_number" className="center">
                  Document Number
                  <Tooltip
                    title="The number assigned to the document"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="document_number"
                  placeholder="Enter Document Number"
                  fullWidth
                  onChange={handleInputChange}
                  value={decryptData(formData.document_number)}
                />

                <CustomFormLabel htmlFor="issuing_country" className="center">
                  Issuing Country
                  <Tooltip
                    title="The country where the document was issued"
                    placement="top"
                    cursor="pointer"
                  >
                    <ErrorOutlineIcon />
                  </Tooltip>
                </CustomFormLabel>
                <TextField
                  id="issuing_country"
                  fullWidth
                  onChange={handleInputChange}
                  value={decryptData(formData.issuing_country)}
                />
              </Grid>
            </Grid>
            <Box display="flex" justifyContent="flex-end" mt={3}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmitDocumentDetails}
              >
                Save
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
      <ParentCard title="Profile Information">
        <Box width="100%">
          <TabContext value={activeTab.toString()}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="form tabs"
            >
              {steps.map((label, index) => (
                <Tab key={label} label={label} value={index} />
              ))}
            </Tabs>
            {steps.map((label, index) => (
              <TabPanel key={label} value={index.toString()}>
                {renderTabContent(index)}
              </TabPanel>
            ))}
          </TabContext>
          <Box display="flex" flexDirection="row" mt={3}>
            {activeTab > 0 && (
              <Button
                color="inherit"
                variant="contained"
                onClick={() => setActiveTab((prev) => prev - 1)}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            )}
            <Box flex="1 1 auto" />
            {activeTab < steps.length - 1 && (
              <Button
                color="inherit"
                variant="contained"
                onClick={() => setActiveTab((prev) => prev + 1)}
                sx={{ ml: 1 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </ParentCard>
    </PageContainer>
  );
};

export default ProfileForm;
