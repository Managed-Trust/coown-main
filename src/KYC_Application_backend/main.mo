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

actor KYC_Canister {

  public type User = {
    userId : Text;
    emailAuth : Text;
    joiningId : Text;
    email : Text;
    personalGroup : PersonalGroup;
    groups : [Group];
    otp : ?Text;
    otpExpiry : ?Int;
  };

  public type PersonalGroup = {
    groupId : Text;
    status : Text; // "Pending", "Approved by Group Admin", "Approved by COOWN Admin"
  };

  public type Group = {
    name : Text;
    adminId : Text;
    groupId : Text;
    privateGroup : Bool;
    users : [GroupUser];
    authThenticatedUsers : [Text];
  };

  public type GroupUser = {
    userId : Text;
    coOwnStatus : Bool;
    coAdminStatus : Bool;
    isRegisteredCompany : Bool;
    company : ?Company;
  };

  // to be improved
  // more details/more types need to be added
  // ecnomic owner of the funds(important)
  // when new user join what taken

  public type QualifiedEntity = {
    name : Text;
    contactPerson : Text;
    address : Text;
    mail : Text;
    phone : Text;
    website : Text;
  };
  public type Company = {
    companyDetails : {
      companyName : Text;
      registrationNumber : Text;
      legalStructure : Text;
      registeredAddress : Text;
      taxID : Text;
      ecnomicOwner : Text;
      beneficialOwner : Text;
      incorporationCertificate : Blob;
      memorandumAndArticles : Blob;
      publicLawEntity : Bool;
      entity : ?QualifiedEntity;
    };
    representativeDetails : {
      fullName : Text;
      position : Text;
      idDocumentType : Text;
      idDocumentNumber : Text;
      idDocument : Blob;
      proofOfAuthority : Blob;
      email : Text;
      phoneNumber : Text;
    };
    // to remove these fields// log need to be maintained

  };
  // invitation to email, role // auth token
  // use Internet identity aur authentication
  private stable var userEntries : [(Text, User)] = [];
  var users = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);

  private stable var groupEntries : [(Text, [Group])] = [];
  var groups = HashMap.HashMap<Text, Buffer.Buffer<Group>>(0, Text.equal, Text.hash);
  //Do user need to add details of company

  public func createUser(
    userId : Text,
    groupId : Text,
    joiningId : Text,
    email : Text

  ) : async Text {

    let newUser = {
      userId = userId;
      emailAuth = "pending";
      joiningId = joiningId;
      email = email;
      personalGroup = { groupId = groupId; status = "Pending" };
      groups = [];
      otp = null;
      otpExpiry = null;
      // groups = [defaultGroup];

    };

    users.put(userId, newUser);
    return "User created with default group.";
  };

  public func addUsersToGroup(adminUserId : Text, groupId : Text, userIds : [Text]) : async Text {
    switch (users.get(adminUserId)) {
      case (null) {
        return "Admin user does not exist.";
      };
      case (?admin) {
        switch (groups.get(groupId)) {
          case (null) {
            return "Group does not exist.";
          };
          case (?groupBuffer) {
            let groupsArray = Buffer.toArray<Group>(groupBuffer);
            var groupOwner : ?User = null;
            var targetGroup : ?Group = null;

            // Label the following block for a controlled exit with the ability to break out
            label search_group {
              for ((ownerId, user) in users.entries()) {
                for (group in user.groups.vals()) {
                  if (group.groupId == groupId) {
                    groupOwner := ?user;
                    targetGroup := ?group;
                    break search_group; // Correctly breaking out of the loop when the group is found
                  };
                };
              };
            };
            switch (targetGroup) {
              case (null) {
                return "Group is unexpectedly empty.";
              };
              case (?group) {
                if (admin.userId != group.adminId) {
                  return "Unauthorized operation. Only group admin can add users.";
                } else {
                  let updatedGroups = Array.append<Text>(group.authThenticatedUsers, userIds);
                  let updatedGroup = {
                    group with
                    authThenticatedUsers = updatedGroups
                  };

                  // Update the group in the existing buffer
                  // Clear the buffer, add the updated group, and retain any other groups
                  groupBuffer.clear();
                  for (grp in groupsArray.vals()) {
                    if (grp.groupId == groupId) {
                      groupBuffer.add(updatedGroup); // Add updated group
                    } else {
                      groupBuffer.add(grp); // Re-add other groups
                    };
                  };
                  groups.put(groupId, groupBuffer);
                
                };
              };
            };

            return "Users added successfully to the group.";
          };
        };
      };
    };
  };
  // 1 personal
  // adding new user? company details

  public func authOpt(status : Text, userId : Text) : async Text {
    if (status == "verified") {

      switch (users.get(userId)) {
        case (null) {
          return "User does not exist.";
        };
        case (?user) {
          let updatedUser : User = {
            user with emailAuth = "verified"
          };
          users.put(userId, updatedUser);
        };
      };
      return "success";
    } else {
      return "failed";
    };

  };

  public func createGroup(
    userId : Text,
    groupName : Text,
    groupId : Text,
    groupAccess : Bool,
    registerCompany : Bool,
    companyName : Text,
    registrationNumber : Text,
    legalStructure : Text,
    registeredAddress : Text,
    taxID : Text,
    incorporationCertificate : Blob,
    memorandumAndArticles : Blob,
    representativeFullName : Text,
    position : Text,
    idDocumentType : Text,
    idDocumentNumber : Text,
    idDocument : Blob,
    proofOfAuthority : Blob,
    emailRep : Text,
    phoneNumber : Text,
  ) : async Text {
    switch (users.get(userId)) {
      case (null) {
        return "User does not exist.";
      };
      case (?user) {
        var store : ?Company = null;
        if (registerCompany) {
          store := ?{
            companyDetails = {
              companyName = companyName;
              registrationNumber = registrationNumber;
              legalStructure = legalStructure;
              registeredAddress = registeredAddress;
              taxID = taxID;
              ecnomicOwner = "";
              beneficialOwner = "";
              incorporationCertificate = incorporationCertificate;
              memorandumAndArticles = memorandumAndArticles;
              publicLawEntity = false;
              entity = null;
            };
            representativeDetails = {
              fullName = representativeFullName;
              position = position;
              idDocumentType = idDocumentType;
              idDocumentNumber = idDocumentNumber;
              idDocument = idDocument;
              proofOfAuthority = proofOfAuthority;
              email = emailRep;
              phoneNumber = phoneNumber;
            };

          };
        };

        let adminUser = {
          userId = userId;
          coOwnStatus = true;
          coAdminStatus = true;
          isRegisteredCompany = registerCompany;
          company = store;
        };

        let newGroup = {
          name = groupName;
          adminId = userId;
          groupId = groupId;
          privateGroup = groupAccess;
          users = [adminUser];
          authThenticatedUsers = [];

        };

        let updatedGroups = Array.append<Group>(user.groups, [newGroup]);
        let updatedUser = {
          user with
          groups = updatedGroups
        };
        users.put(userId, updatedUser);

        var a = Buffer.Buffer<Group>(0);
        a.add(newGroup);
        groups.put(groupId, a);

        return "New group created.";
      };
    };
  };

  public func joinGroup(
    userId : Text,
    groupId : Text,
    registerCompany : Bool,
    representativeFullName : Text,
    position : Text,
    idDocumentType : Text,
    idDocumentNumber : Text,
    idDocument : Blob,
    proofOfAuthority : Blob,
    email : Text,
    phoneNumber : Text,

  ) : async Text {
    var groupOwner : ?User = null;
    var targetGroup : ?Group = null;

    // Label the following block for a controlled exit with the ability to break out
    label search_group {
      for ((ownerId, user) in users.entries()) {
        for (group in user.groups.vals()) {
          if (group.groupId == groupId) {
            groupOwner := ?user;
            targetGroup := ?group;
            break search_group; // Correctly breaking out of the loop when the group is found
          };
        };
      };
    };
    switch (targetGroup, groupOwner) {
      case (null, _) { return "Group not found." };
      case (_, null) { return "Group not found." };
      case (?group, ?owner) {
        // Proceed to add the user to the group
        if (not group.privateGroup) {
          var store : ?Company = null;
          if (registerCompany) {
            store := ?{
              companyDetails = {
                companyName = "";
                registrationNumber = "";
                legalStructure = "";
                registeredAddress = "";
                taxID = "";
                ecnomicOwner = "";
                beneficialOwner = "";
                incorporationCertificate = "";
                memorandumAndArticles = "";
                publicLawEntity = false;
                entity = null;
              };
              representativeDetails = {
                fullName = representativeFullName;
                position = position;
                idDocumentType = idDocumentType;
                idDocumentNumber = idDocumentNumber;
                idDocument = idDocument;
                proofOfAuthority = proofOfAuthority;
                email = email;
                phoneNumber = phoneNumber;
              };

            };
          };
          let newUser = {
            userId = userId;
            coOwnStatus = false;
            coAdminStatus = false;
            isRegisteredCompany = false;
            company = store;
          };
          // Add the new user to the group's user list
          let updatedUsers = Array.append(group.users, [newUser]);
          let updatedGroup = {
            group with
            users = updatedUsers
          };

          // Replace the old group with the updated group in the owner's list of groups
          let updatedGroups = Array.map(
            owner.groups,
            func(g : Group) : Group {
              if (g.groupId == groupId) {
                return updatedGroup;
              } else {
                return g;
              };
            },
          );

          // // Update the user's information in the users HashMap
          users.put(owner.userId, { owner with groups = updatedGroups });
          // groups.put(groupId, updatedGroups);
          switch (groups.get(groupId)) {
            case (?x) {

              var a = Buffer.Buffer<Group>(0);
              a.add(updatedGroup);
              groups.put(groupId, a);
            };
            case (null) {

            };
          };
          return "Joined group successfully.";

        } else {
          return "Private group";
        };
        // Proceed to add the user to the group

      };
    };
  };

  public func getUser(userId : Text) : async ?User {
    return users.get(userId);
  };
  public func getGroup(groupId : Text) : async [Group] {
    switch (groups.get(groupId)) {
      case (?x) {
        return Buffer.toArray<Group>(x);
      };
      case (null) { return [] };
    };
  };
  // OTP Generation
  public func generateOTP(userId : Text) : async Text {
    switch (users.get(userId)) {
      case (null) {
        return "User does not exist.";
      };
      case (?user) {
        let otp = await generateRandomOTP();
        let now = Time.now();

        let expiry : Int = now + (now % (5 * 60 * 1_000_000_000)); // OTP valid for 5 minutes
        let updatedUser = {
          user with
          otp = ?otp;
          otpExpiry = ?expiry;
        };
        users.put(userId, updatedUser);
        return otp;

      };
    };
  };

  public func generateRandomOTP() : async Text {
    let seed = await Random.blob();
    let finiteRandom = Random.Finite(seed);
    let randNatOpt = finiteRandom.range(255); // Generate number between 0 and 255 (Nat8)
    switch (randNatOpt) {
      case (null) {
        return "000000"; // Fallback in case of random failure
      };
      case (?randNat) {
        let rand = (randNat * 1000 + randNat) % 900000 + 100000; // Ensure it's a 6-digit number
        return Nat.toText(rand);
      };
    };
  };

  public func verifyOTP(userId : Text, otp : Text) : async Bool {
    switch (users.get(userId)) {
      case (null) {
        return false;
      };
      case (?user) {
        switch (user.otp, user.otpExpiry) {
          case (?storedOtp, ?expiry) {
            if (storedOtp == otp and Time.now() <= expiry) {
              // OTP is valid
              let updatedUser = {
                user with
                otp = null;
                otpExpiry = null;
                emailAuth = "verfified"; // Set emailAuth to true upon successful verification
              };
              users.put(userId, updatedUser);
              return true;
            } else {
              return false;
            };
          };
          case _ {
            return false;
          };
        };
      };
    };
  };
  system func preupgrade() {
    userEntries := Iter.toArray(users.entries());
    // groupEntries := Iter.toArray(groups.entries().map(func((key, buffer)) { (key, Buffer.toArray(buffer)) }));

  };
  system func postupgrade() {
    users := HashMap.fromIter<Text, User>(userEntries.vals(), 1, Text.equal, Text.hash);
    // groups := HashMap.fromIter<Text, Buffer.Buffer<Group>>(groupEntries.map(func((key, array)) { (key, Buffer.fromArray(array)) }), 1, Text.equal, Text.hash);

  };
};
