import React, {  useState } from 'react';
import ChildCard from '../../../../components/shared/ChildCard';
import {
    Box,
    Chip, Checkbox, Button, RadioGroup, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, Stack, MenuItem, Stepper, Step, StepLabel
} from '@mui/material';
import CustomFormLabel from '../../../../components/forms/theme-elements/CustomFormLabel';
import ic from "ic0";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const steps = ['Transaction details', 'Rule Details', 'Fees Details'];
const initialState = {
    ruleId: "", // Should match the expected data type (Text, assumed to be a string)
    ruleName: "",
    description: "",
    totalFees: "",
    assetType: "",
    operatorAcceptance: [], // Array of Text, initialized as an empty array
    sendingAreas: [], // Array of Text, initialized as an empty array
    withdrawalCrypto: false, // Boolean, initialized to false
    receivingAreas: [], // Array of Text, initialized as an empty array
    receivingIndustry: "", // Text, initialized to an empty string
    amountRange: "", // Text, initialized to an empty string
    foundationFees: {
        feePerTransaction: "", // Text, initialized to an empty string
        allocationGroup: "", // Text, initialized to an empty string
    },
    stakingFees: {
        feePerTransaction: "", // Text, initialized to an empty string
        allocationGroup: "", // Text, initialized to an empty string
    },
    operatorFees: {
        feePerTransaction: "", // Text, initialized to an empty string
        allocationGroup: "", // Text, initialized to an empty string
    },
    thirdPartyFees: {
        feePerTransaction: "", // Text, initialized to an empty string
        allocationGroup: "", // Text, initialized to an empty string
        thirdPartyIdentifier: "", // Text, initialized to an empty string
    },
};
const AddTransactionFee = ({onFormShow,onFormSubmit}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
   

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
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
    const validateForm = () => {
        const errors = {};

        // Check required fields in the main object
        if (!formData.ruleName.trim()) errors.ruleName = "Rule name is required.";
        if (!formData.description.trim()) errors.description = "Description is required.";
        if (!formData.assetType.trim()) errors.assetType = "Asset type is required.";
        if (formData.sendingAreas.length === 0) errors.sendingAreas = "At least one sending area is required.";
        if (formData.receivingAreas.length === 0) errors.receivingAreas = "At least one receiving area is required.";
        if (!formData.receivingIndustry.trim()) errors.receivingIndustry = "Receiving industry is required.";
        if (!formData.amountRange.trim()) errors.amountRange = "Amount range is required.";

        // Check required fields in nested objects
        if (!formData.foundationFees.feePerTransaction.trim())
            errors.foundationFees = "Foundation fee per transaction is required.";
        if (!formData.foundationFees.allocationGroup.trim())
            errors.foundationFees = "Foundation allocation group is required.";

        if (!formData.stakingFees.feePerTransaction.trim())
            errors.stakingFees = "Staking fee per transaction is required.";
        if (!formData.stakingFees.allocationGroup.trim())
            errors.stakingFees = "Staking allocation group is required.";

        if (!formData.operatorFees.feePerTransaction.trim())
            errors.operatorFees = "Operator fee per transaction is required.";
        if (!formData.operatorFees.allocationGroup.trim())
            errors.operatorFees = "Operator allocation group is required.";

        if (!formData.thirdPartyFees.feePerTransaction.trim())
            errors.thirdPartyFees = "Third-party fee per transaction is required.";
        if (!formData.thirdPartyFees.allocationGroup.trim())
            errors.thirdPartyFees = "Third-party allocation group is required.";
        if (!formData.thirdPartyFees.thirdPartyIdentifier.trim())
            errors.thirdPartyFees = "Third-party identifier is required.";

        // Return true if no errors, otherwise false
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return false;
        }

        setErrors({});
        return true;
    };
    const handleNestedInputChange = (e, category) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [category]: {
                ...prevData[category],
                [id]: value,
            },
        }));
    };
    

    const handleNext = async () => {
        console.log('formdata ', formData);
        if (activeStep === steps.length - 1) {
            if (!validateForm()) {
                alert("Please correct the errors in the form before submitting.");
                return;
            }
            setLoading(true);
            console.log('saving');
            const ruleId = `Rule-${Math.floor(100000 + Math.random() * 900000).toString()}`;

            console.log('Sending data to backend:', {
                ruleId,
                details: {
                    sendingAreas: formData.sendingAreas,
                    withdrawalCrypto: formData.withdrawalCrypto,
                    receivingAreas: formData.receivingAreas,
                    receivingIndustry: formData.receivingIndustry,
                    amountRange: formData.amountRange,
                    foundationFees: formData.foundationFees,
                    stakingFees: formData.stakingFees,
                    operatorFees: formData.operatorFees,
                    thirdPartyFees: formData.thirdPartyFees,
                },
            });
            const totalFees = (
                parseInt(formData.foundationFees.feePerTransaction || "0") +
                parseInt(formData.stakingFees.feePerTransaction || "0") +
                parseInt(formData.operatorFees.feePerTransaction || "0") +
                parseInt(formData.thirdPartyFees.feePerTransaction || "0")
            ).toString();
            try {
                const response = await ledger.call(
                    'addTransactionRuleNew',
                    ruleId,
                    formData.ruleName,
                    formData.description,
                    totalFees,
                    formData.assetType,
                    [formData.operatorAcceptance],
                );
                console.log('Function call response:', response);
                if (!response) {
                    swal('Error', 'Error creating transaction rule', 'error');
                }
                const response2 = await ledger.call(
                    'addTransactionRuleDetails',
                    ruleId,
                    {
                        sendingAreas: formData.sendingAreas,
                        withdrawalCrypto: formData.withdrawalCrypto,
                        receivingAreas: formData.receivingAreas,
                        receivingIndustry: formData.receivingIndustry,
                        amountRange: formData.amountRange,
                        foundationFees: formData.foundationFees,
                        stakingFees: formData.stakingFees,
                        operatorFees: formData.operatorFees,
                        thirdPartyFees: formData.thirdPartyFees,
                    }
                );
                if (response && response2) {
                    console.log('Function call response:', response2);
                    swal('Transaction Rule Created', '', 'success');
                    onFormShow(false);
                    onFormSubmit();
                } else {
                    swal('Error', 'Error creating transaction rule', 'error');
                }

            } catch (e) {
                console.log('Error submiting  form', e);
            }

            setLoading(false);
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <ChildCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                        Transaction  Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="ruleName">Rule name</CustomFormLabel>
                                            <TextField
                                                id="ruleName"
                                                fullWidth
                                                placeholder='Rule name'
                                                onChange={handleInputChange}
                                                value={formData.ruleName}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="description">Rule Description </CustomFormLabel>
                                            <TextField
                                                id="description"
                                                fullWidth
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                placeholder='Add company Description '
                                                onChange={handleInputChange}
                                                value={formData.description}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="registrationNumber">Registration number</CustomFormLabel>
                                            <TextField
                                                id="registrationNumber"
                                                fullWidth
                                                placeholder='Registration number'
                                                onChange={handleInputChange}
                                                value={formData.registrationNumber}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="assetType">Asset Type </CustomFormLabel>
                                            <TextField
                                                id="assetType"
                                                fullWidth
                                                placeholder='Asset Type'
                                                onChange={handleInputChange}
                                                value={formData.assetType}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="operatorAcceptance">OperatorAcceptance</CustomFormLabel>
                                            <TextField
                                                id="operatorAcceptance"
                                                select
                                                fullWidth
                                                placeholder='Select Opertator'
                                                onChange={handleSelectChange("operatorAcceptance")}
                                                value={formData.countryOfRegistry}
                                            >
                                                {/* Add options for countries here */}
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Operator F">Operator F</MenuItem>
                                                <MenuItem value="Operator H">Operator H</MenuItem>
                                                <MenuItem value="Operator I">Operator I</MenuItem>
                                                <MenuItem value="Operator J">Operator J</MenuItem>
                                                <MenuItem value="Operator K">Operator K</MenuItem>
                                                <MenuItem value="Operator L">Operator L</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ChildCard>
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <ChildCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                        Rules  Details
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8} >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} mt={2}>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        id='withdrawalCrypto'
                                                        name='withdrawalCrypto'
                                                        onChange={handleCheckedChange("withdrawalCrypto")}
                                                        checked={formData.withdrawalCrypto}
                                                        color="primary"
                                                    />
                                                }
                                                label="Allow to withdraw Crypto"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="sendingAreas" sx={{ color: '#9499a3' }}>
                                                Sending Areas(Exclusive Areas)
                                            </CustomFormLabel>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <TextField
                                                    id="sendingAreas"
                                                    name="sendingAreas"
                                                    fullWidth
                                                    placeholder="Add country code"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                            e.preventDefault();
                                                            handleAddToArray('sendingAreas', e.target.value.trim());
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={() => {
                                                        const input = document.getElementById('sendingAreas');
                                                        if (input && input.value.trim() !== '') {
                                                            handleAddToArray('sendingAreas', input.value.trim());
                                                            input.value = '';
                                                        }
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {formData.sendingAreas.map((value, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={value}
                                                        onDelete={() => handleRemoveFromArray('sendingAreas', index)}
                                                        deleteIcon={<DeleteIcon />}
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>

                                        {/* Non-exclusive Areas */}
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="receivingAreas" sx={{ color: '#9499a3' }}>
                                                Receiving Areas (Exclusive Areas)
                                            </CustomFormLabel>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <TextField
                                                    id="receivingAreas"
                                                    name="receivingAreas"
                                                    fullWidth
                                                    placeholder="Add country code"
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                                            e.preventDefault();
                                                            handleAddToArray('receivingAreas', e.target.value.trim());
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                                <IconButton
                                                    onClick={() => {
                                                        const input = document.getElementById('receivingAreas');
                                                        if (input && input.value.trim() !== '') {
                                                            handleAddToArray('receivingAreas', input.value.trim());
                                                            input.value = '';
                                                        }
                                                    }}
                                                >
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                            <Box sx={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                {formData.receivingAreas.map((value, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={value}
                                                        onDelete={() => handleRemoveFromArray('receivingAreas', index)}
                                                        deleteIcon={<DeleteIcon />}
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="receivingIndustry">Receiving Industry</CustomFormLabel>
                                            <TextField
                                                id="receivingIndustry"
                                                fullWidth
                                                placeholder='Receiving Industry'
                                                onChange={handleInputChange}
                                                value={formData.receivingIndustry}
                                            />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="amountRange">Amount Range </CustomFormLabel>
                                            <TextField
                                                id="amountRange"
                                                fullWidth
                                                placeholder='Amount Range'
                                                onChange={handleInputChange}
                                                value={formData.amountRange}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ChildCard>
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <ChildCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                        Foundation Fees
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="FfeePerTransaction">Fee Per Transaction</CustomFormLabel>
                                            <TextField
                                                id="FfeePerTransaction"
                                                fullWidth
                                                type='number'
                                                placeholder='Fee Per Transaction'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    foundationFees: {
                                                        ...formData.foundationFees,
                                                        feePerTransaction: e.target.value,
                                                    },
                                                })}
                                                value={formData.foundationFees.feePerTransaction}
                                            />
                                        </Grid>


                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="FallocationGroup">Allocate Group</CustomFormLabel>
                                            <TextField
                                                id="FallocationGroup"
                                                select
                                                fullWidth
                                                placeholder='Select Group'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    foundationFees: {
                                                        ...formData.foundationFees,
                                                        allocationGroup: e.target.value,
                                                    },
                                                })}
                                                value={formData.foundationFees.allocationGroup}
                                            >
                                                {/* Add options for countries here */}
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Group F">Group F</MenuItem>
                                                <MenuItem value="Group H">Group H</MenuItem>
                                                <MenuItem value="Group I">Group I</MenuItem>
                                                <MenuItem value="Group J">Group J</MenuItem>
                                                <MenuItem value="Group K">Group K</MenuItem>
                                                <MenuItem value="Group L">Group L</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ChildCard>
                        <Box mt={2}></Box>
                        <ChildCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                        Staking Fees
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="SfeePerTransaction">Fee Per Transaction</CustomFormLabel>
                                            <TextField
                                                id="SfeePerTransaction"
                                                fullWidth
                                                type='number'
                                                placeholder='Rule name'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    stakingFees: {
                                                        ...formData.stakingFees,
                                                        feePerTransaction: e.target.value,
                                                    },
                                                })}
                                                value={formData.stakingFees.feePerTransaction}
                                            />
                                        </Grid>


                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="SallocationGroup">Allocate Group</CustomFormLabel>
                                            <TextField
                                                id="SallocationGroup"
                                                select
                                                fullWidth
                                                placeholder='Select Group'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    stakingFees: {
                                                        ...formData.stakingFees,
                                                        allocationGroup: e.target.value,
                                                    },
                                                })}
                                                value={formData.stakingFees.allocationGroup}
                                            >
                                                {/* Add options for countries here */}
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Group F">Group F</MenuItem>
                                                <MenuItem value="Group H">Group H</MenuItem>
                                                <MenuItem value="Group I">Group I</MenuItem>
                                                <MenuItem value="Group J">Group J</MenuItem>
                                                <MenuItem value="Group K">Group K</MenuItem>
                                                <MenuItem value="Group L">Group L</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ChildCard>
                        <Box mt={2}></Box>
                        <ChildCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                        Operator Fees
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="OfeePerTransaction">Fee Per Transaction</CustomFormLabel>
                                            <TextField
                                                id="OfeePerTransaction"
                                                fullWidth
                                                type='number'
                                                placeholder='Rule name'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    operatorFees: {
                                                        ...formData.operatorFees,
                                                        feePerTransaction: e.target.value,
                                                    },
                                                })}
                                                value={formData.operatorFees.feePerTransaction}
                                            />
                                        </Grid>


                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="OallocationGroup">Allocate Group</CustomFormLabel>
                                            <TextField
                                                id="OallocationGroup"
                                                select
                                                fullWidth
                                                placeholder='Select Group'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    operatorFees: {
                                                        ...formData.operatorFees,
                                                        allocationGroup: e.target.value,
                                                    },
                                                })}
                                                value={formData.operatorFees.allocationGroup}
                                            >
                                                {/* Add options for countries here */}
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Group F">Group F</MenuItem>
                                                <MenuItem value="Group H">Group H</MenuItem>
                                                <MenuItem value="Group I">Group I</MenuItem>
                                                <MenuItem value="Group J">Group J</MenuItem>
                                                <MenuItem value="Group K">Group K</MenuItem>
                                                <MenuItem value="Group L">Group L</MenuItem>
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ChildCard>
                        <Box mt={2}></Box>
                        <ChildCard>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                        Third Party Fees
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="TfeePerTransaction">Fee Per Transaction</CustomFormLabel>
                                            <TextField
                                                id="TfeePerTransaction"
                                                fullWidth
                                                type='number'
                                                placeholder='Fee Per Transaction'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    thirdPartyFees: {
                                                        ...formData.thirdPartyFees,
                                                        feePerTransaction: e.target.value,
                                                    },
                                                })}
                                                value={formData.thirdPartyFees.feePerTransaction}
                                            />
                                        </Grid>


                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="TallocationGroup">Allocate Group</CustomFormLabel>
                                            <TextField
                                                id="TallocationGroup"
                                                select
                                                fullWidth
                                                placeholder='Select Group'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    thirdPartyFees: {
                                                        ...formData.thirdPartyFees,
                                                        allocationGroup: e.target.value,
                                                    },
                                                })}
                                                value={formData.thirdPartyFees.allocationGroup}
                                            >
                                                {/* Add options for countries here */}
                                                <MenuItem value="All">All</MenuItem>
                                                <MenuItem value="Group F">Group F</MenuItem>
                                                <MenuItem value="Group H">Group H</MenuItem>
                                                <MenuItem value="Group I">Group I</MenuItem>
                                                <MenuItem value="Group J">Group J</MenuItem>
                                                <MenuItem value="Group K">Group K</MenuItem>
                                                <MenuItem value="Group L">Group L</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <CustomFormLabel htmlFor="thirdPartyIdentifier">Third Party Identifier</CustomFormLabel>
                                            <TextField
                                                id="thirdPartyIdentifier"
                                                fullWidth
                                                placeholder='thirdPartyIdentifier'
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    thirdPartyFees: {
                                                        ...formData.thirdPartyFees,
                                                        thirdPartyIdentifier: e.target.value,
                                                    },
                                                })}
                                                value={formData.thirdPartyFees.thirdPartyIdentifier}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ChildCard>
                        <Box mt={2}></Box>
                    </Box>
                );
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <ChildCard>
                    {/* Stepper with vertical orientation */}
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </ChildCard>
            </Grid>
            <Grid item xs={9}>
                {renderStepContent(activeStep)}
                <Box mt={3} display="flex" justifyContent="space-between">
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                        Back
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                    >
                        {loading ? 'Submitting ...' :
                            activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default AddTransactionFee;
