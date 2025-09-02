export interface RunValidationsDisplay {
    numbers: [];
    svcdate: string;
    todate: string;
    nextbill: string;
    cmnexpire: string;
    notesexpiredate: string;
    shipdate: string;
    authdate: string;
    shipstatus: string;
    invoiceno: string;
    isSvcdateClear: boolean;
    isTodateClear: boolean;
    isNextbillClear: boolean;
    isCmnexpireClear: boolean;
    isNotesexpiredateClear: boolean;
    isShipdateClear: boolean;
    isAuthdateClear: boolean;
    isShipstatusClear: boolean;
    isInvoicenoClear: boolean;
}

export type GetRunValidationsResponse = RunValidationsDisplay[];
