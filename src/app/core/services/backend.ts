import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { environment } from '../../../environments/environment';

const url = environment.backendUrl;

export const Backend = {
    calculateNextDos: (lastDos: string, supplyDays: number) => `${url}/api/global/getnextdos/${lastDos}/${supplyDays}`,
    // ------------------------------------------------------------------------------------
    // Abbott Dashboard
    // ------------------------------------------------------------------------------------
    cgmretentionrate: `${url}/api/dashboardabbott/cgmretentionrate`,
    numberofcgmreferralsreceived: `${url}/api/dashboardabbott/numberofcgmreferralsreceived`,
    averagenumberoftouches: `${url}/api/dashboardabbott/averagenumberoftouches`,
    totalactivepatients: `${url}/api/dashboardabbott/totalactivepatients`,
    averagedaysfromreferraltoshipped: `${url}/api/dashboardabbott/averagedaysfromreferraltoshipped`,
    activecgmpatientreorders: `${url}/api/dashboardabbott/activecgmpatientreorders`,
    newcgmpatientsshipped: `${url}/api/dashboardabbott/newcgmpatientsshipped`,
    referralsturnedintoactivepatients: `${url}/api/dashboardabbott/referralsturnedintoactivepatients`,
    cliniciansreferringapatient: `${url}/api/dashboardabbott/cliniciansreferringapatient`,

    // ------------------------------------------------------------------------------------
    // AbbottCenter
    // ------------------------------------------------------------------------------------
    getAbbottUsers: `${url}/api/abbottcenter/users`,
    getAbbottUser: (id: number) => `${url}/api/abbottcenter/users/getuser/${id}`,
    addAbbottUser: `${url}/api/abbottcenter/user/save`,
    updateAbbottUser: `${url}/api/abbottcenter/user/save`,
    deleteAbbottUser: `${url}/api/abbottcenter/user/delete`,

    // ------------------------------------------------------------------------------------
    // AccessCenter
    // ------------------------------------------------------------------------------------
    getAccessList: (filter: string) => `${url}/api/accesscenter/access/${filter}`,
    getAccess: (id: number) => `${url}/api/accesscenter/access/getaccess/${id}`,
    addAccess: `${url}/api/accesscenter/access/save`,
    deleteAccess: `${url}/api/accesscenter/access/delete`,

    // ------------------------------------------------------------------------------------
    // Branch Center
    // ------------------------------------------------------------------------------------
    getBranch: `${url}/api/branchcenter/getallbranches`,
    saveBranch: `${url}/api/branchcenter/branch/save`,
    deleteBranch: `${url}/api/branchcenter/branch/delete`,
    getBranchList: `${url}/api/branchcenter/branchdropdown`,

    // ------------------------------------------------------------------------------------
    // Company Center
    // ------------------------------------------------------------------------------------
    getCompany: `${url}/api/companycenter/company/getall`,
    getCompanyById: (id: number) => `${url}/api/companycenter/company/getcompany/${id}`,
    saveCompany: `${url}/api/companycenter/save`,
    // ------------------------------------------------------------------------------------
    // BillType Center
    // ------------------------------------------------------------------------------------
    getbillTypes: `${url}/api/billtypecenter/getallbilltypes`,
    savebillType: `${url}/api/billtypecenter/save`,
    deletebillType: `${url}/api/billtypecenter/delete`,

    // ------------------------------------------------------------------------------------
    // Charge Center
    // ------------------------------------------------------------------------------------
    getcharges: `${url}/api/chargecenter/getallorders`,
    savecharge: `${url}/api/chargecenter/charge/save`,
    deletecharge: `${url}/api/chargecenter/order/delete`,

    // ------------------------------------------------------------------------------------
    // Charges Center
    // ------------------------------------------------------------------------------------
    getChargesData: `${url}/api/billcenter/workorders/getconfirmedworkorders`,
    postconfirmedworkorder: `${url}/api/billcenter/workorder/postworkordertocharge`,

    // ------------------------------------------------------------------------------------
    // Bill Center
    // ------------------------------------------------------------------------------------
    getChargesReadyForClaims: `${url}/api/billcenter/getchargesreadyforclaims`,
    createclaimfromcharge: `${url}/api/billcenter/charges/createclaimfromcharge`,
    prepareclaimsforvalidation: `${url}/api/billcenter/prepareclaimsforvalidation`,
    getclaimsreadyforvalidation: `${url}/api/billcenter/getclaimsreadyforvalidation`,
    createClaimsFromValidations: `${url}/api/billcenter/claims/runvalidations`,
    gethelditemdetails: claimId => `${url}/api/billcenter/gethelditemdetails/${claimId}`,
    gethelditemsReport: `${url}/api/billcenter/gethelditems`,
    getListForClaimsFor837: `${url}/api/billcenter/claims/getlistofclaimsfor837file`,
    createClaimsFileFor837: `${url}/api/billcenter/claims/generateclaimfile`,
    getBillDashboard: (filter: string) => `${url}/api/dashboardbilling/getworkordersbyfilter/${filter}`,
    getBillCenterWorkOrders: (filter: string) => `${url}/api/billcenter/workorders/getworkorders/${filter}`,
    getAgingReports: `${url}/api/billcenter/reports/agingreport`,
    getRemits835: `${url}/api/eobcenter/getalleobs`,
    getEOBDetails: (id: number) => `${url}/api/eobcenter/geteobbyid/${id}`,
    getEOBById: (eobid: number) => `${url}/api/eobcenter/getallpatienteobs/${eobid}`,
    getEOB: (id: number) => `${url}/api/eobcenter/geteob/${id}`,
    getPatientEOB: (eobId: number, refId: number) => `${url}/api/eobcenter/getpatienteob/${eobId}/${refId}`,
    deleteRemits835: (id: number) => `${url}/api/eobcenter/deleteeob/${id}`,

    // ------------------------------------------------------------------------------------
    // Billing Events Center
    // ------------------------------------------------------------------------------------
    getAllEvents: `${url}/api/billingeventcenter/getallevents`,
    getBillingEvents: (filter: string) => `${url}/api/billingeventcenter/getall/${filter}`,
    saveBillingEvent: (filter: string) => `${url}/api/billingeventcenter/save/${filter}`,
    getBillingEventContactNotes: (patientId: number, refId: number) =>
        `${url}/api/patientcenter/patient/getbillingeventscontactnotes/${patientId}/${refId}`,

    // ------------------------------------------------------------------------------------
    // CommCenter
    // ------------------------------------------------------------------------------------
    owners: `${url}/api/commcenter/GetOwners`,
    email: (emailId: number) => `${url}/api/commcenter/getemail/${emailId}`,
    emails: (days: number) => `${url}/api/commcenter/GetEmails/${days}`,
    emailsByOwner: `${url}/api/commcenter/GetEmailsByOwner`,
    completedEmails: `${url}/api/commcenter/GetCompletedEmails`,
    deletedEmails: `${url}/api/commcenter/GetDeletedEmails`,
    myEmails: `${url}/api/commcenter/GetMyEmails`,
    getEmailsBySource: (source: string) => `${url}/api/commcenter/getemailsbysource/${source}`,
    viewDocument: (emailId: number) => `${url}/api/commcenter/viewfile/${emailId}`,
    attachments: (emailId: number) => `${url}/api/commcenter/getattachments/${emailId}`,
    notes: (emailId: number) => `${url}/api/commcenter/getnotes/${emailId}`,
    addNote: `${url}/api/commcenter/addnote`,
    tags: (emailId: number) => `${url}/api/commcenter/GetTags/${emailId}`,
    addTag: `${url}/api/commcenter/AddTag`,
    deleteTag: `${url}/api/commcenter/DeleteTag`,
    updateLabel: `${url}/api/commcenter/updatelabel`,
    updateOwner: `${url}/api/commcenter/updateowner`,
    createEmail: `${url}/api/commcenter/addtask`,
    markMailAsComplete: `${url}/api/commcenter/completedemail`,
    deleteMail: `${url}/api/commcenter/deleteemail`,
    emailGroupEdit: `${url}/api/commcenter/emailgroupedit`,
    reopenCompletedEmail: `${url}/api/commcenter/reopencompletedemail`,

    // ------------------------------------------------------------------------------------
    // Code Center
    // ------------------------------------------------------------------------------------
    getAllCodes: `${url}/api/codecenter/getallcodes`,
    saveCode: `${url}/api/codecenter/code/save`,
    deleteCode: `${url}/api/codecenter/code/delete`,

    // ------------------------------------------------------------------------------------
    // Configuration Center
    // ------------------------------------------------------------------------------------
    getAllConfigurations: `${url}/api/configurationcenter/getallconfiguration`,
    saveConfiguration: `${url}/api/configurationcenter/configuration/save`,
    deleteConfiguration: `${url}/api/configurationcenter/configuration/delete`,

    // ------------------------------------------------------------------------------------
    // Dashboard V1
    // ------------------------------------------------------------------------------------
    cgmpatientsshippedtodayV1: `${url}/api/dashboard/cgmpatientsshippedtoday`,
    cgmreferralsenteredtodayV1: `${url}/api/dashboard/cgmreferralsenteredtoday`,
    newcgmreferralsshippedtodayV1: `${url}/api/dashboard/newcgmreferralsshippedtoday`,
    pendingcgmreferralsreconciledV1: `${url}/api/dashboard/pendingcgmreferralsreconciled`,
    cgmpatientsshippedthismonthV1: `${url}/api/dashboard/cgmpatientsshippedthismonth`,
    newcgmreferralsshippedthismonthV1: `${url}/api/dashboard/newcgmreferralsshippedthismonth`,
    billingperformanceV1: `${url}/api/dashboard/billingperformance`,
    pendingcgmreferralsreconciledthismonthV1: `${url}/api/dashboard/pendingcgmreferralsreconciledthismonth`,
    cgmreferralsenteredthismonthV1: `${url}/api/dashboard/cgmreferralsenteredthismonth`,
    cgmtotalactivecgmpatientsthisyearV1: `${url}/api/dashboard/cgmtotalactivecgmpatientsthisyear`,
    totalpendingcgmreferralsV1: `${url}/api/dashboard/totalpendingcgmreferrals`,
    activecmnexpiration14daysV1: `${url}/api/dashboard/activecmnexpiration14days`,
    averagedaysfromreferralentrytoactivestatusV1: `${url}/api/dashboard/averagedaysfromreferralentrytoactivestatus`,
    percentcgmreferralsturnedintoactivepatientsV1: `${url}/api/dashboard/percentcgmreferralsturnedintoactivepatients`,
    patientsusinganswersreorderportalV1: `${url}/api/dashboard/patientsusinganswersreorderportal`,

    // ------------------------------------------------------------------------------------
    // Dashboard V2
    // ------------------------------------------------------------------------------------

    // COUNTER 1-1
    reordersconfirmedtodaybymanufacturer: `${url}/api/v2/dashboard/cgmpatientsshippedtodaybymanufacturer`,

    // COUNTER 1-2
    cgmreferralsenteredtodaybymanufacturer: `${url}/api/v2/dashboard/cgmreferralsenteredtodaybymanufacturer`,

    // COUNTER 1-3
    dailymenuvisits: `${url}/api/v2/dashboard/dailymenuvisits`,

    // COUNTER 1-4
    newcgmreferralsshippedtoday: `${url}/api/v2/dashboard/newcgmreferralsshippedtoday`,

    // COUNTER 1-5
    pendingcgmreferralsreconciled: `${url}/api/v2/dashboard/pendingcgmreferralsreconciled`,

    // COUNTER 1-6
    docmanagementkpi: `${url}/api/v2/dashboard/docmanagementkpi`,

    // COUNTER 2-1
    totalordersprocessedthismonth: `${url}/api/v2/dashboard/totalordersprocessedthismonth`,

    // COUNTER 2-1 *** THIS IS GOING AWAY
    reordersthismonth: `${url}/api/v2/dashboard/reordersthismonth`,

    // COUNTER 2-2
    invitationsthismonth: `${url}/api/v2/dashboard/invitationsthismonth`,

    // COUNTER 2-2a NEW
    reordersthismonthBreakdown: `${url}/api/v2/dashboard/cgmordersprocessedthismonthbreakdown`,

    // COUNTER 2-2b NEW
    reordersthismonthCategory: `${url}/api/v2/dashboard/ordersprocessedbycategory`,

    // COUNTER 2-3
    billingperformance: `${url}/api/v2/dashboard/billingperformance`,

    // COUNTER 2-4
    cgmreferralsenteredthismonthbymanufacturer: `${url}/api/v2/dashboard/cgmreferralsenteredthismonthbymanufacturer`,

    // COUNTER 2-5
    cgmreferralsshippedthismonthbymanufacturer: `${url}/api/v2/dashboard/newcgmreferralsshippedthismonthbymanufacturer`,

    // COUNTER 2-6
    monthlymenuvisits: `${url}/api/v2/dashboard/monthlymenuvisits`,

    // COUNTER 2-7
    hollysmokesthismonth: `${url}/api/v2/dashboard/hollysmokesthismonth`,

    // COUNTER 3-1
    cgmtotalactivecgmpatientsthisyear: `${url}/api/v2/dashboard/cgmtotalactivecgmpatientsthisyear`,

    // COUNTER 3-2
    activecmnexpiration14days: `${url}/api/v2/dashboard/activecmnexpiration14days`,

    // COUNTER 3-3
    totalpendingcgmreferrals: `${url}/api/v2/dashboard/totalpendingcgmreferrals`,

    // COUNTER 3-4
    averagedaysfromreferralentrytoactivestatus: `${url}/api/v2/dashboard/averagedaysfromreferralentrytoactivestatus`,

    // COUNTER 3-5
    percentcgmreferralsturnedintoactivepatients: `${url}/api/v2/dashboard/percentcgmreferralsturnedintoactivepatients`,

    // COUNTER 3-6
    patientsusinganswersreorderportal: `${url}/api/v2/dashboard/patientsusinganswersreorderportal`,

    // COUNTER 3-7
    totalrspaccounts: `${url}/api/v2/dashboard/totalrspaccounts`,

    // COUNTER 3-8
    retentionRate: `${url}/api/v2/dashboard/cgmretentionrate`,

    // COUNTER 2-2 new
    cgmordersprocessedthismonth: `${url}/api/v2/dashboard/cgmordersprocessedthismonth`,

    cgmAverageServiceLongevity: `${url}/api/v2/dashboard/averageservicelongevity`,

    activePatientLongevityThisMonth: `${url}/api/v2/dashboard/activepatientlongevity`,

    // COUNTER 4-1
    dashboardGoals: `${url}/api/v2/dashboard/goals`,

    // ------------------------------------------------------------------------------------
    // DexcomCenter
    // ------------------------------------------------------------------------------------
    getDexcomUsers: `${url}/api/dexcomcenter/users`,
    getDexcomUser: (id: number) => `${url}/api/dexcomcenter/users/getuser/${id}`,
    addDexcomUser: `${url}/api/dexcomcenter/user/save`,
    updateDexcomUser: `${url}/api/dexcomcenter/user/save`,
    deleteDexcomUser: `${url}/api/dexcomcenter/user/delete`,

    // ------------------------------------------------------------------------------------
    // Employee Center
    // ------------------------------------------------------------------------------------
    getEmployees: (filter: string) => `${url}/api/employeecenter/employees/${filter}`,
    //getEmployee: employeeid => `${url}/api/employeecenter/employees/${employeeid}`,
    saveEmployee: `${url}/api/employeecenter/employee/quicksave`,
    deleteEmployee: `${url}/api/employeecenter/employee/delete`,
    getEmployeeDetails: id => `${url}/api/global/getemployee/${id}`,
    //getEmployeePic: id => `${url}/api/employeecenter/employees/getemployeepic/${id}`,
    saveSecurity: `${url}/api/employeecenter/employee/security/save`,
    addNewAccess: `${url}/api/employeecenter/employee/security/add`,
    saveEmployeeDemographics: `${url}/api/employeecenter/employee/savedemographics`,
    uploadEmployeePic: `${url}/api/employeecenter/employee/uploadpicture`,
    employeeSearch: `${url}/api/employeecenter/employee/searchemployee`,
    getEmployeeAccess: id => `${url}/api/employeecenter/employees/getemployeeaccess/${id}`,
    saveEmployeeAccess: `${url}/api/employeecenter/employee/security/save`,
    deleteEmployeeAccess: `${url}/api/employeecenter/employee/security/delete`,

    // ------------------------------------------------------------------------------------
    // Event Tracking Center
    // ------------------------------------------------------------------------------------
    eventTracking: `${url}/api/eventtrackingcenter`,

    // ------------------------------------------------------------------------------------
    // Global Center
    // ------------------------------------------------------------------------------------
    getEmployeeId: `${url}/api/global/getemployeeid`,
    getEmployeePic: id => `${url}/api/global/getemployeepic/${id}`,
    getEmployee: id => `${url}/api/global/getemployee/${id}`,

    // ------------------------------------------------------------------------------------
    // HotKeys Center
    // ------------------------------------------------------------------------------------
    gethotKeys: `${url}/api/hotkeyscenter/getallhotkeys`,
    savehotKeys: `${url}/api/hotkeyscenter/hotkey/save`,
    deletehotKeys: `${url}/api/hotkeyscenter/hotkey/delete`,

    // ------------------------------------------------------------------------------------
    // ICDCode CenterGET
    // ------------------------------------------------------------------------------------
    geticdcode: `${url}/api/icdcode/getallicdcodes`,
    saveicdcode: `${url}/api/icdcode/icdcode/save`,
    deleteicdcode: `${url}/api/icdcode/icdcode/delete`,
    getIcdCodeById: id => `${url}/api/icdcode/geticdcode/${id}`,

    // ------------------------------------------------------------------------------------
    // Identity Center
    // ------------------------------------------------------------------------------------
    getUsers: `${url}/api/identitycenter/users`,
    saveUser: `${url}/api/identitycenter/user/save`,
    deleteUser: `${url}/api/identitycenter/user/delete`,
    resetpassword: `${url}/api/identitycenter/user/resetpassword`,
    forgotPassword: `${url}/api/identitycenter/user/forgotpassword`,

    // ------------------------------------------------------------------------------------
    // Inventory Center
    // ------------------------------------------------------------------------------------
    getInventory: (filter: string) => `${url}/api/inventorycenter/getall/${filter}`,
    saveInventory: `${url}/api/inventorycenter/item/save`,
    deleteInventory: `${url}/api/inventorycenter/item/delete`,
    getPriceCodeDropdown: `${url}/api/payorcenter/pricecode`,
    getCMNFormsDropdown: `${url}/api/pricecenter/cmnforms`,
    getPriceList: productId => `${url}/api/pricecenter/getitempricelist/${productId}`,
    getPriceById: priceId => `${url}/api/pricecenter/getprice/${priceId}`,
    savePriceById: `${url}/api/pricecenter/price/save`,
    getVendorCodeDropdown: `${url}/api/inventorycenter/getallvendors`,
    getLocationBinDropdown: `${url}/api/inventorycenter/inventorylocationbindropdown`,
    getLocationCodeDropdown: `${url}/api/inventorycenter/inventorylocationdropdown`,
    getVendorList: productId => `${url}/api/inventorycenter/getinventoryvendorlist/${productId}`,
    saveInventoryVendor: `${url}/api/inventorycenter/saveinventoryvendor`,
    getLocationList: (itemid, location) => `${url}/api/inventorycenter/getinventorylocationlist/${itemid}/''`,
    saveLocation: `${url}/api/inventorycenter/saveinventorylocation`,
    getProductDetails: id => `${url}/api/inventorycenter/getitem/${id}`,
    getClassDorpDown: `${url}/api/inventorycenter/itemcategorydropdown`,
    getShippingDorpDown: `${url}/api/inventorycenter/unitofmeasuredropdown`,
    getStatusDorpDown: `${url}/api/inventorycenter/itemstatusdropdown`,
    getMakeDorpDown: `${url}/api/inventorycenter/makedropdown`,
    getModelDorpDown: `${url}/api/inventorycenter/modeldropdown`,
    getManufacturerDorpDown: `${url}/api/inventorycenter/manufacturerdropdown`,

    // ------------------------------------------------------------------------------------
    // Job Center
    // ------------------------------------------------------------------------------------
    getjobs: `${url}/api/jobcenter/getscheduledjobs`,
    getjob: id => `${url}/api/jobcenter/${id}`,
    updatejob: `${url}/api/jobcenter/update`,
    postjob: `${url}/api/jobcenter/create`,
    deletejob: `${url}/api/jobcenter/delete`,
    getjobhistory: id => `${url}/api/jobcenter/jobhistory/${id}`,
    getJobhistoryDetailsById: historyId => `${url}/api/jobcenter/jobhistory/jobdetails/${historyId}`,
    gerRunNow: jobId => `${url}/api/jobcenter/runnow/${jobId}`,

    // ------------------------------------------------------------------------------------
    // LICENSE Center
    // ------------------------------------------------------------------------------------
    getAllLicense: (filter: string) => `${url}/api/licensecenter/${filter}`,
    getLicenseById: id => `${url}/api/licensecenter/license/${id}`,
    saveLicense: `${url}/api/licensecenter/license/save`,
    deleteLicense: `${url}/api/licensecenter/license/delete`,
    getLicenseFolderById: id => `${url}/api/licensecenter/getfolder/${id}`,

    // ------------------------------------------------------------------------------------
    // MapCenter
    // ------------------------------------------------------------------------------------
    getMapPoints: (filter: string) => `${url}/api/mapcenter/getmappoints/${filter}`,
    salesreps: `${url}/api/mapcenter/getsalesreps`,

    // ------------------------------------------------------------------------------------
    // OnboardingCenter
    // ------------------------------------------------------------------------------------
    getkpi1: `${url}/api/onboardingcenter/getkpi1`,
    getkpi2: `${url}/api/onboardingcenter/getkpi2`,
    getkpi3: `${url}/api/onboardingcenter/getkpi3`,
    getkpi4: `${url}/api/onboardingcenter/getkpi4`,
    getkpi5: `${url}/api/onboardingcenter/getkpi5`,
    getkpi6: `${url}/api/onboardingcenter/getkpi6`,
    getkpi7: `${url}/api/onboardingcenter/getkpi7`,
    getkpi8: `${url}/api/onboardingcenter/getkpi8`,
    getkpi9: `${url}/api/onboardingcenter/getkpi9`,
    getDrillDown: id => `${url}/api/onboardingcenter/drilldown/${id}`,

    // ------------------------------------------------------------------------------------
    // IntakeCenter
    // ------------------------------------------------------------------------------------
    getIntake: (filter: string) => `${url}/api/intakecenter/getall/${filter}`,

    // ------------------------------------------------------------------------------------
    // ComplianceCenter
    // ------------------------------------------------------------------------------------
    getCompliance: (filter: string) => `${url}/api/compliancecenter/compliance/${filter}`,

    // ------------------------------------------------------------------------------------
    // CareManagement Center
    // ------------------------------------------------------------------------------------
    getCareManagement: (filter: string) => `${url}/api/caremanagementcenter/caremanagement/${filter}`,

    // ------------------------------------------------------------------------------------
    // AuditCenter
    // ------------------------------------------------------------------------------------
    getAudit: (filter: string) => `${url}/api/auditcenter/audit/${filter}`,

    // ------------------------------------------------------------------------------------
    // PatientCenter
    // ------------------------------------------------------------------------------------
    getPatients: (filter: string) => `${url}/api/patientcenter/patients/${filter}`,
    getPatientDetails: id => `${url}/api/patientcenter/patients/getpatient/${id}`,
    getPatientWorkOrders: id => `${url}/api/patientcenter/patient/getpatientworkorders/${id}`,
    groupEdit: `${url}/api/patientcenter/patient/workorder/groupedit`,
    getPatientWorkOrder: workOrderId => `${url}/api/workordercenter/workorder/getworkorder/${workOrderId}`,
    getPatientInsurance: id => `${url}/api/patientcenter/patient/getpatientinsurance/${id}`,
    getPatientPayors: id => `${url}/api/patientcenter/patient/getpatientpayors/${id}`,
    getPatientPhysicians: id => `${url}/api/patientcenter/patient/getpatientphysicians/${id}`,
    getPatientdiagnosiscode: id => `${url}/api/patientcenter/patient/getpatientdiagnosiscodes/${id}`,
    getPatientdiagnosiscodeList: `${url}/api/patientcenter/getdiagnosiscodelist`,
    getPatientPayor: id => `${url}/api/patientcenter/patient/getpatientpayor/${id}`,
    getPatientDocuments: (patientId: Patient['id']) =>
        `${url}/api/patientcenter/patient/getpatientdocuments/${patientId}`,
    getPatientCollectionDocuments: (patientId: Patient['id']) =>
        `${url}/api/patientcenter/patient/getpatientcollectionnotes/${patientId}`,
    getPatientContactNotes: id => `${url}/api/patientcenter/patient/getpatientcontactnotes/${id}`,
    getPatientOrderHistory: (patientId: Patient['id']) =>
        `${url}/api/patientcenter/patient/getpatientorderhistory/${patientId}`,
    getPatientOtherAddress: id => `${url}/api/patientcenter/patient/getpatientotheraddress/${id}`,
    getPatientArHistory: id => `${url}/api/accountsreceivablecenter/getarhistorybypatientid/${id}`,
    getPatientInquiryChanges: id => `${url}/api/accountsreceivablecenter/getinqurychangesbypatientid/${id}`,
    getPatientInquiryChangesById: id => `${url}/api/accountsreceivablecenter/getinquirychangebyid/${id}`,
    getPatientCharges: id => `${url}/api/patientcenter/patient/getcharges/${id}`,
    getPatientChargesById: id => `${url}/api/patientcenter/patient/getchargebyid/${id}`,
    savePatientChargesById: `${url}/api/chargecenter/charge/save`,
    groupEditCharges: `${url}/api/chargecenter/groupedit`,
    getPaymentTypeDropdown: `${url}/api/patientcenter/paymenttypedropdown`,
    getToPatientDefault: `${url}/api/global/gettopatientdefault`,
    getPatientInsuranceRank2: (patientId: number) =>
        `${url}/api/accountsreceivablecenter/getpatientinsurancerank2/${patientId}`,
    getPatientEventsBillingRecords: (patientId: number, eventType: string) =>
        `${url}/api/patientcenter/patient/getbillingeventsrequests/${patientId}/${eventType}`,
    addEventBillingNote: `${url}/api/patientcenter/patient/billingeventcontactnote/save`,
    getPatientPaymentsAdjustments: id => `${url}/api/accountsreceivablecenter/getpaymentsadjustments/${id}`,
    getPatientPaymentsAdjustmentsById: id => `${url}/api/accountsreceivablecenter/getpaymentsadjustmentsbyid/${id}`,
    savePaymentAdjustment: `${url}/api/accountsreceivablecenter/savepaymentadjustment`,
    getPatientArHistoryById: id => `${url}/api/accountsreceivablecenter/getarbyid/${id}`,
    savePatientArHistoryById: `${url}/api/accountsreceivablecenter/save`,
    saveInquiryChanges: `${url}/api/accountsreceivablecenter/saveic`,
    groupEditInquiryChanges: `${url}/api/accountsreceivablecenter/groupedit`,
    viewPatientDocument: (fileId: PatientDocument['id']) =>
        `${url}/api/patientcenter/patient/viewpatientdocument/${fileId}`,
    patientQuickSave: `${url}/api/patientcenter/patient/quicksave`,
    patientSearch: `${url}/api/patientcenter/searchpatient`,
    faxIntoPatientRecord: `${url}/api/commcenter/linkdocument`,
    patientDelete: `${url}/api/patientcenter/patient/delete`,
    patientOtherAddressSave: `${url}/api/patientcenter/patient/otheraddress/save`,
    patientOtherAddressDelete: `${url}/api/patientcenter/patient/otheraddress/delete`,
    patientDocumentUpload: `${url}/api/patientcenter/patient/document/upload`,
    patientDocumentSave: `${url}/api/patientcenter/patient/document/save`,
    getPatientPayorsList: `${url}/api/patientcenter/getpayorlist`,
    getPatientPhysiciansList: `${url}/api/patientcenter/getphysicianlist`,
    addPatientPayors: `${url}/api/patientcenter/patient/payor/save`,
    updatePatientPayors: `${url}/api/patientcenter/patient/payor/saverank`,
    addPatientPhysicians: `${url}/api/patientcenter/patient/physician/save`,
    addPatientDiagnosiscodes: `${url}/api/patientcenter/patient/diagnosiscode/save`,
    patientContactNoteSave: `${url}/api/patientcenter/patient/contactnote/save`,
    patientCollectionNoteSave: `${url}/api/patientcenter/patient/collectionnote/save`,
    ContactList: `${url}/api/patientcenter/contacttypesdropdown`,
    saveDemographics: `${url}/api/patientcenter/patient/savedemographics`,
    savechecklist: `${url}/api/patientcenter/patient/savechecklist`,
    getPatientSalesRep: `${url}/api/patientcenter/salesrepdropdown`,
    getPatientIntake: `${url}/api/patientcenter/intakedropdown`,
    getPatientCategory: `${url}/api/patientcenter/patientcategorydropdown`,
    getPatientContactMethod: `${url}/api/patientcenter/preferredcontactmethod`,
    getPatientStatus: `${url}/api/patientcenter/patientstatusdropdown`,
    getPatientReferral: `${url}/api/patientcenter/referralmethoddropdown`,
    getInactiveReason: `${url}/api/patientcenter/inactivereasondropdown`,
    getPlaceOfService: `${url}/api/patientcenter/placeofservicedropdown`,
    deletePatientArHistory: `${url}/api/accountsreceivablecenter/delete`,
    AmtAdjustedCodedropdown: `${url}/api/accountsreceivablecenter/adjustcodedropdown`,
    getStateCity: zipCode => `${url}/api/patientcenter/zipcodelookup/${zipCode}`,
    getPatientsensor: id => `${url}/api/patientcenter/patient/getsensortimeline/${id}`,
    deletePatient: `${url}/api/patientcenter/patient/delete`,
    deletePatientPayors: `${url}/api/patientcenter/patient/payor/delete`,
    deletePatientPhysicians: `${url}/api/patientcenter/patient/physician/delete`,
    deletePatientDiagnosiscode: `${url}/api/patientcenter/patient/diagnosiscode/delete`,
    getReferCode: (id, tableName) => `${url}/api/global/getcodeforid/${tableName}/${id}`,
    getItemCode: (id, tableName) => `${url}/api/global/getcodeforid/${tableName}/${id}`,
    getPatientsReferal: `${url}/api/patientcenter/getreferalsourcelist`,
    sendFaxMessage: `${url}/api/patientcenter/patient/quickfaxtool/send`,
    getDoctorDetails: patientid => `${url}/api/patientcenter/patient/getpatientprimaryphysician/${patientid}`,
    getEmergencyContacts: patientid => `${url}/api/patientcenter/patient/getpatientadditionalcontacts/${patientid}`,
    addEmergencyContact: `${url}/api/patientcenter/patient/additionalcontact/save`,
    deleteEmergencyContact: `${url}/api/patientcenter/patient/additionalcontact/delete`,
    getAutomatedEmails: patientId => `${url}/api/patientcenter/patient/getpatientmessagessent/${patientId}`,
    getEFirst: patientId => `${url}/api/patientcenter/patient/getpatientefirst/${patientId}`,
    saveSelectedProcessShortcut: `${url}/api/patientcenter/patient/workorder/processshortcut`,
    deleteMultipleWorkOrder: `${url}/api/patientcenter/patient/workorder/deletemultiple`,
    deletePatientDocument: `${url}/api/patientcenter/patient/document/delete`,
    getPatientValidations: id => `${url}/api/patientcenter/patientvalidations/${id}`,
    getPatientBalance: id => `${url}/api/patientcenter/patientbalances/${id}`,
    getPatietSWO: patientid => `${url}/api/patientcenter/patientswo/${patientid}`,
    updatepatientSWO: `${url}/api/patientcenter/sendswo`,
    getAuthorizePrism: id => `${url}/api/patientcenter/getprismauthorization/${id}`,
    authorizePrism: id => `${url}/api/patientcenter/authorizeprism/${id}`,
    getPatientCompliance: patientId => `${url}/api/patientcenter/patient/getpatientcompliancerequests/${patientId}`,
    savePatientCompliance: () => `${url}/api/patientcenter/patient/savecompliancerequest`,
    getPatientCareManagementRecords: (patientId: number) =>
        `${url}/api/patientcenter/patient/getpatientcaremanagementrequests/${patientId}`,
    addPatientCareManagementRecord: `${url}/api/caremanagementcenter/caremanagement/save`,
    getPatientPayorRank1: (patientId: number) => `${url}/api/patientcenter/patient/getpayorrank1/${patientId}`,
    deletePatientCareManagementRecord: `${url}/api/caremanagementcenter/caremanagement/delete`,
    deletePatientCompliance: `${url}/api/compliancecenter/compliance/delete`,
    getComplianceContactNotes: (patientId: number, refId: number) =>
        `${url}/api/patientcenter/patient/getcompliancecontactnotes/${patientId}/${refId}`,
    getCareManagementContactNotes: (patientId: number, refId: number) =>
        `${url}/api/patientcenter/patient/getcaremanagementcontactnotes/${patientId}/${refId}`,
    getPatientAuditContactNotes: (patientId: number, refId: number) =>
        `${url}/api/patientcenter/patient/getauditcontactnotes/${patientId}/${refId}`,
    addCareManagementContactNotes: `${url}/api/patientcenter/patient/caremanagementcontactnote/save`,
    addComplianceContactNotes: `${url}/api/patientcenter/patient/compliancecontactnote/save`,
    addAuditContactNotes: `${url}/api/patientcenter/patient/auditcontactnote/save`,
    savePatientAudit: () => `${url}/api/auditcenter/audit/save`,
    getPatientAudit: patientId => `${url}/api/patientcenter/patient/getpatientauditrequests/${patientId}`,

    // ------------------------------------------------------------------------------------
    // PatientPortal
    // ------------------------------------------------------------------------------------
    getPatientPortalUsers: (filter: string) => `${url}/api/patientportal/users/${filter}`,
    getPatientPortalUser: (id: number) => `${url}/api/patientportal/users/getuser/${id}`,
    addPatientPortalUser: `${url}/api/patientportal/user/save`,
    updatePatientPortalUser: `${url}/api/patientportal/user/save`,
    deletePatientPortalUser: `${url}/api/patientportal/user/delete`,

    // ------------------------------------------------------------------------------------
    // PROOF OF DELIVERY CENTER
    // ------------------------------------------------------------------------------------
    getAllProofOfDelivery: `${url}/api/proofofdeliverycenter/getall`,
    updateProofOfDelivery: `${url}/api/proofofdeliverycenter/proofofdelivery/save`,
    proofOfDeliverySearch: `${url}/api/proofofdeliverycenter/searchpod`,

    // ------------------------------------------------------------------------------------
    // PAYOR CENTER
    // ------------------------------------------------------------------------------------
    payorQuickSave: `${url}/api/payorcenter/payor/quicksave`,
    getPayorsId: id => `${url}/api/payorcenter/payors/getpayor/${id}`,
    getPayors: `${url}/api/payorcenter/payors/getall`,
    getPriceCode: `${url}/api/payorcenter/pricecode`,
    getPrimaryBillForm: `${url}/api/payorcenter/primarybillform`,
    getPayorType: `${url}/api/payorcenter/payortype`,
    getBoxOne: `${url}/api/payorcenter/box1`,
    getClaimIndicator: `${url}/api/payorcenter/claimindicator`,
    getClearinghouse: `${url}/api/clearinghousecenter/clearinghousedropdown`,
    getFinancialClass: `${url}/api/payorcenter/financialclass`,
    saveBillInfo: `${url}/api/payorcenter/payors/savepayorinformation`,
    saveBillOption: `${url}/api/payorcenter/payors/savebillingoptions`,
    save837Data: `${url}/api/payorcenter/payors/save837data`,
    save1500Data: `${url}/api/payorcenter/payors/save1500data`,
    getPayorOverrides: (filter: string) => `${url}/api/payorcenter/payoroverride/${filter}`,
    payorOverrideSave: `${url}/api/payorcenter/payoroverride/save`,
    updatePayorOverride: (id: number) => `${url}/api/payorcenter/payoroverride/override/${id}`,
    deletePayorOverride: `${url}/api/payorcenter/payoroverride/delete`,

    // ------------------------------------------------------------------------------------
    // PhysicianCenter
    // ------------------------------------------------------------------------------------
    getPhysicians: (filter: string) => `${url}/api/physiciancenter/physicians/${filter}`,
    getPhysicianById: id => `${url}/api/physiciancenter/physician/${id}`,
    savePhysician: `${url}/api/physiciancenter/physician/save`,
    deletePhysician: `${url}/api/physiciancenter/physician/delete`,
    getTaxonomy: `${url}/api/physiciancenter/taxonomydropdown`,
    physicianQuickSave: `${url}/api/physiciancenter/physician/quicksave`,

    // ------------------------------------------------------------------------------------
    // PriceCenter
    // ------------------------------------------------------------------------------------
    getAllPrice: `${url}/api/pricecenter/getall`,
    getPriceInfo: id => `${url}/api/pricecenter/getprice/${id}`,
    savePrice: `${url}/api/pricecenter/price/save`,
    deletePrice: `${url}/api/pricecenter/price/delete`,
    itemSearch: `${url}/api/pricecenter/searchprice`,
    itemPriceList: id => `${url}/api/pricecenter/getitempricelist/${id}`,

    // ------------------------------------------------------------------------------------
    // Referral Center
    // ------------------------------------------------------------------------------------
    getReferrals: (filter: string) => `${url}/api/referralcenter/referrals/${filter}`,
    getReferralDetails: id => `${url}/api/referralcenter/referral/${id}?referralId=${id}`,
    saveReferral: `${url}/api/referralcenter/referrals/save`,
    deleteReferral: `${url}/api/referralcenter/referrals/delete`,
    getSalesRepDropDown: `${url}/api/referralcenter/salesrepdropdown`,
    referralQuickSave: `${url}/api/referralcenter/referral/quicksave`,

    // ------------------------------------------------------------------------------------
    // ReorderCenter
    // ------------------------------------------------------------------------------------
    getReorder: (filter: string) => `${url}/api/ReorderCenter/${filter}`,
    getpatient: id => `${url}/api/reordercenter/getpatient/${id}`,
    alternateShipToAddress: id => `${url}/api/reordercenter/getalternateshiptoaddress/${id}`,
    getInsurance: id => `${url}/api/reordercenter/getinsurance/${id}`,
    getPatientDoctor: id => `${url}/api/reordercenter/getdoctor/${id}`,
    getNextOrderDates: id => `${url}/api/reordercenter/genextorderdates/${id}`,
    getContactNotes: id => `${url}/api/reordercenter/getcontactnotes/${id}`,
    getReorderProducts: id => `${url}/api/reordercenter/getorderitems/${id}`,
    saveAlternateShipToAddress: `${url}/api/reordercenter/savealternateaddress`,
    savePatientDoctor: `${url}/api/reordercenter/savedoctor`,
    processreorder: `${url}/api/reordercenter/processreorder`,
    processcontact: `${url}/api/reordercenter/processcontact`,
    sendvisitnotes: id => `${url}/api/reordercenter/sendvisitnotes/${id}`,
    sendswo: id => `${url}/api/reordercenter/sendswo/${id}`,
    checkpatienteligibility: id => `${url}/api/reordercenter/checkpatienteligibility/${id}`,
    sendreordertext: id => `${url}/api/reordercenter/sendreordertext/${id}`,
    sendreorderemail: id => `${url}/api/reordercenter/sendreorderemail/${id}`,
    getPrismAuthorization: id => `${url}/api/reordercenter/getprismauthorization/${id}`,
    prismAuthorization: id => `${url}/api/reordercenter/authorizeprism/${id}`,

    // ------------------------------------------------------------------------------------
    // RetentionRateCenter
    // ------------------------------------------------------------------------------------
    getRetentionRate: `${url}/api/retentionratecenter/getallretentionrate`,
    addRetentionRate: `${url}/api/retentionratecenter/retentionrate/save`,
    deleteRetentionRate: `${url}/api/retentionratecenter/retentionrate/delete`,

    // ShortcutCenter
    // ------------------------------------------------------------------------------------
    getShortcut: `${url}/api/shortcutcenter/getallshortcuts`,
    addShortcuts: `${url}/api/shortcutcenter/shortcut/save`,
    getSelectedShortcut: id => `${url}/api/shortcutcenter/getshortcut/${id}`,
    deleteShortcut: `${url}/api/shortcutcenter/shortcut/delete`,
    getshortcutbilltypedropdown: `${url}/api/shortcutcenter/getbilltypesdropdown`,
    getshortcutitemcode: (id, tableName) => `${url}/api/shortcutcenter/getcodeforid/${tableName}/${id}`,

    // ------------------------------------------------------------------------------------
    // ReportingCenter
    // ------------------------------------------------------------------------------------
    getReportingCenterPatients: (filter: string) => `${url}/api/reportingcenter/patients/${filter}`,

    // ------------------------------------------------------------------------------------
    // Sales Center
    // ------------------------------------------------------------------------------------
    getSalesReps: (filter: string) => `${url}/api/salescenter/salesreps/${filter}`,
    getSalesRep: salesrepid => `${url}/api/salescenter/salesrep/${salesrepid}`,
    saveSalesRep: `${url}/api/salescenter/salesreps/save`,
    deleteSalesRep: `${url}/api/salescenter/salesreps/delete`,

    // ------------------------------------------------------------------------------------
    // TERRITORY TRANSFER
    // ------------------------------------------------------------------------------------
    getTerritorySalesReps: `${url}/api/territorycenter/salesrepdropdown`,
    territorytransfer: `${url}/api/territorycenter/territorytransfer`,
    getTerritoryCategory: `${url}/api/territorycenter/categorydropdown`,

    // ------------------------------------------------------------------------------------
    // Tracking Center
    // ------------------------------------------------------------------------------------
    tracking: `${url}/api/trackingcenter/track/`,

    // ------------------------------------------------------------------------------------
    // Tech Dashboard
    // ------------------------------------------------------------------------------------
    threatsbymonth: `${url}/api/techdashboard/threatsbymonth`,
    threatpercentage: `${url}/api/techdashboard/threatpercentage`,
    monthwithhighestthreat: `${url}/api/techdashboard/monthwithhighestthreat`,

    // ------------------------------------------------------------------------------------
    // User Center
    // ------------------------------------------------------------------------------------
    //getEmployeeId: `${url}/api/employeecenter/getemployeeid`,
    getUserDetails: id => `${url}/api/global/getemployee/${id}`,

    // ------------------------------------------------------------------------------------
    // Vault Center
    // ------------------------------------------------------------------------------------
    vaulthello: `${url}/api/vaultventer/hello`,
    vaultgetvaults: `${url}/api/vaultcenter/getvaults`,
    vaultgetfolders: vaultid => `${url}/api/vaultcenter/getfolders/${vaultid}`,
    vaultgetfoldertree: vaultid => `${url}/api/vaultcenter/getfoldertree/${vaultid}`,
    vaultgetfiles: folderid => `${url}/api/vaultcenter/getfiles/${folderid}`,
    vaultviewfile: fileid => `${url}/api/vaultcenter/viewfile/${fileid}`,
    vaultgetfoldertreejson: vaultId => `${url}/api/vaultcenter/getfoldertreejson/${vaultId}`,
    vaultsavefolder: `${url}/api/vaultcenter/savefolder`,
    vaultsavevault: `${url}/api/vaultcenter/savevault`,
    vaultsavefile: `${url}/api/vaultcenter/savefile`,
    vaultdeletefile: `${url}/api/vaultcenter/deletefile`,
    vaultdeletefolder: folderid => `${url}/api/vaultcenter/deletefolder/${folderid}`,
    vaultdeletevault: vaultId => `${url}/api/vaultcenter/deletevault/${vaultId}`,
    vaultuploadfile: `${url}/api/vaultcenter/upload`,
    vaultgettags: fileid => `${url}/api/vaultcenter/gettags/${fileid}`,
    vaultaddtag: `${url}/api/vaultcenter/addtag`,
    vaultdeletetag: `${url}/api/vaultcenter/deletetag`,
    vaultgetnotifications: fileId => `${url}/api/vaultcenter/getnotification/${fileId}`,
    vaultsavenotification: `${url}/api/vaultcenter/savenotification`,
    vaultdeletenotification: `${url}/api/vaultcenter/deletenotification`,

    // ------------------------------------------------------------------------------------
    // ValidationCenter
    // ------------------------------------------------------------------------------------
    getValidations: `${url}/api/validationcenter/getall`,
    getValidationById: id => `${url}/api/validationcenter/getvalidation/${id}`,
    saveValidation: `${url}/api/validationcenter/validation/save`,
    deleteValidation: `${url}/api/validationcenter/validation/delete`,
    searchValidation: `${url}/api/validationcenter/validation/search`,

    // ------------------------------------------------------------------------------------
    // Vendor Center
    // ------------------------------------------------------------------------------------
    getVendor: `${url}/api/vendorcenter/getallvendors`,
    saveVendor: `${url}/api/vendorcenter/vendor/save`,
    deleteVendor: `${url}/api/vendorcenter/vendor/delete`,

    // ------------------------------------------------------------------------------------
    // Work Order Center
    // ------------------------------------------------------------------------------------
    getWorkOrders: (filter: string) => `${url}/api/workordercenter/workorder/getall/${filter}`,
    getWorkOrder: workOrderId => `${url}/api/patientcenter/patient/getworkorder/${workOrderId}`,
    saveWorkOrder: `${url}/api/workordercenter/workorder/save`,
    deleteWorkOrder: `${url}/api/workordercenter/workorder/delete`,
    shipworkorder: `${url}/api/patientcenter/patient/workorder/shipworkorder`,
    printstatusdropdown: `${url}/api/accountsreceivablecenter/printstatusdropdown`,
    arbilltypedropdown: `${url}/api/accountsreceivablecenter/billtypedropdown`,
    trantypedropdown: `${url}/api/accountsreceivablecenter/trantypedropdown`,
    claimtypedropdown: `${url}/api/accountsreceivablecenter/claimtypedropdown`,
    pwktypedropdown: `${url}/api/accountsreceivablecenter/pwktypedropdown`,
    pwkmethoddropdown: `${url}/api/accountsreceivablecenter/pwkmethoddropdown`,
    analytics: `${url}/api/analyticscenter/getanalytics`,
    billto: (patientid: string) => `${url}/api/patientcenter/patient/getpatientpayors/${patientid}`,
    Physician: (patientid: string) => `${url}/api/patientcenter/patient/getpatientphysicians/${patientid}`,
    IcdCode: (patientid: string) => `${url}/api/patientcenter/patient/getpatientdiagnosiscodes/${patientid}`,
    getBatchEligibility: `${url}/api/workordercenter/getbatcheligibility`,
    processBatchEligibility: `${url}/api/workordercenter/processeligibility`,
    getWorkOrdersWithSearch: (filter: string) => `${url}/api/workordercenter/workorder/getall/${filter}`,
    wogroupEdit: `${url}/api/workordercenter/workorder/groupedit`,

    // ------------------------------------------------------------------------------------
    // ZipCode Center
    // ------------------------------------------------------------------------------------
    getzipcodes: `${url}/api/zipcodecenter/getallzips`,
    savezipcode: `${url}/api/zipcodecenter/zip/save`,
    deletezipcode: `${url}/api/zipcodecenter/zip/delete`,
};
