export const constVariables = {
    DATE_FORMAT: 'MM/DD/YYYY',
};

export const ToastMessages = {
    CREATE: {
        SUCCESS: 'Your work has been saved',
        ERROR: 'Failed to save your work. Please try again',
    },
    EDIT: {
        SUCCESS: 'Your work has been saved',
        ERROR: 'Failed to save your work. Please try again',
    },
    DELETE: {
        SUCCESS: 'The record has been deleted successfully',
        ERROR: 'Failed to delete record',
    },
    CUSTOM: {
        // Custom seprated messages
        patientNotFound: 'Patient not found',
        prismAuthorizationSuccess: 'Prism Authorization successful',
        prismAuthorizationFailure: 'Prism Authorization failed. Please try again.',

        // Custom messages
        processBatchEligibilitySuccess: 'Process completed successfully',
        processBatchEligibilityError: 'Failed to save your work. Please try again',

        swoUpdateSuccess: 'The SWO has been sent',
        sendFaxMessageSuccess: 'Your fax has been sent',
        PatientSWOSuccess: 'The SWO has been sent',
        fileSaveSuccess: 'Your file has been saved',

        reorderTextSuccess: 'Order Renewal TEXT has been sent to the patient',
        reorderEmailSuccess: 'Order Renewal EMAIL has been sent to the patient',
        reorderTextError: 'Order Renewal TEXT has not been sent to the patient',
        reorderEmailError: 'Order Renewal EMAIL has not been sent to the patient',
    },
    // Add more as needed
};
