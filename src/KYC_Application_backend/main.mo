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
import Main2 "main2";

actor KYC_Canister {

  type Customer = {
    id : Text;
    family_name : Text;
    given_name : Text;
    birth_date : Text; // ISO format
    age_over_18 : Bool;
    role : Text;
    // Optional fields
    age_over_NN : ?Bool;
    age_in_years : ?Nat;
    age_birth_year : ?Nat;
    family_name_birth : ?Text;
    given_name_birth : ?Text;
    birth_place : ?Text;
    birth_country : ?Text;
    birth_state : ?Text;
    birth_city : ?Text;
    resident_address : ?Text;
    resident_country : ?Text;
    resident_state : ?Text;
    resident_city : ?Text;
    resident_postal_code : ?Text;
    resident_street : ?Text;
    gender : ?Nat; // 0, 1, 2 for unspecified, male, female
    nationality : ?Text; // ISO Alpha-2 code
    issuance_date : ?Text; // ISO format
    expiry_date : ?Text; // ISO format
    issuing_authority : ?Text;
    document_number : ?Text;
    issuing_country : ?Text;
    issuing_jurisdiction : ?Text;
    cizitenship : [Text];
    residency : Text;
    phone : Text;
    identityNumber : Text;
    identityDoc : Blob;
    verified : Bool;
  };

  private stable var mapEntries : [(Text, Customer)] = [];
  var map = HashMap.HashMap<Text, Customer>(0, Text.equal, Text.hash);

  private stable var mapEntries1 : [(Text, Text)] = [];
  var map1 = HashMap.HashMap<Text, Text>(0, Text.equal, Text.hash);

  //==================================================================================

  // Storage for customer data
  // stable var customers : [Customer] = [];

  // Function to add a new customer
  public func addCustomer(newCustomer : Customer) : async Text {

    switch (map.get(newCustomer.id)) {
      case (null) {
        if (newCustomer.role == "") {
          return "Role cannot be empty.";
        };
        if (newCustomer.phone == "" or newCustomer.identityNumber == "") {
          return "Phone number and identity number cannot be empty.";
        };
        map.put(newCustomer.id, newCustomer);
        return "Customer added successfully.";
      };
      case (?value) {

        return "Customer with this ID already exists.";

      };
    };

  };

  public func addBasicInfoCustomer(
    id : Text,
    family_name : Text,
    given_name : Text,
    birth_date : Text, // ISO format
    age_over_18 : Bool,
    role : Text,
    phone : Text,
    identityNumber : Text,
    identityDoc : Blob,
    verified : Bool,
    cizitenship : [Text],
    residency : Text,
  ) : async Text {

    switch (map.get(id)) {
      case (null) {
        if (role == "") {
          return "Role cannot be empty.";
        };
        if (phone == "" or identityNumber == "") {
          return "Phone number and identity number cannot be empty.";
        };
        var newCustomer : Customer = {
          id = id;
          family_name = family_name;
          given_name = given_name;
          birth_date = birth_date;
          age_over_18 = age_over_18;
          role = role;
          phone = phone;
          //================================
          age_over_NN = null;
          age_in_years = null;
          age_birth_year = null;
          family_name_birth = null;
          given_name_birth = null;
          birth_place = null;
          birth_country = null;
          birth_state = null;
          birth_city = null;
          //===============================
          resident_address = null;
          resident_country = null;
          resident_state = null;
          resident_city = null;
          resident_postal_code = null;
          resident_street = null;
          //================================
          gender = null; // 0, 1, 2 for unspecified, male, female
          nationality = null; // ISO Alpha-2 code
          issuance_date = null; // ISO format
          expiry_date = null; // ISO format
          issuing_authority = null;
          document_number = null;
          issuing_country = null;
          issuing_jurisdiction = null;

          identityNumber = identityNumber;
          identityDoc = identityDoc;
          verified = verified;
          cizitenship = cizitenship;
          residency = residency;
        };
        map.put(id, newCustomer);
        return "Customer added successfully.";
      };
      case (?value) {

        return "Customer with this ID already exists.";

      };
    };

  };

  public func addFamilyCustomer(
    id : Text,
    age_over_NN : Bool,
    age_in_years : Nat,
    age_birth_year : Nat,
    family_name_birth : Text,
    given_name_birth : Text,
    birth_place : Text,
    birth_country : Text,
    birth_state : Text,
    birth_city : Text,
  ) : async Text {

    switch (map.get(id)) {
      case (null) {

        return "Customer doesnot exsist.";
      };
      case (?value) {
        let updatedProfile = {
          value with
          age_over_NN = ?age_over_NN;
          age_in_years = ?age_in_years;
          age_birth_year = ?age_birth_year;
          family_name_birth = ?family_name_birth;
          given_name_birth = ?given_name_birth;
          birth_place = ?birth_place;
          birth_country = ?birth_country;
          birth_state = ?birth_state;
          birth_city = ?birth_city;
        };
        map.put(id, updatedProfile);
        return "Customer updated successfully.";

      };
    };

  };

  public func addOtherInfoCustomer(
    id : Text,
    gender : Nat, // 0, 1, 2 for unspecified, male, female
    nationality : Text, // ISO Alpha-2 code
    issuance_date : Text, // ISO format
    expiry_date : Text, // ISO format
    issuing_authority : Text,
    document_number : Text,
    issuing_country : Text,
    issuing_jurisdiction : Text,
  ) : async Text {

    switch (map.get(id)) {
      case (null) {

        return "Customer doesnot exsist.";
      };
      case (?value) {
        let updatedProfile = {
          value with
          gender = ?gender;
          nationality = ?nationality;
          issuance_date = ?issuance_date; // ISO format
          expiry_date = ?expiry_date; // ISO format
          issuing_authority = ?issuing_authority;
          document_number = ?document_number;
          issuing_country = ?issuing_country;
          issuing_jurisdiction = ?issuing_jurisdiction;
        };
        map.put(id, updatedProfile);
        return "Customer updated successfully.";

      };
    };

  };

  public func addResidencyCustomer(
    id : Text,
    resident_address : Text,
    resident_country : Text,
    resident_state : Text,
    resident_city : Text,
    resident_postal_code : Text,
    resident_street : Text,
  ) : async Text {

    switch (map.get(id)) {
      case (null) {

        return "Customer doesnot exsist.";
      };
      case (?value) {
        let updatedProfile = {
          value with
          resident_address = ?resident_address;
          resident_country = ?resident_country;
          resident_state = ?resident_state;
          resident_city = ?resident_city;
          resident_postal_code = ?resident_postal_code;
          resident_street = ?resident_street;
        };
        map.put(id, updatedProfile);
        return "Customer updated successfully.";

      };
    };

  };
  //owns account
  //beneficicary
  //executive
  public func addImage(newCustomer : Text) : async Text {

    map1.put("1", newCustomer);
    return "success";
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
        return "Profile updated";
      };
    };
  };

  // Function to retrieve a customer's information
  public query func getCustomer(id : Text) : async ?Customer {
    return map.get(id);
  };

  public query func getCustomerImage(id : Text) : async ?Text {
    return map1.get(id);
  };
  // Debugging: Function to list all customers (not recommended for production use)
  public query func listCustomers() : async [Customer] {
    let ids = Iter.toArray(map.vals());
    return ids;
  };

  // Function to set the role of a customer
  public shared (msg) func setRole(id : Text, setRole : Text) : async Text {
    //admin
    //operator
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
  //multiple citizenship 1 residency
  // Function to update customer information
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

  // // Function to send email to a customer (mock implementation)
  public func sendEmail(id : Text, subject : Text, body : Text) : async Text {
    switch (map.get(id)) {
      case (null) {
        return "User profile does not exist";
      };
      case (?value) {
        Debug.print("Sending email to " # id # " with subject: " # subject # " and body: " # body);
        return "Email sent successfully.";
      };
    };
  };

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

  // // Function to check if the customer is a registered user
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

  //chat App

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

  system func preupgrade() {
    mapEntries := Iter.toArray(map.entries());

    let Entries1 = Iter.toArray(message.entries());
    var data1 = Map.HashMap<Text, [Messaging]>(0, Text.equal, Text.hash);

    for (x in Iter.fromArray(Entries1)) {
      data1.put(x.0, Buffer.toArray<Messaging>(x.1));
    };
    messageEntries := Iter.toArray(data1.entries());

  };
  system func postupgrade() {
    map := HashMap.fromIter<Text, Customer>(mapEntries.vals(), 1, Text.equal, Text.hash);

    let his1 = HashMap.fromIter<Text, [Messaging]>(messageEntries.vals(), 1, Text.equal, Text.hash);
    let Entries1 = Iter.toArray(his1.entries());
    for (x in Iter.fromArray(Entries1)) {
      message.put(x.0, Buffer.fromArray<Messaging>(x.1));
    };
  };
};
