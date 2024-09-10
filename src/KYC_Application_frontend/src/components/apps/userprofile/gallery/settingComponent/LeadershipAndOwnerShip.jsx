import React, { useState } from 'react';
import { Box, Paper, Checkbox, Button, RadioGroup, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, Stack, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import ChildCard from '../../../../shared/ChildCard';
import CustomFormLabel from "../../../../forms/theme-elements/CustomFormLabel";

const LeadershipAndOwnerShip = () => {
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



  return (
    <form>
    <ChildCard p={3}>
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
      <ChildCard p={3}>
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

      <ChildCard p={3}>
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
    </form>
  );
};

export default LeadershipAndOwnerShip;
