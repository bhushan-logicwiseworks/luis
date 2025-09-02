export enum Fields {
    id = 'id',
    itemCode = 'itemCode',
}

export enum FieldType {
    Boolean = 'boolean',
    Date = 'date',
    Number = 'number',
    String = 'string',
}

export const TranFormSearchInputValues = [
    {
        fields: [Fields.id, Fields.itemCode],
        type: FieldType.Number,
    },
];
