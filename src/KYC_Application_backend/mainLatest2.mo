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

  type Customer = {
    id : Text;
    given_name : Text;
    family_name : Text;
    birth_date : Text;
    birth_country : Text;
    phone : Text;
    resident_address : Text;
    resident_country : Text;
    document_type : Text;
    citizenship : [Text];
    document_number : Text;
    issuing_country : Text;
    issuance_date : Text;
    expiry_date : Text;
    residency_doc : ?Text;
    document_photo : ?Text; // Optional Blob for document photo
    live_photo : ?Text; // Optional Blob for live verification photo
    document_verified : Bool; // Boolean to track if the document has been verified
    identity_verified : Bool; // Boolean to track if the identity has been verified
    verified : Bool;
    role : Text;
  };

  public func addBasicInfoCustomer(
    id : Text,
    family_name : Text,
    given_name : Text,
    birth_date : Text, // ISO format
    birth_country : Text,
    phone : Text,
  ) : async Text {
    // Checking if the user exists and is verified
    switch (users.get(id)) {
      case (null) {
        return "User not verified";
      };
      case (?user) {
        if (user.emailAuth == "verified") {
          // Checking if the customer already exists in the system
          switch (map.get(id)) {
            case (null) {
              // Create a new customer record if all necessary data is provided
              if (phone == "") {
                return "Phone number cannot be empty.";
              };
              let newCustomer : Customer = {
                id = id;
                family_name = family_name;
                given_name = given_name;
                birth_date = birth_date;
                birth_country = birth_country;
                phone = phone;
                resident_address = ""; // Assume default or null since not provided
                resident_country = ""; // Assuming `residency` corresponds to this field
                document_type = ""; // Default or null if not provided
                citizenship = [];
                document_number = ""; // Default or null if not provided
                issuing_country = ""; // Default or null if not provided
                issuance_date = ""; // Default or null if not provided
                expiry_date = ""; // Default or null if not provided
                residency_doc = null;
                document_photo = null;
                live_photo = null;
                document_verified = false;
                identity_verified = false;
                verified = false;
                role = "";
              };
              map.put(id, newCustomer);
              return "Success";
            };
            case (?existingCustomer) {
              return "Customer with this ID already exists.";
            };
          };
        } else {
          return "Email not verified.";
        };
      };
    };
  };

  private stable var mapEntries : [(Text, Customer)] = [];
  var map = HashMap.HashMap<Text, Customer>(0, Text.equal, Text.hash);

  private stable var userEntries : [(Text, User)] = [];
  var users = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);
  //==================================================================================

  // Check if user is available
  public func getUser(userId : Text) : async ?User {
    return users.get(userId);
  };

  // Function to add a new customer

  public func addDocumentDetailsCustomer(
    id : Text,
    document_type : Text,
    citizenship : [Text],
    document_number : Text,
    issuing_country : Text,
    issuance_date : Text, // ISO format
    expiry_date : Text // ISO format
  ) : async Text {

    switch (map.get(id)) {
      case (null) {
        "Customer does not exist.";
      };
      case (?customer) {
        let updatedCustomer = {
          customer with
          document_type = document_type;
          citizenship = citizenship;
          document_number = document_number;
          issuing_country = issuing_country;
          issuance_date = issuance_date;
          expiry_date = expiry_date;
        };
        map.put(id, updatedCustomer);
        return "Success";
      };
    };
  };

  public func addResidencyCustomer(
    id : Text,
    resident_address : Text,
    resident_country : Text,
    verification_documents : Text // Assuming you handle the document uploads separately and pass them as Blobs
  ) : async Text {

    switch (map.get(id)) {
      case (null) {
        "Customer does not exist.";
      };
      case (?customer) {
        // Updating only the fields provided in the "Residency Information" section
        let updatedCustomer = {
          customer with
          resident_address = resident_address;
          resident_country = resident_country;
          residency_doc = ?verification_documents;
          // Optionally, handle document uploads here or elsewhere in your application logic
          // document_verification_status could be updated based on document verification logic
        };
        map.put(id, updatedCustomer);
        return "Success";
      };
    };
  };

  public func uploadDocumentPhoto(
    id : Text,
    documentPhoto : Text // Assuming the photo is uploaded as a Blob
  ) : async Text {
    switch (map.get(id)) {
      case (null) {
        "Customer does not exist.";
      };
      case (?customer) {
        let updatedCustomer = {
          customer with
          document_photo = ?documentPhoto; // Storing the photo
          document_verified = false; // Initial state before verification
        };
        map.put(id, updatedCustomer);
        // You might want to trigger an asynchronous verification process here
        return "Success";

      };
    };
  };

  public func addImage(
    id : Text,
    image : Text,
  ) : async Text {

    switch (map.get(id)) {
      case (null) {

        return "Customer doesnot exsist.";
      };
      case (?value) {
        let updatedProfile = {
          value with
          live_photo = ?image;
        };
        map.put(id, updatedProfile);
        return "Success";

      };
    };
  };

  // Function to verify a customer
  public func verifyCustomer(id : Text) : async Text {
    //admin principal id

    switch (map.get(id)) {
      case (null) {
        return "User profile does not exist";
      };
      case (?value) {
        let updatedProfile = {
          value with
          verified = true;
        };
        map.put(id, updatedProfile);
        let defaultGroup : Group = {
          name = "defaultGroup";
          adminId = id;
          defaultGroup = true;
          personalRecords = [];
          addressOfLegalEntity = null;
          residencyOfGroup = null;
          groupDescription = null;
          groupImage = null;
          isRegisteredCompany = ?false;
          publicLawEntity = null;
          isPublicLawEntity = ?false;
          company = null;
        };
        groups.put(id, defaultGroup);

        switch (groupIds.get(id)) {
          case (?buffer) {
            buffer.add(id);
            groupIds.put(id, buffer);
          };
          case (null) {
            var newBuffer = Buffer.Buffer<Text>(0);
            newBuffer.add(id);
            groupIds.put(id, newBuffer);
          };
        };
        return "Success";
      };
    };
  };

  // Function to retrieve a customer's information
  public query func getCustomer(id : Text) : async ?Customer {
    return map.get(id);
  };

  // Debugging: Function to list all customers (not recommended for production use)
  public query func listCustomers() : async [Customer] {
    let ids = Iter.toArray(map.vals());
    return ids;
  };

  public func updateCustomer(id : Text, updatedCustomer : Customer) : async Text {
    switch (map.get(id)) {
      case (null) {
        return "User profile does not exist";
      };
      case (?value) {
        map.put(id, updatedCustomer);
        return "Customer updated successfully.";
      };
    };
  };
  // Function to delete a customer
  public func deleteCustomer(id : Text) : async Text {
    switch (map.get(id)) {
      case (null) {
        return "User profile does not exist";
      };
      case (?value) {
        map.delete(id);
        return "Customer deleted successfully.";
      };
    };
  };
  // Function to set the role of a customer
  public shared (msg) func setRole(id : Text, setRole : Text) : async Text {
    switch (map.get(id)) {
      case (null) {
        return "User profile does not exist.";
      };
      case (?value) {
        if (setRole == "") {
          return "Role cannot be empty.";
        };
        let updatedProfile = {
          value with
          role = setRole;
        };
        map.put(id, updatedProfile);
        return "Role updated.";
      };
    };
  };

  // Function to check if the customer is a registered user
  public query func isRegisteredUser(id : Text) : async Bool {
    switch (map.get(id)) {
      case (null) {
        return false;
      };
      case (?value) {
        return value.role == "Registered User";
      };
    };
  };

  public query func getCustomersByRole(role : Text) : async [Customer] {
    let customers = Iter.filter<Customer>(
      map.vals(),
      func(customer) : Bool {
        customer.role == role;
      },
    );
    return Iter.toArray(customers);
  };

  // Function to check if a customer is verified
  public query func isVerified(id : Text) : async Bool {
    switch (map.get(id)) {
      case (null) {
        return false;
      };
      case (?value) {
        return value.verified;
      };
    };
  };

  // Function to get a list of verified customers
  public query func getVerifiedCustomers() : async [Customer] {
    let verifiedCustomers = Iter.filter<Customer>(
      map.vals(),
      func(customer) : Bool {
        customer.verified;
      },
    );
    return Iter.toArray(verifiedCustomers);
  };

  // Function to update customer information

  // // Function to check if the customer is an admin
  public query func isAdmin(id : Text) : async Bool {
    switch (map.get(id)) {
      case (null) {
        return false;
      };
      case (?value) {
        return value.role == "Admin";
      };
    };
  };

  //=====================================================================================
  //chat Feature
  //=====================================================================================

  type Messaging = {
    MessageId : Text;
    Messages : Message;
  };

  type Message = {
    SenderUserId : Text;
    ReceiverUserId : Text;
    Description : Text;
  };

  private stable var messageEntries : [(Text, [Messaging])] = [];
  var message = HashMap.HashMap<Text, Buffer.Buffer<Messaging>>(0, Text.equal, Text.hash);

  public func createMessaging(senderId : Text, receiverId : Text, description : Text) : async Bool {
    let timeStamp = Time.now();

    let newMessageId = Text.concat(senderId, receiverId);
    let newMessageId2 = Text.concat(receiverId, senderId);
    var messageId = newMessageId;

    switch (message.get(newMessageId2)) {
      case (?x) {
        messageId := newMessageId2;
      };
      case (null) {};
    };

    let messageData : Messaging = {
      MessageId = messageId;
      Messages = {
        SenderUserId = senderId;
        ReceiverUserId = receiverId;
        Description = description;
      };
    };

    switch (message.get(messageId)) {
      case (?x) {
        x.add(messageData);
        let res = message.put(messageId, x);
        return true;
      };
      case (null) {
        var userMessageBuffer = Buffer.Buffer<Messaging>(0);
        userMessageBuffer.add(messageData);
        message.put(messageId, userMessageBuffer);
        return true;
      };

    };

  };

  public query func getMessaging(senderId : Text, receiverId : Text) : async [Messaging] {
    let newMessageId = Text.concat(senderId, receiverId);
    let newMessageId2 = Text.concat(receiverId, senderId);

    switch (message.get(newMessageId)) {
      case (?x) {
        return Buffer.toArray<Messaging>(x);
      };
      case (null) {

        switch (message.get(newMessageId2)) {
          case (?x) {
            return Buffer.toArray<Messaging>(x);
          };
          case (null) {

            return [];
          };
        };

      };
    };

  };

  //===================================================================================

  type GroupMessaging = {
    MessageId : Text;
    Messages : GroupMessage;
  };

  type GroupMessage = {
    SenderUserId : Text;
    Description : Text;
  };

  private stable var groupMessageEntries : [(Text, [GroupMessaging])] = [];
  var groupMessage = HashMap.HashMap<Text, Buffer.Buffer<GroupMessaging>>(0, Text.equal, Text.hash);

  public func createGroupMessaging(groupId : Text, senderId : Text, description : Text) : async Bool {
    let timeStamp = Time.now();

    var messageId = groupId;

    let messageData : GroupMessaging = {
      MessageId = messageId;
      Messages = {
        SenderUserId = senderId;
        Description = description;
      };
    };

    switch (groupMessage.get(messageId)) {
      case (?x) {
        x.add(messageData);
        let res = groupMessage.put(messageId, x);
        return true;
      };
      case (null) {
        var userMessageBuffer = Buffer.Buffer<GroupMessaging>(0);
        userMessageBuffer.add(messageData);
        groupMessage.put(messageId, userMessageBuffer);
        return true;
      };

    };
    return true;
  };

  public query func getGroupMessaging(groupId : Text) : async [GroupMessaging] {

    switch (groupMessage.get(groupId)) {
      case (?x) {
        return Buffer.toArray<GroupMessaging>(x);
      };
      case (null) {
        return [];
      };
    };

  };

  //====================================================================================

  public type User = {
    id : Text;
    emailAuth : Text;
    email : Text;
    otp : ?Text;
    otpExpiry : ?Int;
  };

  public func createUser(
    userId : Text,
    email : Text

  ) : async Text {

    let newUser = {
      id = userId;
      emailAuth = "pending";
      email = email;
      otp = null;
      otpExpiry = null;
    };

    users.put(userId, newUser);
    return "User created with default group.";
  };

  //==============================================================
  //OTP logic
  //==============================================================
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
                emailAuth = "verified"; // Set emailAuth to true upon successful verification
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
  //==============================================================
  //Group logic
  //==============================================================

  public type PersonalRecordType = {
    #EconomicBeneficiary;
    #ExecutiveMember;
    #InvitedViewer;
    #LeadOperator; // Hidden from regular users
    #StaffMember; // Hidden from regular users
  };

  public type PersonalRecordStatus = {
    #Drafted; // Drafted by Creator
    #Verified; // Verified by User or Email Holder
    #Approved; // Approved by AML Officer
    #Rejected; // Rejected by User
  };

  public type PersonalRecord = {
    userId : ?Text; // Optional user ID
    email : Text;
    contactDetails : Text;
    recordType : PersonalRecordType;
    recordStatus : PersonalRecordStatus;
  };

  public type PersonalRecordConnection = {
    link : Bool; // Is Personal Record associated with a System User?
  };

  //==============================================================

  type Group = {
    name : Text;
    adminId : Text;
    defaultGroup : Bool;
    addressOfLegalEntity : ?Text;
    residencyOfGroup : ?Text;
    groupDescription : ?Text;
    groupImage : ?Text;
    isRegisteredCompany : ?Bool;
    publicLawEntity : ?PublicLawEntity;
    isPublicLawEntity : ?Bool;
    company : ?Company;
    //===============================================================================//
    personalRecords : [PersonalRecord]; // New field to store personal records
  };

  public type PublicLawEntity = {
    entityName : Text;
    jurisdiction : Text;
    establishmentDate : Text; // ISO format
    function : Text;
    contactDetails : ContactDetails;
  };

  public type ContactDetails = {
    address : Text;
    phoneNumber : Text;
    email : Text;
  };

  public type Company = {
    companyDetails : {
      companyName : Text;
      registrationNumber : Text;
      legalStructure : Text;
      registeredAddress : Text;
      taxID : Text;
      beneficialOwner : Text;
      incorporationCertificate : Blob;
      memorandumAndArticles : Blob;
      // entity : ?QualifiedEntity;
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

  // Function to create a new group
  private stable var groupEntries : [(Text, Group)] = [];
  var groups = HashMap.HashMap<Text, Group>(0, Text.equal, Text.hash);

  public func createGroup(
    groupName : Text,
    adminId : Text,
    rand : Text,
    addressOfLegalEntity : Text,
    residencyOfGroup : Text,
    groupDescription : Text,
    groupImage : Text,
  ) : async Text {
    let groupId = Text.concat(adminId, rand);
    switch (groups.get(groupId)) {
      case (?existingGroup) { return "Group with this ID already exists." };
      case (null) {
        switch (users.get(adminId)) {
          case (null) { return "Not verified" };
          case (?user) {
            if (user.emailAuth == "verified") {
              let newGroup : Group = {
                name = groupName;
                adminId = adminId;
                defaultGroup = false;
                addressOfLegalEntity = ?addressOfLegalEntity;
                personalRecords = [];
                residencyOfGroup = ?residencyOfGroup;
                groupDescription = ?groupDescription;
                groupImage = ?groupImage;
                isRegisteredCompany = ?false;
                publicLawEntity = null;
                isPublicLawEntity = ?false;
                company = null;
              };
              groups.put(groupId, newGroup);
              switch (groupIds.get(adminId)) {
                case (?buffer) {
                  buffer.add(groupId);
                  groupIds.put(adminId, buffer);
                };
                case (null) {
                  var newBuffer = Buffer.Buffer<Text>(0);
                  newBuffer.add(groupId);
                  groupIds.put(adminId, newBuffer);
                };
              };
              return "Group created successfully.";
            } else {
              return "Not verified";
            };
          };
        };
      };
    };
  };

  public func addPersonalRecordToGroup(
    groupId : Text,
    userId : Text, // Optional user ID
    email : Text,
    contactDetails : Text,
    recordType : PersonalRecordType,
  ) : async Text {
    switch (groups.get(groupId)) {
      case (null) {
        return "Group does not exist.";
      };

      case (?group) {
        var record : PersonalRecord = {
          groupId = groupId;
          userId = ?userId; // Optional user ID
          email = email;
          contactDetails = contactDetails;
          recordType = recordType;
          recordStatus = #Drafted;
        };
        let updatedRecords = Array.append(group.personalRecords, [record]);
        let updatedGroup = { group with personalRecords = updatedRecords };
        groups.put(groupId, updatedGroup);
        return "Personal record added successfully.";
      };
    };
  };

  public func getGroup(groupId : Text) : async ?Group {
    return groups.get(groupId);
  };
  public func getAllGroups() : async [Group] {
    let allGroups = Iter.toArray(groups.vals());
    return allGroups;
  };

  public func updateGroup(
    groupId : Text,
    newGroupName : Text, // Optional, pass null if no change
    newAddress : ?Text, // Optional, pass null if no change
    newResidency : ?Text, // Optional, pass null if no change
    newDescription : ?Text, // Optional, pass null if no change
    newImage : ?Text // Optional, pass null if no change
  ) : async Text {
    switch (groups.get(groupId)) {
      case (null) { return "Group does not exist." }; // Group not found
      case (?group) {
        // Update group with new details if provided, otherwise keep old
        var updatedGroup : Group = {
          group with
          name = newGroupName;
          addressOfLegalEntity = newAddress;
          residencyOfGroup = newResidency;
          groupDescription = newDescription;
          groupImage = newImage;
        };
        groups.put(groupId, updatedGroup); // Save the updated group details
        return "Group updated successfully.";
      };
    };
  };

  // // Helper function to find the index of a user in a group

  public func updateGroupUserStatus(groupId : Text, email : Text, newStatus : PersonalRecordStatus, encryptedEmail : Text) : async Text {
    switch (groups.get(groupId)) {
      case (null) {
        "Group does not exist.";
      };

      case (?group) {
        Debug.print(debug_show ("=============="));

        var updated = false;
        // Correctly map over the groupUsers to update the status
        var userSetId = ?"";
        let updatedUsers = Array.map(
          group.personalRecords,
          func(user : PersonalRecord) : PersonalRecord {
            // Debug.print(debug_show (user.email));
            // Debug.print(debug_show (email));
            // Debug.print(debug_show ("email"));
            if (user.email == email) {
              updated := true;
              userSetId := user.userId;
              return {
                userId = user.userId; // Optional user ID
                email = encryptedEmail;
                contactDetails = user.contactDetails;
                recordType = user.recordType;
                recordStatus = newStatus;
              };
            } else {
              return user;
            };
          },
        );

        if (updated) {
          let updatedGroup = { group with personalRecords = updatedUsers };
          groups.put(groupId, updatedGroup);

          switch (userSetId) {
            case (?actualUserId) {
              // Now that we've confirmed userSetId is not null, we can safely use actualUserId
              switch (groupIds.get(actualUserId)) {
                case (?buffer) {
                  buffer.add(groupId);
                  groupIds.put(actualUserId, buffer);
                };
                case (null) {
                  var newBuffer = Buffer.Buffer<Text>(0);
                  newBuffer.add(groupId);
                  groupIds.put(actualUserId, newBuffer);
                };
              };
            };
            case (null) {
              // Handle the case where userSetId is null, if necessary
              // Perhaps log an error or handle the situation appropriately
            };
          };
          return "User status updated successfully.";
        } else {
          return "User not found in group.";
        };
        return "success";
      };
    };
  };

  public func declareGroupAsPublicLawEntity(
    groupId : Text,
    entityName : Text,
    jurisdiction : Text,
    establishmentDate : Text,
    function : Text,
    address : Text,
    phoneNumber : Text,
    email : Text,
    caller : Text,
  ) : async Text {
    switch (groups.get(groupId)) {
      case (null) { "Group does not exist." };

      case (?group) {
        Debug.print(debug_show (group.adminId));
        Debug.print(debug_show (caller));

        if (group.adminId != caller) {

          return "Only the group admin can declare the group as a public law entity.";
        } else {
          let newPublicLawEntity : PublicLawEntity = {
            entityName = entityName;
            jurisdiction = jurisdiction;
            establishmentDate = establishmentDate;
            function = function;
            contactDetails = {
              address = address;
              phoneNumber = phoneNumber;
              email = email;
            };
          };
          let updatedGroup = {
            group with
            publicLawEntity = ?newPublicLawEntity;
            isPublicLawEntity = ?true;
          };
          groups.put(groupId, updatedGroup);
          return "Group declared as public law entity successfully.";
        };
        return "success";
      };
    };
  };

  public func declareGroupAsCompany(
    groupId : Text,
    userId : Text,
    companyName : Text,
    registrationNumber : Text,
    legalStructure : Text,
    registeredAddress : Text,
    taxID : Text,
    beneficialOwner : Text,
    incorporationCertificate : Blob,
    memorandumAndArticles : Blob,
    representativeFullName : Text,
    representativePosition : Text,
    idDocumentType : Text,
    idDocumentNumber : Text,
    idDocument : Blob,
    proofOfAuthority : Blob,
    email : Text,
    phoneNumber : Text,
  ) : async Text {
    switch (groups.get(groupId)) {
      case (null) { "Group does not exist." };
      case (?group) {
        if (group.adminId != userId) {
          return "Only the group admin can register the company.";
        } else {
          let newCompany : Company = {
            companyDetails = {
              companyName = companyName;
              registrationNumber = registrationNumber;
              legalStructure = legalStructure;
              registeredAddress = registeredAddress;
              taxID = taxID;
              beneficialOwner = beneficialOwner;
              incorporationCertificate = incorporationCertificate;
              memorandumAndArticles = memorandumAndArticles;
            };
            representativeDetails = {
              fullName = representativeFullName;
              position = representativePosition;
              idDocumentType = idDocumentType;
              idDocumentNumber = idDocumentNumber;
              idDocument = idDocument;
              proofOfAuthority = proofOfAuthority;
              email = email;
              phoneNumber = phoneNumber;
            };
          };
          let updatedGroup = {
            group with
            company = ?newCompany;
            isRegisteredCompany = ?true;
          };
          groups.put(groupId, updatedGroup);
          return "Company registered successfully within group: ";
        };
      };
    };
  };

  //==============================================================
  //Group ids logic
  //================================================================================//
  private stable var groupIdEntries : [(Text, [Text])] = [];
  var groupIds = HashMap.HashMap<Text, Buffer.Buffer<Text>>(0, Text.equal, Text.hash);
  //user to group ids

  // Function to update an existing group ID
  public func updateGroupId(groupId : Text, userIds : [Text]) : async Text {
    var newBuffer = Buffer.Buffer<Text>(0);
    for (userId in userIds.vals()) {
      newBuffer.add(userId);
    };
    groupIds.put(groupId, newBuffer);
    return "Group ID updated successfully.";
  };

  // Function to delete a group ID
  public func deleteGroupId(groupId : Text) : async Text {
    switch (groupIds.get(groupId)) {
      case (?buffer) {
        groupIds.delete(groupId);
        return "Group ID deleted successfully.";
      };
      case (null) {
        return "Group ID does not exist.";
      };
    };
  };
  public func getGroupIdsByUserId(userId : Text) : async [Text] {
    let groupIdsBuffer = groupIds.get(userId);
    switch (groupIdsBuffer) {
      case (null) { return [] }; // No groups found for this user, returning an empty list
      case (?buffer) { return Buffer.toArray<Text>(buffer) }; // Convert the buffer to a vector and return it
    };
  };

  //=====================================================================================
  //Operator
  //=====================================================================================

  type Operator = {
    operatorId : Text;
    operatorName : Text;
    exclusiveCountries : [Text];
    superAdminId : ?Text;
    defaultGroupId : ?Text;
    nominatedCEO : ?Text;
    nominatedComplianceOfficer : ?Text;
    nominatedDirector : ?Text;
    knownUsers : ?[Text];
    clients : ?[Text];
    records : ?[Text];
  };

  private stable var operatorEntries : [(Text, Operator)] = [];
  var operators : HashMap.HashMap<Text, Operator> = HashMap.HashMap<Text, Operator>(0, Text.equal, Text.hash);

  public func addOperator(operatorId : Text, operatorName : Text, exclusiveCountries : [Text]) : async Text {
    let existingOperator = operators.get(operatorId);
    switch (existingOperator) {
      case (null) {
        let newOperator : Operator = {
          operatorId = operatorId;
          operatorName = operatorName;
          exclusiveCountries = exclusiveCountries;
          superAdminId = null;
          defaultGroupId = null;
          nominatedCEO = null;
          nominatedComplianceOfficer = null;
          nominatedDirector = null;
          knownUsers = null;
          clients = null;
          records = null;
        };
        operators.put(operatorId, newOperator);
        return "Operator added successfully.";
      };
      case (_) {
        return "Operator with this ID already exists.";
      };
    };
  };
  // Function to update an existing operator with optional fields
  public func updateOperator(
    operatorId : Text,
    superAdminId : ?Text,
    defaultGroupId : ?Text,
    nominatedCEO : ?Text,
    nominatedComplianceOfficer : ?Text,
    nominatedDirector : ?Text,
    knownUsers : ?[Text],
    clients : ?[Text],
    records : ?[Text],
  ) : async Text {
    let existingOperator = operators.get(operatorId);
    switch (existingOperator) {
      case (null) {
        return "Operator not found.";
      };
      case (?existing) {
        // Update only the fields that are provided
        let updatedOperator : Operator = {
          existing with
          operatorId = operatorId;
          superAdminId = superAdminId;
          defaultGroupId = defaultGroupId;
          nominatedCEO = nominatedCEO;
          nominatedComplianceOfficer = nominatedComplianceOfficer;
          nominatedDirector = nominatedDirector;
          knownUsers = knownUsers;
          clients = clients;
          records = records;
        };
        operators.put(operatorId, updatedOperator);
        return "Operator updated successfully.";
      };
    };
  };

  public query func getOperator(id : Text) : async ?Operator {
    return operators.get(id);
  };
  public func isOperator(operatorId : Text) : async Bool {
    let operator = operators.get(operatorId);
    switch (operator) {
      case (null) { return false }; // Operator ID does not exist
      case (_) { return true }; // Operator ID exists
    };
  };

  //============================================================

  //============================================================

  system func preupgrade() {
    mapEntries := Iter.toArray(map.entries());
    //==========================================================
    let Entries1 = Iter.toArray(message.entries());
    var data1 = Map.HashMap<Text, [Messaging]>(0, Text.equal, Text.hash);

    for (x in Iter.fromArray(Entries1)) {
      data1.put(x.0, Buffer.toArray<Messaging>(x.1));
    };
    messageEntries := Iter.toArray(data1.entries());
    //==========================================================
    userEntries := Iter.toArray(users.entries());
    //==========================================================
    groupEntries := Iter.toArray(groups.entries());
    //==========================================================

    let Entries = Iter.toArray(groupIds.entries());
    var data = Map.HashMap<Text, [Text]>(0, Text.equal, Text.hash);

    for (x in Iter.fromArray(Entries)) {
      data.put(x.0, Buffer.toArray<Text>(x.1));
    };
    groupIdEntries := Iter.toArray(data.entries());
    // groupIdEntries := Iter.toArray(groupIds.entries());

  };
  system func postupgrade() {
    map := HashMap.fromIter<Text, Customer>(mapEntries.vals(), 1, Text.equal, Text.hash);
    //==========================================================

    let his1 = HashMap.fromIter<Text, [Messaging]>(messageEntries.vals(), 1, Text.equal, Text.hash);
    let Entries1 = Iter.toArray(his1.entries());
    for (x in Iter.fromArray(Entries1)) {
      message.put(x.0, Buffer.fromArray<Messaging>(x.1));
    };
    //==========================================================
    users := HashMap.fromIter<Text, User>(userEntries.vals(), 1, Text.equal, Text.hash);
    //==========================================================
    groups := HashMap.fromIter<Text, Group>(groupEntries.vals(), 1, Text.equal, Text.hash);
    //==========================================================
    let his = HashMap.fromIter<Text, [Text]>(groupIdEntries.vals(), 1, Text.equal, Text.hash);
    let Entries = Iter.toArray(his.entries());
    for (x in Iter.fromArray(Entries)) {
      groupIds.put(x.0, Buffer.fromArray<Text>(x.1));
    };
    // groupIds := HashMap.fromIter<Text, Buffer.Buffer<Text>>(groupIdEntries.vals(), 1, Text.equal, Text.hash);

  };
};
