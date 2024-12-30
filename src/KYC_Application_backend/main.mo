import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Map "mo:base/HashMap"; 
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Option "mo:base/Option";
import Time "mo:base/Time";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Random "mo:base/Random";
import AccountActorClass "./Account";

actor KYC_Canister {

  //===========================================================
  //Customer Info
  //=========================================================

  type Customer = {
    id : Text;
    given_name : Text;
    family_name : Text;
    birth_date : Text;
    birth_country : Text;
    referral_code : ?Text;
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
    decline_reason : ?Text;
    limitation_reason : ?Text;
    role : Text;
  };

  private stable var mapEntries : [(Text, Customer)] = [];
  var map = HashMap.HashMap<Text, Customer>(0, Text.equal, Text.hash);

  public func addBasicInfoCustomer(
    id : Text,
    family_name : Text,
    given_name : Text,
    birth_date : Text, // ISO format
    birth_country : Text,
    phone : Text,
    referralCode:Text
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
              var code = ?referralCode;
              if (referralCode=="")
              {
                code := null;
              };
              let newCustomer : Customer = {
                id = id;
                family_name = family_name;
                given_name = given_name;
                birth_date = birth_date;
                birth_country = birth_country;
                referral_code = code;
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
                decline_reason = null;
                limitation_reason = null;
                verified = false;
                role = "applicant";
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

  public func verifyDocument(id : Text, isVerified : Bool) : async Text {
    switch (map.get(id)) {
      case (null) { return "Customer does not exist." };
      case (?customer) {
        let updatedCustomer = {
          customer with document_verified = isVerified
        };
        map.put(id, updatedCustomer);
        return "Document verification status updated successfully.";
      };
    };
  };

  public query func isDocumentVerified(id : Text) : async ?Bool {
    switch (map.get(id)) {
      case (null) { return null }; // Customer does not exist
      case (?customer) { return ?customer.document_verified }; // Return the document verification status
    };
  };
  public query func isIdentityVerified(id : Text) : async ?Bool {
    switch (map.get(id)) {
      case (null) {
        return null;
      }; // Customer does not exist
      case (?customer) {
        return ?customer.identity_verified;
      }; // Return the identity verification status
    };
  };

  public func verifyIdentity(id : Text, isVerified : Bool) : async Text {
    switch (map.get(id)) {
      case (null) { return "Customer does not exist." };
      case (?customer) {
        let updatedCustomer = {
          customer with identity_verified = isVerified
        };
        map.put(id, updatedCustomer);
        return "Identity verification status updated successfully.";
      };
    };
  };

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
          role = "fullapplicant";
        };
        map.put(id, updatedProfile);
        return "Success";

      };
    };
  };

  public query func getApplicantCustomers() : async [Customer] {
    // Use Iter.filter to filter customers by the role "applicant"
    let applicantCustomers = Iter.filter<Customer>(
        map.vals(), // Iterate over all customers in the HashMap
        func(customer) : Bool {
            customer.role == "applicant"; // Check if the customer's role is "applicant"
        },
    );
    // Convert the filtered iterator to an array and return
    return Iter.toArray(applicantCustomers);
  };

  public query func getFullApplicantCustomers() : async [Customer] {
      // Use Iter.filter to filter customers by the role "applicant"
      let applicantCustomers = Iter.filter<Customer>(
          map.vals(), // Iterate over all customers in the HashMap
          func(customer) : Bool {
              customer.role == "fullapplicant"; // Check if the customer's role is "applicant"
          },
      );
      // Convert the filtered iterator to an array and return
      return Iter.toArray(applicantCustomers);
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
          adminId = id;
          groupName = "DefaultGroup";
          groupType = "Default";
          logoHash = "";
          specialGroupType = null;
          groupAuthorization = null;
          registerCompanyForm = null;
          publicLawEntityDetails = null;
          personalRecords = [];
          accoundId = "";
          subGroups = [];
          logo = "";

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

  public func declineCustomer(id : Text, reason : Text) : async Text {
    switch (map.get(id)) {
      case (null) { "Customer does not exist." };
      case (?customer) {
        let updatedCustomer = {
          customer with decline_reason = ?reason;
          verified = false; // Ensure customer status is updated
        };
        map.put(id, updatedCustomer);
        "Customer declined successfully.";
      };
    };
  };

  public func limitCustomer(id : Text, reason : Text) : async Text {
    switch (map.get(id)) {
      case (null) { "Customer does not exist." };
      case (?customer) {
        let updatedCustomer = {
          customer with limitation_reason = ?reason;
          verified = true; // Assuming limitation doesn't revoke verification
        };
        map.put(id, updatedCustomer);

        let defaultGroup : Group = {
          adminId = id;
          groupName = "DefaultGroup";
          groupType = "Default";
          logoHash = "";
                    specialGroupType = null;
          groupAuthorization = null;
          registerCompanyForm = null;
          publicLawEntityDetails = null;
          personalRecords = [];
          subGroups = [];
          accoundId = "";
          logo = "";
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
  public func setRole(id : Text, setRole : Text) : async Text {
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
  // Internet Identity Code
  //=====================================================================================
 
  public type UserInternetIdentity = {
    ii : Text;         // Internet Identity
    email : Text;      // Email address
    iiCode: ?Text;     // Optional II Code
  };

  // Stable variable for storing II associations
  private stable var userIIEntries : [(Text, UserInternetIdentity)] = [];
  var usersII = HashMap.HashMap<Text, UserInternetIdentity>(0, Text.equal, Text.hash);

  public func associateIIWithEmail(email : Text, ii : Text) : async Text {
    // Convert the HashMap values into an array and check if the II exists
    let iiExists = Array.filter(
      Iter.toArray(usersII.vals()),
      func(entry : UserInternetIdentity) : Bool {
        entry.ii == ii;
      },
    );

    if (Array.size(iiExists) > 0) {
      // If the II exists, return an error message with the associated email
      return "Internet Identity (II) is already associated with another email: " # iiExists[0].email;
    } else {
      // If II doesn't exist, check if the email already has an II
      switch (usersII.get(email)) {
        case (?user) {
          return "This email already has an associated Internet Identity (II): " # user.ii;
        };
        case null {
          // Create a new UserInternetIdentity entry
          let newUserII : UserInternetIdentity = {
            ii = ii;
            email = email;
            iiCode = null;
          };

          usersII.put(email, newUserII); // Associate II with the email
          return "Internet Identity (II) successfully associated with the email.";
        };
      };
    };
  };

  public func updateIICode(email : Text, iiCode : Text) : async Text {
    // Check if the email exists in the usersII HashMap
    switch (usersII.get(email)) {
      case null {
        return "No Internet Identity (II) is associated with this email.";
      };
      case (?userII) {
        // Update the iiCode for the existing UserInternetIdentity
        let updatedUserII : UserInternetIdentity = {
          userII with iiCode = ?iiCode;
        };
        usersII.put(email, updatedUserII); // Save the updated entry
        return "iiCode updated successfully for the associated email.";
      };
    };
  };


  public query func isIIAssociated(ii : Text) : async ?Text {
    // Convert HashMap values to an array and filter to check for the II
    let iiExists = Array.filter(
      Iter.toArray(usersII.vals()),
      func(entry : UserInternetIdentity) : Bool {
        entry.ii == ii;
      },
    );

    if (Array.size(iiExists) > 0) {
      return ?iiExists[0].email; // Return the email associated with this II
    } else {
      return null; // II is not associated with any email
    };
  };

  // Function to get the Internet Identity (II) associated with an email
  public query func getIIByEmail(email : Text) : async ?UserInternetIdentity {
    return usersII.get(email);
  };

  // Function to list all II associations (For Debugging)
  public query func listAllIIAssociations() : async [UserInternetIdentity] {
    return Iter.toArray(usersII.vals());
  };

  // Function to remove II association for an email
  public func removeIIByEmail(email : Text) : async Text {
    switch (usersII.get(email)) {
      case (null) {
        return "No Internet Identity (II) associated with this email.";
      };
      case (?entry) {
        usersII.delete(email);
        return "Internet Identity (II) association removed successfully.";
      };
    };
  };

  //====================================================================================
  // User OTP Code
  //=====================================================================================
  public type User = {
    emailAuth : Text;
    email : Text;
    password: Text;
    otp : ?Text;
    otpExpiry : ?Int;
    authMethod: ?Text;
  };

  private stable var userEntries : [(Text, User)] = [];
  var users = HashMap.HashMap<Text, User>(0, Text.equal, Text.hash);

  public func getUser(userId : Text) : async ?User {
    return users.get(userId);
  };

  public func createUser(
    email : Text,
    password: Text,
    authMethod: Text
  ) : async Text {

      switch (users.get(email)) {
      case (?x) {
        return "user exsists";
      };
      case (null) {
          var status = "pending";
         if(authMethod == "Google")
         {
           status := "verified"; 
          };
           let newUser = {
          emailAuth = status;
            email = email;
            password = password;
      otp = null;
       otpExpiry = null;
      authMethod = ?authMethod;
    };

    users.put(email, newUser);
    return "User created with default group.";
      };
    };
   
  };

  public func loginUser(email : Text, password : Text) : async ?User {
    // Check if the user exists in the `users` HashMap
    switch (users.get(email)) {
        case (null) {
            return null;
        };
        case (?user) {
            // Check if the provided password matches the stored password
            if (user.password == password) {
                // if (user.emailAuth != "verified") {
                //     return "Email not verified.";
                // };
                return ?user;
            } else {
                return null;
            };
        };
    };
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

  private stable var groupEntries : [(Text, Group)] = [];
  var groups = HashMap.HashMap<Text, Group>(0, Text.equal, Text.hash);

  type ContactDetails = {
    address : Text;
    phoneNumber : Text;
    email : Text;
  };

  type CompanyDetails = {
    companyName : Text;
    industrySector : Text;
    registrationNumber : Text;
    taxId : Text;
    legalStructure : Text;
    registeredAddress : Text;
    incorporationCertificate : ?Text;
    memorandumAndArticles : ?Text;
    economicOwner : Text;
    beneficialOwner : Text;
  };

type RegisterCompanyForm = {
  companyDetails: {
    companyName: Text;
    industrySector: Text;
    companyPurpose: Text;
    registrationNumber: Text;
    taxId: Text;
    legalStructure: Text;
    countryOfRegistry: Text;
    corporateDocumentation: {
      incorporationCertificate: ?Text; // Optional Blob for files
      memorandumAndArticles: ?Text;   // Optional Blob for files
    };
  };
  leadershipAndOwnership: {
    executiveManager: {
      isUserManager: { #Self;
    #OtherPerson};
      otherManagers: [Text]; // Array of other manager names
    };
    economicBeneficiary: {
      beneficiaryType: {
        #Shareholders;
        #OnlyMe;
        #OtherEntityOrPerson;
      };
      shareholderAdditionMethod: {
        #Manual;
        #UploadShareholderBook;
      };
      digitalShares: Bool;
    };
    boardOfDirectors: {
      exists: Bool;
      canVoteInSystem: Bool;
    };
    annualDischarge: {
      isAnnualVotingRequired: Bool;
    };
  };
    dailySpendingPower: Nat; // REQUIRE
  monthlySpendingPower: Nat; //  REQUIRE
  governanceAndLimitations: {
    spendingPowerLimitations: Bool;
    transactionApproval: {
      groupAdminApprovalMethod: {
        #BoardVoting;
        #ShareholderAssemblyVoting;
      };
      groupMemberApprovalMethod: {
        #GroupAdminApproval;
        #MemberSpendingPowerApproval;
      };
    };
    management: {
      adminAdditionMethod: {
        #GroupAdmin;
        #BoardVoting;
        #ShareholderAssemblyVoting;
      };
    };
    boardOfDirectors: {
      memberAdditionMethod: {
        #GroupAdmin;
        #BoardVoting;
        #ShareholderAssemblyVoting;
      };
    };
  };
  auditing: {
    isAuditingRequired: Bool;
    auditScope: {
      #AllTransactionsIncludingBankAccounts;
      #AllTransactionsWithoutBankAccounts;
      #OnlyCOOWNTransactions;
    };
    auditorNominationMethod: {
      #BoardApproves;
      #GroupAdminNominates;
      #ShareholderAssemblyApproves;
    };
    auditReportRecipients: {
      #BoardAndExecutiveManagers;
      #ShareholdersBoardAndManagers;
    };
    promotionAccepted: Bool;
  };
};

  type EntityInformation = {
    entityName : Text;
    address : Text;
    businessEmail : Text;
    website : Text;

  };

  type GroupOwner = {
    jobTitle : Text;
    ownerBusinessEmail : Text;
  };

  type LegalFramework = {
    descriptionOfPurpose : Text;
    linkToConstitutingLegislation : Text;
    linkToSupervisoryBody : Text;
  };

  type PublicLawEntityDetails = {
    entityInfo : EntityInformation;
    groupOwner : ?GroupOwner;
    legalFramework : LegalFramework;
  };

  type Group = {
    adminId : Text;
    groupName : Text;
    groupType : Text;
    specialGroupType: ?SpecialGroupType;
    logoHash :  Text;
    groupAuthorization :?Text; // Foundation, developers, Treasury
    registerCompanyForm: ?RegisterCompanyForm; // Replace `companyDetails` with `registerCompanyForm`
    publicLawEntityDetails : ?PublicLawEntityDetails;
    personalRecords : [PersonalRecord]; //empty
    accoundId : Text;
    subGroups : [Text]; // IDs of subgroups for hierarchical structure
    //============================================
    logo : Text;
  };

  public func createGroup(
    adminId : Text,
    rand : Text,
    groupName : Text,
    groupType : Text,
    logoHash:Text,
    storageCapacity : Text,
    storageFee : Nat,
    setupFee : Nat,
    annualFee : Nat
  ) : async Text {
    let groupId = Text.concat(adminId, rand);
    switch (groups.get(groupId)) {
      case (null) {
        let newGroup : Group = {
          adminId = adminId;
          groupName = groupName;
          groupType = groupType;
          logoHash = logoHash;
          specialGroupType = null;
          groupAuthorization = null;
          registerCompanyForm = null;
          publicLawEntityDetails = null;
          personalRecords = [];
          subGroups = [];
          accoundId = "";
          logo = "";

        };
        groups.put(groupId, newGroup);

         let totalCost = storageFee + setupFee + annualFee; // Calculate total cost
    let now = Time.now();
    let expiry = now + (365 * 24 * 60 * 60 * 1_000_000_000); // Expiry: 1 year from now

    let newSubscription : SubscriptionType = {
        storageCapacity = storageCapacity;
        storageFee = storageFee;
        setupFee = setupFee;
        annualFee = annualFee;
        totalCost = totalCost;
        subscriptionDate = now;
        expiryDate = expiry;
    };

    let userSubscription : UserSubscription = {
      groupId = groupId;
        userId = adminId;
        subscription = newSubscription;
    };

    subscriptionMap.put(groupId, userSubscription);

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
      };
      case (?val) {
        return "Group already exists";
      };
    };
  };

  public func updatePublicLawEntityGroup(
    groupId : Text,
    entityName : Text,
    address : Text,
    businessEmail : Text,
    website : Text,
    jobTitle : Text,
    ownerBusinessEmail : Text,
    descriptionOfPurpose : Text,
    linkToConstitutingLegislation : Text,
    linkToSupervisoryBody : Text,

  ) : async Text {
    switch (groups.get(groupId)) {
      case (null) {
        "Group does not exist.";
      };
      case (?group) {
        if (group.groupType != "Public Law Entity") {
          return "Invalid group type for this operation.";
        } else {
          let updatedPublicLawEntityDetails = {

            entityInfo = {
              entityName = entityName;
              address = address;
              businessEmail = businessEmail;
              website = website;
            };

            groupOwner = ?{
              jobTitle = jobTitle;
              ownerBusinessEmail = ownerBusinessEmail;
            };
            legalFramework = {
              descriptionOfPurpose = descriptionOfPurpose;
              linkToConstitutingLegislation = linkToConstitutingLegislation;
              linkToSupervisoryBody = linkToSupervisoryBody;
            };
          };
          let updatedGroup = {
            group with
            publicLawEntityDetails = ?updatedPublicLawEntityDetails
          };
          groups.put(groupId, updatedGroup);
          return "Public law entity details added successfully.";
        };
      };
    };
  };

  public func updateIncorporationGroup(
      groupId: Text,
      companyName: Text,
      industrySector: Text,
      companyPurpose: Text,
      registrationNumber: Text,
      taxId: Text,
      legalStructure: Text,
      countryOfRegistry: Text,
      incorporationCertificate: Text,
      memorandumAndArticles: Text,
      isUserManager: { #Self;
        #OtherPerson},
          otherManagers: [Text],
      beneficiaryType: {
        #Shareholders;
        #OnlyMe;
        #OtherEntityOrPerson;
      },
      shareholderAdditionMethod: {
        #Manual;
        #UploadShareholderBook;
      },
      digitalShares: Bool,
        dailySpendingPower: Nat, // REQUIRE Add to account
      monthlySpendingPower: Nat, //  REQUIRE
      boardExists: Bool,
      canVoteInSystem: Bool,
      isAnnualVotingRequired: Bool,
      spendingPowerLimitations: Bool,
      groupAdminApprovalMethod: {
        #BoardVoting;
        #ShareholderAssemblyVoting;
      },
      groupMemberApprovalMethod: {
        #GroupAdminApproval;
        #MemberSpendingPowerApproval;
      },
      adminAdditionMethod: {
        #GroupAdmin;
        #BoardVoting;
        #ShareholderAssemblyVoting;
      },
      boardMemberAdditionMethod: {
        #GroupAdmin;
        #BoardVoting;
        #ShareholderAssemblyVoting;
      },
      isAuditingRequired: Bool,
      auditScope: {
        #AllTransactionsIncludingBankAccounts;
        #AllTransactionsWithoutBankAccounts;
        #OnlyCOOWNTransactions;
      },
      auditorNominationMethod: {
        #BoardApproves;
        #GroupAdminNominates;
        #ShareholderAssemblyApproves;
      },
      auditReportRecipients: {
        #BoardAndExecutiveManagers;
        #ShareholdersBoardAndManagers;
      },
      promotionAccepted: Bool
     ) : async Text {
    switch (groups.get(groupId)) {
      case (null) {
        return "Group does not exist.";
      };
      case (?group) {
        if (group.groupType != "Incorporation") {
          return "Invalid group type for this operation.";
        } else {
          // Construct RegisterCompanyForm from the provided fields
          let registerCompanyForm: RegisterCompanyForm = {
            companyDetails = {
              
              companyName = companyName;
              industrySector = industrySector;
              companyPurpose = companyPurpose;
              registrationNumber = registrationNumber;
              taxId = taxId;
              legalStructure = legalStructure;
              countryOfRegistry = countryOfRegistry;
                
              corporateDocumentation = {
                incorporationCertificate = ?incorporationCertificate;
                memorandumAndArticles = ?memorandumAndArticles;
              };
            };
            dailySpendingPower= dailySpendingPower; // REQUIRE
            monthlySpendingPower= monthlySpendingPower; //  REQUIRE
            leadershipAndOwnership = {
              executiveManager = {
                isUserManager = isUserManager;
                otherManagers = otherManagers;
              };
              economicBeneficiary = {
                beneficiaryType = beneficiaryType;
                shareholderAdditionMethod = shareholderAdditionMethod;
                digitalShares = digitalShares;
              };
              boardOfDirectors = {
                exists = boardExists;
                canVoteInSystem = canVoteInSystem;
              };
              annualDischarge = {
                isAnnualVotingRequired = isAnnualVotingRequired;
              };
            };
            governanceAndLimitations = {
              spendingPowerLimitations = spendingPowerLimitations;
              transactionApproval = {
                groupAdminApprovalMethod = groupAdminApprovalMethod;
                groupMemberApprovalMethod = groupMemberApprovalMethod;
              };
              management = {
                adminAdditionMethod = adminAdditionMethod;
              };
              boardOfDirectors = {
                memberAdditionMethod = boardMemberAdditionMethod;
              };
            };
            auditing = {
              isAuditingRequired = isAuditingRequired;
              auditScope = auditScope;
              auditorNominationMethod = auditorNominationMethod;
              auditReportRecipients = auditReportRecipients;
              promotionAccepted = promotionAccepted;
            };
          };

          // Update the group with the constructed RegisterCompanyForm
          let updatedGroup = {
            group with
            registerCompanyForm = ?registerCompanyForm
          };
          groups.put(groupId, updatedGroup);
          return "Incorporation details updated successfully.";
        };
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

  //====================================================================================
  //new subscriptions
  //====================================================================================

  type SubscriptionType = {
    storageCapacity : Text; // e.g., "500MB", "5GB", "25GB"
    storageFee : Nat;       // e.g., 0 USD, 72 USD, etc.
    setupFee : Nat;         // Initial setup fee, if any
    annualFee : Nat;        // e.g., 168 USD
    totalCost : Nat;        // Total cost (sum of fees)
    subscriptionDate : Int; // Subscription start date
    expiryDate : Int;      // Expiry date (one year from subscription date)
  };

  type UserSubscription = {
    groupId : Text;
      userId : Text;
      subscription : SubscriptionType;
  };

  private stable var subscriptions : [(Text, UserSubscription)] = []; // Store user subscriptions
  var subscriptionMap = HashMap.HashMap<Text, UserSubscription>(0, Text.equal, Text.hash);


  public func createSubscription(
      userId : Text,
      storageCapacity : Text,
      groupId:Text,
      storageFee : Nat,
      setupFee : Nat,
      annualFee : Nat
  ) : async Text {
      let totalCost = storageFee + setupFee + annualFee; // Calculate total cost
      let now = Time.now();
      let expiry = now + (365 * 24 * 60 * 60 * 1_000_000_000); // Expiry: 1 year from now

      let newSubscription : SubscriptionType = {
          storageCapacity = storageCapacity;
          storageFee = storageFee;
          setupFee = setupFee;
          annualFee = annualFee;
          totalCost = totalCost;
          subscriptionDate = now;
          expiryDate = expiry;
      };

      let userSubscription : UserSubscription = {
          groupId = groupId;
          userId = userId;
          subscription = newSubscription;
      };

      subscriptionMap.put(userId, userSubscription);
      return "Subscription created successfully.";
  };



  //  ====================Foundation==================================//
  //==================================================================//
  //  ====================Foundation==================================//

 type FoundationDetails = {   
   id: Text;
   affiliateId:Text;                  			 // Group ID Number
   name: Text;                  			 // Group Name (info only, not editable in admin dashboard)
   staffCount: Nat;
   balance: Nat;
   regionalOperators: [Text];                  // List of associated regional operators
   exclusiveAreas: [Text];                     // List of exclusive areas of operation
   nonExclusiveAreas: [Text];                  // List of non-exclusive areas of operation
   licenseDetails: ?Text;                      // Details of the foundation's operational license
   complianceOfficer: ?Text;                   // Compliance officer for the foundation
   annualBudget: Nat;                          // Annual budget allocated for the foundation's operations
   fundingSources: [Text];                     // List of funding sources (e.g., donations, grants)
   keyAccountManager: ?Text;                   // Nominated key account manager
   supervisorAccountManager: ?Text;            // Supervisor of the key account manager
   termsOfService: ?Text;                      // Link to terms of service, if applicable
   localization: [Text];                       // Supported countries/regions
   transactionRules: [TransactionFee];         // Rules for transactions associated with the foundation
 };

  type SpecialGroupType = {
    #Foundation: FoundationDetails;        // Foundation-specific data
    #Treasury;                             // Treasury-specific type details can be added later
    #Developers;                           // Developers-specific type details can be added later
  };

  public func createFoundation(
    key:Text,
  name: Text,
  staffCount: Nat,
  balance: Nat,
  regionalOperators: [Text],
  exclusiveAreas: [Text],
  nonExclusiveAreas: [Text],
  licenseDetails: Text,
  complianceOfficer: Text,
  annualBudget: Nat,
  fundingSources: [Text],
  keyAccountManager: Text,
  supervisorAccountManager: Text,
  termsOfService: Text,
  localization: [Text],
  transactionRules: [TransactionFee]
) : async Text {
  // Check if a foundation already exists

  // Generate a unique foundation group ID
  // let foundationGroupId = "foundation-" # Int.toText(Time.now());
  let foundationGroupId= "foundation";
  switch(groups.get(foundationGroupId)){
    case(?data){
      return "foundation exsists";
    };
    case(null){
    let foundationDetails: FoundationDetails = {
      id = foundationGroupId;
      name = name;
      affiliateId = key;
      staffCount = staffCount;
      balance = balance;
      regionalOperators = regionalOperators;
      exclusiveAreas = exclusiveAreas;
      nonExclusiveAreas = nonExclusiveAreas;
      licenseDetails = ?licenseDetails;
      complianceOfficer = ?complianceOfficer;
      annualBudget = annualBudget;
      fundingSources = fundingSources;
      keyAccountManager = ?keyAccountManager;
      supervisorAccountManager = ?supervisorAccountManager;
      termsOfService = ?termsOfService;
      localization = localization;
      transactionRules = transactionRules;
    };

    // Populate the group details
    let newGroup: Group = {
      adminId = "admin"; // Assign a suitable admin ID
      groupName = "Foundation";
      groupType = "Foundation";
      specialGroupType = ?#Foundation(foundationDetails);
      logoHash = ""; // Update with a logo hash if available
      groupAuthorization = null;
      registerCompanyForm = null;
      publicLawEntityDetails = null;
      personalRecords = [];
      subGroups = [];
      accoundId = "";
      logo = "";
    };

    // Save the new group in the groups map
    groups.put(foundationGroupId, newGroup);

    return "Foundation created successfully with ID: " # foundationGroupId;
      };
  };
  // Populate the foundation details

};

 // Type Definition

  type TransactionFee = {
    id: Text;
    ruleName: Text;
    totalFees: Nat;
    assetType: Text; // e.g., "ckUSD", "ckBTC", etc.
    operator: Text; // Operator or group associated
    description: Text;
  };

  type Product = {
    id: Text;
    name: Text;
    price: Nat;
    productOwner: Text; // Owner of the product/service
    salesChannel: Text; // e.g., "DAO", "dApp", "Coming soon"
    description: Text;
  };

  // HashMap Storage
  let transactionFees = HashMap.HashMap<Text, TransactionFee>(0, Text.equal, Text.hash);
  let products = HashMap.HashMap<Text, Product>(0, Text.equal, Text.hash);

//====================================
  //======Page 1 Functions===========//
  // ===== Affiliates Management =====
//====================================

  type AffiliateDetails = {
    affiliate: ?Affiliate;
    focalPoint: ?FocalPoint; // Optional if not provided
    sla: ?SLA; // Optional if not provided
    localization: ?Localization; // Optional if not provided
  };

   type Affiliate = {
    affiliateGroup: Text;
    associateType: Text;
    affiliateWebsite: Text;
    representedInSteering: Bool;
    steeringDelegate: ?Text;
    representedInCoordination: Bool;
    coordinationDelegate: ?Text;
    coordinationDeputy: ?Text;
  };

  type FocalPoint = {
    mainContact: Text;
    role: Text;
    email: Text;
    phone: Text;
    preferredMessenger: Text;
    messengerIdentifier: Text;
  };

  type SLA = {
    slaDocument: Text;
    workingDraft: Text;
    managementSystemActivities: Text;
    comments: Text;
  };

  type Localization = {
    actsInSpecificAreas: Bool;
    licensedIn: [Text]; // List of country codes where the affiliate is licensed
    exclusiveAreas: [Text]; // List of exclusive areas (country codes)
    nonExclusiveAreas: [Text]; // List of non-exclusive areas (country codes)
  };
  var affiliates = HashMap.HashMap<Text, AffiliateDetails>(0, Text.equal, Text.hash);
  private stable var affiliateEntries : [(Text, AffiliateDetails)] = [];

  public func createAffiliateDetails(key: Text): async Bool {
  switch (affiliates.get(key)) {
      
      case(null)
      {
        affiliates.put(
        key,
      {
        affiliate = null;
        focalPoint = null;
        sla = null;
        localization = null;
      }
    );
    return true;

      };
      case(?_)
      {
        return false;
      }
    };

  
  };

  public func addAffiliate(
    key: Text,
    affiliateGroup: Text,
    associateType: Text,
    affiliateWebsite: Text,
    representedInSteering: Bool,
    steeringDelegate: Text,
    representedInCoordination: Bool,
    coordinationDelegate: Text,
    coordinationDeputy: Text
  ): async Bool {
    switch (affiliates.get(key)) {
      case (?details) {
        affiliates.put(
          key,
          {
            details with
            affiliate = ?{
              affiliateGroup = affiliateGroup;
              associateType = associateType;
              affiliateWebsite = affiliateWebsite;
              representedInSteering = representedInSteering;
              steeringDelegate = ?steeringDelegate;
              representedInCoordination = representedInCoordination;
              coordinationDelegate = ?coordinationDelegate;
              coordinationDeputy = ?coordinationDeputy;
            }
          }
        );
        return true;
      };
      case null {
        return false; // Key not found
      };
    };
  };

  public func addFocalPoint(
    key: Text,
    mainContact: Text,
    role: Text,
    email: Text,
    phone: Text,
    preferredMessenger: Text,
    messengerIdentifier: Text
  ): async Bool {
    switch (affiliates.get(key)) {
      case (?details) {
        affiliates.put(
          key,
          {
            details with
            focalPoint = ?{
              mainContact = mainContact;
              role = role;
              email = email;
              phone = phone;
              preferredMessenger = preferredMessenger;
              messengerIdentifier = messengerIdentifier;
            }
          }
        );
        return true;
      };
      case null {
        return false; // Key not found
      };
    };
  };

  public func addSLA(
    key: Text,
    slaDocument: Text,
    workingDraft: Text,
    managementSystemActivities: Text,
    comments: Text
  ): async Bool {
    switch (affiliates.get(key)) {
      case (?details) {
        affiliates.put(
          key,
          {
            details with
            sla = ?{
              slaDocument = slaDocument;
              workingDraft = workingDraft;
              managementSystemActivities = managementSystemActivities;
              comments = comments;
            }
          }
        );
        return true;
      };
      case null {
        return false; // Key not found
      };
    };
  };

  public func addLocalization(
    key: Text,
    actsInSpecificAreas: Bool,
    licensedIn: [Text],
    exclusiveAreas: [Text],
    nonExclusiveAreas: [Text]
  ): async Bool {
    switch (affiliates.get(key)) {
      case (?details) {
        affiliates.put(
          key,
          {
            details with
            localization = ?{
              actsInSpecificAreas = actsInSpecificAreas;
              licensedIn = licensedIn;
              exclusiveAreas = exclusiveAreas;
              nonExclusiveAreas = nonExclusiveAreas;
            }
          }
        );
        return true;
      };
      case null {
        return false; // Key not found
      };
    };
  };
  //================================================================================
  //=================================================================================
  //====================================
  //======Page 2 Functions===========//
  // ===== Localization Management =====
//====================================

  // Function to retrieve affiliate details by key
  public query func getAffiliateDetails(key: Text): async ?AffiliateDetails {
    return affiliates.get(key);
  };

  public func updateAffiliateDetails(
    key: Text,
    affiliate: Affiliate,
    focalPoint: FocalPoint,
    sla: SLA,
    localization: Localization
  ): async Bool {
  switch (affiliates.get(key)) {
    case (?existingDetails) {
      affiliates.put(
        key,
        {
          affiliate =  ?affiliate;
          focalPoint =  ?focalPoint;
          sla = ?sla;
          localization =  ?localization;
        }
      );
      return true;
    };
    case null {
      return false; // Key not found
    };
    };
  };

  public query func getLocalizationDetails(key: Text): async ?Localization {
    switch (affiliates.get(key)) {
      case (?details) { return details.localization; };
      case null { return null; };
    };
  };

  // Function to retrieve all affiliate details
public query func getAllDetails(): async [(Text, AffiliateDetails)] {
  var allDetails: [(Text, AffiliateDetails)] = [];
  let entries = affiliates.entries(); // Get all entries from the HashMap
  for ((key, value) in entries) {
    allDetails := Array.append(allDetails, [(key, value)]);
  };
  return allDetails;
};



  //=================================================================================
  //====================================
  //======Page 3  Functions===========//
  // ===== Transacntion Management =====
  //====================================
  type TransactionRule = {
    id: Text;                        // Unique identifier for the rule
    ruleName: Text;                  // Name of the rule
    description: Text;               // Description of the rule
    totalFees: Text;                 // Represented as a range (e.g., "0.01% - 0.05%")
    assetType: Text;                 // Type of asset (e.g., "crypto")
    operatorAcceptance: [Text];      // Operators that accept this rule
    // Detailed information (initially empty)
    sendingAreas: ?[Text];           // Optional areas for sending transactions
    withdrawalCrypto: ?Bool;         // Whether crypto withdrawal is allowed
    receivingAreas: ?[Text];         // Optional receiving areas
    receivingIndustry: ?Text;        // Optional targeted industry
    amountRange: ?Text;              // Optional range of transaction amounts
    foundationFees: ?{ feePerTransaction: Text; allocationGroup: Text };
    stakingFees: ?{ feePerTransaction: Text; allocationGroup: Text };
    operatorFees: ?{ feePerTransaction: Text; allocationGroup: Text };
    thirdPartyFees: ?{ feePerTransaction: Text; allocationGroup: Text; thirdPartyIdentifier: Text };
  };

  var transactionRulesMap = HashMap.HashMap<Text, TransactionRule>(0, Text.equal, Text.hash);

  public func addTransactionRuleNew(ruleId: Text,ruleName:Text,description:Text,totalFees:Text,assetType:Text,operatorAcceptance:[Text]): async Bool {
    switch (transactionRulesMap.get(ruleId)) {
        case (null) {
        transactionRulesMap.put(ruleId, {
        id = ruleId;
        ruleName = ruleName;
        description = description;
        totalFees = totalFees;
        assetType = assetType;
        operatorAcceptance = operatorAcceptance;
        // Initialize optional fields as null
        sendingAreas = null;
        withdrawalCrypto = null;
        receivingAreas = null;
        receivingIndustry = null;
        amountRange = null;
        foundationFees = null;
        stakingFees = null;
        operatorFees = null;
        thirdPartyFees = null;
    });
    return true;
        };
        case(?val){
          return false; // Cannot update details for a rule that doesn't exist
        };
    };
  
  };

  public func addTransactionRuleDetails(ruleId: Text, details: {
    sendingAreas: [Text];
    withdrawalCrypto: Bool;
    receivingAreas: [Text];
    receivingIndustry: Text;
    amountRange: Text;
    foundationFees: { feePerTransaction: Text; allocationGroup: Text };
    stakingFees: { feePerTransaction: Text; allocationGroup: Text };
    operatorFees: { feePerTransaction: Text; allocationGroup: Text };
    thirdPartyFees: { feePerTransaction: Text; allocationGroup: Text; thirdPartyIdentifier: Text };
  }): async Bool {
    switch (transactionRulesMap.get(ruleId)) {
      case (null) {
        return false; // Cannot update details for a rule that doesn't exist
      };
      case (?rule) {
        transactionRulesMap.put(ruleId, {
          id = rule.id;
          ruleName = rule.ruleName;
          description = rule.description;
          totalFees = rule.totalFees;
          assetType = rule.assetType;
          operatorAcceptance = rule.operatorAcceptance;
          // Update the details
          sendingAreas = ?details.sendingAreas;
          withdrawalCrypto = ?details.withdrawalCrypto;
          receivingAreas = ?details.receivingAreas;
          receivingIndustry = ?details.receivingIndustry;
          amountRange = ?details.amountRange;
          foundationFees = ?details.foundationFees;
          stakingFees = ?details.stakingFees;
          operatorFees = ?details.operatorFees;
          thirdPartyFees = ?details.thirdPartyFees;
        });
        return true;
      };
    };
  };

  public query func getTransactionRule(ruleId: Text): async ?TransactionRule {
    return transactionRulesMap.get(ruleId);
  };
  public query func getAllTransactionRules(): async [TransactionRule] {
    return Iter.toArray(transactionRulesMap.vals());
  };
  public func deleteTransactionRule(ruleId: Text): async Bool {
    return transactionRulesMap.remove(ruleId) != null;
  };
  //=================================================================

  //=================================================================================
  //====================================
  //======Page 5  Management===========//
  // ===== Transacntion Management =====
  //====================================

  type Announcement = {
    id: Text; // Unique ID for the announcement
    message: Text; // The content of the announcement
    createdBy: Text; // The user who created the announcement
    createdAt: Int; // Timestamp of creation
    updatedAt: ?Int; // Optional timestamp of the last update
    isPublished: Bool; // Indicates whether the announcement is published
  };

 var internalAnnouncements: HashMap.HashMap<Text, Announcement> = HashMap.HashMap<Text, Announcement>(0, Text.equal, Text.hash);
 var publicAnnouncements: HashMap.HashMap<Text, Announcement> = HashMap.HashMap<Text, Announcement>(0, Text.equal, Text.hash);

// Add or update an internal announcement
public func addOrUpdateInternalAnnouncement(id: Text, message: Text, createdBy: Text, isPublished: Bool): async Bool {
  let timestamp = Time.now();
  let announcement = {
    id = id;
    message = message;
    createdBy = createdBy;
    createdAt = timestamp;
    updatedAt = ?timestamp;
    isPublished = isPublished;
  };
  internalAnnouncements.put(id, announcement);
  return true;
};

// Get all internal announcements
public query func getInternalAnnouncements(): async [Announcement] {
  return Iter.toArray(internalAnnouncements.vals());
};

// Publish an internal announcement
public func publishInternalAnnouncement(id: Text): async Bool {
  switch (internalAnnouncements.get(id)) {
    case (?announcement) {
      internalAnnouncements.put(
        id,
        {
          announcement with
          isPublished = true;
          updatedAt = ?Time.now();
        }
      );
      return true;
    };
    case null { return false; };
  };
};

// Unpublish an internal announcement
public func unpublishInternalAnnouncement(id: Text): async Bool {
  switch (internalAnnouncements.get(id)) {
    case (?announcement) {
      internalAnnouncements.put(
        id,
        {
          announcement with
          isPublished = false;
          updatedAt = ?Time.now();
        }
      );
      return true;
    };
    case null { return false; };
  };
};
// Add or update a public announcement
public func addOrUpdatePublicAnnouncement(id: Text, message: Text, createdBy: Text, isPublished: Bool): async Bool {
  let timestamp = Time.now();
  let announcement = {
    id = id;
    message = message;
    createdBy = createdBy;
    createdAt = timestamp;
    updatedAt =  ?timestamp;
    isPublished = isPublished;
  };
  publicAnnouncements.put(id, announcement);
  return true;
};

// Get all public announcements
public query func getPublicAnnouncements(): async [Announcement] {
  return Iter.toArray(publicAnnouncements.vals());
};

// Publish a public announcement
public func publishPublicAnnouncement(id: Text): async Bool {
  switch (publicAnnouncements.get(id)) {
    case (?announcement) {
      publicAnnouncements.put(
        id,
        {
          announcement with
          isPublished = true;
          updatedAt = ?Time.now();
        }
      );
      return true;
    };
    case null { return false; };
  };
};

// Unpublish a public announcement
public func unpublishPublicAnnouncement(id: Text): async Bool {
  switch (publicAnnouncements.get(id)) {
    case (?announcement) {
      publicAnnouncements.put(
        id,
        {
          announcement with
          isPublished = false;
          updatedAt = ?Time.now();
        }
      );
      return true;
    };
    case null { return false; };
  };
};


//===================================================================//

type QuickLink = {
  id: Text;           // Unique ID for the link
  name: Text;         // Link name
  url: Text;          // Link URL
  createdAt: Int;     // Timestamp of creation
  updatedAt: ?Int;    // Optional timestamp of last update
};

var quickLinks: HashMap.HashMap<Text, QuickLink> = HashMap.HashMap<Text, QuickLink>(0, Text.equal, Text.hash);

// Add or update a quick link
public func addOrUpdateQuickLink(id: Text, name: Text, url: Text): async Bool {
  let timestamp = Time.now();
  let quickLink = {
    id = id;
    name = name;
    url = url;
    createdAt =timestamp;
    updatedAt = ?timestamp;
  };
  quickLinks.put(id, quickLink);
  return true;
};

// Get all quick links
public query func getQuickLinks(): async [QuickLink] {
  return Iter.toArray(quickLinks.vals());
};

// Delete a quick link
public func deleteQuickLink(id: Text): async Bool {
  return quickLinks.remove(id) != null;
};

// Retrieve a specific quick link by ID
public query func getQuickLinkById(id: Text): async ?QuickLink {
  return quickLinks.get(id);
};

// Update the URL of an existing link
public func updateQuickLinkUrl(id: Text, url: Text): async Bool {
  switch (quickLinks.get(id)) {
    case (?link) {
      quickLinks.put(
        id,
        {
          link with
          url = url;
          updatedAt = ?Time.now();
        }
      );
      return true;
    };
    case null {
      return false; // Link not found
    };
  };
};

// Define a type for Policies
type Policy = {
  id: Text; // Unique ID for the policy
  name: Text; // Policy name
  applicability: Text; // Applicability of the policy (e.g., Regional Operators)
  responsibleEntity: Text; // Responsible entity for the policy
  link: Text; // Link to the policy document
  workingDirectory: ?Text; // Optional working directory link
  focalPoint: ?Text; // Email of the focal point
  createdAt: Int; // Timestamp of creation
  updatedAt: ?Int; // Optional timestamp for updates
};

// HashMap to store policies
 var policies: HashMap.HashMap<Text, Policy> = HashMap.HashMap<Text, Policy>(0, Text.equal, Text.hash);

// Function to add or update a policy
public func addOrUpdatePolicy(
  id: Text,
  name: Text,
  applicability: Text,
  responsibleEntity: Text,
  link: Text,
  workingDirectory: ?Text,
  focalPoint: ?Text
): async Bool {
  let timestamp = Time.now();
  let policy = {
    id = id;
    name = name;
    applicability = applicability;
    responsibleEntity = responsibleEntity;
    link = link;
    workingDirectory = workingDirectory;
    focalPoint = focalPoint;
    createdAt = timestamp;
    updatedAt =  ?timestamp;
  };
  policies.put(id, policy);
  return true;
};

// Function to retrieve all policies
public query func getPolicies(): async [Policy] {
  return Iter.toArray(policies.vals());
};

// Function to retrieve a policy by ID
public query func getPolicyById(id: Text): async ?Policy {
  return policies.get(id);
};

// Function to delete a policy
public func deletePolicy(id: Text): async Bool {
  return policies.remove(id) != null;
};


//======================Old==========================================//
  public func editTransactionFee(
      id: Text,
      ruleName: ?Text,
      totalFees: ?Nat,
      assetType: ?Text,
      operator: ?Text,
      description: ?Text
  ): async Text {
      switch (transactionFees.get(id)) {
          case (null) {
              return "Transaction fee does not exist.";
          };
          case (?fee) {
              let updatedFee = {
                  fee with
                  ruleName = Option.get(ruleName, fee.ruleName);
                  totalFees = Option.get(totalFees, fee.totalFees);
                  assetType = Option.get(assetType, fee.assetType);
                  operator = Option.get(operator, fee.operator);
                  description = Option.get(description, fee.description);
              };
              transactionFees.put(id, updatedFee);
              return "Transaction fee updated successfully.";
          };
      };
  };


    //================Page 3 Simple =========
    // ===== Transaction Fees Management =====

  public query func getTransactionFeeMetrics() : async {
      totalCollected: Nat;
      totalAllocated: Nat;
      totalPending: Nat;
  } {
      var totalCollected: Nat = 0;
      var totalAllocated: Nat = 0;
      var totalPending: Nat = 0;

      // Convert the array to an iterable using Iter.fromArray
      let transactionFeeIter = Iter.fromArray(Iter.toArray(transactionFees.vals()));

      for (fee in transactionFeeIter) {
          totalCollected += fee.totalFees; // Sum all fees
      };

      // Example logic for allocated and pending amounts
      totalAllocated := totalCollected / 2; // Divide by 2 for demonstration
      totalPending := totalCollected - totalAllocated;

      return {
          totalCollected = totalCollected;
          totalAllocated = totalAllocated;
          totalPending = totalPending;
      };
  };

  public query func getTransactionFeesByOperator(operator: Text) : async [TransactionFee] {
      return Iter.toArray(
          Iter.filter<TransactionFee>(
              transactionFees.vals(),
              func(fee: TransactionFee) : Bool {
                  fee.operator == operator;
              }
          )
      );
  };
  public func addTransactionRule(
      id: Text,
      ruleName: Text,
      totalFees: Nat,
      assetType: Text,
      operator: Text,
      description: Text
  ) : async Text {
      let newRule: TransactionFee = {
          id = id;
          ruleName = ruleName;
          totalFees = totalFees;
          assetType = assetType;
          operator = operator;
          description = description;
      };
      transactionFees.put(id, newRule);
      return "Transaction rule added successfully.";
  };

  // public func deleteTransactionRule(id: Text) : async Text {
  //     switch (transactionFees.get(id)) {
  //         case (null) { return "Rule not found."; };
  //         case (_) {
  //             transactionFees.delete(id);
  //             return "Rule deleted successfully.";
  //         };
  //     };
  // };

  public func assignRuleToOperators(ruleId: Text, operators: [Text]) : async Text {
      switch (transactionFees.get(ruleId)) {
          case (null) {
              return "Transaction rule not found.";
          };
          case (?fee) {
              for (operator in operators.vals()) {
                  // You can add logic here to verify if the operator exists
                  let updatedFee = {
                      fee with operator = Text.concat(fee.operator, ", " # operator)
                  };
                  transactionFees.put(ruleId, updatedFee);
              };
              return "Rule assigned to operators successfully.";
          };
      };
  };

  public func updateDashboardMetrics(
      collectedFees: ?Nat,
      allocatedFees: ?Nat,
      pendingFees: ?Nat
  ) : async Text {
      var updatedCollectedFees = Option.get(collectedFees, 0);
      var updatedAllocatedFees = Option.get(allocatedFees, 0);
      var updatedPendingFees = Option.get(pendingFees, 0);

      // Logic to store or update these values in state

      return "Dashboard metrics updated successfully.";
  };


  public func addTransactionFee(
    id: Text,
    ruleName: Text,
    totalFees: Nat,
    assetType: Text,
    operator: Text,
    description: Text
  ): async Text {
    let newFee = {
      id = id;
      ruleName = ruleName;
      totalFees = totalFees;
      assetType = assetType;
      operator = operator;
      description = description;
    };
    transactionFees.put(id, newFee);
    return "Transaction fee added successfully.";
  };

  public query func getTransactionFees(): async [TransactionFee] {
    return Iter.toArray(transactionFees.vals());
  };

      //================Page 3 Details =========

  public query func getFeeDetails(ruleId: Text) : async ?TransactionFee {
      return transactionFees.get(ruleId);
  };

  public func addGeolocationRule(
      id: Text,
      ruleName: Text,
      totalFees: Nat,
      assetType: Text,
      operator: Text,
      sendingAreas: [Text], // e.g., ["All", "Except BY, RU"]
      receivingAreas: [Text],
      description: Text
  ) : async Text {
      // Helper function to join a list of Text with a separator
      let joinText = func(arr: [Text], separator: Text) : Text {
          if (Array.size(arr) == 0) {
              return ""; // Return empty string if the array is empty
          } else {
              var result = arr[0];
              for (i in Iter.range(1, Array.size(arr) - 1)) {
                  result #= separator # arr[i];
              };
              return result;
          }
      };

      // Convert the sending and receiving areas into Text
      let sendingAreasText = joinText(sendingAreas, ", ");
      let receivingAreasText = joinText(receivingAreas, ", ");

      // Create the new rule
      let newRule: TransactionFee = {
          id = id;
          ruleName = ruleName;
          totalFees = totalFees;
          assetType = assetType;
          operator = operator;
          description = description # 
                        " | Sending Areas: " # sendingAreasText # 
                        " | Receiving Areas: " # receivingAreasText;
      };
      transactionFees.put(id, newRule);
      return "Geolocation rule added successfully.";
  };


  public query func getFeesByCategory(category: Text) : async [TransactionFee] {
      return Iter.toArray(
          Iter.filter<TransactionFee>(
              transactionFees.vals(),
              func(fee: TransactionFee) : Bool {
                  fee.operator == category; // Match category (e.g., "Foundation Fees")
              }
          )
      );
  };

  public func linkFeeToTreasury(ruleId: Text, treasuryId: Text) : async Text {
      switch (transactionFees.get(ruleId)) {
          case (null) { return "Rule not found."; };
          case (?fee) {
              let updatedFee = { fee with description = fee.description # " | Treasury: " # treasuryId };
              transactionFees.put(ruleId, updatedFee);
              return "Fee linked to treasury successfully.";
          };
      };
  };

  public func addFeeRangeRule(
      id: Text,
      ruleName: Text,
      minAmount: Nat,
      maxAmount: Nat,
      totalFees: Nat,
      assetType: Text,
      operator: Text,
      description: Text
  ) : async Text {
      let newRule: TransactionFee = {
          id = id;
          ruleName = ruleName # " ($" # Nat.toText(minAmount) # " - $" # Nat.toText(maxAmount) # ")";
          totalFees = totalFees;
          assetType = assetType;
          operator = operator;
          description = description;
      };
      transactionFees.put(id, newRule);
      return "Fee range rule added successfully.";
  };

  // ===============================================//
  //================Page 4 Section 1 =========
  // ===============================================//

// Define unified product type
  type Product2 = {
      id: Text;
      name: Text;
      price: Nat;
      productOwner: Text;
      salesChannel: Text;
      payment: ?PaymentDetails;
      profitSplit: ?ProfitSplit;
      terms: ?Terms;
      localization: ?LocalizationDetails;
  };

  // Define payment details type
  type PaymentDetails = {
      actualPrice: Nat;
      allowCryptoPayments: Bool;
      allowCardPayments: Bool;
      allowBankTransfer: Bool;
      voucherReference: ?Text;
      allowVoucherPayments: Bool;  // New field
      issueDate: Text;             // New field
      annualRenewalFee: Bool;
  };

  // Define profit split type
  type ProfitSplit = {
      foundationPart: Nat;
      operatorPart: Nat;
      stakingPart: Nat;
      thirdPartyPart: Nat;
      thirdPartyIdentifier: ?Text;
  };

  // Define terms type
  type Terms = {
      applyGeneralTerms: Bool;
      termsLink: ?Text;
  };

  // Define localization details type
  type LocalizationDetails = {
      countries: [Text];
  };

  // Single HashMap to store products and their details
  var productsMap = HashMap.HashMap<Text, Product2>(0, Text.equal, Text.hash);

  public func addOrUpdateProduct(
      id: Text,
      name: Text,
      price: Nat,
      productOwner: Text,
      salesChannel: Text,

    ): async Bool {
        productsMap.put(
            id,
            {
                id = id;
                name = name;
                price = price;
                productOwner = productOwner;
                salesChannel = salesChannel;
                payment = null;
                profitSplit = null;
                terms = null;
                localization = null;
            }
        );
        return true;
    };

    public query func getAllProducts(): async [Product2] {
      return Iter.toArray(productsMap.vals());
    };
    public query func getProduct(id: Text): async ?Product2 {
        return productsMap.get(id);
    };
    public func deleteProduct(id: Text): async Bool {
        return productsMap.remove(id) != null;
    };

    public func configurePaymentOptions(
        productId: Text,
        actualPrice: Nat,
        allowCryptoPayments: Bool,
        allowCardPayments: Bool,
        allowBankTransfer: Bool,
        voucherReference: Text,
        allowVoucherPayments:Bool,
        issueDate:Text,
        annualRenewalFee: Bool
    ): async Text {
      switch (productsMap.get(productId)) {
          case null {
              return "Product not found.";
          };
          case (?product) {
              let updatedPaymentDetails = {
                  actualPrice = actualPrice;
                  allowCryptoPayments = allowCryptoPayments;
                  allowCardPayments = allowCardPayments;
                  allowBankTransfer = allowBankTransfer;
                  voucherReference = ?voucherReference;
                  annualRenewalFee = annualRenewalFee;
                  allowVoucherPayments= allowVoucherPayments;  // New field
                  issueDate= issueDate;             // New field
              };

              let updatedProduct = { product with payment = ?updatedPaymentDetails };
              productsMap.put(productId, updatedProduct);
              return "Payment options updated successfully.";
            };
        };
    };


    public func configureProfitSplit(
        productId: Text,
        foundationPart: Nat,
        operatorPart: Nat,
        stakingPart: Nat,
        thirdPartyPart: Nat,
        thirdPartyIdentifier: Text
    ): async Text {
        switch (productsMap.get(productId)) {
            case null {
                return "Product not found.";
            };
            case (?product) {
                let updatedProfitSplit = {
                    foundationPart = foundationPart;
                    operatorPart = operatorPart;
                    stakingPart = stakingPart;
                    thirdPartyPart = thirdPartyPart;
                    thirdPartyIdentifier = ?thirdPartyIdentifier;
                };

                let updatedProduct = { product with profitSplit = ?updatedProfitSplit };
                productsMap.put(productId, updatedProduct);
                return "Profit split updated successfully.";
            };
        };
    };

      public func configureTerms(
          productId: Text,
          applyGeneralTerms: Bool,
          termsLink: Text
      ): async Text {
          switch (productsMap.get(productId)) {
              case null {
                  return "Product not found.";
              };
              case (?product) {
                  let updatedTerms = {
                      applyGeneralTerms = applyGeneralTerms;
                      termsLink = ?termsLink;
                  };

                  let updatedProduct = { product with terms = ?updatedTerms };
                  productsMap.put(productId, updatedProduct);
                  return "Terms updated successfully.";
              };
          };
      };

    public func configureLocalization(
        productId: Text,
        countries: [Text]
      ): async Text {
          switch (productsMap.get(productId)) {
              case null {
                  return "Product not found.";
              };
              case (?product) {
                  let updatedLocalization = {
                      countries = countries;
                  };

                  let updatedProduct = { product with localization = ?updatedLocalization };
                  productsMap.put(productId, updatedProduct);
                  return "Localization updated successfully.";
              };
          };
      };

    // ===== Old Products Management =====
    public func addProduct(id: Text, name: Text, price: Nat, productOwner: Text, salesChannel: Text): async Text {
      let newProduct = {
        id = id;
        name = name;
        price = price;
        productOwner = productOwner;
        salesChannel = salesChannel;
        description = "";
      };
      products.put(id, newProduct);
      return "Product added successfully.";
    };

    public query func getProducts(): async [Product] {
      return Iter.toArray(products.vals());
    };


      // ===============================================//
    //================Page 4 Section 2 =========
    // ===============================================//

    public func updatePriceConfiguration(
        productId: Text,
        actualPrice: Nat,
        defaultPrice: Nat
    ) : async Text {
        switch (products.get(productId)) {
            case null { return "Product does not exist."; };
            case (?product) {
                let updatedProduct = {
                    product with
                    price = actualPrice; // Set the actual price
                    description = Text.concat(product.description, 
                        " | Default Price: $" # Nat.toText(defaultPrice)
                    );
                };
                products.put(productId, updatedProduct);
                return "Price configuration updated successfully.";
            };
        };
    };
  
  
  public func configurePaymentMethods(
      productId: Text,
      enableCrypto: Bool,
      enableCreditCard: Bool,
      enableBankTransfer: Bool
  ) : async Text {
      switch (products.get(productId)) {
          case null { return "Product does not exist."; };
          case (?product) {
              let updatedProduct = {
                  product with
                  description = Text.concat(product.description, 
                      " | Payment Methods: " #
                      (if enableCrypto { "Crypto " } else { "" }) #
                      (if enableCreditCard { "Credit Card " } else { "" }) #
                      (if enableBankTransfer { "Bank Transfer" } else { "" })
                  );
              };
              products.put(productId, updatedProduct);
              return "Payment methods configured successfully.";
          };
      };
  };


  public func setVoucherPayment(
      productId: Text,
      enableVoucher: Bool,
      voucherReference: ?Text
  ) : async Text {
      switch (products.get(productId)) {
          case null { return "Product does not exist."; };
          case (?product) {
              let updatedProduct = {
                  product with
                  salesChannel = if enableVoucher {
                      Option.get(voucherReference, product.salesChannel)
                  } else {
                      product.salesChannel
                  };
              };
              products.put(productId, updatedProduct);
              return "Voucher payment configured successfully.";
          };
      };
  };

  public func configureRecurringFees(
      productId: Text,
      recurrenceOption: Text // "1st of January" or "Initial Purchase Day"
  ) : async Text {
      switch (products.get(productId)) {
          case null { return "Product does not exist."; };
          case (?product) {
              let updatedProduct = {
                  product with
                  description = Text.concat(product.description, 
                      " | Recurrence: " # recurrenceOption
                  );
              };
              products.put(productId, updatedProduct);
              return "Recurring fee settings updated successfully.";
          };
      };
  };

  // ===============================================//
  //================Page 4 Section 3 =========
  // ===============================================//
  public func configureTabs(
      productId: Text,
      tabs: [Text]
  ) : async Text {
      switch (products.get(productId)) {
          case null { return "Product does not exist."; };
          case (?product) {
              // Join the array of tabs into a single Text using Array.fold
              let tabsText = Array.foldLeft<Text, Text>(
                  tabs, 
                  "", 
                  func(acc: Text, tab: Text): Text {
                      if (acc == "") {
                          tab // First element, no separator
                      } else {
                          acc # ", " # tab // Add separator for subsequent elements
                      }
                  }
              );
              let updatedProduct = {
                  product with
                  description = product.description # " | Tabs: " # tabsText
              };
              products.put(productId, updatedProduct);
              return "Tabs configured successfully.";
          };
      };
  };

  public func configureTermsOfService(
      productId: Text,
      applyGeneralTerms: Bool,
      termsLink: ?Text
  ) : async Text {
      switch (products.get(productId)) {
          case null { 
              return "Product does not exist."; 
          };
          case (?product) {
              let updatedDescription = product.description #
                  (if (applyGeneralTerms) { " | General Terms: Applied" } else { " | General Terms: Not Applied" }) #
                  (switch termsLink {
                      case null { "" };
                      case (?link) { " | Terms Link: " # link };
                  });
              let updatedProduct = {
                  product with
                  description = updatedDescription
              };
              products.put(productId, updatedProduct);
              return "Terms of Service configuration updated successfully.";
          };
      };
  };


  // ===============================================//
  //================Page 4 Section 4 =========
  // ===============================================//
  // Stable variable for storing Key Account Managers
  private var keyAccountManagers : HashMap.HashMap<Text, Text> = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  // Stable variable for storing Supervisors
  private var supervisors : HashMap.HashMap<Text, Text> = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  // Stable variable for CRM Teams
  private  var crmTeams : HashMap.HashMap<Text, { name: Text; email: Text }> = HashMap.HashMap<Text, { name: Text; email: Text }>(0, Text.equal, Text.hash);

  // Stable variable for CRM Automation settings
  private  var crmAutomation : HashMap.HashMap<Text, Bool> = HashMap.HashMap<Text, Bool>(0, Text.equal, Text.hash);

  // Stable variable for CRM Tool Integration
  private  var crmToolIntegration : HashMap.HashMap<Text, Text> = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  public func assignKeyAccountManager(userId: Text, managerEmail: Text) : async Text {
    if (users1.get(userId) == null) {
      return "User not found.";
    };
    keyAccountManagers.put(userId, managerEmail);
    return "Key Account Manager assigned successfully.";
  };

  public func assignSupervisor(userId: Text, supervisorEmail: Text) : async Text {
    if (users1.get(userId) == null) {
      return "User not found.";
    };
    supervisors.put(userId, supervisorEmail);
    return "Supervisor assigned successfully.";
  };

  public func addCRMTeam(email: Text, teamName: Text) : async Text {
    switch (crmTeams.get(email)) {
      case(?data){
        return "already exsists";
      };
      case null
      {
        crmTeams.put(email, { name = teamName; email = email });
      };
    };
    crmTeams.put(email, { name = teamName; email = email });
    return "CRM Team added successfully.";
  };

  public func updateCRMTeam(email: Text, newTeamName: Text) : async Text {
    switch (crmTeams.get(email)) {
      case null {
        return "CRM Team not found.";
      };
      case (?team) {
        crmTeams.put(email, { team with name = newTeamName });
        return "CRM Team updated successfully.";
      };
    };
  };

  public query func getKeyAccountManager(userId: Text) : async ?Text {
    return keyAccountManagers.get(userId);
  };

  public query func getSupervisor(userId: Text) : async ?Text {
    return supervisors.get(userId);
  };
  
  public query func getCRMTeam(email: Text) : async ?{ name: Text; email: Text } {
    return crmTeams.get(email);
  };

  public query func listCRMTeams() : async [{ name: Text; email: Text }] {
    return Iter.toArray(crmTeams.vals());
  };

  public func integrateCRMTool(userId: Text, crmUrl: Text) : async Text {
    if (users1.get(userId) == null) {
      return "User not found.";
    };
  
    crmToolIntegration.put(userId, crmUrl);
    return "CRM tool integrated successfully.";
  };

  public query func getCRMToolIntegration(userId: Text) : async ?Text {
    return crmToolIntegration.get(userId);
  };

  public func toggleCRMAutomation(userId: Text, enable: Bool) : async Text {
    if (users1.get(userId) == null) {
      return "User not found.";
    };
    crmAutomation.put(userId, enable);
    return if (enable) {
      "CRM automation enabled."
    } else {
      "CRM automation disabled.";
    };
  };

  public query func isCRMAutomationEnabled(userId: Text) : async ?Bool {
    return crmAutomation.get(userId);
  };

  // ===== Foundation Overview =====
  public query func getFoundationOverview(): async {
    totalUsers: Nat;
    totalEnterprises: Nat;
    totalTransactions: Nat;
    totalRevenue: Nat;
  } {
    return {
      totalUsers = 36000; // Placeholder for actual logic
      totalEnterprises = 8000; // Placeholder for actual logic
      totalTransactions = 10000000; // Placeholder for actual logic
      totalRevenue = 500000; // Placeholder for actual logic
    };
  };

  // ===============================================//
  //================Page 4 Section 5 =========
  // ===============================================//

  //================================
  //================================
  // Initialize supportedCountries as a HashMap with unique country codes
   var supportedCountries: HashMap.HashMap<Text, Bool> = HashMap.HashMap<Text, Bool>(
        0, // Initial capacity
        Text.equal, // Equality function for Text keys
        Text.hash // Hash function for Text keys
    );
    /// Adds a country to the HashMap if it doesn't already exist.
    public func addCountry(countryCode: Text): async Bool {
        switch (supportedCountries.get(countryCode)) {
            case (null) {
                supportedCountries.put(countryCode, true); // Add to the map
                return true; // Country added
            };
            case (_) {
                return false; // Country already exists
            };
        };
    };

    /// Removes a country from the HashMap if it exists.
    public func removeCountry(countryCode: Text): async Bool {
        switch (supportedCountries.remove(countryCode)) {
            case (null) {
                return false; // Country not found
            };
            case (_) {
                return true; // Country removed
            };
        };
    };

     /// Retrieves the list of supported countries as an array.
    public func getSupportedCountries(): async [Text] {
        // Convert the iterator to an array
        var countries: [Text] = [];
        let iter = supportedCountries.keys();
        var next = iter.next();
        while (Option.isSome(next)) {
            countries := Array.append(countries, [Option.unwrap(next)]);
            next := iter.next();
        };
        return countries;
    };
  // Function to update public law entity details
  

  //==============================================================
  //Personal Record logic
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

  //==============================================================
  //Group ids logic
  //==============================================================//
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
  // Get funcyoon
  public func getGroupIdsByUserId(userId : Text) : async [Text] {
    let groupIdsBuffer = groupIds.get(userId);
    switch (groupIdsBuffer) {
      case (null) { return [] }; // No groups found for this user, returning an empty list
      case (?buffer) { return Buffer.toArray<Text>(buffer) }; // Convert the buffer to a vector and return it
    };
  };

  //=====================================================================================
  //Operator Logic
  //=====================================================================================

  // Enum to differentiate operator types

  type UnifiedOperator = {
  id: Text;                          // Unique identifier for the operator
  name: Text;                        // Name of the operator
  operatorType: OperatorType;        // Type of the operator (Regional or Foundation)
  exclusiveCountries: [Text];        // Exclusive countries for the operator
  superAdminId: ?Text;               // Optional super admin ID
  defaultGroupId: ?Text;             // Optional default group ID
  nominatedCEO: ?Text;               // Nominated CEO
  nominatedComplianceOfficer: ?Text; // Nominated Compliance Officer
  nominatedDirector: ?Text;          // Nominated Director
  knownUsers: ?[Text];               // Known users for the operator
  clients: ?[Text];                  // Clients associated with the operator
  records: ?[Text];                  // Records associated with the operator
};

// Define the OperatorType enum for Regional and Foundation Operators
type OperatorType = {
  #RegionalOperator: RegionalOperator;
  #FoundationOperator: FoundationOperator;
};

// Define RegionalOperator subtype
type RegionalOperator = {
  staffCount: Nat;
  balance: Nat;
  totalRevenue: Nat;
  license: Text;                     // License information
  nonExclusiveAreas: [Text];
  exclusiveAreas: [Text];
  crmTeam: ?Text;                    // CRM team responsible for the operator
  since: Text;                       // Date of operation start
};


// Define FoundationOperator subtype
type FoundationOperator = {
  staffCount: Nat;
  balance: Nat;
  totalRevenue: Nat;
  license: Text;                     // License information
  nonExclusiveAreas: [Text];
  exclusiveAreas: [Text];
  crmTeam: ?Text;
  since: Text;
  complianceOfficer: ?Text;          // Compliance officer for the foundation
  termsOfService: ?Text;             // Terms of service for the foundation
};

 type OperatorNew = {
    id: Text;                          // Unique identifier for the operator
    name: Text;                        // Name of the operator
    operatorType: OperatorType;        // Type of the operator (Regional or Foundation)
  };

  let operators = HashMap.HashMap<Text, UnifiedOperator>(0, Text.equal, Text.hash);

  // Function to add a new operator
  public func addOperator(
    id: Text,
    name: Text,
    operatorType: OperatorType,
    exclusiveCountries: [Text],
    superAdminId: ?Text,
    defaultGroupId: ?Text,
    nominatedCEO: ?Text,
    nominatedComplianceOfficer: ?Text,
    nominatedDirector: ?Text,
    knownUsers: ?[Text],
    clients: ?[Text],
    records: ?[Text]
  ): async Text {
  switch(operators.get(id)){
    case(?value)
    {
      return "Already exsists";
    };
    case(null)
    {
    let newOperator: UnifiedOperator = {
        id = id;
        name = name;
        operatorType = operatorType;
        exclusiveCountries = exclusiveCountries;
        superAdminId = superAdminId;
        defaultGroupId = defaultGroupId;
        nominatedCEO = nominatedCEO;
        nominatedComplianceOfficer = nominatedComplianceOfficer;
        nominatedDirector = nominatedDirector;
        knownUsers = knownUsers;
        clients = clients;
        records = records;
      };

      operators.put(id, newOperator);
      return "Operator added successfully.";
    }
  };

  };

  // Query function to get an operator by ID
  public query func getOperator(id: Text): async ?UnifiedOperator {
    return operators.get(id);
  };

  // Query function to get all operators
  public query func getOperators(): async [UnifiedOperator] {
    return Iter.toArray(operators.vals());
  };

  // Function to delete an operator
  public func deleteOperator(id: Text): async Text {
    if (operators.remove(id) == null) {
      return "Operator not found.";
    };
    return "Operator deleted successfully.";
  };
  //============================================================

  type ReferralCode = {
    code : Text;
    ownerId : Text; // The user who generated the referral code
    usageCount : Nat; // Number of times the code has been used successfully
    createdAt : Int; // Timestamp of when the code was created
  };

  private stable var referralCodeEntries : [(Text, ReferralCode)] = [];
  var referralCodes = HashMap.HashMap<Text, ReferralCode>(0, Text.equal, Text.hash);

  public func generateReferralCode(ownerId : Text) : async Text {

    let seed = await Random.blob();
    let finiteRandom = Random.Finite(seed);
    let randNatOpt = finiteRandom.range(255); // Generate number between 0 and 255 (Nat8)

    switch (randNatOpt) {
      case (null) {
        return "000000"; // Fallback in case of random failure
      };
      case (?randNat) {
        let rand = (randNat * 1000 + randNat) % 900000 + 100000; // Ensure it's a 6-digit number
        let store = Nat.toText(rand);
        let referralCode : ReferralCode = {
          code = store;
          ownerId = ownerId;
          usageCount = 0;
          createdAt = Time.now();
        };

        referralCodes.put(store, referralCode); // Store the referral code
        return store;
      };
    };

  };

  public func redeemReferralCode(code : Text, userId : Text) : async Text {
    switch (referralCodes.get(code)) {
      case (null) {
        return "Referral code not found.";
      };
      case (?referral) {
        if (referral.ownerId == userId) {
          return "You cannot use your own referral code.";
        };

        // Update the usage count
        let updatedReferralCode = {
          referral with
          usageCount = referral.usageCount + 1
        };

        referralCodes.put(code, updatedReferralCode); // Update the referral code

        // Optionally, you can add logic to reward the user or the code owner
        return "Referral code redeemed successfully.";
      };
    };
  };

  public query func getReferralCodeDetails(code : Text) : async ?ReferralCode {
    return referralCodes.get(code);
  };

  public query func getReferralCodesByUser(ownerId : Text) : async [ReferralCode] {
    let codes = Iter.filter<ReferralCode>(
      referralCodes.vals(),
      func(referral) {
        referral.ownerId == ownerId;
      },
    );
    return Iter.toArray(codes);
  };

  //============================================================

  private stable var roleGroupEntries : [(Text, GroupRole)] = [];
  var roleGroups = HashMap.HashMap<Text, GroupRole>(0, Text.equal, Text.hash);

  type Role = {
    #BasicUser;
    #Admin;
    #SuperAdmin;
    #ITSupport;
    #TechSupport;
    #CRMOffice;
    #ExecutiveCommittee;
    #SteeringCommittee;

  };

  type SubgroupType = {
    #SimpleGroup;
    #SteeringCommittee;
    #ExecutiveCommittee;
    // You can add more specific subgroups here if needed
  };

  type FoundationType = {
    #SimpleGroup;
    #SteeringCommittee;
    #ExecutiveCommittee;
  };

  type GroupTypeRole = {
    #Foundation;
    #ITDeveloper;
    #Treasury;
    #RegionalOperator;
    #CertificationBodies;
    #BankingPartners;
    #SoftwarePartner;
    #Advisor;
    #Ambassador;
  };

  type GroupRole = {
    id : Text;
    name : Text;
    groupType : GroupTypeRole;
    roles : [Role];
    privileges : [Text]; // List of specific privileges or metadata
  };

  // Define additional structures for specific functionalities
  type AffiliatePrivileges = {
    groupType : GroupTypeRole;
    privileges : [Text];
  };

  public func createRoleGroup(groupId : Text, name : Text, groupType : GroupTypeRole, roles : [Role]) : async Text {
    let newGroup = {
      id = groupId;
      name = name;
      groupType = groupType;
      roles = roles;
      privileges = [];
    };
    roleGroups.put(groupId, newGroup);
    return "Group created successfully";
  };

  public func assignRole(groupId : Text, role : Role) : async Bool {
    switch (roleGroups.get(groupId)) {
      case (null) { return false };
      case (?group) {
        let updatedRoles = Array.append(group.roles, [role]);
        let updatedGroup = {
          group with roles = updatedRoles
        };
        roleGroups.put(groupId, updatedGroup);
        return true;
      };
    };
  };

  public func getGroupDetails(groupId : Text) : async ?GroupRole {
    return roleGroups.get(groupId);
  };

  // Helper function to add a subgroup to a group
  public func addSubGroup(parentGroupId : Text, childGroupId : Text) : async Bool {
    let parentGroup = roleGroups.get(parentGroupId);
    let childGroup = roleGroups.get(childGroupId);
    switch (parentGroup, childGroup) {
      case (null, _) { return false };
      case (_, null) { return false };
      case (?parent, ?child) {
        // Logic to add child to parent's subgroup list
        // This may require modifying the GroupRole type to include a list of subgroups
        return true;
      };
    };
  };

  public func createSubGroup(parentGroupId : Text, groupId : Text, name : Text, groupType : GroupTypeRole, roles : [Role]) : async Text {
    // Check if parent group exists and is of the correct type
    switch (roleGroups.get(parentGroupId)) {
      case (null) {
        return "Parent group does not exist";
      };
      case (?parent) {
        if (parent.groupType != #Foundation) {
          return "Parent group is not of type Foundation";
        };
        // Create the new subgroup
        let newGroup = {
          id = groupId;
          name = name;
          groupType = groupType;
          roles = roles;
          privileges = [];
          subGroups = [];
          accoundId = "";
          logo = "";

        };
        // Add the new subgroup to the hashmap
        // roleGroups.put(groupId, newGroup);

        // Update the parent group with the new subgroup ID
        // let updatedSubGroups = Array.append(parent.subGroups, [groupId]);
        // let updatedParent = {
        //   parent with subGroups = updatedSubGroups
        // };
        // roleGroups.put(parentGroupId, updatedParent);

        return "Subgroup created successfully and added to parent group";
      };
    };
  };


  private stable var subGroupEntries : [(Text, SubGroup)] = [];
  var subGroups = HashMap.HashMap<Text, SubGroup>(0, Text.equal, Text.hash);

  type SubGroup = {
    adminId : Text;
    groupName : Text;
    groupType : Text;
    personalRecords : [PersonalRecord]; //empty
    accoundId : Text;
  };

  public func createNewSubGroup(
    parentGroupId : Text,
    adminId : Text,
    subGroupName : Text,
    subGroupType : Text,
  ) : async Text {
    switch (groups.get(parentGroupId)) {
      case (null) {
        return "Parent group does not exist.";
      };
      case (?parentGroup) {
        // Generate a unique ID for the subgroup
        let subGroupId = Text.concat(parentGroupId, subGroupName);

        switch (subGroups.get(subGroupId)) {
          case (null) {
            // Create a new SubGroup
            let newSubGroup : SubGroup = {
              adminId = adminId;
              groupName = subGroupName;
              groupType = subGroupType;
              personalRecords = [];
              accoundId = "";
            };

            // Add the new SubGroup to the subGroups HashMap
            subGroups.put(subGroupId, newSubGroup);

            // Optionally, add the SubGroup ID to the parent group's list of subGroups
            let updatedSubGroups = Array.append(parentGroup.subGroups, [subGroupId]);
            let updatedParentGroup = {
              parentGroup with subGroups = updatedSubGroups
            };
            groups.put(parentGroupId, updatedParentGroup);

            return "SubGroup created successfully.";
          };
          case (?existingSubGroup) {
            return "SubGroup with this name already exists within the parent group.";
          };
        };
      };
    };
  };

  //=================================================================================//
  // Big 4
  //=================================================================================//
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
  // public func createFoundation(superAdmin : Principal, superAdminNo2 : Principal, groupOwner : Principal, groupAdmin : Principal) : async Text {
  //   if (foundation != null) {
  //     return "Foundation already exists.";
  //   };
  //   foundation := ?{
  //     superAdmin = superAdmin;
  //     superAdminNo2 = superAdminNo2;
  //     streamingCommittee = [];
  //     executiveCommittee = [];
  //     basicUserGroup = [];
  //     groupOwner = groupOwner;
  //     groupAdmin = groupAdmin;
  //   };
  //   return "Foundation created successfully.";
  // };

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

  public query func getOrganizationDetails() : async (?Treasury, ?Foundation, ?RegionalOperators, ?ITDevelopers) {
    return (treasury, foundation, regionalOperators, itDevelopers);
  };

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

  type TransferType = {
    from_subaccount : ?Subaccount;
    to : Account;
    amount : Tokens;
    fee : ?Tokens;
    memo : ?Memo;
    created_at_time : ?Timestamp;
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

  public func sendTokensToUser(owner : Principal, amount : Nat, secret : Text) : async Text {
    // Calculate the amount and fee based on your requirements
    let transferAmount = amount; // Adjust amount if needed
    let transferFee = 500; // Example fee, adjust as needed
    if (secret != "mysecret") {
      return "Unauthorized";
    };
    // Create the transfer data
    let cowsay = actor ("4j6si-waaaa-aaaap-abzia-cai") : actor {
      icrc1_transfer : (TransferType) -> async Result<TxIndex, TransferError>;
    };

    let mydata : TransferType = {
      to = {
        owner = owner;
        subaccount = null; // Specify subaccount if needed
      };
      amount = transferAmount; // The amount to transfer
      fee = ?transferFee; // Optional fee
      memo = null; // Add a memo if required
      from_subaccount = null; // Specify subaccount if applicable
      created_at_time = null; // Add a timestamp if needed
    };

    // Attempt to perform the transfer
    let transferResult = await cowsay.icrc1_transfer(mydata);

    // Handle the result of the transfer
    // switch (transferResult) {
    //   case (#ok(txIndex)) {
    //     // Debug.print(debug_show ("Transfer successful, TxIndex: " # Nat.toText(txIndex)));
    //     return "Transfer successful with TxIndex: ";
    //   };
    //   case (#err(error)) {
    //     // Handle specific errors accordingly
    //     // switch (error) {
    //     //   case (#InsufficientFunds) {
    //     //     Debug.print(debug_show ("Error: Insufficient funds for transfer."));
    //     //     return "Error: Insufficient funds.";
    //     //   };
    //     //   case (#InvalidRecipient) {
    //     //     Debug.print(debug_show ("Error: Invalid recipient address."));
    //     //     return "Error: Invalid recipient.";
    //     //   };
    //     //   case (#Other) {
    //     //     Debug.print(debug_show ("Error: Unknown transfer error occurred."));
    //     //     return "Error: Unknown transfer error.";
    //     //   };
    //     // };
    //     return "yes";
    //   };
    // };

    switch (transferResult) {
      case (#Ok(txIndex)) {
        Debug.print(debug_show ("Transfer successful, TxIndex: " # Nat.toText(txIndex)));
        return "Transfer successful with TxIndex: " # Nat.toText(txIndex);
      };
      case (#Err(error)) {
        // Handle specific errors accordingly
        switch (error) {
          case (#InsufficientFunds(balanceRecord)) {
            let balance = balanceRecord.balance;
            Debug.print(debug_show ("Error: Insufficient funds for transfer. Available balance: " # Nat.toText(balance)));
            return "Error: Insufficient funds. Available balance: " # Nat.toText(balance);
          };
          case (#BadFee(feeRecord)) {
            let expected_fee = feeRecord.expected_fee;
            Debug.print(debug_show ("Error: Bad fee. Expected fee: " # Nat.toText(expected_fee)));
            return "Error: Bad fee. Expected fee: " # Nat.toText(expected_fee);
          };
          case (#TemporarilyUnavailable) {
            Debug.print(debug_show ("Error: Service temporarily unavailable."));
            return "Error: Service temporarily unavailable.";
          };
          case (#GenericError(errorRecord)) {
            let error_code = errorRecord.error_code;
            let message = errorRecord.message;
            Debug.print(debug_show ("Error: " # message # " (code: " # Nat.toText(error_code) # ")"));
            return "Error: " # message # " (code: " # Nat.toText(error_code) # ")";
          };
          case (#TooOld) {
            Debug.print(debug_show ("Error: Transaction too old."));
            return "Error: Transaction too old.";
          };
          case (#Duplicate(duplicateRecord)) {
            let duplicate_of = duplicateRecord.duplicate_of;
            Debug.print(debug_show ("Error: Duplicate transaction. Duplicate of TxIndex: " # Nat.toText(duplicate_of)));
            return "Error: Duplicate transaction. Duplicate of TxIndex: " # Nat.toText(duplicate_of);
          };
          case (#CreatedInFuture(timeRecord)) {
            let ledger_time = timeRecord.ledger_time;
            Debug.print(debug_show ("Error: Transaction created in the future."));
            return "Error: Transaction created in the future at ledger time: " # Nat64.toText(ledger_time);
          };
          case (#BadBurn(burnRecord)) {
            let min_burn_amount = burnRecord.min_burn_amount;
            Debug.print(debug_show ("Error: Bad burn amount. Minimum required: " # Nat.toText(min_burn_amount)));
            return "Error: Bad burn amount. Minimum required: " # Nat.toText(min_burn_amount);
          };
          case (_) {
            // Catch-all case for other errors
            Debug.print(debug_show ("Error: Unknown transfer error occurred."));
            return "Error: Unknown transfer error.";
          };
        };
      };
      case (_) {
        // Catch-all case for unhandled patterns
        Debug.print(debug_show ("Error: Unexpected pattern in transfer result."));
        return "Error: Unexpected pattern in transfer result.";
      };
    };
  };

  //=================================================================================//

  // Function to get the total number of users

  private func countIter(iter : Iter.Iter<Text>) : Nat {
    var count : Nat = 0;
    loop {
      switch (iter.next()) {
        case null {};
        case (?_) {
          count += 1;
          // continue loop;
        };
      };
    };
    return count;
  };

  public query func getNumberOfUsers() : async Nat {
    let userKeys = users.keys();
    return countIter(userKeys);
  };
  // Function to get the total number of groups
  public query func getNumberOfGroups() : async Nat {
    let groupKeys = groups.keys();
    return countIter(groupKeys);
  };

  // Function to get the total number of business units
  public query func getNumberOfBusinessUnits() : async Nat {
    let allGroupsIter = groups.vals();
    let allGroups = Iter.toArray(allGroupsIter); // Convert iterator to array manually
    let businessUnits = Array.filter(
      allGroups,
      func(g : Group) : Bool {
        // Assuming `g` has a property `groupType` to check if it is a "BusinessUnit"
        g.groupType == "BusinessUnit";
      },
    );
    return Array.size(businessUnits);
  };

  // // Placeholder function for counting transactions
  public query func getNumberOfTransactions() : async Nat {
    // This function would need actual transaction data to count
    let transactionCount : Nat = 0; // Placeholder
    return transactionCount;
  };

  // Function to calculate the cost of creating groups
  public func getTotalCreationCost() : async Nat {
    let numberOfGroups = await getNumberOfGroups();
    let costPerGroup : Nat = 100; // Cost to create each group
    return numberOfGroups * costPerGroup;
  };


//===========================================================================================
//===========================================================================================
//===========================================================================================


// Define Access Levels
public type AccessLevel = {
  #Guest;               // Level 0
  #EmailRegistered;      // Level 1
  #GroupMember;          // Level 2
  #VerifiedAccountHolder; // Level 3
  #EnterpriseCustomer;   // Level 4
  #Functionary           // Level 5
};

private stable var userEntries1 : [(Text, User1)] = [];
var users1 = HashMap.HashMap<Text, User1>(0, Text.equal, Text.hash);

public type User1 = {
  id : Text;
  emailAuth : Text;
  email : Text;
  otp : ?Text;
  otpExpiry : ?Int;
  accessLevel : AccessLevel;
  kycCompleted : Bool; // Add a field to check if KYC is completed
};

// Create a user with Guest access level (Level 0)
public func createUser1(userId : Text, email : Text) : async Text {
  let newUser = {
    id = userId;
    emailAuth = "pending";
    email = email;
    otp = null;
    otpExpiry = null;
    accessLevel = #Guest;
    kycCompleted = false; // Initial state, KYC not completed
  };
  users1.put(userId, newUser);
  return "User created with Guest access level.";
};

// Move to Email Registered (Level 1)
public func moveToEmailRegistered(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist." };
    case (?user) {
      let updatedUser = { user with accessLevel = #EmailRegistered };
      users1.put(userId, updatedUser);
      return "User access level updated to Email Registered.";
    };
  };
};

// Move to Group Member (Level 2)
public func moveToGroupMember(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist." };
    case (?user) {
      if (user.accessLevel == #EmailRegistered) {
        let updatedUser = { user with accessLevel = #GroupMember };
        users1.put(userId, updatedUser);
        return "User access level updated to Group Member.";
      } else {
        return "User must be Email Registered to join groups.";
      };
    };
  };
};

// Move to Verified Account Holder (Level 3) - Check if KYC is completed
public func moveToVerifiedAccountHolder(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      // Ensure the user is a Group Member and has completed KYC
      if (user.accessLevel == #GroupMember and user.kycCompleted == true) {
        let updatedUser = { user with accessLevel = #VerifiedAccountHolder };
        users1.put(userId, updatedUser);
        return "User access level updated to Verified Account Holder.";
      } else if (user.kycCompleted == false) {
        return "User must complete KYC to become a Verified Account Holder.";
      } else {
        return "User must be a Group Member to progress.";
      };
    };
  };
};



// Add a function to complete KYC
public func completeKYC(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      let updatedUser = { user with kycCompleted = true };
      users1.put(userId, updatedUser);
      return "KYC completed successfully.";
    };
  };
};

// Move to Enterprise Customer (Level 4)
public func moveToEnterpriseCustomer(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      if (user.accessLevel == #VerifiedAccountHolder) {
        let updatedUser = { user with accessLevel = #EnterpriseCustomer };
        users1.put(userId, updatedUser);
        return "User access level updated to Enterprise Customer.";
      } else {
        return "User must be a Verified Account Holder to upgrade to Enterprise Customer.";
      };
    };
  };
};

// Move to Functionary (Level 5) - Allow managing group funds
public func moveToFunctionary(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      if (user.accessLevel == #EnterpriseCustomer) {
        let updatedUser = { user with accessLevel = #Functionary };
        users1.put(userId, updatedUser);
        return "User access level updated to Functionary.";
      } else {
        return "User must be an Enterprise Customer to become a Functionary.";
      };
    };
  };
};

// Function to allow Functionary to manage group funds
public func manageGroupFunds(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      if (user.accessLevel == #Functionary) {
        // Placeholder for fund management logic (e.g., based on STRs)
        return "User can manage group funds.";
      } else {
        return "User must be a Functionary to manage group funds.";
      };
    };
  };
};


// Query the user's access level
public query func getUserAccessLevel(userId : Text) : async ?AccessLevel {
  switch (users1.get(userId)) {
    case (null) { return null; }; 
    case (?user) { return ?user.accessLevel; };
  };
};

// Get stars for access level (UI Display)
public query func getAccessLevelStars(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "☆☆☆☆☆"; }; // Guest (Level 0)
    case (?user) {
      switch (user.accessLevel) {
        case (#Guest) { return "☆☆☆☆☆"; }; // Level 0
        case (#EmailRegistered) { return "★☆☆☆☆"; }; // Level 1
        case (#GroupMember) { return "★★☆☆☆"; }; // Level 2
        case (#VerifiedAccountHolder) { return "★★★☆☆"; }; // Level 3
        case (#EnterpriseCustomer) { return "★★★★☆"; }; // Level 4
        case (#Functionary) { return "★★★★★"; }; // Level 5
      };
    };
  };
};

// Function for participating in group chat (Level 2 and higher)
public func participateInGroupChat(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      if (user.accessLevel == #GroupMember or user.accessLevel == #VerifiedAccountHolder or user.accessLevel == #EnterpriseCustomer or user.accessLevel == #Functionary) {
        return "User can participate in group chat.";
      } else {
        return "User must be at least a Group Member to participate in group chat.";
      };
    };
  };
};

// Function for voting (available for Group Members and higher)
public func participateInVote(userId : Text) : async Text {
  switch (users1.get(userId)) {
    case (null) { return "User does not exist."; };
    case (?user) {
      if (user.accessLevel == #GroupMember or user.accessLevel == #VerifiedAccountHolder or user.accessLevel == #EnterpriseCustomer or user.accessLevel == #Functionary) {
        // Placeholder for voting logic
        return "User can participate in voting.";
      } else {
        return "User must be at least a Group Member to participate in voting.";
      };
    };
  };
};
//======================================================================
//======================================================================
  private stable var accounts : [Principal] = [];

  private stable var accountGroupEntries : [(Text, [Principal])] = [];
  var accountGroups = HashMap.HashMap<Text, [Principal]>(0, Text.equal, Text.hash);

  public func createAccount(accountId : Text, groupId : Text, initialBalance : Nat,owner:Principal) : async Principal {
        Cycles.add(20_000_000_000); // Since this value increases as time passes, change this value according to error in console.

        let newAccountActor = await AccountActorClass.AccountActor(accountId, groupId, initialBalance, "", "",owner);
        accounts := Array.append(accounts, [Principal.fromActor(newAccountActor)]);
        switch (accountGroups.get(groupId)) {
            case (null) {
                accountGroups.put(groupId, [Principal.fromActor(newAccountActor)]);
            };
            case (?val) {
                var newVal = Array.append(val, [Principal.fromActor(newAccountActor)]);
                accountGroups.put(groupId, newVal);
            };
        };
        return Principal.fromActor(newAccountActor);
    };

    public query func getGroupWallets(groupId : Text) : async ?[Principal] {
        return accountGroups.get(groupId);
    };

    public query func listAccounts() : async [Principal] {
        accounts;
    };

    public query func getAllAccountGroups() : async [(Text, [Principal])] {
        return Iter.toArray(accountGroups.entries());
    };

    public query func getGroupIds() : async [Text] {
        return Iter.toArray(accountGroups.keys());
    };
    
  // Function to get the total number of users
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
    //==============================================================
    referralCodeEntries := Iter.toArray(referralCodes.entries());

    // groupIdEntries := Iter.toArray(groupIds.entries());
    accountGroupEntries := Iter.toArray(accountGroups.entries());

    affiliateEntries := Iter.toArray(affiliates.entries());

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
    //===========================================================
    referralCodes := HashMap.fromIter<Text, ReferralCode>(referralCodeEntries.vals(), 1, Text.equal, Text.hash);

    // groupIds := HashMap.fromIter<Text, Buffer.Buffer<Text>>(groupIdEntries.vals(), 1, Text.equal, Text.hash);
    accountGroups := HashMap.fromIter<Text, [Principal]>(accountGroupEntries.vals(), 1, Text.equal, Text.hash);
    affiliates := HashMap.fromIter<Text, AffiliateDetails>(affiliateEntries.vals(), 1, Text.equal, Text.hash);

  };
};
