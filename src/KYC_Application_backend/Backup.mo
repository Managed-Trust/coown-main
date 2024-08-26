// Define the types corresponding to different organizational roles
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Error "mo:base/Error";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Float "mo:base/Float";
import ExperimentalStableMemory "mo:base/ExperimentalStableMemory";
import StableMemory "mo:base/ExperimentalStableMemory";
import Random "mo:base/Random";

// Extend the existing actor with functionality for these types

actor class OrganizationManager() {
    var treasury : ?Treasury = null;
    var foundation : ?Foundation = null;
    var regionalOperators : ?RegionalOperators = null;
    var itDevelopers : ?ITDevelopers = null;

    type Treasury = {
        owner : Principal;
        admin : Principal;
        basicUserGroup : [Principal];
        initialTokenSupply : Nat;
    };

    type Foundation = {
        superAdmin : Principal;
        superAdminNo2 : Principal;
        streamingCommittee : [Principal];
        executiveCommittee : [Principal];
        basicUserGroup : [Principal];
        groupOwner : Principal;
        groupAdmin : Principal;
    };

    type RegionalOperators = {
        owner : Principal;
        admin : Principal;
        basicUserGroup : [Principal];
        amlOffice : [Principal];
        crmOffice : [Principal];
        firstLevelSupportTickets : [Principal];
    };

    type ITDevelopers = {
        owner : Principal;
        admin : Principal;
        basicUserGroup : [Principal];
        nftMintingCustomSeries : Text; // or another appropriate type
        secondLevelSupportTickets : [Principal];
    };

    // Treasury Functions
    public func createTreasury(owner : Principal, admin : Principal, initialTokenSupply : Nat) : async Text {
        if (treasury != null) {
            return "Treasury already exists.";
        };
        treasury := ?{
            owner = owner;
            admin = admin;
            basicUserGroup = [];
            initialTokenSupply = initialTokenSupply;
        };
        return "Treasury created successfully.";
    };

    // Foundation Functions
    public func createFoundation(superAdmin : Principal, superAdminNo2 : Principal, groupOwner : Principal, groupAdmin : Principal) : async Text {
        if (foundation != null) {
            return "Foundation already exists.";
        };
        foundation := ?{
            superAdmin = superAdmin;
            superAdminNo2 = superAdminNo2;
            streamingCommittee = [];
            executiveCommittee = [];
            basicUserGroup = [];
            groupOwner = groupOwner;
            groupAdmin = groupAdmin;
        };
        return "Foundation created successfully.";
    };

    // Regional Operators Functions
    public func createRegionalOperators(owner : Principal, admin : Principal) : async Text {
        if (regionalOperators != null) {
            return "Regional Operators already exist.";
        };
        regionalOperators := ?{
            owner = owner;
            admin = admin;
            basicUserGroup = [];
            amlOffice = [];
            crmOffice = [];
            firstLevelSupportTickets = [];
        };
        return "Regional Operators created successfully.";
    };

    // IT Developers Functions
    public func createITDevelopers(owner : Principal, admin : Principal, nftMintingCustomSeries : Text) : async Text {
        if (itDevelopers != null) {
            return "IT Developers already exist.";
        };
        itDevelopers := ?{
            owner = owner;
            admin = admin;
            basicUserGroup = [];
            nftMintingCustomSeries = nftMintingCustomSeries;
            secondLevelSupportTickets = [];
        };
        return "IT Developers created successfully.";
    };

    // Additional functions for managing groups, adding users, and handling specific group operations
    public func addUserToTreasury(userId : Principal) : async Text {
        switch (treasury) {
            case (null) { return "Treasury not found." };
            case (?t) {
                treasury := ?{
                    t with basicUserGroup = Array.append(t.basicUserGroup, [userId])
                };
                return "User added to Treasury.";
            };
        };
    };

    // Similarly, implement addUser, manage operations for Foundation, Regional Operators, and IT Developers

    public query func getOrganizationDetails() : async (Option<Treasury>, Option<Foundation>, Option<RegionalOperators>, Option<ITDevelopers>) {
        return (treasury, foundation, regionalOperators, itDevelopers);
    };
};
