export enum Fields {
    Cell = 'cell',
    SendEmail = 'sendemail',
    SendMail = 'sendmail',
    SendText = 'sendtext',
    InactiveDate = 'inactiveDate',
    branchid = 'branchid',
}

export enum FieldType {
    Boolean = 'boolean',
    Date = 'date',
    Number = 'number',
}

export const TranFormInputValues = [
    {
        fields: [Fields.Cell, Fields.SendEmail, Fields.SendMail, Fields.SendText],
        type: FieldType.Boolean,
    },
    {
        fields: [Fields.InactiveDate],
        type: FieldType.Date,
    },
    {
        fields: [Fields.branchid],
        type: FieldType.Number,
    },
];

export const TranFormInputValuesUpperCase = [
    'firstName',
    'mi',
    'lastName',
    'suffix',
    'address',
    'address2',
    'city',
    'state',
    'county',
    'sex',
    'inactiveReason',
    'email',
    'language',
    'patientcategory',
    'patientstatus',
    'contactNote',
];

export const TransFormDateValues = ['dob', 'dod', 'inactiveDate', 'datesent', 'entrydate'];
