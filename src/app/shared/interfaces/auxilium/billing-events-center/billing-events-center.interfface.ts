export interface BillingEventsCenterDisplay {
    id: number;
    patientId: number;
    eventType: string;
    todaysDate: string | Date;
    claimDateOfService?: string | Date;
    owner: string;
    comments?: string;
    primaryInsId?: number;
    action?: string;
    isRefundResult?: boolean;
    reasonCode?: string;
    secondaryTertiaryInsId?: number;
    insuranceId?: number;
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
    reEvaluationDate?: string | Date;
}

export type BillingEventsCenterResponse = BillingEventsCenterDisplay[];
