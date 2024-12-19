// //============================================================================
// import Principal "mo:base/Principal";
// import HashMap "mo:base/HashMap";
// import Iter "mo:base/Iter";
// import Text "mo:base/Text";
// import Array "mo:base/Array";
// import Int "mo:base/Int";
// import Time "mo:base/Time";
// import Debug "mo:base/Debug";
// import Nat "mo:base/Nat";
// import Bool "mo:base/Bool";
// // import MultiMailManager "othermails";
// // import Types "Types";
// actor Treasury {
//     public type TreasuryDetails = {
//         id : Text; // Unique identifier for the Treasury
//         name : Text; // Name of the Treasury group
//         balanceUSD : Nat; // Total balance in USD
//         accountBalances : [AccountBalance]; // List of balances for individual coins
//         collectedFees : [CollectedFee]; // Collected fees details
//         undistributedFees : [UndistributedFee]; // Undistributed transaction fees
//         stakingRewards : [StakingReward]; // Staking reward details
//     };

//     public type AccountBalance = {
//         coin : Text; // e.g., "USDC", "Bitcoin"
//         balance : Nat; // Balance amount
//         lastWeekChange : Int; // Change in balance compared to last week
//         lastMonthChange : Int; // Change in balance compared to last month
//         percentageChange : Float; // Percentage change in balance
//     };

//     public type CollectedFee = {
//         beneficiary : Text; // Beneficiary name or ID
//         licenseFees : Nat; // License fees collected
//         transactionFees : Nat; // Transaction fees collected
//         total : Nat; // Total collected fees
//     };

//     public type UndistributedFee = {
//         beneficiary : Text; // Beneficiary name or ID
//         amount : Nat; // Amount of undistributed fees
//         triggerValue : Nat; // Minimum value required for distribution
//     };

//     public type StakingReward = {
//         beneficiary : Text; // Beneficiary name or ID
//         undistributedRewards : Nat; // Undistributed staking rewards
//         tokenHolders : Nat; // Number of token holders
//         triggerFactor : Float; // Trigger factor for distribution
//     };

//     private var treasury : ?TreasuryDetails = null;

//     // Define Treasury Type
//     type TreasuryGroup = {
//         id : Text; // Unique Treasury ID
//         name : Text; // Treasury Name
//         description : ?Text; // Description of the treasury
//         balance : Nat; // Total balance in USD
//         accounts : [Account]; // List of accounts within the treasury
//         focalPoints : [FocalPoint]; // List of focal points
//         icoDetails : ?[ICODetail]; // Details of ICO
//         triggerFactors : TriggerFactors; // Trigger factors for staking rewards
//         triggerValues : TriggerValues; // Distribution trigger values
//     };

//     // Define Account Type
//     type Account = {
//         id : Text; // Account ID
//         name : Text; // Account Name
//         coin : Text; // Coin type (e.g., USDC, Bitcoin)
//         balance : Nat; // Balance in coin's unit
//         lastWeekChange : Nat; // Change last week
//         lastMonthChange : Nat; // Change last month
//     };

//     // Define Focal Point Type
//     type FocalPoint = {
//         userId : Text; // User ID
//         name : Text; // Name of focal point
//         email : Text; // Email address
//     };

//     // Define ICO Detail Type
//     type ICODetail = {
//         id : Text; // ICO Project ID
//         name : Text; // ICO Project Name
//         allocation : Nat; // Allocation amount
//         totalRaised : Nat; // Total raised amount
//         hardCap : Nat; // Hard cap in USD
//     };

//     // Define Trigger Factors Type
//     type TriggerFactors = {
//         staking : Nat; // Factor for staking
//         ico : Nat; // Factor for ICO
//     };

//     // Define Trigger Values Type
//     type TriggerValues = {
//         staking : Nat; // Trigger value for staking
//         ico : Nat; // Trigger value for ICO
//     };

