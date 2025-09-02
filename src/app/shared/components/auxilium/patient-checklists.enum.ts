export enum Fields {
    Call = 'call',
    SendEmail = 'sendemail',
    SendMail = 'sendmail',
    SendText = 'sendtext',
    InactiveDate = 'inactiveDate',
    Datesent = 'datesent',
    dod = 'dod',
    branchid = 'branchid',
    inventorylocation = 'inventorylocation',
    fieldservicerepid = 'fieldservicerepid',
    referId = 'referId',
    salesid = 'salesid',
}

export enum FieldType {
    Boolean = 'boolean',
    Date = 'date',
    Number = 'number',
    String = 'string',
}

export const TranFormInputValues = [
    {
        fields: [Fields.Call, Fields.SendEmail, Fields.SendMail, Fields.SendText],
        type: FieldType.Boolean,
    },
    {
        fields: [Fields.InactiveDate],
        type: FieldType.Date,
    },
    {
        fields: [Fields.Datesent],
        type: FieldType.Date,
    },
    {
        fields: [Fields.dod],
        type: FieldType.Date,
    },
    {
        fields: [Fields.branchid, Fields.salesid, Fields.fieldservicerepid, Fields.referId],
        type: FieldType.Number,
    },
    {
        fields: [Fields.inventorylocation],
        type: FieldType.String,
    },
];

export const patientOnBoardingCheckList = [
    {
        label: 'Initial Patient Contact Attempt',
        formControlName: 'contactattempt1',
    },
    {
        label: 'Patient Contact Attempt #2',
        formControlName: 'contactattempt2',
    },
    {
        label: 'Patient Contact Attempt #3',
        formControlName: 'contactattempt3',
    },
    {
        label: 'Patient Interview',
        formControlName: 'patientinterview',
    },
    {
        label: 'Insurance Verified',
        formControlName: 'insuranceverified',
    },
    {
        label: 'Complete PWO Received',
        formControlName: 'completedpworeceived',
    },
    {
        label: 'Qualifying Notes Received',
        formControlName: 'qualifyingnotesreceived',
    },
];

export const referralCheckList = [
    {
        label: 'Medicare',
        formControlName: 'medicarepatient',
    },
    {
        label: 'Valid PWO',
        formControlName: 'pwocompleted',
    },
    {
        label: 'Demographics',
        formControlName: 'qualifiedcgm',
    },
    {
        label: 'Chart Notes',
        formControlName: 'chartnotes',
    },
    {
        label: 'Auth Required',
        formControlName: 'authrequired',
    },
    {
        label: 'Hardship',
        formControlName: 'hardship',
    },
];
