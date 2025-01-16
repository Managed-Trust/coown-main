// import React from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   IconButton,
// } from '@mui/material';

// const RewardItem = ({ icon, title, description, buttonText }) => (
//   <Card
//     variant="outlined"
//     sx={{
//       mb: 2,
//       boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//       borderRadius: 2,
//       border: '1px solid #e2e8f0',
//     }}
//   >
//     <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <IconButton sx={{ mr: 2 }}>
//           {icon}
//         </IconButton>
//         <Box>
//           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
//             {title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             {description}
//           </Typography>
//         </Box>
//       </Box>
//       <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
//         {buttonText}
//       </Button>
//     </CardContent>
//   </Card>
// );

// export default function RewardsAndAffiliate() {
//   return (
//     <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4, px: 2 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={5}>
//           <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
//             Social Rewards
//           </Typography>
//           <Typography variant="body2" paragraph sx={{ color: '#64748b', mb: 4, fontSize: '14px' }}>
//             Participate in community tasks to earn rewards! Engage in various activities,
//             collaborate with others, and contribute to community goals to unlock special
//             bonuses.
//           </Typography>
//         </Grid>
//         <Grid item xs={12} md={7}>
//           <RewardItem
//             icon={<img src='/images/RewardImages/COOWN_IMAGE.svg' />}
//             title="Complete group tasks"
//             description="Participate in tasks and earn rewards"
//             buttonText="Start"
//           />
//           <RewardItem
//             icon={<img src='/images/RewardImages/TWITTER.svg' />}
//             title="Follow COOWN on X"
//             description="Follow us for more updates and rewards"
//             buttonText="Follow"
//           />
//           <RewardItem
//             icon={<img src='/images/RewardImages/YOUTUBE.svg' />}
//             title="Follow COOWN on Youtube"
//             description="Follow us for more updates and rewards"
//             buttonText="Follow"
//           />
//           <RewardItem
//             icon={<img src='/images/RewardImages/DISCORD.svg' />}
//             title="Follow COOWN on Discord"
//             description="Follow us for more updates and rewards"
//             buttonText="Follow"
//           />
//         </Grid>
//       </Grid>
//       <Grid container spacing={4} sx={{ mt: 4 }}>
//         <Grid item xs={12} md={5}>
//           <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1e293b' }}>
//             Referral Code
//           </Typography>
//           <Typography variant="body2" paragraph sx={{ color: '#64748b', mb: 2, fontSize: '14px' }}>
//             Create a custom invite code. If other use it to upgrade to our enterprise plan, you will get a one-time bonus.
//           </Typography>
//           <FormControlLabel
//             control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} />}
//             label="Get rewards for invites"
//             sx={{ mb: 2, '& .MuiTypography-root': { color: '#64748b' } }}
//           />
//         </Grid>
//         <Grid item xs={12} md={7}>
//           <Card
//             variant="outlined"
//             sx={{
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               borderRadius: 2,
//               border: '1px solid #e2e8f0',
//             }}
//           >
//             <CardContent sx={{ p: 3 }}>
//               <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Create invite code
//               </Typography>
//               <Typography variant="body2" color="text.secondary" gutterBottom>
//                 Share this code with your friends
//               </Typography>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 placeholder="Invite code"
//                 sx={{ mb: 2, mt: 2, '& .MuiOutlinedInput-root': { bgcolor: '#f8fafc' } }}
//               />
//               <Button variant="contained" color="primary" sx={{ textTransform: 'none' }}>
//                 Create code
//               </Button>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Adjust as needed for your environment

const RewardItem = ({ icon, title, description, buttonText, onSubmit }) => (
  <Card
    variant="outlined"
    sx={{
      mb: 2,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      borderRadius: 2,
      border: "1px solid #e2e8f0",
    }}
  >
    <CardContent
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton sx={{ mr: 2 }}>{icon}</IconButton>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ textTransform: "none" }}
        onClick={onSubmit}
      >
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