//     // Stable variables
//     private var treasuryGroups : HashMap.HashMap<Text, TreasuryGroup> = HashMap.HashMap<Text, TreasuryGroup>(0, Text.equal, Text.hash);

//     // Create Treasury Group
//     public func createTreasuryGroup(
//         id : Text,
//         name : Text,
//         description : ?Text,
//         balance : Nat,
//     ) : async Text {
//         switch (treasuryGroups.get(id)) {
//             case (null) {
//                 let newTreasuryGroup : TreasuryGroup = {
//                     id = id;
//                     name = name;
//                     description = description;
//                     balance = balance;
//                     accounts = [];
//                     focalPoints = [];
//                     icoDetails = null;
//                     triggerFactors = {
//                         staking = 0;
//                         ico = 0;
//                     };
//                     triggerValues = {
//                         staking = 0;
//                         ico = 0;
//                     };
//                 };
//                 treasuryGroups.put(id, newTreasuryGroup);
//                 return "Treasury group created successfully.";
//             };
//             case (_) {
//                 return "Treasury group already exists.";
//             };
//         };
//     };

//     // Add Account to Treasury Group
//     public func addAccount(
//         treasuryId : Text,
//         accountId : Text,
//         name : Text,
//         coin : Text,
//         balance : Nat,
//         lastWeekChange : Nat,
//         lastMonthChange : Nat,
//     ) : async Text {
//         switch (treasuryGroups.get(treasuryId)) {
//             case (null) {
//                 return "Treasury group not found.";
//             };
//             case (?group) {
//                 let newAccount : Account = {
//                     id = accountId;
//                     name = name;
//                     coin = coin;
//                     balance = balance;
//                     lastWeekChange = lastWeekChange;
//                     lastMonthChange = lastMonthChange;
//                 };
//                 let updatedAccounts = Array.append(group.accounts, [newAccount]);
//                 treasuryGroups.put(treasuryId, { group with accounts = updatedAccounts });
//                 return "Account added successfully.";
//             };
//         };
//     };

//     // Add Focal Point
//     public func addFocalPoint(
//         treasuryId : Text,
//         userId : Text,
//         name : Text,
//         email : Text,
//     ) : async Text {
//         switch (treasuryGroups.get(treasuryId)) {
//             case (null) {
//                 return "Treasury group not found.";
//             };
//             case (?group) {
//                 let newFocalPoint : FocalPoint = {
//                     userId = userId;
//                     name = name;
//                     email = email;
//                 };
//                 let updatedFocalPoints = Array.append(group.focalPoints, [newFocalPoint]);
//                 treasuryGroups.put(treasuryId, { group with focalPoints = updatedFocalPoints });
//                 return "Focal point added successfully.";
//             };
//         };
//     };

//     // Configure Trigger Factors
//     public func configureTriggerFactors(
//         treasuryId : Text,
//         staking : Nat,
//         ico : Nat,
//     ) : async Text {
//         switch (treasuryGroups.get(treasuryId)) {
//             case (null) {
//                 return "Treasury group not found.";
//             };
//             case (?group) {
//                 let updatedTriggerFactors = {
//                     staking = staking;
//                     ico = ico;
//                 };
//                 treasuryGroups.put(treasuryId, { group with triggerFactors = updatedTriggerFactors });
//                 return "Trigger factors configured successfully.";
//             };
//         };
//     };

//     // Configure Trigger Values
//     public func configureTriggerValues(
//         treasuryId : Text,
//         staking : Nat,
//         ico : Nat,
//     ) : async Text {
//         switch (treasuryGroups.get(treasuryId)) {
//             case (null) {
//                 return "Treasury group not found.";
//             };
//             case (?group) {
//                 let updatedTriggerValues = {
//                     staking = staking;
//                     ico = ico;
//                 };
//                 treasuryGroups.put(treasuryId, { group with triggerValues = updatedTriggerValues });
//                 return "Trigger values configured successfully.";
//             };
//         };
//     };

