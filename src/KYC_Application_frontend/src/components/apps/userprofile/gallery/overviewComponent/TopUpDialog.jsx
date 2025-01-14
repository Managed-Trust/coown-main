import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  TextField,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai");
const ledger2 = ic("rkp4c-7iaaa-aaaaa-aaaca-cai");

const TopUpDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    canisterId: "",
    amount: "",
  });

  const icpXdrConversionRate = async () => {
    // const agent = new HttpAgent({ fetch, host: "https://ic0.app" });

    // const actor = Actor.createActor(idlFactory, {
    //   agent,
    //   canisterId: "rkp4c-7iaaa-aaaaa-aaaca-cai",
    // });

    const {
      data: { xdr_permyriad_per_icp },
    } = await ledger2.call("get_icp_xdr_conversion_rate");

    const CYCLES_PER_XDR = BigInt(1_000_000_000_000);

    // Return conversion rate in trillion ratio
    return (xdr_permyriad_per_icp * CYCLES_PER_XDR) / BigInt(10_000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchConversionRate = async () => {
      const conversionRate = await icpXdrConversionRate();
      console.log("ICP-XDR Conversion Rate:", conversionRate.toString());
    };

    fetchConversionRate();
  }, []); // Empty dependency array ensures this runs only once

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const { canisterId, amount } = formData;

    let key =
      "92c6cb3361fea9ab71d1d4a71cb7270471eec6254dc6f23709a79e9fa7823ead";
    if (!canisterId || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const targetCanisterId = canisterId.trim(); // Canister ID from input
      const cyclesAmount = parseInt(amount, 10); // Convert amount to integer
      console.log("params", targetCanisterId, cyclesAmount);
      const response = await ledger.call(
        "transferCycles",
        targetCanisterId,
        cyclesAmount,
        key
      );
      console.log("response", response);

      alert("Cycles transferred successfully!");
      setFormData({ canisterId: "", amount: "" }); // Reset the form
    } catch (error) {
      console.error("Error transferring cycles:", error);
      alert("Failed to transfer cycles. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "15px",
          p: 4,
          maxWidth: "463px",
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3">Top Up Canister</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ bgcolor: "grey.50", p: 3, borderRadius: 2, mb: 3 }}>
          <Grid container spacing={2}>
            <Box sx={{ bgcolor: "grey.50", p: 1, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Canister Id"
                    id="canisterId"
                    name="canisterId"
                    variant="outlined"
                    placeholder="Enter Canister ID"
                    value={formData.canisterId}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Amount"
                    id="amount"
                    name="amount"
                    type="number"
                    variant="outlined"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>

        <Box display="flex" gap={2} mb={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Approve
          </Button>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpDialog;
