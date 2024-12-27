import React, { useState } from 'react';
import {
    Box,
    Paper,
    Button,
    Grid,
    TextField,
    Chip,
    Typography,
    FormControlLabel,
    Switch,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister
import swal from 'sweetalert';
const settingsOptions = [
    { label: 'Affiliated Group', number: 1 },
    { label: 'Focal Point', number: 2 },
    { label: 'SLA', number: 3 },
    { label: 'Localization', number: 4 },
];

const NumberIcon = styled(Box)(({ theme }) => ({
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
}));

const AddAffilities = ({ onFormShow }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [afiliateKey, setKey] = useState(generateRandomKey());
    const [completedSteps, setCompletedSteps] = useState([]);
    const [loading, setLoading] = useState(false);
    // State for form data
    const [formData, setFormData] = useState({
        associateType: '',
        affiliateGroup: '',
        affiliateWebsite: '',
        localization: false,
        steeringDelegatedUser: '',
        coordinationDelegatedUser: '',
        coordinationDeputy: '',
        focalPoint: '',
        role: '',
        email: '',
        phone: '',
        mainContact: '',
        preferredMessenger: '',
        messengerIdentifier: '',
        slaWithFoundation: false,
        latestOriginalFile: '',
        workingDraft: '',
        activitiesInManagementSystem: false,
        managementSystemLink: '',
        comments: '',
        licensedIn: [], // Changed to an array
        exclusiveAreas: [], // Changed to an array
        nonExclusiveAreas: [], // Changed to an array
    });


    const handleNext = () => {
        if (activeStep < settingsOptions.length - 1) {
            // Mark the current step as completed
            setCompletedSteps((prevSteps) => [...prevSteps, activeStep]);
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prevStep) => prevStep - 1);
        }
    };

    const handleTabClick = (index) => {
        // Allow navigation only to completed steps or the current step
        if (completedSteps.includes(index) || index === activeStep) {
            setActiveStep(index);
        }
    };

    const handleChange = (e) => {
        const { name, id, value, checked, type } = e.target;
        const key = name || id;

        if (key === 'licensedIn' || key === 'exclusiveAreas' || key === 'nonExclusiveAreas') {
            // Handle array fields differently, do nothing here
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            [key]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleAddToArray = (key, item) => {
        if (item.trim() !== '') {
            setFormData((prevData) => ({
                ...prevData,
                [key]: [...prevData[key], item.trim()],
            }));
        }
    };

    const handleRemoveFromArray = (key, index) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: prevData[key].filter((_, i) => i !== index),
        }));
    };


    function generateRandomKey() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const keyLength = 8;
        let randomKey = '';

        for (let i = 0; i < keyLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomKey += characters[randomIndex];
        }

        return randomKey;
    }


    const handleAffiliateGroup = async () => {
        console.log('Affiliate Group Data:', formData);
        setLoading(true);
        try {
            const res = await ledger.call("createAffiliateDetails", afiliateKey);
            console.log("Key added:", afiliateKey);
            if (res) {
                const response = await ledger.call("addAffiliate", afiliateKey, formData.affiliateGroup, formData.associateType, formData.affiliateWebsite, true, formData.steeringDelegatedUser, true, formData.coordinationDelegatedUser, formData.coordinationDeputy);

                console.log("Add Affiliates Response:", response);
            }

        } catch (e) {
            console.log("Error adding affiliates:", e);
        } finally {
            console.log("affiliates added done");
            swal("Success", 'Affiliate Added Successfully!', "success");
            setLoading(false);
            handleNext();
        }
    };

    const handleFocalPointStepNext = async () => {
        console.log('Focal Point Data:', formData);
        console.log("Key added:", afiliateKey);
        setLoading(true);
        try {
            const response = await ledger.call("addFocalPoint", afiliateKey, formData.mainContact, formData.role, formData.email, formData.phone, formData.preferredMessenger, formData.messengerIdentifier);

            console.log("Focal point:", response);
        } catch (e) {
            console.log("Error adding Focal Point:", e)
        } finally {
            swal("Success", 'Focal Point Added Successfully!', "success");
            setLoading(false);
            handleNext();
        }
    };

    const handleSLA = async () => {
        console.log('SLA Data:', formData);
        console.log("Key added:", afiliateKey);
        setLoading(true);
        try {
            const response = await ledger.call("addSLA", afiliateKey, formData.latestOriginalFile, formData.workingDraft, formData.managementSystemLink, formData.comments);

            console.log("SLA response:", response);
        } catch (e) {
            console.log("Error adding SLA response:", e)
        } finally {
            swal("Success", 'SLA Added Successfully!', "success");
            handleNext();
            setLoading(false);
        }
    };

    const handleLocalization = async () => {
        console.log('Localization Data:', formData);
        setLoading(true);
        console.log("Key added:", afiliateKey);
        try {
            const response = await ledger.call("addLocalization", afiliateKey, formData.localization, formData.licensedIn, formData.exclusiveAreas, formData.nonExclusiveAreas);

            console.log("Localization response:", response);
        } catch (e) {
            console.log("Error adding SLA response:", e)
        } finally {
            swal("Success", 'Localization Added Successfully!', "success");
            onFormShow(false);
            setLoading(false);
        }

    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Add affiliate
                        </Typography>
                        <Typography variant="body2" color="#5A6A85" sx={{ marginBottom: '20px' }}>
                            Add groups of affiliates of the inner and outer circles.
                        </Typography>
                        {/* Affiliate Group Section */}
                        <Box sx={{ marginBottom: '30px' }}>
                            <Grid container spacing={2}>
                                {/* Associate Type */}
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel htmlFor="associateType">Associate type</CustomFormLabel>
                                    <TextField
                                        id="associateType"
                                        name="associateType"
                                        select
                                        fullWidth
                                        value={formData.associateType}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Type1">Type 1</MenuItem>
                                        <MenuItem value="Type2">Type 2</MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Affiliate Group */}
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel htmlFor="affiliateGroup">Affiliate group</CustomFormLabel>
                                    <TextField
                                        id="affiliateGroup"
                                        name="affiliateGroup"
                                        select
                                        fullWidth
                                        value={formData.affiliateGroup}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="Group1">Group 1</MenuItem>
                                        <MenuItem value="Group2">Group 2</MenuItem>
                                    </TextField>
                                </Grid>

                                {/* Affiliate Website */}
                                <Grid item xs={12}>
                                    <CustomFormLabel htmlFor="affiliateWebsite">Affiliate website</CustomFormLabel>
                                    <TextField
                                        id="affiliateWebsite"
                                        name="affiliateWebsite"
                                        fullWidth
                                        placeholder="https://"
                                        value={formData.affiliateWebsite}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Steering Committee Section */}
                        <Box sx={{ marginBottom: '30px' }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: '10px', fontWeight: 600 }}>
                                Steering Committee
                            </Typography>
                            <FormControlLabel
                                control={<Switch color="primary" />}
                                label="Represented in the Steering Committee"
                            />
                            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel htmlFor="steeringDelegatedUser">Delegated user</CustomFormLabel>
                                    <TextField
                                        id="steeringDelegatedUser"
                                        name="steeringDelegatedUser"
                                        select
                                        fullWidth
                                        value={formData.steeringDelegatedUser}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="User1">User 1</MenuItem>
                                        <MenuItem value="User2">User 2</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Coordination Commitee Section */}
                        <Box sx={{ marginBottom: '30px' }}>
                            <Typography variant="subtitle1" sx={{ marginBottom: '10px', fontWeight: 600 }}>
                                Coordination Commitee
                            </Typography>
                            <FormControlLabel
                                control={<Switch color="primary" />}
                                label="Represented in the Steering Committee"
                            />
                            <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel htmlFor="coordinationDelegatedUser">Delegated user</CustomFormLabel>
                                    <TextField
                                        id="coordinationDelegatedUser"
                                        name="coordinationDelegatedUser"
                                        select
                                        fullWidth
                                        value={formData.coordinationDelegatedUser}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="User1">User 1</MenuItem>
                                        <MenuItem value="User2">User 2</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <CustomFormLabel htmlFor="coordinationDeputy">Deputy</CustomFormLabel>
                                    <TextField
                                        id="coordinationDeputy"
                                        name="coordinationDeputy"
                                        select
                                        fullWidth
                                        value={formData.coordinationDeputy}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="User1">User 1</MenuItem>
                                        <MenuItem value="User2">User 2</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleAffiliateGroup}>
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Next'
                                )}
                            </Button>
                        </Box>
                    </Box>
                );

            case 1:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Focal Point
                        </Typography>
                        <Typography variant="body2" color="#5A6A85" sx={{ marginBottom: '20px' }}>
                            Main contact person details.
                        </Typography>
                        <Grid container spacing={2}>
                            {/* Focal Point */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="focalPoint">Focal Point</CustomFormLabel>
                                <TextField
                                    id="focalPoint"
                                    name="focalPoint"
                                    select
                                    fullWidth
                                    value={formData.focalPoint}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="User1">User 1</MenuItem>
                                    <MenuItem value="User2">User 2</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Role / Title */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="role">Role / Title</CustomFormLabel>
                                <TextField
                                    id="role"
                                    name="role"
                                    fullWidth
                                    placeholder="Role / Title"
                                    value={formData.role}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
                                <TextField
                                    id="email"
                                    name="email"
                                    fullWidth
                                    placeholder="Email"
                                    helperText="Used for BCP implementation"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Phone */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="mainContact">Main Contact</CustomFormLabel>
                                <TextField
                                    id="mainContact"
                                    name="mainContact"
                                    fullWidth
                                    placeholder="Main Contact"
                                    value={formData.mainContact}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Phone */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="phone">Phone</CustomFormLabel>
                                <TextField
                                    id="phone"
                                    name="phone"
                                    fullWidth
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Preferred Messenger */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="preferredMessenger">Preferred Messenger</CustomFormLabel>
                                <TextField
                                    id="preferredMessenger"
                                    name="preferredMessenger"
                                    select
                                    fullWidth
                                    value={formData.preferredMessenger}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                                    <MenuItem value="Telegram">Telegram</MenuItem>
                                    <MenuItem value="Signal">Signal</MenuItem>
                                </TextField>
                            </Grid>

                            {/* Messenger Identifier */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="messengerIdentifier">Messenger Identifier</CustomFormLabel>
                                <TextField
                                    id="messengerIdentifier"
                                    name="messengerIdentifier"
                                    fullWidth
                                    placeholder="Username, ID, email, etc."
                                    value={formData.messengerIdentifier}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleFocalPointStepNext}>
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Next'
                                )}
                            </Button>
                        </Box>
                    </Box>
                );

            case 2:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Service Level Agreement
                        </Typography>
                        <Typography variant="body2" color="#5A6A85" sx={{ marginBottom: '20px' }}>
                            Define Service Level Agreement.
                        </Typography>
                        <Grid container spacing={2}>
                            {/* SLA with Foundation Toggle */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="primary"
                                            id="slaWithFoundation"
                                            name="slaWithFoundation"
                                            checked={formData.slaWithFoundation}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Service Level Agreement (SLA) with foundation"
                                />
                            </Grid>

                            {/* SLA Links */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="latestOriginalFile">
                                    Latest original file (e.g., a signed PDF)
                                </CustomFormLabel>
                                <TextField
                                    id="latestOriginalFile"
                                    name="latestOriginalFile"
                                    fullWidth
                                    placeholder="https://"
                                    value={formData.latestOriginalFile}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="workingDraft">
                                    Working draft (e.g., a DOCX for further editing)
                                </CustomFormLabel>
                                <TextField
                                    id="workingDraft"
                                    name="workingDraft"
                                    fullWidth
                                    placeholder="https://"
                                    value={formData.workingDraft}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Activities Specified in Management System Toggle */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="primary"
                                            id="activitiesInManagementSystem"
                                            name="activitiesInManagementSystem"
                                            checked={formData.activitiesInManagementSystem}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Activities specified in Management System"
                                />
                            </Grid>

                            {/* Management System Links */}
                            <Grid item xs={12} sm={6}>
                                <CustomFormLabel htmlFor="managementSystemLink">
                                    Link to most relevant parts of the Management System
                                </CustomFormLabel>
                                <TextField
                                    id="managementSystemLink"
                                    name="managementSystemLink"
                                    fullWidth
                                    placeholder="https://"
                                    value={formData.managementSystemLink}
                                    onChange={handleChange}
                                />
                            </Grid>

                            {/* Comments */}
                            <Grid item xs={12}>
                                <CustomFormLabel htmlFor="comments">Comments</CustomFormLabel>
                                <TextField
                                    id="comments"
                                    name="comments"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Add your comments here"
                                    value={formData.comments}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        {/* Action Buttons */}
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleSLA}>
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Next'
                                )}
                            </Button>
                        </Box>
                    </Box>
                );

            case 3:
                return (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Localization
                        </Typography>
                        <Typography variant="body2" color="#5A6A85" sx={{ marginBottom: '20px' }}>
                            Specify if the affiliate acts in specific areas.
                        </Typography>

                        {/* Localization Toggle */}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            color="primary"
                                            id="localization"
                                            name="localization"
                                            checked={formData.localization}
                                            onChange={handleChange}
                                        />
                                    }
                                    label="Affiliate acts in specific areas only (localization)"
                                />
                            </Grid>
                        </Grid>

                        {/* Localization Fields */}
                        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                            {/* Licensed In */}
                            <Grid item xs={12}>
                                <CustomFormLabel htmlFor="licensedIn" sx={{ color: '#9499a3' }}>
                                    Licensed in
                                </CustomFormLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id="licensedIn"
                                        name="licensedIn"
                                        fullWidth
                                        placeholder="Add country code"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                e.preventDefault();
                                                handleAddToArray('licensedIn', e.target.value.trim());
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => {
                                            const input = document.getElementById('licensedIn');
                                            if (input && input.value.trim() !== '') {
                                                handleAddToArray('licensedIn', input.value.trim());
                                                input.value = '';
                                            }
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {formData.licensedIn.map((value, index) => (
                                        <Chip
                                            key={index}
                                            label={value}
                                            onDelete={() => handleRemoveFromArray('licensedIn', index)}
                                            deleteIcon={<DeleteIcon />}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Exclusive Areas */}
                            <Grid item xs={12}>
                                <CustomFormLabel htmlFor="exclusiveAreas" sx={{ color: '#9499a3' }}>
                                    Exclusive areas
                                </CustomFormLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id="exclusiveAreas"
                                        name="exclusiveAreas"
                                        fullWidth
                                        placeholder="Add country code"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                e.preventDefault();
                                                handleAddToArray('exclusiveAreas', e.target.value.trim());
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => {
                                            const input = document.getElementById('exclusiveAreas');
                                            if (input && input.value.trim() !== '') {
                                                handleAddToArray('exclusiveAreas', input.value.trim());
                                                input.value = '';
                                            }
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {formData.exclusiveAreas.map((value, index) => (
                                        <Chip
                                            key={index}
                                            label={value}
                                            onDelete={() => handleRemoveFromArray('exclusiveAreas', index)}
                                            deleteIcon={<DeleteIcon />}
                                        />
                                    ))}
                                </Box>
                            </Grid>

                            {/* Non-exclusive Areas */}
                            <Grid item xs={12}>
                                <CustomFormLabel htmlFor="nonExclusiveAreas" sx={{ color: '#9499a3' }}>
                                    Non-exclusive areas
                                </CustomFormLabel>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        id="nonExclusiveAreas"
                                        name="nonExclusiveAreas"
                                        fullWidth
                                        placeholder="Add country code"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                e.preventDefault();
                                                handleAddToArray('nonExclusiveAreas', e.target.value.trim());
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                    <IconButton
                                        onClick={() => {
                                            const input = document.getElementById('nonExclusiveAreas');
                                            if (input && input.value.trim() !== '') {
                                                handleAddToArray('nonExclusiveAreas', input.value.trim());
                                                input.value = '';
                                            }
                                        }}
                                    >
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                                <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {formData.nonExclusiveAreas.map((value, index) => (
                                        <Chip
                                            key={index}
                                            label={value}
                                            onDelete={() => handleRemoveFromArray('nonExclusiveAreas', index)}
                                            deleteIcon={<DeleteIcon />}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                        </Grid>


                        {/* Action Buttons */}
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
                            <Button variant="outlined" onClick={handleBack}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleLocalization}>
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </Box>
                    </Box>
                );

            default:
                return null;
        }
    };

    return (
        <Grid container spacing={2} mt={2}>
            <Grid item xs={3}>
                <Paper elevation={3} sx={{ padding: '10px', height: '100%' }}>
                    <List>
                        {settingsOptions.map((option, index) => (
                            <ListItem
                                button
                                key={option.label}
                                selected={activeStep === index}
                                onClick={() => handleTabClick(index)} // Use the handleTabClick function
                                disabled={!completedSteps.includes(index) && index !== activeStep} // Disable uncompleted tabs
                            >
                                <ListItemIcon>
                                    <NumberIcon>{option.number}</NumberIcon>
                                </ListItemIcon>
                                <ListItemText primary={option.label} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <Paper elevation={3} sx={{ padding: '20px' }}>
                    {renderStepContent(activeStep)}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AddAffilities;
