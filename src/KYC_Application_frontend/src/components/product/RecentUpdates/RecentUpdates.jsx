import React, { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    Stack,
    Link,
    Container
} from '@mui/material';
import { Launch as LaunchIcon } from '@mui/icons-material';
const RecentUpdates = () => {
    const updates = [
        {
            date: '15 Jan, 2025',
            title: 'Launch of Beta Release 0.1',
            description: 'Launch the basic version of COOWN with essential group-centric wallet functionalities and security protocols. This beta version aims to gather user feedback and test scalability to refine our platform.',
            link: '#'
        },
        // Add more updates here as needed
    ];

    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleReadMore = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography
                    variant="caption"
                    component="p"
                    color="primary"
                    textAlign="center"
                    gutterBottom
                >
                    What's new
                </Typography>

                <Typography
                    variant="h4"
                    component="h1"
                    textAlign="center"
                    sx={{ mb: 4 }}
                >
                    Our recent updates
                </Typography>

                <Stack spacing={2}>
                    {updates.map((update, index) => (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                borderRadius: 2,
                                '&:hover': {
                                    boxShadow: 1,
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center'}}>
                                <Box sx={{ p:1, backgroundColor: '#E8F7FF', display:'flex', justifyContent:'center' }}>
                                    <img src='/images/logos/Icon.png'/>
                                </Box>
                                <CardContent>
                                    <Typography
                                        variant="caption"
                                        sx={{ mb: 1, display: 'block', color: '#5d87ff' }}
                                    >
                                        {update.date}
                                    </Typography>

                                    <Typography
                                        variant="h6"
                                        component="h2"
                                        sx={{ mb: 1 }}
                                    >
                                        {update.title}
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                        sx={{ mb: 1, display: 'inline', fontSize: '14px' }}
                                    >
                                        {expandedIndex === index
                                            ? update.description
                                            : `${update.description.slice(0, 100)}...`}
                                        <Button
                                            size="small"
                                            onClick={() => toggleReadMore(index)}
                                            sx={{
                                                textTransform: 'none',
                                                fontSize: '0.875rem',
                                                minWidth: 'auto',
                                                marginLeft: '0.5rem',
                                                display: 'inline-flex',
                                                justifyContent: 'center',
                                                gap: '0.3rem',
                                            }}
                                        >
                                            {expandedIndex === index ? 'Read less' : 'Read more'}
                                            <LaunchIcon sx={{ fontSize: '1rem' }} />
                                        </Button>
                                    </Typography>
                                </CardContent>
                            </Box>

                        </Card>
                    ))}
                </Stack>

                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                    >
                        Load more
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default RecentUpdates;