//     // Query Treasury Details
//     public query func getTreasuryGroup(treasuryId : Text) : async ?TreasuryGroup {
//         return treasuryGroups.get(treasuryId);
//     };

//     // Query All Treasury Groups
//     public query func getAllTreasuryGroups() : async [TreasuryGroup] {
//         return Iter.toArray(treasuryGroups.vals());
//     };

//     // Create the Treasury group
//     public func createTreasury(
//         id : Text,
//         name : Text,
//         balanceUSD : Nat,
//         accountBalances : [AccountBalance],
//         collectedFees : [CollectedFee],
//         undistributedFees : [UndistributedFee],
//         stakingRewards : [StakingReward],
//     ) : async Text {
//         if (treasury != null) {
//             return "Treasury already exists.";
//         };

//         treasury := ?{
//             id = id;
//             name = name;
//             balanceUSD = balanceUSD;
//             accountBalances = accountBalances;
//             collectedFees = collectedFees;
//             undistributedFees = undistributedFees;
//             stakingRewards = stakingRewards;
//         };

//         return "Treasury created successfully.";
//     };

//     // Query the Treasury details
//     public query func getTreasuryDetails() : async ?TreasuryDetails {
//         return treasury;
//     };

//     // Add or update account balance
//     public func updateAccountBalance(
//         coin : Text,
//         balance : Nat,
//         lastWeekChange : Int,
//         lastMonthChange : Int,
//         percentageChange : Float,
//     ) : async Text {
//         switch (treasury) {
//             case (null) {
//                 return "Treasury does not exist.";
//             };
//             case (?t) {
//                 let updatedBalances = Array.map<AccountBalance, AccountBalance>(
//                     t.accountBalances,
//                     func(ab : AccountBalance) : AccountBalance {
//                         if (ab.coin == coin) {
//                             return {
//                                 coin = ab.coin;
//                                 balance = balance;
//                                 lastWeekChange = lastWeekChange;
//                                 lastMonthChange = lastMonthChange;
//                                 percentageChange = percentageChange;
//                             };
//                         };
//                         ab;
//                     },
//                 );

//                 treasury := ?{
//                     t with accountBalances = updatedBalances
//                 };
//                 return "Account balance updated successfully.";
//             };
//         };
//     };

//     // Add collected fees
//     public func addCollectedFee(
//         beneficiary : Text,
//         licenseFees : Nat,
//         transactionFees : Nat,
//     ) : async Text {
//         switch (treasury) {
//             case (null) {
//                 return "Treasury does not exist.";
//             };
//             case (?t) {
//                 let total = licenseFees + transactionFees;
//                 let newFee : CollectedFee = {
//                     beneficiary = beneficiary;
//                     licenseFees = licenseFees;
//                     transactionFees = transactionFees;
//                     total = total;
//                 };

//                 treasury := ?{
//                     t with collectedFees = Array.append(t.collectedFees, [newFee])
//                 };
//                 return "Collected fee added successfully.";
//             };
//         };
//     };

//     // Add undistributed fees
//     public func addUndistributedFee(
//         beneficiary : Text,
//         amount : Nat,
//         triggerValue : Nat,
//     ) : async Text {
//         switch (treasury) {
//             case (null) {
//                 return "Treasury does not exist.";
//             };
//             case (?t) {
//                 let newFee : UndistributedFee = {
//                     beneficiary = beneficiary;
//                     amount = amount;
//                     triggerValue = triggerValue;
//                 };

//                 treasury := ?{
//                     t with undistributedFees = Array.append(t.undistributedFees, [newFee])
//                 };
//                 return "Undistributed fee added successfully.";
//             };
//         };
//     };

//     // Add staking rewards
//     public func addStakingReward(
//         beneficiary : Text,
//         undistributedRewards : Nat,
//         tokenHolders : Nat,
//         triggerFactor : Float,
//     ) : async Text {
//         switch (treasury) {
//             case (null) {
//                 return "Treasury does not exist.";
//             };
//             case (?t) {
//                 let newReward : StakingReward = {
//                     beneficiary = beneficiary;
//                     undistributedRewards = undistributedRewards;
//                     tokenHolders = tokenHolders;
//                     triggerFactor = triggerFactor;
//                 };

