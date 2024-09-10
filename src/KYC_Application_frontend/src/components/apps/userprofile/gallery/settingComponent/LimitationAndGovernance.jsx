import React, { useState } from 'react';
import { Box, Paper, Checkbox, Button, RadioGroup, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, Stack, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import ChildCard from '../../../../shared/ChildCard';
import CustomFormLabel from "../../../../forms/theme-elements/CustomFormLabel";

const LimitationAndGovernance = () => {
  const [selectedManager, setSelectedManager] = useState('self');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState('shareholders');
  const [addShareholdersMethod, setAddShareholdersMethod] = useState('manual');
  const [isUpgradeInformed, setIsUpgradeInformed] = useState(false);
  const [boardExists, setBoardExists] = useState(false);
  const [boardCanVote, setBoardCanVote] = useState(false);
  const [annualVoting, setAnnualVoting] = useState(false);

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


  return (
    <form>

      <ChildCard p={3}>
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

      <ChildCard p={3}>
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

      <ChildCard p={3}>
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


      <ChildCard p={3}>
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

      <ChildCard p={3}>
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
    </form>
  );
};

export default LimitationAndGovernance;
