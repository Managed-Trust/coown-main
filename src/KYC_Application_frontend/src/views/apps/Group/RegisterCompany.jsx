import React, { useState } from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import { Link, useParams } from "react-router-dom";
import ChildCard from '../../../components/shared/ChildCard';
import { Box, Paper, Checkbox, Button, RadioGroup, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, Stack, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { margin } from '@mui/system';
import ic from "ic0";
import { set } from 'lodash';
import {
  FleekSdk,
  ApplicationAccessTokenService,
} from "@fleek-platform/sdk/browser";

const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Register Company' },
];

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const steps = ['Company details', 'Leadership and ownership', 'Governance and Limitations', 'Auditing'];
const initialState1 = {
  companyName: "",
  industrySector: "",
  groupDescription: "",
  registrationNumber: "",
  taxId: "",
  legalStructure: "",
  countryOfRegistry: "",
  incorporationCertificate: null,
  memorandumArticles: null,
  isUserManager: false,
  otherManagers: '',//
  beneficiaryType: '#Shareholders',
  shareholderAdditionMethod: '#Manual',
  digitalShares: false,
  premiumUpgradeInfo: false, // Not require
  boardExists: false,
  canVoteInSystem: false,
  isAnnualVotingRequired: false,
  spendingPowerLimitations: false, //
  dailySpendingPower: '', // REQUIRE
  monthlySpendingPower: '', //  REQUIRE
  groupAdminApprovalMethod: '#BoardVoting',
  groupMemberApprovalMethod: '#GroupAdminApproval',
  adminAdditionMethod: '#GroupAdmin',
  boardMemberAdditionMethod: '#GroupAdmin',
  isAuditingRequired: false,
  auditScope: '#AllTransactionsIncludingBankAccounts',
  auditorNominationMethod: '#BoardApproves',
  auditReportRecipients: '#BoardAndExecutiveManagers',
  promotionAccepted: false,
};
const RegisterCompany = () => {
  const { groupId } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialState1);
  const [firstImage, setFirstImage] = useState('');
  const [secondImage, setSecondImage] = useState('');
  const [Addmore, setAddMore] = useState('');
  const [loading, setLoading] = useState(false);

  const applicationService = new ApplicationAccessTokenService({
    clientId: "client_NSez4i7UHB-0M6r2OJp-", // Use your actual client ID here
  });
  const fleekSdk = new FleekSdk({
    accessTokenService: applicationService,
  });

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

  const handleFile1Change = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));
    setFirstImage(URL.createObjectURL(file));
  };
  const handleFile2Change = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));
    setSecondImage(URL.createObjectURL(file));
  };
  const handleCheckedChange = (id) => (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: event.target.checked,
    }));
  };

  const handleAddmore = () => {
    setAddMore(!Addmore);
  }
  const mapBeneficiaryType = (value) => {
    switch (value) {
      case "Shareholders":
        return { Shareholders: null };
      case "OnlyMe":
        return { OnlyMe: null };
      case "OtherEntityOrPerson":
        return { OtherEntityOrPerson: null };
      default:
        throw new Error(`Invalid beneficiaryType: ${value}`);
    }
  };

  // Map Shareholder Addition Method
  const mapShareholderAdditionMethod = (value) => {
    switch (value) {
      case "Manual":
        return { Manual: null };
      case "UploadShareholderBook":
        return { UploadShareholderBook: null };
      default:
        throw new Error(`Invalid shareholderAdditionMethod: ${value}`);
    }
  };

  const mapGroupAdminApprovalMethod = (value) => {
    switch (value) {
      case "BoardVoting":
        return { BoardVoting: null };
      case "ShareholderAssemblyVoting":
        return { ShareholderAssemblyVoting: null };
      default:
        throw new Error(`Invalid groupAdminApprovalMethod: ${value}`);
    }
  };

  const mapGroupMemberApprovalMethod = (value) => {
    switch (value) {
      case "GroupAdminApproval":
        return { GroupAdminApproval: null };
      case "MemberSpendingPowerApproval":
        return { MemberSpendingPowerApproval: null };
      default:
        throw new Error(`Invalid groupMemberApprovalMethod: ${value}`);
    }
  };

  const mapAuditScope = (value) => {
    switch (value) {
      case "AllTransactionsIncludingBankAccounts":
        return { AllTransactionsIncludingBankAccounts: null };
      case "AllTransactionsWithoutBankAccounts":
        return { AllTransactionsWithoutBankAccounts: null };
      case "OnlyCOOWNTransactions":
        return { OnlyCOOWNTransactions: null };
      default:
        throw new Error(`Invalid auditScope: ${value}`);
    }
  };

  const mapAuditorNominationMethod = (value) => {
    switch (value) {
      case "BoardApproves":
        return { BoardApproves: null };
      case "GroupAdminNominates":
        return { GroupAdminNominates: null };
      case "ShareholderAssemblyApproves":
        return { ShareholderAssemblyApproves: null };
      default:
        throw new Error(`Invalid auditorNominationMethod: ${value}`);
    }
  };

  const mapAuditReportRecipients = (value) => {
    switch (value) {
      case "BoardAndExecutiveManagers":
        return { BoardAndExecutiveManagers: null };
      case "ShareholdersBoardAndManagers":
        return { ShareholdersBoardAndManagers: null };
      default:
        throw new Error(`Invalid auditReportRecipients: ${value}`);
    }
  };

  const mapAdminAdditionMethod = (value) => {
    switch (value) {
      case "GroupAdmin":
        return { GroupAdmin: null };
      case "BoardVoting":
        return { BoardVoting: null };
      case "ShareholderAssemblyVoting":
        return { ShareholderAssemblyVoting: null };
      default:
        throw new Error(`Invalid auditReportRecipients: ${value}`);
    }
  };
  const mapBoardMemberAdditionMethod = (value) => {
    switch (value) {
      case "GroupAdmin":
        return { GroupAdmin: null };
      case "BoardVoting":
        return { BoardVoting: null };
      case "ShareholderAssemblyVoting":
        return { ShareholderAssemblyVoting: null };
      default:
        throw new Error(`Invalid auditReportRecipients: ${value}`);
    }
  };

  const handleNext = async () => {
    console.log('formdata ', formData);
    if (activeStep === steps.length - 1) {
      setLoading(true);
      console.log('saving');
      try {
        const result1 = await fleekSdk.storage().uploadFile({
          file: formData.incorporationCertificate,
          onUploadProgress: (progress) => {
            // console.log(`Upload progress: ${(progress.loaded / progress.total) * 100}%`);
          },
        });
        // setHash(result.pin.cid);
        console.log('result', result1);
        console.log('params', result1.pin.cid);

        const result2 = await fleekSdk.storage().uploadFile({
          file: formData.memorandumArticles,
          onUploadProgress: (progress) => {
            // console.log(`Upload progress: ${(progress.loaded / progress.total) * 100}%`);
          },
        });
        // setHash(result.pin.cid);
        console.log('result', result2);
        console.log('params', result2.pin.cid);


        const response = await ledger.call(
          'updateIncorporationGroup',
          groupId,
          formData.companyName,
          formData.industrySector,
          formData.groupDescription,
          formData.registrationNumber,
          formData.taxId,
          formData.legalStructure,
          formData.countryOfRegistry,
          result1.pin.cid,
          result2.pin.cid,
          formData.isUserManager,
          formData.otherManagers ? formData.otherManagers.split(',') : [], // Ensure array
          formData.beneficiaryType,
          mapShareholderAdditionMethod(formData.shareholderAdditionMethod),
          formData.digitalShares,
          BigInt(formData.dailySpendingPower || 0),
          BigInt(formData.monthlySpendingPower || 0),
          formData.boardExists,
          formData.canVoteInSystem,
          formData.isAnnualVotingRequired,
          formData.spendingPowerLimitations,
          mapGroupAdminApprovalMethod(formData.groupAdminApprovalMethod),
          mapGroupMemberApprovalMethod(formData.groupMemberApprovalMethod),
          mapAdminAdditionMethod(formData.adminAdditionMethod),
          mapBoardMemberAdditionMethod(formData.boardMemberAdditionMethod),
          formData.isAuditingRequired,
          mapAuditScope(formData.auditScope),
          mapAuditorNominationMethod(formData.auditorNominationMethod),
          mapAuditReportRecipients(formData.auditReportRecipients),
          formData.promotionAccepted
        );
        console.log('Function call response:', response);
        swal('Applicaton Submitted', '', 'success')
      } catch (error) {
        console.log('Error updating Company', error);
      }
      setLoading(false);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                    Group Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="companyName">Company name</CustomFormLabel>
                      <TextField
                        id="companyName"
                        fullWidth
                        placeholder='Company name'
                        onChange={handleInputChange}
                        value={formData.companyName}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="industrySector">Industry sector</CustomFormLabel>
                      <TextField
                        id="industrySector"
                        select
                        fullWidth
                        placeholder='Select industry sector'
                        onChange={handleSelectChange("industrySector")}
                        value={formData.industrySector}
                      >
                        {/* Add options for industry sectors here */}
                        <MenuItem value="sector1">Sector 1</MenuItem>
                        <MenuItem value="sector2">Sector 2</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="groupDescription">Company Purpose</CustomFormLabel>
                      <TextField
                        id="groupDescription"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder='Add company purpose '
                        onChange={handleInputChange}
                        value={formData.groupDescription}
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
                      <CustomFormLabel htmlFor="taxId">Tax ID</CustomFormLabel>
                      <TextField
                        id="taxId"
                        fullWidth
                        placeholder='Tax ID'
                        onChange={handleInputChange}
                        value={formData.taxId}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="legalStructure">Legal structure</CustomFormLabel>
                      <TextField
                        id="legalStructure"
                        fullWidth
                        placeholder='Legal structure'
                        onChange={handleInputChange}
                        value={formData.legalStructure}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="countryOfRegistry">Country of registry</CustomFormLabel>
                      <TextField
                        id="countryOfRegistry"
                        select
                        fullWidth
                        placeholder='Select country'
                        onChange={handleSelectChange("countryOfRegistry")}
                        value={formData.countryOfRegistry}
                      >
                        {/* Add options for countries here */}
                        <MenuItem value="country1">Country 1</MenuItem>
                        <MenuItem value="country2">Country 2</MenuItem>
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
                    Corporate Documentation
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="incorporationCertificate" sx={{ paddingBottom: '15px' }}>Incorporation certificate</CustomFormLabel>
                      <Grid container alignItems="center" spacing={2} sx={{ backgroundColor: '#f5f7fa', paddingBottom: 2, borderRadius: 1 }}>
                        <Grid item>
                          <Button variant="contained" component="label" color="primary">
                            Choose file
                            <input
                              type="file"
                              hidden
                              name='incorporationCertificate'
                              id="incorporationCertificate"
                              onChange={handleFile1Change}
                            />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {firstImage && (
                        <Box mt={2}>
                          <img src={firstImage} alt="Document Preview" style={{ width: '100%', maxWidth: '150px', maxHeight: '150px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }} />
                        </Box>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="memorandumArticles" sx={{ paddingBottom: '15px' }}>Memorandum and articles</CustomFormLabel>
                      <Grid container alignItems="center" spacing={2} sx={{ backgroundColor: '#f5f7fa', paddingBottom: 2, borderRadius: 1 }}>
                        <Grid item>
                          <Button variant="contained" component="label" color="primary">
                            Choose file
                            <input
                              type="file"
                              hidden
                              name='memorandumArticles'
                              id="memorandumArticles"
                              onChange={handleFile2Change}
                            />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      {secondImage && (
                        <Box mt={2}>
                          <img src={secondImage} alt="Document Preview" style={{ width: '100%', maxWidth: '150px', maxHeight: '150px', height: 'auto', borderRadius: '10px', border: '1px solid #ccc' }} />
                        </Box>
                      )}
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
                    Executive Manager
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>Who is the Executive Manager?</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                        // id='isUserManager'
                        // name='isUserManager'
                        // onChange={handleSelectChange("isUserManager")}
                        // value={formData.isUserManager}
                        >
                          <FormControlLabel
                            // value="true"
                            control={<Radio />}
                            label="I am the Executive Manager"
                          />
                          <FormControlLabel
                            // value="false"
                            control={<Radio />}
                            label="Another person is the Executive Manager"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    {!Addmore ?
                      <Grid item xs={12}>
                        <Button
                          variant="outlined"
                          onClick={handleAddmore}
                          startIcon={<Typography component="span">+</Typography>}
                          sx={{ color: '#5B5B5B', borderColor: '#E0E0E0' }}
                        >
                          Add more
                        </Button>
                      </Grid>
                      :
                      <>
                        <Grid item xs={12}>
                          <TextField
                            label="Add more manager?"
                            fullWidth
                            type="text"
                            placeholder="Add Executive Manager"
                            id="otherManagers"
                            onChange={handleInputChange}
                            value={formData.otherManagers}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="outlined"
                            onClick={handleAddmore}
                            sx={{ color: '#5B5B5B', borderColor: '#E0E0E0' }}
                          >
                            Cancel
                          </Button>
                        </Grid>
                      </>
                    }


                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>

            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                    Economic Beneficiary
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>Who is the Economic Beneficiary?</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='beneficiaryType'
                          name='beneficiaryType'
                          onChange={handleSelectChange("beneficiaryType")}
                          value={formData.beneficiaryType}
                        >
                          <FormControlLabel
                            value="#Shareholders"
                            control={<Radio />}
                            label="Shareholders"
                          />
                          <FormControlLabel
                            value="#OnlyMe"
                            control={<Radio />}
                            label="Only me"
                          />
                          <FormControlLabel
                            value="#OtherEntityOrPerson"
                            control={<Radio />}
                            label="Another entity or person"
                          />
                        </RadioGroup>
                      </FormControl>
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
                    Economic Beneficiary
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>How will you add shareholders?</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='shareholderAdditionMethod'
                          name='shareholderAdditionMethod'
                          onChange={handleSelectChange("shareholderAdditionMethod")}
                          value={formData.shareholderAdditionMethod}
                        >
                          <FormControlLabel
                            value="Manual"
                            control={<Radio />}
                            label="I will add shareholders manually"
                          />
                          <FormControlLabel
                            value="UploadShareholderBook"
                            control={<Radio />}
                            label="Upload shareholder book as a file"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {/* Informational Section */}
                    <Grid item xs={12}>
                      <Paper elevation={0} sx={{ backgroundColor: '#f5f7fa', padding: 2, borderRadius: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                          Digitalize your shares with COOWN
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Enables the rise of capital, trading and shareholder voting.
                        </Typography>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id='digitalShares'
                              name='digitalShares'
                              onChange={handleCheckedChange("digitalShares")}
                              checked={formData.digitalShares}
                              color="primary"
                            />
                          }
                          label="Get informed about premium upgrade options for issuing shares"
                        />
                      </Paper>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>


            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Board of Directors
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            id='boardExists'
                            name='boardExists'
                            onChange={handleCheckedChange("boardExists")}
                            checked={formData.boardExists}
                            color="primary"
                          />
                        }
                        label="A Board of Directors exists"
                      />
                    </Grid>

                    {/* Toggle for Board of Directors can vote */}
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            id='canVoteInSystem'
                            name='canVoteInSystem'
                            onChange={handleCheckedChange("canVoteInSystem")}
                            checked={formData.canVoteInSystem}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1">The Board of Directors can vote within the system</Typography>  </Box>

                        }
                      /> <Box sx={{ marginLeft: '40px' }} >   <Typography variant="body2" color="textSecondary">
                        They possibly can vote to approve transactions exceeding the limitations of Executive Managers and other Group-Administrators.
                      </Typography>
                      </Box>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>

            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Annually Discharging and compliance
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h6">
                        Are Shareholders annually discharging the Board of Directors and the Executive Manager?
                      </Typography>

                      <FormControlLabel
                        control={
                          <Switch
                            id='isAnnualVotingRequired'
                            name='isAnnualVotingRequired'
                            onChange={handleCheckedChange("isAnnualVotingRequired")}
                            checked={formData.isAnnualVotingRequired}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1">An annual shareholder voting takes place to discharge the Executive.</Typography></Box>


                        }
                      /> <Box sx={{ marginLeft: '40px' }} >  <Typography variant="body2" color="textSecondary">
                        [We need to clarify here, if they can vote about other stuff as well, and who sets the dates for the voting, let’s complete this in a later revision]
                      </Typography>
                      </Box>
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
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Spending power limitations
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    {/* Limit Spending Power Toggle Section */}
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            id='spendingPowerLimitations'
                            name='spendingPowerLimitations'
                            onChange={handleCheckedChange("spendingPowerLimitations")}
                            checked={formData.spendingPowerLimitations}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body1">
                            Limit spending power of the Group Admin and Executive Managers
                          </Typography>
                        }
                      />
                    </Grid>

                    {/* Daily and Monthly Limitation Inputs */}
                    {formData.spendingPowerLimitations && (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            label="Daily limitation in $"
                            fullWidth
                            type="number"
                            placeholder="1000"
                            id="dailySpendingPower"
                            onChange={handleInputChange}
                            value={formData.dailySpendingPower}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label="Monthly limitation in $"
                            fullWidth
                            type="number"
                            placeholder="10000"
                            id="monthlySpendingPower"
                            onChange={handleInputChange}
                            value={formData.monthlySpendingPower}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>

            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                    Transaction Approval
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    {/* Group Admin Transactions Approval Section */}
                    <Grid item xs={12}>
                      <CustomFormLabel>Group Admin transactions that exceed spending limit</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='groupAdminApprovalMethod'
                          name='groupAdminApprovalMethod'
                          onChange={handleSelectChange("groupAdminApprovalMethod")}
                          value={formData.groupAdminApprovalMethod}
                        >
                          <FormControlLabel
                            value="BoardVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Board of Directors"
                          />
                          <FormControlLabel
                            value="ShareholderAssemblyVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Shareholder Assembly"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    {/* Group Member Transactions Approval Section */}
                    <Grid item xs={12}>
                      <CustomFormLabel>Group Member transactions that exceed spending limit</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='groupMemberApprovalMethod'
                          name='groupMemberApprovalMethod'
                          onChange={handleSelectChange("groupMemberApprovalMethod")}
                          value={formData.groupMemberApprovalMethod}
                        >
                          <FormControlLabel
                            value="GroupAdminApproval"
                            control={<Radio />}
                            label="Are approved by the Group Admin"
                          />
                          <FormControlLabel
                            value="MemberSpendingPowerApproval"
                            control={<Radio />}
                            label="Are approved by any Member with sufficient spending power"
                          />
                        </RadioGroup>
                      </FormControl>
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
                    Management
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>New Group Admins or Executive Managers</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='adminAdditionMethod'
                          name='adminAdditionMethod'
                          onChange={handleSelectChange("adminAdditionMethod")}
                          value={formData.adminAdditionMethod}
                        >
                          <FormControlLabel
                            value="GroupAdmin"
                            control={<Radio />}
                            label="Can be added by Group Admin"
                          />
                          <FormControlLabel
                            value="BoardVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Board of Directors"
                          />
                          <FormControlLabel
                            value="ShareholderAssemblyVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Shareholder Assembly"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>


            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Board of Directors
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>New members of the Board of Directors</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='boardMemberAdditionMethod'
                          name='boardMemberAdditionMethod'
                          onChange={handleSelectChange("boardMemberAdditionMethod")}
                          value={formData.boardMemberAdditionMethod}
                        >
                          <FormControlLabel
                            value="GroupAdmin"
                            control={<Radio />}
                            label="Can be added by Group Admin"
                          />
                          <FormControlLabel
                            value="BoardVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Board of Directors"
                          />
                          <FormControlLabel
                            value="ShareholderAssemblyVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Shareholder Assembly"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>
          </Box>
        );
      case 3:
        return (
          <Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Is auditing required ?
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            id='isAuditingRequired'
                            name='isAuditingRequired'
                            onChange={handleCheckedChange("isAuditingRequired")}
                            checked={formData.isAuditingRequired}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1">An annual audit is required</Typography>

                          </Box>
                        }
                      />
                      <Typography sx={{ marginLeft: '40px' }} variant="body2" color="textSecondary">
                        By law, statutes, shareholder or board of directors decision
                      </Typography>
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
                    Audit Scope
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>The Audit focuses</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='auditScope'
                          name='auditScope'
                          onChange={handleSelectChange("auditScope")}
                          value={formData.auditScope}
                        >
                          <FormControlLabel
                            value="AllTransactionsIncludingBankAccounts"
                            control={<Radio />}
                            label="All company’s financial transactions including COOWN and bank accounts"
                          />
                          <FormControlLabel
                            value="AllTransactionsWithoutBankAccounts"
                            control={<Radio />}
                            label="All company’s financial transactions and the company has no Bank account"
                          />
                          <FormControlLabel
                            value="OnlyCOOWNTransactions"
                            control={<Radio />}
                            label="Only the company’s financial transactions within COOWN are audited, if other audits are carried they are consolidated outside COOWN"
                          />
                        </RadioGroup>
                      </FormControl>
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
                    Auditor normiration
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>How is the Auditor nominated?</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='auditorNominationMethod'
                          name='auditorNominationMethod'
                          onChange={handleSelectChange("auditorNominationMethod")}
                          value={formData.auditorNominationMethod}
                        >
                          <FormControlLabel
                            value="BoardApproves"
                            control={<Radio />}
                            label="Board of Directors approve Auditors"
                          />
                          <FormControlLabel
                            value="GroupAdminNominates"
                            control={<Radio />}
                            label="Existing Group Admin can nominate an Auditor"
                          />
                          <FormControlLabel
                            value="ShareholderAssemblyApproves"
                            control={<Radio />}
                            label="Shareholder assembly approves Auditors"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>


            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Audit report recipients
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <CustomFormLabel>Audit report recipients</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          id='auditReportRecipients'
                          name='auditReportRecipients'
                          onChange={handleSelectChange("auditReportRecipients")}
                          value={formData.auditReportRecipients}
                        >
                          <FormControlLabel
                            value="BoardAndExecutiveManagers"
                            control={<Radio />}
                            label="Board of Directors and Executive Managers"
                          />
                          <FormControlLabel
                            value="ShareholdersBoardAndManagers"
                            control={<Radio />}
                            label="Shareholders, Board of Directors, and Executive Managers"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>

            <Box mt={2}></Box>
            <ChildCard>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                    Promotion Accepted
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch
                            id='promotionAccepted'
                            name='promotionAccepted'
                            onChange={handleCheckedChange("promotionAccepted")}
                            checked={formData.promotionAccepted}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1">
                              The Operator entitled to forward contact details to favorite Audit firm?
                            </Typography>

                          </Box>
                        }
                      />
                      <Typography sx={{ marginLeft: '40px' }} variant="body2" color="textSecondary">
                        Profile of Administrator and Group Name will be forwarded to a potential audit firm,
                        that can be mandated by the Corporate Group Management.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ChildCard>
          </Box>
        );
    }
  };

  return (
    <PageContainer title="Register Company" description="This is the company registration page">
      <Breadcrumb title="Register Company" items={BCrumb} />
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
    </PageContainer>
  );
};

export default RegisterCompany;
