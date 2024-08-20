import React, { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Switch, FormControlLabel } from '@mui/material';
import ChildCard from '../../../../shared/ChildCard';
import CustomFormLabel from "../../../../forms/theme-elements/CustomFormLabel";

const EditGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupLogo, setGroupLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [enableFileSharing, setEnableFileSharing] = useState(true);

    const handleLogoChange = (event) => {
        const file = event.target.files[0];
        setGroupLogo(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission here
        const formData = new FormData();
        formData.append('groupName', groupName);
        formData.append('groupDescription', groupDescription);
        formData.append('groupLogo', groupLogo);
        formData.append('enableFileSharing', enableFileSharing);

        // You can send formData to your backend or handle it accordingly
        console.log('Form submitted', {
            groupName,
            groupDescription,
            groupLogo,
            enableFileSharing
        });
    };

    return (
        <ChildCard p={3}>
            <Typography variant="h6" gutterBottom>
                Edit group
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Edit your group details and settings
            </Typography>

            <form onSubmit={handleSubmit}>
                <Box mt={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography sx={{ paddingTop: '30px' }} variant="h6" gutterBottom>
                                Group Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomFormLabel htmlFor="groupName">Group name</CustomFormLabel>
                                    <TextField
                                        id="groupName"
                                        fullWidth
                                        value={groupName}
                                        onChange={(e) => setGroupName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomFormLabel htmlFor="groupDescription">Group description</CustomFormLabel>
                                    <TextField
                                        id="groupDescription"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        value={groupDescription}
                                        onChange={(e) => setGroupDescription(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomFormLabel htmlFor="groupLogo">Group logo</CustomFormLabel>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Button variant="contained" component="label">
                                            Choose file
                                            <input
                                                type="file"
                                                id="groupLogo"
                                                hidden
                                                onChange={handleLogoChange}
                                            />
                                        </Button>
                                        {logoPreview && (
                                            <Box
                                                component="img"
                                                sx={{ width: 100, height: 100, borderRadius: '8px' }}
                                                src={logoPreview}
                                                alt="Logo preview"
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={1}>
                        <Grid item xs={12} sm={12} md={4}>
                            <Typography sx={{ paddingTop: '10px' }} variant="h6" gutterBottom>
                                File Sharing
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={enableFileSharing}
                                                onChange={(e) => setEnableFileSharing(e.target.checked)}
                                            />
                                        }
                                        label="Enable file sharing"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Save Changes
                    </Button>
                </Box>
            </form>
        </ChildCard>
    );
};

export default EditGroup;
