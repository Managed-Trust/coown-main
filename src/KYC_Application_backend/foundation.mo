import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";

actor AdminSystem {

  type SuperAdmin = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    since : Int;
  };
  type Policy = {
    documentName : Text;
    owner : Text;
    applicability : Text;
    draft : Text;
    archive : Text;
    original : Text;
    operatorAcceptance : [Text];
  };

  type SpecialEconomicZone = {
    name : Text;
    description : Text;
    relatedCountry : Text;
    likeCountriesAbove : Text; // To include "like countries above" relationship from the screenshot
  };

  type Sanction = {
    id : Nat;
    sanctionName : Text;
    assetType : Text;
    applicability : Text;
    bCountry : Text;
    rCountry : Text;
    rIndustry : Text;
    amountRange : Text;
    operatorAcceptance : [Text];
    technicalValidation : Text; // e.g., "Can we technically prevent this?"
  };

  type Marketplace = {
    description : Text;
    manager : Text;
    url : Text;
    features : [Feature];
  };

  type Feature = {
    name : Text;
    priceMaker : Text;
    reach : Text;
    trustLevel : Text;
    operatorAcceptance : Text;
    certified : ?Bool; // Add if necessary based on NFT types
    relatedTrustLevel : ?Text; // Add if required
  };

  type TransactionRule = {
    id : Nat;
    name : Text;
    assetType : Text;
    region : Text;
    minAmount : Int;
    feePercentage : Float;
    feeCap : Int;
  };

  type Committee = {
    name : Text;
    description : Text;
    members : [CommitteeMember];
    parentCommittee : ?Text; // Optional field for hierarchy
    subCommittees : [Text]; // List of sub-committee names
  };

  type CommitteeMember = {
    id : Nat;
    role : Text;
    name : Text;
    contact : Text;
    amountOfCoins : Nat;
    website1 : Text;
    website2 : Text;
    principalPlaceOfBusiness : Text;
    since : Int;
  };

  type Country = {
    name : Text;
    isoCode : Text;
    specialEconomicZone : Text;
    transactionVolume : Nat;
    acceptsCryptoWithoutKYC : Bool;
    acceptsCryptoWithKYC : Bool;
    acceptsForeignCasinos : Bool;
    issuesCASPs : Bool;
    bannedCrypto : Bool;
  };

  type Operator = {
    id : Nat;
    groupName : Text;
    owner : Text;
    staff : Nat;
    balance : Nat;
    totalRevenue : Nat;
    licensedIn : [Text];
    nonExclusiveAreas : [Text];
    exclusiveAreas : [Text];
    since : Int;
    supportTickets : [Text]; // Add if necessary
  };

  type OperatorGroup = {
    groupId : Nat;
    description : Text;
    ownerDetails : Text;
  };

  type ContinuityUser = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    since : Int;
  };

  // Type definitions for Partners, UTOPIA configurations, and Subnets
  type Privileges = {
    manageSystem : Bool;
    countryConfiguration : Bool;
    nomination : Bool;
    feeConfiguration : Bool;
    hosting : Text; // Add specific hosting descriptions if needed
    treasuryManagement : Bool; // For Treasury partners
    changeManagement : Bool; // For IT Developer partners
  };

  type Partner = {
    id : Nat;
    groupName : Text;
    owner : Text;
    staff : Nat;
    balance : Nat;
    totalRevenue : Nat;
    licensedIn : [Text];
    exclusiveAreas : [Text];
    since : Int;
    privileges : Privileges;
  };

  type Subnet = {
    id : Nat;
    utopiaName : Text;
    license : Bool;
    partiallyOpen : Bool;
    superAdminName : Text;
    foundation : Text;
    treasury : Text;
    technician : Text;
    operator : Text;
    clientSince : Text;
    renewalDueDate : Text;
    operationalConfig : ?Text; // Add if required
  };

  type PartialUtopiaConfig = {
    id : Nat;
    utopiaName : Text;
    allowed : Bool;
    customCode : Bool;
    foundation : Bool;
    treasury : Bool;
    developer : Bool;
    operator : Bool;
    partners : Bool;
    admin : Bool;
    customerSupport : Bool;
  };

  type InnerCircle = {
    id : Nat;
    groupName : Text;
    description : Text;
    details : Text;
    since : Text;
  };

  type Announcement = {
    id : Nat;
    message : Text;
    date : Text;
  };

  //================================

  type FeeAllocation = {
    id : Nat;
    starName : Text;
    assetType : Text;
    sAreas : Text;
    rIndustry : Text;
    amountRange : Text;
    feePercentage : Float;
    feeCap : Int;
    treasuryAccrual : Float;
    staking : Float;
    funding : Float;
    icpFeePercentage : Float; // Add this field
    thirdPartySoftware : Text; // Add this field
    starWeekly : Text; // Add this field
    operatorAcceptance : [Text];
  };

  var feeAllocations : [FeeAllocation] = [];

  public func addFeeAllocation(newAllocation : FeeAllocation) : async () {
    feeAllocations := Array.append<FeeAllocation>(feeAllocations, [newAllocation]);
  };

  public func listFeeAllocations() : async [FeeAllocation] {
    return feeAllocations;
  };

  type Activity = {
    id : Nat;
    action : Text; // e.g., "Created", "Updated", "Reviewed"
    entityType : Text; // e.g., "Sanction", "Partner", "Country"
    timestamp : Int;
    details : Text; // Include specifics about the action
  };

  var activities : [Activity] = [];

  public func addActivity(newActivity : Activity) : async () {
    activities := Array.append<Activity>(activities, [newActivity]);
  };

  public func listActivities() : async [Activity] {
    return activities;
  };

  type SupportTicket = {
    id : Nat;
    description : Text;
    status : Text;
    assignedTo : Text;
  };

  var supportTickets : [SupportTicket] = [];

  public func addSupportTicket(newTicket : SupportTicket) : async () {
    supportTickets := Array.append<SupportTicket>(supportTickets, [newTicket]);
  };

  public func listSupportTickets() : async [SupportTicket] {
    return supportTickets;
  };

  public func updateAnnouncement(id : Nat, updatedAnnouncement : Announcement) : async Bool {
    let index = Array.indexOf<Announcement>(
      updatedAnnouncement,
      announcements,
      func(ann1 : Announcement, ann2 : Announcement) : Bool {
        ann1.id == ann2.id;
      },
    );

    switch (index) {
      case (?idx) {
        let mutableAnnouncements : [var Announcement] = Array.thaw(announcements);
        mutableAnnouncements[idx] := updatedAnnouncement;
        announcements := Array.freeze<Announcement>(mutableAnnouncements);
        return true;
      };
      case null {
        return false; // Announcement not found
      };
    };
  };

  type ManagementSystem = {
    id : Nat;
    description : Text;
    link : Text;
    details : Text; // Additional back-office management info
    responsibleEntities : [Text]; // e.g., "Foundation", "Treasury"
  };

  type AffiliateGroup = {
    groupName : Text;
    totalMembers : Nat;
    function : Text;
    since : Text;
    description : Text;
    level : Int; // Hierarchical level
    parentGroup : ?Text; // Parent group, if applicable
    subGroups : [Text]; // List of sub-group names
    editPermissions : Bool; // If the group can be edited
  };

  public func updateAffiliateGroup(name : Text, updatedGroup : AffiliateGroup) : async Bool {
    let index = Array.indexOf<AffiliateGroup>(
      updatedGroup,
      affiliateGroups,
      func(group1 : AffiliateGroup, group2 : AffiliateGroup) : Bool {
        group1.groupName == group2.groupName;
      },
    );

    switch (index) {
      case (?idx) {
        let mutableGroups : [var AffiliateGroup] = Array.thaw(affiliateGroups);
        mutableGroups[idx] := updatedGroup;
        affiliateGroups := Array.freeze<AffiliateGroup>(mutableGroups);
        return true;
      };
      case null {
        return false; // Group not found
      };
    };
  };

  var superAdmins : [SuperAdmin] = [];
  var policies : [Policy] = [];
  var countries : [Country] = [];
  var specialEconomicZones : [SpecialEconomicZone] = [];
  var sanctions : [Sanction] = [];
  var operators : [Operator] = [];
  var operatorGroups : [OperatorGroup] = [];
  var marketplaces : [Marketplace] = [];
  var transactionRules : [TransactionRule] = [];
  var committees : [Committee] = [];
  var continuityUsers : [ContinuityUser] = [];
  var partners : [Partner] = [];
  var subnets : [Subnet] = [];
  var partialConfigs : [PartialUtopiaConfig] = [];
  var managementSystems : [ManagementSystem] = [];
  var innerCircles : [InnerCircle] = [];
  var affiliateGroups : [AffiliateGroup] = [];
  var announcements : [Announcement] = [];

  // public func addSuperAdmin(newAdmin : SuperAdmin) : () {
  //   superAdmins := Array.append<SuperAdmin>(superAdmins, [newAdmin]);
  // };

  // Enhanced addSuperAdmin function with validation and error handling
  public func addSuperAdmin(newAdmin : SuperAdmin) : async Bool {
    if (Array.find<SuperAdmin>(superAdmins, func(admin) { admin.id == newAdmin.id }) != null) {
      return false; // SuperAdmin already exists
    };
    superAdmins := Array.append<SuperAdmin>(superAdmins, [newAdmin]);
    return true;
  };

  // public func updateSuperAdmin(id : Nat, updatedAdmin : SuperAdmin) : async Bool {
  //   // Find the index of the super admin with the given id
  //   let index = Array.indexOf<SuperAdmin>(
  //     updatedAdmin,
  //     superAdmins,
  //     func(admin1 : SuperAdmin, admin2 : SuperAdmin) : Bool {
  //       admin1.id == admin2.id;
  //     },
  //   );

  //   switch (index) {
  //     case (?idx) {
  //       // Remove the existing element at the found index
  //       superAdmins := Array.append<SuperAdmin>(
  //         Array.subArray<SuperAdmin>(superAdmins, 0, idx),
  //         Array.subArray<SuperAdmin>(superAdmins, idx + 1, Array.size(superAdmins)),
  //       );

  //       // Insert the updated element back at the same position
  //       superAdmins := Array.append<SuperAdmin>(
  //         Array.subArray<SuperAdmin>(superAdmins, 0, idx),
  //         [updatedAdmin],
  //       );

  //       superAdmins := Array.append<SuperAdmin>(
  //         superAdmins,
  //         Array.subArray<SuperAdmin>(superAdmins, idx, Array.size(superAdmins)),
  //       );

  //       return true;
  //     };
  //     case null {
  //       return false; // SuperAdmin not found
  //     };
  //   };
  // };

  public func updateSuperAdmin(id : Nat, updatedAdmin : SuperAdmin) : async Bool {
    // Find the index of the super admin with the given id
    let index = Array.indexOf<SuperAdmin>(
      updatedAdmin,
      superAdmins,
      func(admin1 : SuperAdmin, admin2 : SuperAdmin) : Bool {
        admin1.id == admin2.id;
      },
    );

    switch (index) {
      case (?idx) {
        let mutableAdmins : [var SuperAdmin] = Array.thaw(superAdmins);
        mutableAdmins[idx] := updatedAdmin;
        superAdmins := Array.freeze<SuperAdmin>(mutableAdmins);
        return true;
      };
      case null {
        return false; // SuperAdmin not found
      };
    };
  };

  private func findIndex<T>(array : [T], predicate : (T) -> Bool) : ?Nat {
    for (i in Iter.range(0, Array.size(array) - 1)) {
      if (predicate(array[i])) {
        return ?i;
      };
    };
    return null;
  };

  public func updatePolicy(documentName : Text, updatedPolicy : Policy) : async Bool {
    // Find the policy by document name first
    let targetPolicy = Array.find<Policy>(policies, func(policy) { policy.documentName == documentName });

    switch (targetPolicy) {
      case (?foundPolicy) {
        // Use the found policy as the target element in indexOf
        let index = Array.indexOf<Policy>(
          foundPolicy,
          policies,
          func(policy1 : Policy, policy2 : Policy) : Bool {
            policy1.documentName == policy2.documentName;
          },
        );

        switch (index) {
          case (?idx) {
            // Make the policies array mutable to update
            let mutablePolicies : [var Policy] = Array.thaw(policies);
            mutablePolicies[idx] := updatedPolicy;
            // Freeze it back to an immutable array
            policies := Array.freeze<Policy>(mutablePolicies);
            return true;
          };
          case null {
            return false; // This should not happen if foundPolicy exists
          };
        };
      };
      case null {
        return false; // Policy not found
      };
    };
  };

  public func deleteSuperAdmin(id : Nat) : async Bool {
    let initialLength = Array.size(superAdmins);
    superAdmins := Array.filter<SuperAdmin>(superAdmins, func(admin) { admin.id != id });
    return initialLength != Array.size(superAdmins); // Return true if deletion occurred
  };

  public func listSuperAdmins() : async [SuperAdmin] {
    return superAdmins;
  };

  public func addPolicy(newPolicy : Policy) : () {
    policies := Array.append<Policy>(policies, [newPolicy]);
  };

  public func listPolicies() : async [Policy] {
    return policies;
  };

  public query func findSuperAdminById(id : Nat) : async ?SuperAdmin {
    return Array.find<SuperAdmin>(superAdmins, func(admin) { admin.id == id });
  };

  public query func findPolicyByName(name : Text) : async ?Policy {
    return Array.find<Policy>(policies, func(policy) { policy.documentName == name });
  };

  public func addCountry(newCountry : Country) : () {
    countries := Array.append<Country>(countries, [newCountry]);
  };

  public func updateCountry(name : Text, updatedCountry : Country) : async Bool {
    let targetCountry = Array.find<Country>(countries, func(country) { country.name == name });

    switch (targetCountry) {
      case (?foundCountry) {
        let index = Array.indexOf<Country>(
          foundCountry,
          countries,
          func(country1 : Country, country2 : Country) : Bool {
            country1.name == country2.name;
          },
        );

        switch (index) {
          case (?idx) {
            let mutableCountries : [var Country] = Array.thaw(countries);
            mutableCountries[idx] := updatedCountry;
            countries := Array.freeze<Country>(mutableCountries);
            return true;
          };
          case null {
            return false; // Should not happen if foundCountry exists
          };
        };
      };
      case null {
        return false; // Country not found
      };
    };
  };

  public func listCountries() : async [Country] {
    return countries;
  };

  public func addSpecialEconomicZone(newZone : SpecialEconomicZone) : () {
    specialEconomicZones := Array.append<SpecialEconomicZone>(specialEconomicZones, [newZone]);
  };

  public func listSpecialEconomicZones() : async [SpecialEconomicZone] {
    return specialEconomicZones;
  };

  public func updateSpecialEconomicZone(name : Text, updatedZone : SpecialEconomicZone) : async Bool {
    let targetZone = Array.find<SpecialEconomicZone>(specialEconomicZones, func(zone) { zone.name == name });

    switch (targetZone) {
      case (?foundZone) {
        let index = Array.indexOf<SpecialEconomicZone>(
          foundZone,
          specialEconomicZones,
          func(zone1 : SpecialEconomicZone, zone2 : SpecialEconomicZone) : Bool {
            zone1.name == zone2.name;
          },
        );

        switch (index) {
          case (?idx) {
            let mutableZones : [var SpecialEconomicZone] = Array.thaw(specialEconomicZones);
            mutableZones[idx] := updatedZone;
            specialEconomicZones := Array.freeze<SpecialEconomicZone>(mutableZones);
            return true;
          };
          case null {
            return false; // Should not happen if foundZone exists
          };
        };
      };
      case null {
        return false; // Special Economic Zone not found
      };
    };
  };

  public func addSanction(newSanction : Sanction) : () {
    sanctions := Array.append<Sanction>(sanctions, [newSanction]);
  };

  public func updateSanction(id : Nat, updatedSanction : Sanction) : async Bool {
    let targetSanction = Array.find<Sanction>(sanctions, func(sanction) { sanction.id == id });

    switch (targetSanction) {
      case (?foundSanction) {
        let index = Array.indexOf<Sanction>(
          foundSanction,
          sanctions,
          func(sanction1 : Sanction, sanction2 : Sanction) : Bool {
            sanction1.id == sanction2.id;
          },
        );

        switch (index) {
          case (?idx) {
            let mutableSanctions : [var Sanction] = Array.thaw(sanctions);
            mutableSanctions[idx] := updatedSanction;
            sanctions := Array.freeze<Sanction>(mutableSanctions);
            return true;
          };
          case null {
            return false; // Should not happen if foundSanction exists
          };
        };
      };
      case null {
        return false; // Sanction not found
      };
    };
  };

  public func listSanctions() : async [Sanction] {
    return sanctions;
  };

  public func addOperator(newOperator : Operator) : () {
    operators := Array.append<Operator>(operators, [newOperator]);
  };

  public func listOperators() : async [Operator] {
    return operators;
  };

  public func addOperatorGroup(newGroup : OperatorGroup) : () {
    operatorGroups := Array.append<OperatorGroup>(operatorGroups, [newGroup]);
  };

  public func listOperatorGroups() : async [OperatorGroup] {
    return operatorGroups;
  };

  public query func findOperatorById(id : Nat) : async ?Operator {
    return Array.find<Operator>(operators, func(op) { op.id == id });
  };

  public query func findOperatorGroupById(id : Nat) : async ?OperatorGroup {
    return Array.find<OperatorGroup>(operatorGroups, func(group) { group.groupId == id });
  };

  public query func findSanctionById(id : Nat) : async ?Sanction {
    return Array.find<Sanction>(sanctions, func(sanc) { sanc.id == id });
  };

  public func addMarketplace(newMarketplace : Marketplace) : () {
    marketplaces := Array.append<Marketplace>(marketplaces, [newMarketplace]);
  };

  public func addTransactionRule(newRule : TransactionRule) : () {
    transactionRules := Array.append<TransactionRule>(transactionRules, [newRule]);
  };

  public func addCommittee(newCommittee : Committee) : () {
    committees := Array.append<Committee>(committees, [newCommittee]);
  };

  public func listMarketplaces() : async [Marketplace] {
    return marketplaces;
  };

  public func listTransactionRules() : async [TransactionRule] {
    return transactionRules;
  };

  public func listCommittees() : async [Committee] {
    return committees;
  };

  public query func findMarketplaceByDescription(description : Text) : async ?Marketplace {
    return Array.find<Marketplace>(marketplaces, func(m) { m.description == description });
  };

  public query func findTransactionRuleById(id : Nat) : async ?TransactionRule {
    return Array.find<TransactionRule>(transactionRules, func(rule) { rule.id == id });
  };

  public query func findCommitteeByName(name : Text) : async ?Committee {
    return Array.find<Committee>(committees, func(committee) { committee.name == name });
  };

  public func addContinuityUser(newUser : ContinuityUser) : async () {
    continuityUsers := Array.append<ContinuityUser>(continuityUsers, [newUser]);
  };

  public func listContinuityUsers() : async [ContinuityUser] {
    return continuityUsers;
  };

  // Functions for managing Partners
  public func addPartner(newPartner : Partner) : async () {
    partners := Array.append<Partner>(partners, [newPartner]);
  };

  public func listPartners() : async [Partner] {
    return partners;
  };

  // Functions for managing Subnets
  public func addSubnet(newSubnet : Subnet) : async () {
    subnets := Array.append<Subnet>(subnets, [newSubnet]);
  };

  public func listSubnets() : async [Subnet] {
    return subnets;
  };

  // Functions for managing Partial UTOPIA Configurations
  public func addPartialUtopiaConfig(newConfig : PartialUtopiaConfig) : async () {
    partialConfigs := Array.append<PartialUtopiaConfig>(partialConfigs, [newConfig]);
  };

  public func listPartialUtopiaConfigs() : async [PartialUtopiaConfig] {
    return partialConfigs;
  };
  // Function to add a new management system entry
  public func addManagementSystem(newSystem : ManagementSystem) : async () {
    managementSystems := Array.append<ManagementSystem>(managementSystems, [newSystem]);
  };

  // Function to list all management systems
  public func listManagementSystems() : async [ManagementSystem] {
    return managementSystems;
  };

  // Function to add a new inner circle entry
  public func addInnerCircle(newCircle : InnerCircle) : async () {
    innerCircles := Array.append<InnerCircle>(innerCircles, [newCircle]);
  };

  // Function to list all inner circles
  public func listInnerCircles() : async [InnerCircle] {
    return innerCircles;
  };

  // Function to add a new affiliate group
  public func addAffiliateGroup(newGroup : AffiliateGroup) : async () {
    affiliateGroups := Array.append<AffiliateGroup>(affiliateGroups, [newGroup]);
  };

  // Function to list all affiliate groups
  public func listAffiliateGroups() : async [AffiliateGroup] {
    return affiliateGroups;
  };

  // Function to add a new announcement
  public func addAnnouncement(newAnnouncement : Announcement) : async () {
    announcements := Array.append<Announcement>(announcements, [newAnnouncement]);
  };

  // Function to list all announcements
  public func listAnnouncements() : async [Announcement] {
    return announcements;
  };

  // Function to find an inner circle by name
  public query func findInnerCircleByName(name : Text) : async ?InnerCircle {
    return Array.find<InnerCircle>(innerCircles, func(circle) { circle.groupName == name });
  };

  // Function to find an affiliate group by name
  public query func findAffiliateGroupByName(name : Text) : async ?AffiliateGroup {
    return Array.find<AffiliateGroup>(affiliateGroups, func(group) { group.groupName == name });
  };

  // Function to delete a policy by document name
  public func deletePolicy(documentName : Text) : async Bool {
    let initialLength = Array.size(policies);
    policies := Array.filter<Policy>(policies, func(policy) { policy.documentName != documentName });
    return initialLength != Array.size(policies); // Return true if deletion occurred
  };

  public func updateSupportTicket(id : Nat, updatedTicket : SupportTicket) : async Bool {
    let index = Array.indexOf<SupportTicket>(
      updatedTicket,
      supportTickets,
      func(ticket1 : SupportTicket, ticket2 : SupportTicket) : Bool {
        ticket1.id == ticket2.id;
      },
    );

    switch (index) {
      case (?idx) {
        let mutableTickets : [var SupportTicket] = Array.thaw(supportTickets);
        mutableTickets[idx] := updatedTicket;
        supportTickets := Array.freeze<SupportTicket>(mutableTickets);
        return true;
      };
      case null {
        return false; // SupportTicket not found
      };
    };
  };

};
