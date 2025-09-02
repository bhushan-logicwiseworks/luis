export interface PatientEventsBilling {
    id: number;
    patientId: number;
    eventType: string;
    todaysDate: string;
    claimDateOfService?: string;
    owner: string;
    comments?: string;
    primaryInsId?: string;
    action?: string;
    isRefundResult?: boolean;
    reasonCode?: string;
    secondaryTertiaryInsId?: string;
    insuranceId?: string;
    primaryOrSecondary?: string;
    additionalInfo?: string;
    amount?: number;
    amountPaidToPatient?: number;
    followUpType?: string;
    datePaymentReceived?: string;
    returnAction?: string;
    dateFullyResolved?: string;
    isAppealForRefund?: boolean;
    appealOutcome?: string;
    outcome?: string;
    programType?: string;
    reEvaluationDate?: string;
}
