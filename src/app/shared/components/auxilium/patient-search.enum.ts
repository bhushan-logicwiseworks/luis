export enum Fields {
    id = 'id',
    patientId = 'patientId',
}

export enum FieldType {
    Boolean = 'boolean',
    Date = 'date',
    Number = 'number',
    String = 'string',
}

export const TranFormSerarchInputValues = [
    {
        fields: [Fields.id, Fields.patientId],
        type: FieldType.Number,
    },
];