//                 treasury := ?{
//                     t with stakingRewards = Array.append(t.stakingRewards, [newReward])
//                 };
//                 return "Staking reward added successfully.";
//             };
//         };
//     };

//     // Edit trigger factors for staking rewards
//     public func editStakingTriggerFactor(
//         beneficiary : Text,
//         newTriggerFactor : Float,
//     ) : async Text {
//         switch (treasury) {
//             case (null) {
//                 return "Treasury does not exist.";
//             };
//             case (?t) {
//                 let updatedRewards = Array.map<StakingReward, StakingReward>(
//                     t.stakingRewards,
//                     func(sr : StakingReward) : StakingReward {
//                         if (sr.beneficiary == beneficiary) {
//                             return {
//                                 sr with triggerFactor = newTriggerFactor
//                             };
//                         };
//                         sr;
//                     },
//                 );

//                 treasury := ?{
//                     t with stakingRewards = updatedRewards
//                 };
//                 return "Staking trigger factor updated successfully.";
//             };
//         };
//     };

//     // Edit distribution trigger values for undistributed fees
//     public func editDistributionTriggerValue(
//         beneficiary : Text,
//         newTriggerValue : Nat,
//     ) : async Text {
//         switch (treasury) {
//             case (null) {
//                 return "Treasury does not exist.";
//             };
//             case (?t) {
//                 let updatedFees = Array.map<UndistributedFee, UndistributedFee>(
//                     t.undistributedFees,
//                     func(uf : UndistributedFee) : UndistributedFee {
//                         if (uf.beneficiary == beneficiary) {
//                             return {
//                                 uf with triggerValue = newTriggerValue
//                             };
//                         };
//                         uf;
//                     },
//                 );

//                 treasury := ?{
//                     t with undistributedFees = updatedFees
//                 };
//                 return "Distribution trigger value updated successfully.";
//             };
//         };
//     };
// };

// import Principal "mo:base/Principal";
// import HashMap "mo:base/HashMap";
// import Iter "mo:base/Iter";
// import Text "mo:base/Text";
// import Array "mo:base/Array";
// import Int "mo:base/Int";
// import Time "mo:base/Time";
// import Debug "mo:base/Debug";
// import Nat "mo:base/Nat";
// import Bool "mo:base/Bool";

// actor Treasury {
//     public type TreasuryDetails = {
//         id : Text;
//         name : Text;
//         balanceUSD : Nat;
//         accountBalances : [AccountBalance];
//         collectedFees : [CollectedFee];
//         undistributedFees : [UndistributedFee];
//         stakingRewards : [StakingReward];
//     };

//     public type AccountBalance = {
//         coin : Text;
//         balance : Nat;
//         lastWeekChange : Int;
//         lastMonthChange : Int;
//         percentageChange : Float;
//     };

//     public type CollectedFee = {
//         beneficiary : Text;
//         licenseFees : Nat;
//         transactionFees : Nat;
//         total : Nat;
//     };

//     public type UndistributedFee = {
//         beneficiary : Text;
//         amount : Nat;
//         triggerValue : Nat;
//     };

//     public type StakingReward = {
//         beneficiary : Text;
//         undistributedRewards : Nat;
//         tokenHolders : Nat;
//         triggerFactor : Float;
//     };

//     public type TreasuryGroup = {
//         id : Text;
//         name : Text;
//         description : ?Text;
//         balance : Nat;
//         accounts : [Account];
//         focalPoints : [FocalPoint];
//         icoDetails : ?[ICODetail];
//         triggerFactors : TriggerFactors;
//         triggerValues : TriggerValues;
//     };

//     public type Account = {
//         id : Text;
//         name : Text;
//         coin : Text;
//         balance : Nat;
//         lastWeekChange : Nat;
//         lastMonthChange : Nat;
//     };

