import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';;
import ic from "ic0";
import img from '/images/prototype/rocket2.svg';
import img2 from '/images/prototype/dummyToken.svg';

// const ledger = ic.local('bkyz2-fmaaa-aaaaa-qaaaq-cai'); //local
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Ledger canister

const Prototype = () => {
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
                        maxWidth: 400,
                        padding: 4,
                        backgroundColor: 'white',
                        borderRadius: '16px',
                    }}
                >
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, fontSize: '26px' }}>
                        Prototype mode is enabled
                    </Typography>
                    <Typography mb={2} variant="body2" color="textSecondary" gutterBottom>
                        We haven’t launched yet. Currently, our prototype is  available for testing.
                    </Typography>
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
                            <Typography
                                component="p"
                                sx={{
                                    color: 'white', // Equivalent to text-white
                                    fontWeight: '500', // Equivalent to font-medium
                                    display: 'inline-block',
                                    backgroundColor: 'black', // Equivalent to bg-black
                                    px: 2, // Equivalent to px-4
                                    py: 0, // Equivalent to py-1
                                    fontSize: { xs: '0.875rem', md: '1rem' }, // Equivalent to text-sm md:text-base
                                }}
                            >
                                Prototype mode - for testing only!
                            </Typography>
                        </Box>
                    </Box>

                    <Typography mt={1} variant="body2" color="textSecondary" gutterBottom>
                        All user data generated for testing the prototype will be deleted.
                    </Typography>
                    <Grid
                        item
                        xs={false}
                        sm={12}
                        md={12}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            src={img2}
                            alt="Login Illustration"
                            style={{ maxWidth: '80%', height: 'auto' }}
                        />
                    </Grid>
                    <Typography mt={1} variant="body2" color="textSecondary" gutterBottom>
                        Use only our dummy token or you risk losing your funds!
                    </Typography>
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
                <Link to='/user/login'>  <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, mb: 2, borderRadius: '12px', padding: '12px 0', fontWeight: '600' }}
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
