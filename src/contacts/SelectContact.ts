// This file was generated by Mendix Studio Pro.
//
// WARNING: Only the following code will be retained when actions are regenerated:
// - the code between BEGIN USER CODE and END USER CODE
// Other code you write will be lost the next time you deploy the project.

/**
 * @returns {MxObject}
 */
function SelectContact(): Promise<mendix.lib.MxObject> {
    // BEGIN USER CODE
    // Documentation: https://github.com/apache/cordova-plugin-contacts
    return new Promise((resolve, reject) => {
        if (!navigator.contacts) {
            return reject(new Error("cordova-plugin-contacts not enabled"));
        }

        navigator.contacts.pickContact(
            contact => {
                createMxObject(contact)
                    .then(object => resolve(object))
                    .catch(error => reject(error));
            },
            error =>
                error.code === ContactErrorCode.OPERATION_CANCELLED_ERROR ? resolve() : reject(errorMessage(error))
        );
    });

    function createMxObject(contact: Contact): Promise<mendix.lib.MxObject> {
        return new Promise((resolve, reject) => {
            mx.data.create({
                entity: "HybridMobileActions.Contact",
                callback: mxObject => {
                    const name = contact.displayName || contact.nickname || (contact.name && contact.name.formatted);
                    if (name) {
                        mxObject.set("DisplayName", name);
                    }

                    if (contact.name && contact.name.givenName) {
                        mxObject.set("FirstName", contact.name.givenName);
                    }

                    if (contact.name && contact.name.middleName) {
                        mxObject.set("MiddleName", contact.name.middleName);
                    }

                    if (contact.name && contact.name.familyName) {
                        mxObject.set("LastName", contact.name.familyName);
                    }

                    const email = contact.emails && contact.emails[0].value;
                    if (email) {
                        mxObject.set("Email", email);
                    }

                    const phoneNumber = contact.phoneNumbers && contact.phoneNumbers[0].value;
                    if (phoneNumber) {
                        mxObject.set("PhoneNumber", phoneNumber);
                    }

                    resolve(mxObject);
                },
                error: () => reject("Could not create 'HybridMobileActions.Contact' object")
            });
        });
    }

    function errorMessage(error: ContactError): string | undefined {
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
            case ContactErrorCode.PERMISSION_DENIED_ERROR:
                return "Permission denied.";
            default:
                return;
        }
    }
    // END USER CODE
}
