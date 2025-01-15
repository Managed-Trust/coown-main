import React, { useState } from 'react';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography, Paper, Grid, Box, Button } from '@mui/material';

const ActivityStream = () => {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box p={2}>
        <Typography variant="h5" align="left" sx={{ fontWeight: 'bold' }}>
          Activity Stream
        </Typography>
        <Grid mt={1} ml={-4} container direction="column" justifyContent="flex-start" alignItems="flex-start">
          <Timeline
            className="theme-timeline"
            sx={{
              p: 0,
              mb: '-40px',
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
                paddingLeft: 0,
              },
            }}
          >
            {/* First Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 8, 09:46</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  Group details updated by <strong>Alice Johnson</strong>
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Second Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 8, 07:25</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="secondary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  New group member <strong>Alice Johnson</strong>
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Third Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 7, 22:46</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  0.001535 ckBTC withdrawn by <strong>Bob Smith</strong>
                  <Link href="/" underline="none"> #1231616</Link>
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Fourth Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 7, 21:15</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="primary" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  Group voted for <strong>Deploy GuestOS To All Subnet Nodes</strong> by Michael Anderson
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Fifth Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 7, 21:13</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="warning" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  147.14 $COOWN reward received
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Sixth Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 7, 20:56</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="error" variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  0.001535 ckBTC sent by <strong>Michael Anderson</strong>
                  <Link href="/" underline="none"> #1231616</Link>
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Seventh Timeline Item */}
            <TimelineItem>
              <TimelineOppositeContent align="left">
                <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 7, 17:46</Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" />
              </TimelineSeparator>
              <TimelineContent align="left">
                <Typography variant="body1" mt={0.2} fontSize="14px">
                  Group voted for <strong>Deploy GuestOS To Some API Boundary Nodes</strong> by Michael Anderson
                </Typography>
              </TimelineContent>
            </TimelineItem>

            {/* Conditionally Rendered Extra Items */}
            {showMore && (
              <>
                {/* Add more TimelineItems here if needed */}
                <TimelineItem>
                  <TimelineOppositeContent align="left">
                    <Typography variant="body2" color="textSecondary" mt={0.4} fontSize="14px">Aug 6, 10:10</Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color="success" variant="outlined" />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent align="left">
                    <Typography variant="body1" mt={0.2} fontSize="14px">
                      Another event to show on "Show More"
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </>
            )}
          </Timeline>
        </Grid>

        {/* Show More Button */}
        <Box mt={2} textAlign="start">
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: '30px' }}
          >
            Show More
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ActivityStream;
