import React, { useState } from 'react';
import { Box, Paper, Checkbox, Button, RadioGroup, Radio, Grid, TextField, Typography, FormControl, FormControlLabel, Switch, Stack, MenuItem, Stepper, Step, StepLabel } from '@mui/material';
import ChildCard from '../../../../shared/ChildCard';
import CustomFormLabel from "../../../../forms/theme-elements/CustomFormLabel";

const Auditing = () => {
  const [annualAuditRequired, setAnnualAuditRequired] = useState(false);
  const [auditorNomination, setAuditorNomination] = useState('boardApproval');
  const [auditFocus, setAuditFocus] = useState('option1');
  const [auditReportRecipient, setAuditReportRecipient] = useState('boardAndManagers');
  const [operatorEntitled, setOperatorEntitled] = useState(false);


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



  return (
    <form>
      <ChildCard p={3}>
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

      <ChildCard p={3}>
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

      <ChildCard p={3}>
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


      <ChildCard p={3}>
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

      <ChildCard p={3}>
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
                <Typography sx={{ marginLeft: '40px' }} variant="body2" color="textSecondary">
                  Profile of Administrator and Group Name will be forwarded to a potential audit firm,
                  that can be mandated by the Corporate Group Management.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ChildCard>
    </form>
  );
};

export default Auditing;
