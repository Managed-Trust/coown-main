import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button, FormControlLabel, Checkbox, Avatar } from '@mui/material';;
import ic from "ic0";
import img from '/images/prototype/rocket2.svg';
import img2 from '/images/prototype/dummy-token.png';
import WarningIcon from "@mui/icons-material/Warning";

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const Prototype = () => {
    const [acknowledgement1, setAcknowledgement1] = useState(false);
    const [acknowledgement2, setAcknowledgement2] = useState(false);
    const handleChange1 = (event) => {
        setAcknowledgement1(event.target.checked);
    };

    const handleChange2 = (event) => {
        setAcknowledgement2(event.target.checked);
    };

    const isButtonDisabled = !(acknowledgement1 && acknowledgement2);

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            {/* Left section with image */}
            <Grid
                item
                xs={false}
                sm={12}
                md={6}
                sx={{
                    backgroundColor: '#f0f4f8',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={img}
                    alt="Login Illustration"
                    style={{ maxWidth: '80%', height: 'auto' }}
                />
            </Grid>

            {/* Right section with form */}
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 4,
                }}
            >

                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 500,
                        padding: 4,
                        backgroundColor: 'white',
                        borderRadius: '16px',
                    }}
                >
                    <Box
                        sx={{
                            position: 'relative',
                            width: '100%',
                            overflow: 'hidden',
                            backgroundColor: 'yellow', // Equivalent to bg-yellow-400
                        }}
                    >
                        {/* Diagonal stripes pattern */}
                        <Box
                            sx={{
                                position: 'absolute',
                                inset: 0, // Equivalent to absolute inset-0
                                backgroundImage: `repeating-linear-gradient(
                                45deg,
                                #000 0px,
                                #000 10px,
                                #fbbf24 10px,
                                #fbbf24 20px
                              )`,
                            }}
                        />

                        {/* Text content */}
                        <Box
                            sx={{
                                position: 'relative',
                                py: 1, // Equivalent to py-2
                                px: 4, // Equivalent to px-4
                                textAlign: 'center', // Equivalent to text-center
                            }}
                        >
                        </Box>
                    </Box>
                    <br />
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                        Prototype mode is enabled
                    </Typography>
                    <Typography mb={2} variant="subtitle2" sx={{ color: '#5A6A85' }} gutterBottom>
                        We haven’t launched yet. Currently, our prototype is  available for testing. All user data generated for testing the prototype will be deleted.
                    </Typography>

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            padding: 2,
                            borderRadius: 2,
                            backgroundColor: "#FFF8E1", // Light yellow background
                            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {/* Avatar/Icon */}
                        <Avatar
                            sx={{
                                backgroundColor: "#FFD54F", // Yellow background for avatar
                                width: 48,
                                height: 48,
                            }}
                        >
                            <img src={img2} alt="" />
                        </Avatar>

                        {/* Text Content */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Dummy Token for testing
                            </Typography>
                            <Typography variant="subtitle2" sx={{ color: '#5A6A85' }}>
                                Use only our dummy token or you risk losing your funds!
                            </Typography>
                        </Box>
                    </Box>
                    <br />
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={acknowledgement1}
                                    onChange={handleChange1}
                                    color="primary"
                                />
                            } sx={{ color: '#2A3547', fontSize: '14px' }}
                            label="I acknowledge that this platform is in testing mode and only dummy token should be used."
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={acknowledgement2}
                                    onChange={handleChange2}
                                    color="primary"
                                />
                            } sx={{ color: '#2A3547', fontSize: '14px' }}
                            label="I acknowledge that all user data generated for testing the prototype will be deleted."
                        />
                    </Box>
                    <Link to={isButtonDisabled ? "#" : "/user/login"} style={{ textDecoration: "none" }}>
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{
                                mt: 2,
                                mb: 2,
                                fontSize:'16px',
                                borderRadius: "12px",
                                padding: "12px 0",
                                fontWeight: "600",
                            }}
                            disabled={isButtonDisabled} // Disable the button when both checkboxes are not checked
                        >
                            Launch app for testing
                        </Button>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Prototype;
