export enum PayorOverrideFields {
    payorId = 'payorId',
    billto = 'billto',
    itemId = 'itemId',
    itemCode = 'itemCode',
    description = 'description',
    billType = 'billType',
    confirm = 'confirm',
    quantity = 'quantity',
    hcpc = 'hcpc',
    submitted = 'submitted',
    allowed = 'allowed',
}

export enum FieldType {
    Boolean = 'boolean',
    Date = 'date',
    Number = 'number',
    String = 'string',
}

export const TransformPayorOverrideInputValues = [
    {
        fields: [
            PayorOverrideFields.payorId,
            PayorOverrideFields.itemId,
            PayorOverrideFields.quantity,
            PayorOverrideFields.submitted,
            PayorOverrideFields.allowed,
        ],
        type: FieldType.Number,
    },
    {
        fields: [
            PayorOverrideFields.billto,
            PayorOverrideFields.itemCode,
            PayorOverrideFields.description,
            PayorOverrideFields.billType,
            PayorOverrideFields.confirm,
            PayorOverrideFields.hcpc,
        ],
        type: FieldType.String,
    },
];
