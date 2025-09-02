interface AgingReport {
    claimid: number;
    patientid: number;
    svcdate: string; // ISO date string
    createdate: string; // ISO date string
    printdate: string; // ISO date string
    trantype: string;
    hcpcscode: string;
    physician: string;
    printstatus: string;
    submitted: number;
    billtype: string;
    billform: string;
    patientcategory: string;
    adduserid: string;
    lastname: string;
    firstname: string;
    dob: string; // ISO date string
    patphone: string;
    patalpha: string;
    branchcode: string;
    itemcategory: string;
    itemcode: string;
    patpayornamE1: string;
    patpayorphonE1: string;
    patpayornamE2: string;
    patpayorphonE2: string;
    billto: string;
    billtoname: string;
    billtophone: string;
    payorcategory: string;
    policY1: string;
    policY2: string;
    rank: number;
    phykey: string;
    refercode: string;
    refername: string;
    salescode: string;
    note: string;
    companyname: string;
    detaiL30BALANCE: number;
    summarY30BALANCE: number;
    detaiL60BALANCE: number;
    summarY60BALANCE: number;
    detaiL90BALANCE: number;
    summarY90BALANCE: number;
    detaiL120BALANCE: number;
    summarY120BALANCE: number;
    detaiL150BALANCE: number;
    summarY150BALANCE: number;
    detaiL180BALANCE: number;
    detaiL210BALANCE: number;
    detaiL240BALANCE: number;
    detaiL241BALANCE: number;
    collectionnotes: string;
    includecollectionnotes: boolean;
    payorbalance: number;
    patientbalance: number;
    agedby: string;
    groupcode: string;
    groupcaption: string;
    reportuser: string;
}

export type GetAgingReportResponse = AgingReport[];
