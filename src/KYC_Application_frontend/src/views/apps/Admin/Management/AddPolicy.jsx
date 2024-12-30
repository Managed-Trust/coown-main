import React, { useState } from 'react';
import {
  Box,
  Typography,
  Drawer, Grid, Button,
  Fab,
  Tooltip,
  IconButton, TextField, MenuItem
} from '@mui/material';
import { IconX, IconSettings } from '@tabler/icons';
import Scrollbar from '../../../../components/custom-scroll/Scrollbar';

import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");

const SidebarWidth = '420px';
const initialState = {
  name: '',
  applicability: '',
  responsibleEntity: '',
  link: '',
  workingDirectory: '',
  focalPoint: '',
};

const AddPolicy = ({ openDrawer, drawer }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);

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
  const handleSubmit = async () => {
    setLoading(true);
    if (!formData.name || !formData.applicability || !formData.responsibleEntity || !formData.link || !formData.workingDirectory|| !formData.focalPoint ) {
      setLoading(false);
      swal("Error", "Please fill in all the fields.", "error");
      return;
    }
    const id = `Link-${Math.floor(100000 + Math.random() * 900000).toString()}`;
    try {
      const response = await ledger.call('addOrUpdatePolicy', id, formData.name, formData.applicability, formData.responsibleEntity, formData.link, formData.workingDirectory, formData.focalPoint);
      if (response) {
        swal('Success', 'Policy Added Successfully', 'success');
      } else {
        swal('Error', 'Something went wrong', 'error');
      }
    } catch (e) {
      swal('Error', e, 'error');
      console.log('error', e);
    }
    setLoading(false);
  }

  return (
    <div>
      {/* Floating Button to Open Sidebar */}
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={() => openDrawer()}// Open the drawer
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>

      {/* Sidebar Drawer */}
      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => openDrawer()} // Close the drawer
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >

        <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
          <Box px={3} pt={3} display="flex" justifyContent={'space-between'} alignItems="start" mt={3}>
            <Typography variant="h4">Add Policy</Typography>
            <IconButton color="inherit" onClick={() => openDrawer()}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Typography variant="subtitle1" gutterBottom px={3} pt={1}>
          </Typography>
          {/* Sidebar Content */}
          <Box sx={{ maxWidth: 600, margin: 'auto', p: 3 }}>

            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Policy name
              </Typography>
              <TextField
                fullWidth
                size="small"
                id='name'
                variant="outlined"
                onChange={handleInputChange}
                value={formData.name}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Applicability
              </Typography>
              <TextField
                id="applicability"
                select
                fullWidth
                onChange={handleSelectChange("applicability")}
                value={formData.applicability}
                >
                  {/* Add options for countries here */}
                  <MenuItem value="Regional Operators">Regional Operators</MenuItem>
                  <MenuItem value="New Account">New Account</MenuItem>
                  <MenuItem value="Entity issuing securities">Entity issuing securities</MenuItem>
              </TextField>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
              Responsible Entity 
              </Typography>
              <TextField
                id="responsibleEntity"
                select
                fullWidth
                placeholder='Select country'
                onChange={handleSelectChange("responsibleEntity")}
                value={formData.responsibleEntity}
              >
                {/* Add options for countries here */}
                <MenuItem value="Steering Committee">Steering Committee</MenuItem>
                <MenuItem value="Executive Committee">Executive Committee</MenuItem>
                <MenuItem value="Foundation">Foundation</MenuItem>
              </TextField>
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Link
              </Typography>
              <TextField
                fullWidth
                size="small"
                id='link'
                variant="outlined"
                onChange={handleInputChange}
                value={formData.link}
                sx={{ mt: 1 }}
              />
            </Box>
            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Working directory
              </Typography>
              <TextField
                fullWidth
                size="small"
                id='workingDirectory'
                variant="outlined"
                onChange={handleInputChange}
                value={formData.workingDirectory}
                sx={{ mt: 1 }}
              />
            </Box>

            <Box mb={2}>
              <Typography variant="subtitle2" color="textSecondary">
                Focal point
              </Typography>
              <TextField
                fullWidth
                size="small"
                id='focalPoint'
                variant="outlined"
                onChange={handleInputChange}
                value={formData.focalPoint}
                sx={{ mt: 1 }}
              />
            </Box>
            <Grid item xs={12} sx={{ display: 'flex', gap: 1, mt: 1 }}>

              <Button onClick={() => handleSubmit()} variant="contained" sx={{ textTransform: 'none' }}>
                {loading ? "Saving ...." : "Save Changes"}
              </Button>
              <Button onClick={() => openDrawer()} variant="outlined" sx={{ textTransform: 'none' }}>
                Cancel
              </Button>

            </Grid>
          </Box>
        </Scrollbar>

      </Drawer>
    </div>
  );
};

export default AddPolicy;
