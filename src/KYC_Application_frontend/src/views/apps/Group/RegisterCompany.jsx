import React, { useState } from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ChildCard from '../../../components/shared/ChildCard';
import { Box, Paper, Checkbox, Button, RadioGroup, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, Stack, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { margin } from '@mui/system';
const BCrumb = [
  { to: '/', title: 'Home' },
  { title: 'Register Company' },
];

const steps = ['Company details', 'Leadership and ownership', 'Governance and Limitations', 'Auditing'];

const RegisterCompany = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedManager, setSelectedManager] = useState('self');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('shareholders');
  const [addShareholdersMethod, setAddShareholdersMethod] = useState('manual');
  const [isUpgradeInformed, setIsUpgradeInformed] = useState(false);
  const [boardExists, setBoardExists] = useState(false);
  const [boardCanVote, setBoardCanVote] = useState(false);
  const [annualVoting, setAnnualVoting] = useState(false);
  const [annualAuditRequired, setAnnualAuditRequired] = useState(false);
  const [auditorNomination, setAuditorNomination] = useState('boardApproval');
  const [auditFocus, setAuditFocus] = useState('option1');
  const [auditReportRecipient, setAuditReportRecipient] = useState('boardAndManagers');
  const [operatorEntitled, setOperatorEntitled] = useState(false);
  const [limitSpending, setLimitSpending] = useState(false);
  const [dailyLimit, setDailyLimit] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState('');
  const [adminApproval, setAdminApproval] = useState('boardVoting');
  const [memberApproval, setMemberApproval] = useState('groupAdmin');
  const [newAdminApproval, setNewAdminApproval] = useState('groupAdmin');
  const [boardMemberApproval, setBoardMemberApproval] = useState('groupAdmin');

  const handleBoardMemberApprovalChange = (event) => {
    setBoardMemberApproval(event.target.value);
  }

  const handleNewAdminApprovalChange = (event) => {
    setNewAdminApproval(event.target.value);
  };

  const handleAdminApprovalChange = (event) => {
    setAdminApproval(event.target.value);
  };

  const handleMemberApprovalChange = (event) => {
    setMemberApproval(event.target.value);
  };

  const handleLimitSpendingChange = (event) => {
    setLimitSpending(event.target.checked);
  };

  const handleDailyLimitChange = (event) => {
    setDailyLimit(event.target.value);
  };

  const handleMonthlyLimitChange = (event) => {
    setMonthlyLimit(event.target.value);
  };

  const handleOperatorEntitledChange = (event) => {
    setOperatorEntitled(event.target.checked);
  };

  const handleAuditReportRecipientChange = (event) => {
    setAuditReportRecipient(event.target.value);
  };
  const handleAuditFocusChange = (event) => {
    setAuditFocus(event.target.value);
  };
  const handleAuditorNominationChange = (event) => {
    setAuditorNomination(event.target.value);
  };

  const handleAnnualAuditChange = (event) => {
    setAnnualAuditRequired(event.target.checked);
  };
  const handleBoardExistsChange = (event) => {
    setBoardExists(event.target.checked);
  };
  const handleAnnualVotingChange = (event) => {
    setAnnualVoting(event.target.checked);
  };
  const handleBoardCanVoteChange = (event) => {
    setBoardCanVote(event.target.checked);
  };
  const handleShareholdersMethodChange = (event) => {
    setAddShareholdersMethod(event.target.value);
  };

  const handleUpgradeInformedChange = (event) => {
    setIsUpgradeInformed(event.target.checked);
  };
  const handleManagerChange = (event) => {
    setSelectedManager(event.target.value);
  };

  const handleBeneficiaryChange = (event) => {
    setSelectedBeneficiary(event.target.value);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="industrySector">Industry sector</CustomFormLabel>
                      <TextField
                        id="industrySector"
                        select
                        fullWidth
                        placeholder='Select industry sector'
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="registrationNumber">Registration number</CustomFormLabel>
                      <TextField
                        id="registrationNumber"
                        fullWidth
                        placeholder='Registration number'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="taxId">Tax ID</CustomFormLabel>
                      <TextField
                        id="taxId"
                        fullWidth
                        placeholder='Tax ID'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="legalStructure">Legal structure</CustomFormLabel>
                      <TextField
                        id="legalStructure"
                        fullWidth
                        placeholder='Legal structure'
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <CustomFormLabel htmlFor="countryOfRegistry">Country of registry</CustomFormLabel>
                      <TextField
                        id="countryOfRegistry"
                        select
                        fullWidth
                        placeholder='Select country'
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
                              id="incorporationCertificate"
                            />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                        </Grid>
                      </Grid>
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
                              id="memorandumArticles"
                            />
                          </Button>
                        </Grid>
                        <Grid item>
                          <Typography variant="body2" color="textSecondary">No file chosen</Typography>
                        </Grid>
                      </Grid>
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
                          value={selectedManager}
                          onChange={handleManagerChange}
                        >
                          <FormControlLabel
                            value="self"
                            control={<Radio />}
                            label="I am the Executive Manager"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="Another person is the Executive Manager"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        startIcon={<Typography component="span">+</Typography>}
                        sx={{ color: '#5B5B5B', borderColor: '#E0E0E0' }}
                      >
                        Add more
                      </Button>
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
                      <CustomFormLabel>Who is the Economic Beneficiary?</CustomFormLabel>
                      <FormControl component="fieldset">
                        <RadioGroup
                          value={selectedBeneficiary}
                          onChange={handleBeneficiaryChange}
                        >
                          <FormControlLabel
                            value="shareholders"
                            control={<Radio />}
                            label="Shareholders"
                          />
                          <FormControlLabel
                            value="onlyMe"
                            control={<Radio />}
                            label="Only me"
                          />
                          <FormControlLabel
                            value="otherEntity"
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
                          value={addShareholdersMethod}
                          onChange={handleShareholdersMethodChange}
                        >
                          <FormControlLabel
                            value="manual"
                            control={<Radio />}
                            label="I will add shareholders manually"
                          />
                          <FormControlLabel
                            value="upload"
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
                              checked={isUpgradeInformed}
                              onChange={handleUpgradeInformedChange}
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
                            checked={boardExists}
                            onChange={handleBoardExistsChange}
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
                            checked={boardCanVote}
                            onChange={handleBoardCanVoteChange}
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
                            checked={annualVoting}
                            onChange={handleAnnualVotingChange}
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
                            checked={limitSpending}
                            onChange={handleLimitSpendingChange}
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
                    {limitSpending && (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            label="Daily limitation in $"
                            fullWidth
                            value={dailyLimit}
                            onChange={handleDailyLimitChange}
                            type="number"
                            placeholder="1000"
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            label="Monthly limitation in $"
                            fullWidth
                            value={monthlyLimit}
                            onChange={handleMonthlyLimitChange}
                            type="number"
                            placeholder="10000"
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
                          value={adminApproval}
                          onChange={handleAdminApprovalChange}
                        >
                          <FormControlLabel
                            value="boardVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Board of Directors"
                          />
                          <FormControlLabel
                            value="shareholderAssembly"
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
                          value={memberApproval}
                          onChange={handleMemberApprovalChange}
                        >
                          <FormControlLabel
                            value="groupAdmin"
                            control={<Radio />}
                            label="Are approved by the Group Admin"
                          />
                          <FormControlLabel
                            value="memberWithPower"
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
                          value={newAdminApproval}
                          onChange={handleNewAdminApprovalChange}
                        >
                          <FormControlLabel
                            value="groupAdmin"
                            control={<Radio />}
                            label="Can be added by Group Admin"
                          />
                          <FormControlLabel
                            value="boardVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Board of Directors"
                          />
                          <FormControlLabel
                            value="shareholderAssembly"
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
                          value={boardMemberApproval}
                          onChange={handleBoardMemberApprovalChange}
                        >
                          <FormControlLabel
                            value="groupAdmin"
                            control={<Radio />}
                            label="Can be added by Group Admin"
                          />
                          <FormControlLabel
                            value="boardVoting"
                            control={<Radio />}
                            label="Are approved by a voting of the Board of Directors"
                          />
                          <FormControlLabel
                            value="shareholderAssembly"
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
                            checked={annualAuditRequired}
                            onChange={handleAnnualAuditChange}
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
                          value={auditFocus}
                          onChange={handleAuditFocusChange}
                        >
                          <FormControlLabel
                            value="option1"
                            control={<Radio />}
                            label="All company’s financial transactions including COOWN and bank accounts"
                          />
                          <FormControlLabel
                            value="option2"
                            control={<Radio />}
                            label="All company’s financial transactions and the company has no Bank account"
                          />
                          <FormControlLabel
                            value="option3"
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
                          value={auditorNomination}
                          onChange={handleAuditorNominationChange}
                        >
                          <FormControlLabel
                            value="boardApproval"
                            control={<Radio />}
                            label="Board of Directors approve Auditors"
                          />
                          <FormControlLabel
                            value="groupAdminNomination"
                            control={<Radio />}
                            label="Existing Group Admin can nominate an Auditor"
                          />
                          <FormControlLabel
                            value="shareholderApproval"
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
                          value={auditReportRecipient}
                          onChange={handleAuditReportRecipientChange}
                        >
                          <FormControlLabel
                            value="boardAndManagers"
                            control={<Radio />}
                            label="Board of Directors and Executive Managers"
                          />
                          <FormControlLabel
                            value="shareholdersAndBoard"
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
                            checked={operatorEntitled}
                            onChange={handleOperatorEntitledChange}
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
                      <Typography sx={{marginLeft:'40px'}} variant="body2" color="textSecondary">
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
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default RegisterCompany;
