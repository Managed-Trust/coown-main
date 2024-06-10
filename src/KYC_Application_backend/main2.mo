// GroupManagement.mo
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";

module {

    public type Group = {
        companyDetails : {
            companyName : Text;
            registrationNumber : Text;
            legalStructure : Text;
            registeredAddress : Text;
            taxID : Text;
            incorporationCertificate : Blob;
            memorandumAndArticles : Blob;
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
        declarations : Text;
        signature : Text;
        date : Text;
        status : Text; // "Pending", "Approved by Group Admin", "Approved by COOWN Admin"
    };

    // private stable var groupEntries : [(Text, Group)] = [];
    // var groups = HashMap.HashMap<Text, Group>(0, Text.equal, Text.hash);

    // public func createGroup(newGroup : Group) : async Text {
    //     if (HashMap.contains(groups, newGroup.companyDetails.registrationNumber)) {
    //         return "A group with this registration number already exists.";
    //     } else {
    //         HashMap.put(groups, newGroup.companyDetails.registrationNumber, newGroup);
    //         return "Group created successfully.";
    //     };
    // };

    // public func updateGroup(registrationNumber : Text, updatedGroup : Group) : async Text {
    //     if (HashMap.contains(groups, registrationNumber)) {
    //         HashMap.put(groups, registrationNumber, updatedGroup);
    //         return "Group updated successfully.";
    //     } else {
    //         return "No group found with this registration number.";
    //     };
    // };

    // public func approveGroupByGroupAdmin(registrationNumber : Text) : async Text {
    //     switch (HashMap.get(groups, registrationNumber)) {
    //         case (null) {
    //             return "No group found with this registration number.";
    //         };
    //         case (?group) {
    //             let updatedGroup = {
    //                 group with
    //                 status = "Approved by Group Admin";
    //             };
    //             HashMap.put(groups, registrationNumber, updatedGroup);
    //             return "Group approved by Group Admin.";
    //         };
    //     };
    // };

    // public func approveGroupByCOOWNAdmin(registrationNumber : Text) : async Text {
    //     switch (HashMap.get(groups, registrationNumber)) {
    //         case (null) {
    //             return "No group found with this registration number.";
    //         };
    //         case (?group) {
    //             let updatedGroup = {
    //                 group with
    //                 status = "Approved by COOWN Admin";
    //             };
    //             HashMap.put(groups, registrationNumber, updatedGroup);
    //             return "Group approved by COOWN Admin.";
    //         };
    //     };
    // };
};
