export interface PatientSWOInfo {
    id: number;
    phy_Id: number;
    cmnexpire: string; // DateTime string in ISO format
    paT_FIRSTNAME: string;
    paT_LASTNAME: string;
    dob: string; // DateTime string in ISO format
    address: string;
    addresS2: string;
    city: string;
    state: string;
    county: string;
    zip: string;
    primarY_INSURANCE: string;
    policy: string;
    quantity: number;
    description: string;
    hcpcscode: string;
    phY_FIRSTNAME: string;
    phY_LASTNAME: string;
    phY_ADDRESS1: string;
    phY_ADDRESS2: string;
    phY_CITY: string;
    phY_STATE: string;
    phY_ZIP: string;
    company: string;
    npi: string;
    phone: string;
    fax: string;
}

export interface PatientSWODetails {
    patientId: string;
    sendToName: string;
    sendToFax: string;
    patientName: string;
    dob: string; // ISO 8601 format datetime string
    patientPhone: string;
    primaryInsurance: string;
    primaryId: string;
    secondaryInsurance: string;
    secondaryId: string;
    physicianName: string;
    npi: string;
    physicianAddress: string;
    physicianPhone: string;
    physicianFax: string;
    officeContact: string;
}
