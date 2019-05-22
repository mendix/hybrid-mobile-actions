// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

/**
 * @param {string} displayName
 * @param {string} firstName
 * @param {string} middleName
 * @param {string} lastName
 * @param {string} phoneNumber
 * @param {string} email
 * @returns {boolean}
 */
function SaveContact(
    displayName?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    phoneNumber?: string,
    email?: string
): Promise<boolean> {
    // BEGIN USER CODE
    // Documentation: https://github.com/apache/cordova-plugin-contacts
    if (!navigator.contacts) {
        throw new Error("cordova-plugin-contacts not enabled");
    }

    const contact = navigator.contacts.create();

    contact.displayName = displayName;
    contact.nickname = displayName;
    contact.name = {
        givenName: firstName,
        middleName,
        familyName: lastName
    };

    if (phoneNumber) {
        contact.phoneNumbers = [{ type: "work", value: phoneNumber, pref: true }];
    }

    if (email) {
        contact.emails = [{ type: "work", value: email, pref: true }];
    }

    return new Promise((resolve, reject) => {
        contact.save(() => resolve(true), error => reject(new Error(errorMessage(error))));
    });

    function errorMessage(error: ContactError): string {
        switch (error.code) {
            case ContactErrorCode.UNKNOWN_ERROR:
                return "Found an unknown error while handling the request.";
            case ContactErrorCode.INVALID_ARGUMENT_ERROR:
                return "Invalid argument found.";
            case ContactErrorCode.TIMEOUT_ERROR:
                return "Operation timed out.";
            case ContactErrorCode.PENDING_OPERATION_ERROR:
                return "Pending operation error.";
            case ContactErrorCode.IO_ERROR:
                return "IO error encountered.";
            case ContactErrorCode.NOT_SUPPORTED_ERROR:
                return "Operation not supported.";
            case ContactErrorCode.OPERATION_CANCELLED_ERROR:
                return "Operation cancelled.";
            case ContactErrorCode.PERMISSION_DENIED_ERROR:
                return "Permission denied.";
        }
    }
    // END USER CODE
}