//     public type FocalPoint = {
//         userId : Text;
//         name : Text;
//         email : Text;
//     };

//     public type ICODetail = {
//         id : Text;
//         name : Text;
//         allocation : Nat;
//         totalRaised : Nat;
//         hardCap : Nat;
//     };

//     public type TriggerFactors = {
//         staking : Nat;
//         ico : Nat;
//     };

//     public type TriggerValues = {
//         staking : Nat;
//         ico : Nat;
//     };

//     private var treasury : ?TreasuryDetails = null;
//     private var treasuryGroups : HashMap.HashMap<Text, TreasuryGroup> = HashMap.HashMap<Text, TreasuryGroup>(0, Text.equal, Text.hash);

//     // Utility function to update or add an item in an array
//     private func updateOrAdd<T>(array : [T], predicate : (T) -> Bool, updater : (T) -> T, newItem : T) : [T] {
//         let updatedArray = Array.map<T, T>(array, func(item : T) : T {
//             if (predicate(item)) {
//                 return updater(item);
//             };
//             return item;
//         });
//         if (Array.size(updatedArray) == Array.size(array)) {
//             return Array.append(updatedArray, [newItem]);
//         };
//         return updatedArray;
//     };

//     // Create Treasury Group
//     public func createTreasuryGroup(id : Text, name : Text, description : ?Text, balance : Nat) : async Text {
//         switch (treasuryGroups.get(id)) {
//             case (null) {
//                 let newTreasuryGroup : TreasuryGroup = {
//                     id = id;
//                     name = name;
//                     description = description;
//                     balance = balance;
//                     accounts = [];
//                     focalPoints = [];
//                     icoDetails = null;
//                     triggerFactors = { staking = 0; ico = 0 };
//                     triggerValues = { staking = 0; ico = 0 };
//                 };
//                 treasuryGroups.put(id, newTreasuryGroup);
//                 return "Treasury group created successfully.";
//             };
//             case (_) { return "Treasury group already exists."; };
//         };
//     };

//     // Generic function to update Treasury Group properties
//     private func updateTreasuryGroupField<T>(
//         treasuryId : Text,
//         updater : (TreasuryGroup) -> TreasuryGroup
//     ) : async Text {
//         switch (treasuryGroups.get(treasuryId)) {
//             case (null) { return "Treasury group not found."; };
//             case (?group) {
//                 treasuryGroups.put(treasuryId, updater(group));
//                 return "Update successful.";
//             };
//         };
//     };

//     // Add Account
//     public func addAccount(
//         treasuryId : Text, accountId : Text, name : Text, coin : Text, balance : Nat, lastWeekChange : Nat, lastMonthChange : Nat
//     ) : async Text {
//         await updateTreasuryGroupField(treasuryId, func(group : TreasuryGroup) : TreasuryGroup {
//             let newAccount : Account = { id = accountId; name = name; coin = coin; balance = balance; lastWeekChange = lastWeekChange; lastMonthChange = lastMonthChange };
//             return { group with accounts = Array.append(group.accounts, [newAccount]) };
//         });
//     };

//     // Add Focal Point
//     public func addFocalPoint(treasuryId : Text, userId : Text, name : Text, email : Text) : async Text {
//         await updateTreasuryGroupField(treasuryId, func(group : TreasuryGroup) : TreasuryGroup {
//             let newFocalPoint : FocalPoint = { userId = userId; name = name; email = email };
//             return { group with focalPoints = Array.append(group.focalPoints, [newFocalPoint]) };
//         });
//     };

//     // Configure Trigger Factors
//     public func configureTriggerFactors(treasuryId : Text, staking : Nat, ico : Nat) : async Text {
//         await updateTreasuryGroupField(treasuryId, func(group : TreasuryGroup) : TreasuryGroup {
//             return { group with triggerFactors = { staking = staking; ico = ico } };
//         });
//     };

