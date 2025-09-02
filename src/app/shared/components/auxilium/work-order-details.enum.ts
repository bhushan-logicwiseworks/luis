export enum Fields {
    dueprimary = 'dueprimary',
    submitted = 'submitted',
    salesid = 'salesid',
    branchid = 'branchid',
    id = 'id',
    patientid = 'patientid',
    authcount = 'authcount',
    authused = 'authused',
    allowed = 'allowed',
    prepaid = 'prepaid',
    duesecondary = 'duesecondary',
    monthsrented = 'monthsrented',
    inventoryvendorid = 'inventoryvendorid',
    minimumOrder = 'minimumOrder',
    orderMultiplier = 'orderMultiplier',
    lastCost = 'lastCost',
    contractPrice = 'contractPrice',
    weight = 'weight',
    amount = 'amount',
    amountPaidToPatient = 'amountPaidToPatient',
}

export enum FieldType {
    Boolean = 'boolean',
    Date = 'date',
    Number = 'number',
}

export const TranFormInputValues = [
    {
        fields: [
            Fields.dueprimary,
            Fields.submitted,
            Fields.salesid,
            Fields.branchid,
            Fields.id,
            Fields.patientid,
            Fields.authcount,
            Fields.authused,
            Fields.duesecondary,
            Fields.prepaid,
            Fields.allowed,
            Fields.monthsrented,
            Fields.inventoryvendorid,
            Fields.minimumOrder,
            Fields.orderMultiplier,
            Fields.lastCost,
            Fields.contractPrice,
            Fields.weight,
            Fields.amount,
            Fields.amountPaidToPatient,
        ],
        type: FieldType.Number,
    },
];

export const TransFormDateValues = [
    'shipdate',
    'cmnexpire',
    'authdate',
    'svcdate',
    'todate',
    'nextbill',
    'stopdate',
    'lastdatebilled',
    'notesexpiredate',
];
