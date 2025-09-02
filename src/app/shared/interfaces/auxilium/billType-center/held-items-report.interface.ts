export interface HeldItemsReportDisplay {
    patientid: number;
    svcdate: string;
    printstatus: string;
    tranamount: number;
    held: string;
    hcpcscode: string;
    accessionno: string;
    billform: string;
    claimid: number;
    branchcode: string;
    itemcode: string;
    diagnosis: string;
    billto: string;
    secondarybillto: string;
    companyname: string;
    patalpha: string;
    billformname: string;
    heldreason: string;
    description: string;
    baddata: string;
    reportfilter: string;
    reportuser: string;
}

export type GetHeldItemsReportResponse = HeldItemsReportDisplay[];
