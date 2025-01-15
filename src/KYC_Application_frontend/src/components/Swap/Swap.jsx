// import React, { useState } from "react";
// import "./Swap.css"; // Import the CSS file

// const TokenSwap = () => {
//   const [icpAmount, setIcpAmount] = useState("");
//   const [coOwnTokens, setCoOwnTokens] = useState(0);
//   const coOwnRate = 0.5; // 1 $COOWN is $0.50
//   const [ICP_Price, setICPPrice] = useState(0);
//   const handleIcpChange = (event) => {
//     const inputIcp = event.target.value;
//     setIcpAmount(inputIcp);

//     // Calculate $COOWN tokens based on ICP input
//     const calculatedCoOwn = (inputIcp / coOwnRate).toFixed(2); // ICP to $COOWN conversion
//     setCoOwnTokens(calculatedCoOwn);
//   };

//   const handleSwap = () => {
//     alert(`You will receive ${coOwnTokens} $COOWN tokens.`);
//     // Swap logic or API call goes here
//   };

//   const fetchICPPrice = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.coingecko.com/api/v3/simple/price",
//         {
//           params: {
//             ids: "internet-computer", // CoinGecko ID for ICP
//             vs_currencies: "usd", // Specify the currency to fetch the price in
//           },
//         }
//       );

//       const price = response.data["internet-computer"].usd;
//       setIcpPrice(price);
//       console.log(`Current ICP Price: $${price}`);
//     } catch (error) {
//       console.error("Error fetching ICP price:", error);
//     }
//   };

//   return (
//     <div className="token-swap-container">
//       <h2 className="swap-title">Swap ICP for $COOWN Tokens</h2>
//       <div className="swap-inputs">
//         <label className="input-label">
//           Enter ICP Amount:
//           <input
//             type="number"
//             value={icpAmount}
//             onChange={handleIcpChange}
//             className="icp-input"
//             placeholder="Enter ICP amount"
//           />
//         </label>
//         <div className="token-receive">
//           <p>
//             Receive: <span className="token-value">{coOwnTokens}</span> $COOWN
//             Tokens
//           </p>
//         </div>
//         <button onClick={handleSwap} className="swap-button">
//           Swap
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TokenSwap;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Swap.css"; // Import the CSS file
import { useConnect } from "@connect2ic/react";
import ic from "ic0";
const ledger = ic("speiw-5iaaa-aaaap-ahora-cai"); // Adjust as needed for your environment
import { Principal } from "@dfinity/principal";
import { AuthClient } from "@dfinity/auth-client";
// import { createActor } from "../../../declarations/Token";
import { createActor } from "../../declarations/Token";

const TokenSwap = () => {
  const [icpAmount, setIcpAmount] = useState("");
  const [coOwnTokens, setCoOwnTokens] = useState(0);
  const coOwnRate = 0.5; // 1 $COOWN is $0.50
  const [ICP_Price, setICPPrice] = useState(0);
  const { isConnected, principal } = useConnect({
    onConnect: () => {},
    onDisconnect: () => {},
  });
  const [identity, setIdentity] = useState(null);
  const [authClient, setAuthClient] = useState(null);

  // Fetch ICP price on component mount
  useEffect(() => {
    init();
    fetchICPPrice();
  }, []);

  // Fetch the current ICP price in USD
  const fetchICPPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price",
        {
          params: {
            ids: "internet-computer", // CoinGecko ID for ICP
            vs_currencies: "usd", // Specify the currency to fetch the price in
          },
        }
      );

      const price = response.data["internet-computer"].usd;
      setICPPrice(price);
      console.log(`Current ICP Price: $${price}`);
    } catch (error) {
      console.error("Error fetching ICP price:", error);
    }
  };

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

  // Handle input change for ICP amount
  const handleIcpChange = (event) => {
    const inputIcp = event.target.value;
    setIcpAmount(inputIcp);

    // Calculate $COOWN tokens based on ICP input and current ICP price in USD
    if (ICP_Price > 0) {
      const usdValue = inputIcp * ICP_Price; // Convert ICP to USD
      const calculatedCoOwn = (usdValue / coOwnRate).toFixed(2); // USD to $COOWN conversion
      setCoOwnTokens(calculatedCoOwn);
    }
  };

  // Handle the swap action
  const handleSwap = async () => {
    // Swap logic or API call goes here
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    console.log("principal", principal);
    if (authClient) {
      const authenticatedCanister = createActor("ryjl3-tyaaa-aaaaa-aaaba-cai", {
        agentOptions: {
          identity,
        },
      });
      let store2 = await authenticatedCanister.icrc1_transfer({
        from: {
          owner: Principal.fromText(principal), // Use the principal for the 'from' account
          subaccount: [], // Optional: Provide the subaccount if needed, otherwise leave empty
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
        amount: Number(parseInt(icpAmount * 10000)),
      });
      console.log(store2);
    } else {
      console.log("yolla");
      return;
    }
    if (true) {
      alert("Transaction Successful");
      try {
        alert(`You will receive ${coOwnTokens} $COOWN tokens.`);

        // Call the backend function to perform the swap
        const result = await ledger.call(
          "sendTokensToUser",
          Principal.fromText(principal),
          coOwnTokens * 1000000000,
          "mysecret"
        );

        // Handle the response
        if (result.includes("Transfer successful")) {
          alert(result);
        } else {
          alert(`Swap failed: ${result}`);
        }
      } catch (error) {
        console.error("Error performing the token swap:", error);
        alert("Error performing the token swap.");
      }
    } else {
      alert("Transaction Failed", "", "error");
    }
  };

  return (
    <div className="token-swap-container">
      <h2 className="swap-title">Swap ICP for $COOWN Tokens</h2>
      <div className="swap-inputs">
        <label className="input-label">
          Enter ICP Amount:
          <input
            type="number"
            value={icpAmount}
            onChange={handleIcpChange}
            className="icp-input"
            placeholder="Enter ICP amount"
          />
        </label>
        <div className="token-receive">
          <p>
            Receive: <span className="token-value">{coOwnTokens}</span> $COOWN
            Tokens
          </p>
        </div>
        <button onClick={handleSwap} className="swap-button">
          Swap
        </button>
        <p className="icp-price">Current ICP Price: ${ICP_Price.toFixed(2)}</p>
        <p className="icp-price">$COOWN Price: $ 0.50</p>
      </div>
    </div>
  );
};

export default TokenSwap;
