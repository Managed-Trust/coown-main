import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import ChildCard from '../../../../shared/ChildCard';

const Ownership = () => {
    return (
        <ChildCard p={3}>
            <Typography variant="h6" gutterBottom>
                Ownership
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                You can transfer group ownership to another system user from your contacts. Select a user and ask them to become group owner.
            </Typography>

            <Box mt={2}>
                <Typography variant="body1" gutterBottom>
                    Select user
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search by name or email"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button
                            variant="contained"
                            color="error"
                            fullWidth
                            sx={{ height: '100%' }}
                        >
                            Make group owner
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </ChildCard>
    );
};

export default Ownership;