export default function RewardsAndAffiliate() {
  const { principal, isConnected } = useConnect();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [proof, setProof] = useState("");
  const [tokenValue, setTokenValue] = useState(0);

  const handleSubmitProof = async () => {
    if (!isConnected) {
      alert("Please connect your wallet to submit proof of work.");
      return;
    }

    // Replace with actual backend API call or canister interaction
    console.log("Submitting proof:", {
      principal,
      task: selectedTask,
      proof,
      tokenValue,
    });
    const data = await ledger.call(
      "addRewardClaim",
      principal,
      selectedTask,
      proof,
      tokenValue
    );

    alert(`Proof of work submitted for task: ${selectedTask}`);
    setProof("");
    setOpenDialog(false);
  };

  const handleOpenDialog = (task, value) => {
    if (!isConnected) {
      alert("Please connect your wallet to participate.");
      return;
    }
    setSelectedTask(task);
    setTokenValue(value);
    setOpenDialog(true);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, px: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1e293b" }}
          >
            Social Rewards
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{ color: "#64748b", mb: 4, fontSize: "14px" }}
          >
            Participate in community tasks to earn rewards! Engage in various
            activities, collaborate with others, and contribute to community
            goals to unlock special bonuses.
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          <RewardItem
            icon={
              <img src="/images/RewardImages/COOWN_IMAGE.svg" alt="Task Icon" />
            }
            title="Complete group tasks"
            description="Participate in tasks and earn rewards"
            buttonText="Submit Proof"
            onSubmit={() => handleOpenDialog("Complete group tasks", 50)}
          />
          <RewardItem
            icon={
              <img src="/images/RewardImages/TWITTER.svg" alt="Twitter Icon" />
            }
            title="Follow COOWN on X (Reward: 20 $DUMMY)"
            description="Follow us for more updates and rewards"
            buttonText="Submit Proof"
            onSubmit={() => handleOpenDialog("Follow COOWN on X", 20)}
          />
          <RewardItem
            icon={
              <img src="/images/RewardImages/YOUTUBE.svg" alt="Youtube Icon" />
            }
            title="Follow COOWN on Youtube (Reward: 30 $DUMMY)"
            description="Follow us for more updates and rewards"
            buttonText="Submit Proof"
            onSubmit={() => handleOpenDialog("Follow COOWN on Youtube", 30)}
          />
          <RewardItem
            icon={
              <img src="/images/RewardImages/DISCORD.svg" alt="Discord Icon" />
            }
            title="Follow COOWN on Discord (Reward: 15 $DUMMY)"
            description="Follow us for more updates and rewards "
            buttonText="Submit Proof"
            onSubmit={() => handleOpenDialog("Follow COOWN on Discord", 15)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={5}>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1e293b" }}
          >
            Referral Code
          </Typography>
          <Typography
            variant="body2"
            paragraph
            sx={{ color: "#64748b", mb: 2, fontSize: "14px" }}
          >
            Create a custom invite code. If others use it to upgrade to our
            enterprise plan, you will get a one-time bonus.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }} />
            }
            label="Get rewards for invites"
            sx={{ mb: 2, "& .MuiTypography-root": { color: "#64748b" } }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Card
            variant="outlined"
            sx={{
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: 2,
              border: "1px solid #e2e8f0",
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                Create invite code
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Share this code with your friends
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Invite code"
                sx={{
                  mb: 2,
                  mt: 2,
                  "& .MuiOutlinedInput-root": { bgcolor: "#f8fafc" },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                Create code
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Proof Submission Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Submit Proof of Work</DialogTitle>
        <DialogContent>
          <Typography variant="body2" gutterBottom>
            Task: {selectedTask}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Reward: {tokenValue} $DUMMY
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Describe your proof of work"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            sx={{
              mt: 2,
              mb: 2,
              "& .MuiOutlinedInput-root": { bgcolor: "#f8fafc" },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitProof}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
