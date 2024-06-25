import React from 'react';
import { Grid, Typography } from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import FormTabs from '../../components/forms/form-horizontal/FormTabs';

const FormHorizontal = () => {
  return (
    <PageContainer title="Horizontal Form" description="this is Horizontal Form page">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" mb={3}>Email Verification</Typography>
          <FormTabs />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default FormHorizontal;
