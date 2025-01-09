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

    //========================Transafer Type================================//

    public type Subaccount = Blob;
    public type Tokens = Nat;
    public type Memo = Blob;
    public type Timestamp = Nat64;
    public type Duration = Nat64;
    public type TxIndex = Nat;
    public type Account = { owner : Principal; subaccount : ?Subaccount };
    public type Result<T, E> = { #Ok : T; #Err : E };

    type Account__1 = {
        owner : Principal;
        subaccount : Blob;
    };
    public type Account__2 = { owner : Principal; subaccount : ?Subaccount };

    type TransferType = {
        from_subaccount : ?Subaccount;
        to : Account;
        amount : Tokens;
        fee : ?Tokens;
        memo : ?Memo;
        created_at_time : ?Int;
    };
    public type CommonError = {
        #InsufficientFunds : { balance : Tokens };
        #BadFee : { expected_fee : Tokens };
        #TemporarilyUnavailable;
        #GenericError : { error_code : Nat; message : Text };
    };

    public type DeduplicationError = {
        #TooOld;
        #Duplicate : { duplicate_of : TxIndex };
        #CreatedInFuture : { ledger_time : Timestamp };
    };

    public type TransferError = DeduplicationError or CommonError or {
        #BadBurn : { min_burn_amount : Tokens };
    };

    // Helper function to fetch total ICP in the liquidity pool
    public type Balance__1 = Nat;

    public func getTotalICPBalanceOfCanister() : async Nat {
        let euronActor = actor ("ryjl3-tyaaa-aaaaa-aaaba-cai") : actor {
            // icrc1_transfer : (TransferType) -> async Result<TxIndex, TransferError>;
            icrc1_balance_of : (Account__2) -> async Balance__1;
        };
        let store : Account__2 = {
            owner = Principal.fromText("speiw-5iaaa-aaaap-ahora-cai");
            subaccount = null;
        };
        let result = await euronActor.icrc1_balance_of(
            store
        );
        return result; // Example value, replace with actual call or calculation
    };

    // Define threshold limit for ICP balance
    private let thresholdLimit : Nat = 1000; // Example threshold, update as needed

    // Define recipients for ICP distribution
    type Recipient = {
        account : Account;
        percentage : Float; // Percentage of the total balance to be released
    };

    private let recipients : [Recipient] = [
        {
            account = {
                owner = Principal.fromText("recipient-1-principal");
                subaccount = null;
            };
            percentage = 50.0;
        },
        {
            account = {
                owner = Principal.fromText("recipient-2-principal");
                subaccount = null;
            };
            percentage = 30.0;
        },
        {
            account = {
                owner = Principal.fromText("recipient-3-principal");
                subaccount = null;
            };
            percentage = 20.0;
        },
    ];

    // Function to check and release ICP
    public func releaseICPIfThresholdMet() : async Text {
        // Fetch the current ICP balance of the canister
        let currentBalance = await getTotalICPBalanceOfCanister();

        if (currentBalance >= thresholdLimit) {
            Debug.print("Threshold met. Releasing funds...");

            // Calculate 50% for Foundation and 50% for Staking Holders
            let foundationAmount = currentBalance / 2;
            let stakingAmount = currentBalance / 2;

            // Example accounts for Foundation and Staking Holders
            let foundationAccount : Account = {
                owner = Principal.fromText("foundation-principal-id");
                subaccount = null;
            };

            let stakingAccount : Account = {
                owner = Principal.fromText("staking-principal-id");
                subaccount = null;
            };

            // Distribute to Foundation
            let foundationTransferResult = await performICPTransfer(foundationAccount, foundationAmount);
            switch foundationTransferResult {
                case (#Ok(_)) {
                    // Debug.print("Transfer successful to Foundation: " # Principal.toText(foundationAccount.owner) # " Amount: " # Nat.toText(foundationAmount));
                };
                case (#Err(err)) {
                    // Debug.print("Transfer failed to Foundation: " # Principal.toText(foundationAccount.owner) # " Error: " # Debug.show(err));
                };
            };

            // Distribute to Staking Holders
            let stakingTransferResult = await performICPTransfer(stakingAccount, stakingAmount);
            switch stakingTransferResult {
                case (#Ok(_)) {
                    // Debug.print("Transfer successful to Staking Holders: " # Principal.toText(stakingAccount.owner) # " Amount: " # Nat.toText(stakingAmount));
                };
                case (#Err(err)) {
                    // Debug.print("Transfer failed to Staking Holders: " # Principal.toText(stakingAccount.owner) # " Error: " # Debug.show(err));
                };
            };

            return "Funds released successfully.";
        } else {
            return "Threshold not met. Current balance: " # Nat.toText(currentBalance);
        };
    };

    // Helper function to perform ICP transfer
    private func performICPTransfer(to : Account, amount : Nat) : async Result<TxIndex, TransferError> {
        let euronActor = actor ("ryjl3-tyaaa-aaaaa-aaaba-cai") : actor {
            icrc1_transfer : (TransferType) -> async Result<TxIndex, TransferError>;
        };

        let transferDetails : TransferType = {
            from_subaccount = null;
            to = to;
            amount = amount;
            fee = ?10_000; // Example fee, update as needed
            memo = null;
            created_at_time = ?Time.now();
        };

        return await euronActor.icrc1_transfer(transferDetails);
    };
    //=================================================================================
    private var auditLog : [Text] = [];

    public func getAuditLog() : async [Text] {
        return auditLog;
    };

    private func logAction(action : Text) : async () {
        auditLog := Array.append(auditLog, [action]);
    };

    public func setThresholdLimit(newLimit : Nat) : async Text {
        thresholdLimit := newLimit;
        await logAction("Threshold limit updated to " # Nat.toText(newLimit));
        return "Threshold limit updated successfully.";
    };

    public func addRecipient(principal : Principal, percentage : Float) : async Text {
        recipients := Array.append(
            recipients,
            [{
                account = { owner = principal; subaccount = null };
                percentage = percentage;
            }],
        );
        await logAction("Recipient added: " # Principal.toText(principal) # " with " # Float.toText(percentage) # "% allocation.");
        return "Recipient added successfully.";
    };

    public func updateRecipient(principal : Principal, newPercentage : Float) : async Text {
        let updatedRecipients = Iter.map(
            recipients.vals(),
            func(recipient) {
                if (recipient.account.owner == principal) {
                    { account = recipient.account; percentage = newPercentage };
                } else {
                    recipient;
                };
            },
        );
        recipients := Array.fromIter(updatedRecipients);
        await logAction("Recipient updated: " # Principal.toText(principal) # " with new " # Float.toText(newPercentage) # "% allocation.");
        return "Recipient updated successfully.";
    };

    public func reconcileBalance() : async Text {
        let actualBalance = await getTotalICPBalanceOfCanister();
        switch treasury {
            case (null) {
                return "Treasury not found.";
            };
            case (?t) {
                treasury := ?{ t with balanceUSD = actualBalance };
                await logAction("Treasury balance reconciled to " # Nat.toText(actualBalance) # ".");
                return "Treasury balance reconciled successfully.";
            };
        };
    };

    public func transferBetweenAccounts(
        from : Account,
        to : Account,
        amount : Nat,
    ) : async Text {
        let transferResult = await performICPTransfer(to, amount);
        switch transferResult {
            case (#Ok(_)) {
                await logAction(
                    "Transfer successful from " # Principal.toText(from.owner) #
                    " to " # Principal.toText(to.owner) #
                    " Amount: " # Nat.toText(amount)
                );
                return "Transfer successful.";
            };
            case (#Err(err)) {
                return "Transfer failed: " # Debug.show(err);
            };
        };
    };

    private var lockedFunds : Nat = 0;

    public func lockFunds(amount : Nat) : async Text {
        if (amount > thresholdLimit) {
            return "Cannot lock more than the available balance.";
        };
        lockedFunds := lockedFunds + amount;
        await logAction("Locked funds: " # Nat.toText(amount));
        return "Funds locked successfully.";
    };

    public func unlockFunds(amount : Nat) : async Text {
        if (amount > lockedFunds) {
            return "Cannot unlock more than locked funds.";
        };
        lockedFunds := lockedFunds - amount;
        await logAction("Unlocked funds: " # Nat.toText(amount));
        return "Funds unlocked successfully.";
    };

    public query func generateReport() : async Text {
        switch treasury {
            case (null) {
                return "No treasury found.";
            };
            case (?t) {
                let transactionCount = Array.size(t.transactions);
                let report = "Treasury Report:\n" #
                "Name: " # t.name # "\n" #
                "Total Balance (USD): " # Nat.toText(t.balanceUSD) # "\n" #
                "Remaining Balance: " # Nat.toText(t.remainingBalance) # "\n" #
                "Locked Funds: " # Nat.toText(lockedFunds) # "\n" #
                "Number of Transactions: " # Int.toText(transactionCount) # "\n";

                return report;
            };
        };
    };

    public func cancelTransaction(transactionId : Text) : async Text {
        switch treasury {
            case (null) {
                return "Treasury not found.";
            };
            case (?t) {
                let (updatedTransactions, reversedTransaction) = Iter.fold(
                    t.transactions.vals(),
                    ([], null),
                    func((acc, found), tx) {
                        if (tx.id == transactionId) {
                            let reverseAmount = if (tx.isDebit) tx.amount else -tx.amount;
                            treasury := ?{
                                t with
                                remainingBalance = t.remainingBalance + reverseAmount;
                            };
                            (acc, ?tx);
                        } else {
                            (Array.append(acc, [tx]), found);
                        };
                    },
                );

                treasury := ?{ t with transactions = updatedTransactions };

                switch reversedTransaction {
                    case (null) {
                        return "Transaction not found.";
                    };
                    case (?tx) {
                        await logAction("Transaction cancelled: " # tx.id);
                        return "Transaction cancelled successfully.";
                    };
                };
            };
        };
    };

    public query func getLockedFunds() : async Nat {
        return lockedFunds;
    };

};
