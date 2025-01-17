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
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
import { createActor } from "../../../../declarations/Token";
import { useConnect } from "@connect2ic/react";

const TopUpDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    canisterId: "",
    amount: "",
  });
  const [totalcycle, setTotalCylce] = useState("");
  const [tcycle, setTCylce] = useState("");
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);
  const { isConnected, principal } = useConnect();


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
    if (name === "amount" && (isNaN(value) || parseFloat(value) < 0)) {
      return; // Ignore invalid values or negative numbers
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    init();
    const fetchConversionRate = async () => {
      const conversionRate = await icpXdrConversionRate();
      setTCylce(conversionRate);
      console.log("ICP-XDR Conversion Rate:", conversionRate.toString());
    };

    fetchConversionRate();
    
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const parsedAmount = parseFloat(formData.amount) || 0; // Ensure valid number
    const amountBigInt = BigInt(Math.round(parsedAmount * 10000000000)); // Convert to smallest unit (e.g., cents)
    const tcycleBigInt = BigInt(tcycle); // Convert tcycle to BigInt
    const total = amountBigInt * tcycleBigInt; // Calculate total in smallest unit
    const Ttotal = Number(total) / 10000000000; // Convert back to original unit (e.g., dollars)
    setTotalCylce(Ttotal); // Ensure 2 decimal places in the result
  }, [formData.amount, tcycle]);

  // Initialize AuthClient
  const init = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
    if (await client.isAuthenticated()) {
      handleAuthenticated(client);
    }
  };

  const handleAuthenticated = async (client) => {
    const identity = await client.getIdentity();
    setIdentity(identity);
  };
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
      const cyclesAmount = amount*100000000; // Convert amount to integer
      console.log("params", targetCanisterId, cyclesAmount,tcycle,totalcycle);

      const authenticatedCanister = createActor("ryjl3-tyaaa-aaaaa-aaaba-cai", {
        agentOptions: {
          identity,
        },
      });
      if (authClient) {
        const transferResult = await authenticatedCanister.icrc1_transfer({
          from: {
            owner: Principal.fromText(principal),
            subaccount: [],
          },
          to: {
            owner: Principal.fromText(
              "xsvih-nzaqn-q3edk-ijqkq-3qymg-qxf4z-pqou7-g5t2r-36ukb-ioiqc-7qe"
            ),
            subaccount: [],
          },
          fee: [10000n],
          memo: [],
          from_subaccount: [],
          created_at_time: [],
          amount: Number(parseInt(cyclesAmount)),
        });

        if (transferResult.Ok) {
          const response = await ledger.call(
            "transferCycles",
            targetCanisterId,
            totalcycle,
            key
          );

          console.log("response", response);

          alert("Cycles transferred successfully!");

          setFormData({ canisterId: "", amount: "" }); // Reset the form
        } else {
          alert("Transfer Failed");
        }
      } else {
        alert("connect Your identity");
      }
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
                    label="Amount in ICP"
                    id="amount"
                    name="amount"
                    type="number"
                    variant="outlined"
                    placeholder="Enter Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    step="0.01"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Cycle"
                    name="Cycle"
                    type="number"
                    disabled
                    variant="outlined"
                    placeholder="Enter TCycle"
                    value={totalcycle}
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
            Top up
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