//     // Configure Trigger Values
//     public func configureTriggerValues(treasuryId : Text, staking : Nat, ico : Nat) : async Text {
//         await updateTreasuryGroupField(treasuryId, func(group : TreasuryGroup) : TreasuryGroup {
//             return { group with triggerValues = { staking = staking; ico = ico } };
//         });
//     };

//     // Query Treasury Details
//     public query func getTreasuryGroup(treasuryId : Text) : async ?TreasuryGroup {
//         return treasuryGroups.get(treasuryId);
//     };

//     // Query All Treasury Groups
//     public query func getAllTreasuryGroups() : async [TreasuryGroup] {
//         return Iter.toArray(treasuryGroups.vals());
//     };

//     // General Treasury functions
//     public func createTreasury(
//         id : Text,
//         name : Text,
//         balanceUSD : Nat,
//         accountBalances : [AccountBalance],
//         collectedFees : [CollectedFee],
//         undistributedFees : [UndistributedFee],
//         stakingRewards : [StakingReward],
//     ) : async Text {
//         if (treasury != null) {
//             return "Treasury already exists.";
//         };
//         treasury := ?{ id = id; name = name; balanceUSD = balanceUSD; accountBalances = accountBalances; collectedFees = collectedFees; undistributedFees = undistributedFees; stakingRewards = stakingRewards };
//         return "Treasury created successfully.";
//     };

//     public query func getTreasuryDetails() : async ?TreasuryDetails {
//         return treasury;
//     };
// };


import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Time "mo:base/Time";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
actor Treasury {
    public type TreasuryDetails = {
        id : Text;
        name : Text;
        balanceUSD : Nat; // Total balance in USD
        transactions : [Transaction]; // List of all transactions
        remainingBalance : Nat; // Remaining balance after all transactions
    };

    public type Transaction = {
        id : Text; // Unique transaction ID
        timestamp : Int; // Unix timestamp of the transaction
        description : Text; // Description of the transaction
        amount : Nat; // Amount involved in the transaction
        isDebit : Bool; // True if the transaction is a debit, false if credit
        balanceAfter : Nat; // Account balance after this transaction
    };

    private var treasury : ?TreasuryDetails = null;

    // Create Treasury
    public func createTreasury(id : Text, name : Text, initialBalance : Nat) : async Text {
        if (treasury != null) {
            return "Treasury already exists.";
        };

        treasury := ?{
            id = id;
            name = name;
            balanceUSD = initialBalance;
            transactions = [];
            remainingBalance = initialBalance;
        };

        return "Treasury created successfully.";
    };

    // Add Transaction
    public func addTransaction(description : Text, amount : Nat, isDebit : Bool) : async Text {
        switch (treasury) {
            case (null) {
                return "Treasury not found.";
            };
            case (?t) {
                let currentBalance = t.remainingBalance;
                let newBalance = if (isDebit) {
                    if (amount > currentBalance) {
                        return "Insufficient funds for this transaction.";
                    };
                    currentBalance - amount;
                } else {
                    currentBalance + amount;
                };

                let transaction : Transaction = {
                    id = Text.concat("txn_", Int.toText(Time.now()));
                    timestamp = Time.now();
                    description = description;
                    amount = amount;
                    isDebit = isDebit;
                    balanceAfter = newBalance;
                };

                treasury := ?{
                    t with
                    transactions = Array.append(t.transactions, [transaction]);
                    remainingBalance = newBalance;
                };

                return "Transaction added successfully.";
            };
        };
    };

    // Get Treasury Details
    public query func getTreasuryDetails() : async ?TreasuryDetails {
        return treasury;
    };

    // Get Transaction History
    public query func getTransactionHistory() : async [Transaction] {
        switch (treasury) {
            case (null) { return [] };
            case (?t) { return t.transactions };
        };
    };

    // Get Remaining Balance
    public query func getRemainingBalance() : async ?Nat {
        switch (treasury) {
            case (null) { return null };
            case (?t) { return ?t.remainingBalance };
        };
    };
};
