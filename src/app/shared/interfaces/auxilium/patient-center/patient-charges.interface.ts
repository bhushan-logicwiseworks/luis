export interface PatientCharges {
  billType: string;
  id: number;
  description: string;
  duePrimary: number;
  dueSecondary: number;
  itemId: number;
  lastDateBilled: string; // ISO date string
  prepaid: number;
  stopDate: string; // ISO date string
  submitted: number;
  svcDate: string; // ISO date string
  toDate: string; // ISO date string
  hcpcsCode: string;
  narrative: string;
  notes: string;
  accessionNo: string;
  notesExpireDate: string; // ISO date string
  cmnExpire: string; // ISO date string
  authDate: string; // ISO date string
  assetNo: string;
  branchCode: string;
  itemCode: string;
  cmnForm: string;
}
