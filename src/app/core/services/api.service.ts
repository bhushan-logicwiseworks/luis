import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetReordersResponse } from 'app/modules/auxilium/reorder-center/interfaces/reorderPatient';
import {
    AbbottUserDisplay,
    GetAbbottUserResponse,
} from 'app/shared/interfaces/auxilium/abbott-center/abbottuser.interface';
import { AccessDisplay, GetAccessResponse } from 'app/shared/interfaces/auxilium/access-center/access.interface';
import { GetAgingReportResponse } from 'app/shared/interfaces/auxilium/bill-center/aging-report.interface';
import { Counter } from 'app/shared/interfaces/auxilium/bill-center/bill-dashboard.interface';
import { BillCenterWorkOrderDisplay } from 'app/shared/interfaces/auxilium/bill-center/work-order.interface';
import {
    BillTypeDisplay,
    GetBillTypeResponse,
} from 'app/shared/interfaces/auxilium/billType-center/billType.interface';
import { GetClaimsFor837Response } from 'app/shared/interfaces/auxilium/billType-center/claims-for-837.interface';
import { GetHeldItemsReportResponse } from 'app/shared/interfaces/auxilium/billType-center/held-items-report.interface';
import { GetValidationsInformationResponse } from 'app/shared/interfaces/auxilium/billType-center/validations-information.interface';
import { GetBranchListResponse } from 'app/shared/interfaces/auxilium/branch-center/branchlist.interface';
import {
    BranchRepDisplay,
    GetBranchRepsResponse,
} from 'app/shared/interfaces/auxilium/branch-center/branchrep.interface';
import { GetCareManagementsResponse } from 'app/shared/interfaces/auxilium/caremanagement-center/caremanagement.interface';
import { ChargeDisplay, GetChargeResponse } from 'app/shared/interfaces/auxilium/charge-center/charge.interface';
import { CodeDisplay, GetCodesResponse } from 'app/shared/interfaces/auxilium/code-center/code.interface';
import {
    Email,
    GetCompletedEmailsResponse,
    GetDeletedEmailsResponse,
    GetEmailsByOwnerResponse,
    GetEmailsBySourceResponse,
    GetEmailsResponse,
    GetOwnersResponse,
} from 'app/shared/interfaces/auxilium/comm-center/api-responses.interface';
import { Attachment } from 'app/shared/interfaces/auxilium/comm-center/attachment.interface';
import { CreateEmailDto } from 'app/shared/interfaces/auxilium/comm-center/create-email.dto';
import { EmailGroupEdit } from 'app/shared/interfaces/auxilium/comm-center/email-group-edit-interface';
import { Note } from 'app/shared/interfaces/auxilium/comm-center/note.interface';
import { EmailTag } from 'app/shared/interfaces/auxilium/comm-center/tag.interface';
import { UpdateLabelResponse } from 'app/shared/interfaces/auxilium/comm-center/update-label-response.interface';
import { UpdateOwnerResponse } from 'app/shared/interfaces/auxilium/comm-center/update-owner-response.interface';
import { GetCompliancesResponse } from 'app/shared/interfaces/auxilium/compliance-center/compliance.interface';
import {
    ConfigurationDisplay,
    GetConfigurationResponse,
} from 'app/shared/interfaces/auxilium/configuration-center/configuration.interface';
import {
    DexcomUserDisplay,
    GetDexcomUserResponse,
} from 'app/shared/interfaces/auxilium/dexcom-center/dexcomuser.interface';
import {
    EmployeeSecurityDisplay,
    GetEmployeeSecurityResponse,
} from 'app/shared/interfaces/auxilium/employee-center/employee-center-security.interface';
import {
    EmployeeDisplay,
    GetEmployeeResponse,
} from 'app/shared/interfaces/auxilium/employee-center/employee.interface';
import { GetHotKeysResponse, HotKeysDisplay } from 'app/shared/interfaces/auxilium/hotKeys-center/hotkeys.interface';
import { GetIcdCodeResponse, ICDCodeDisplay } from 'app/shared/interfaces/auxilium/icdcode-center/icdcode.interface';
import {
    GetIdentityResponse,
    IdentityDisplay,
} from 'app/shared/interfaces/auxilium/identity-center/identity.interface';
import { GetIntakesResponse } from 'app/shared/interfaces/auxilium/intake-center/intake.interface';
import { CommonDropDown } from 'app/shared/interfaces/auxilium/inventory-center/common-product-dropdown.interface';
import {
    GetInventoryProductResponse,
    InventoryProductItem,
} from 'app/shared/interfaces/auxilium/inventory-center/product.interface';
import { JobDisplay } from 'app/shared/interfaces/auxilium/job-center/job-display.interface';
import { JobHistoryDetailsDisplay } from 'app/shared/interfaces/auxilium/job-center/job-history-details.interface';
import { JobHistory } from 'app/shared/interfaces/auxilium/job-center/job-history.interface';
import { Job } from 'app/shared/interfaces/auxilium/job-center/job.interface';
import { LicenseFolder } from 'app/shared/interfaces/auxilium/license-center/license-folder-interface';
import { LicenseInfo } from 'app/shared/interfaces/auxilium/license-center/license-info-interface';
import { ContactTypeList } from 'app/shared/interfaces/auxilium/patient-center/contact-type-list.interface';
import { PatientOtherAddress } from 'app/shared/interfaces/auxilium/patient-center/patient-alternate-address.interface';
import { PatientArHistoryById } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history-by-id.interface';
import { PatientArHistory } from 'app/shared/interfaces/auxilium/patient-center/patient-ar-history.interface';
import { GetPatientAutomatedEmail } from 'app/shared/interfaces/auxilium/patient-center/patient-automated-emails.interface';
import { PatientCareManagement } from 'app/shared/interfaces/auxilium/patient-center/patient-caremanagement.interface';
import { GetPatientCategoryResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-category.interface';
import { ContactNote } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance-notes.interface';
import { Compliance } from 'app/shared/interfaces/auxilium/patient-center/patient-compliance.interface';
import { PatientDiagnosisCodeAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscode-add.interface';
import { GetDiagnosisCodesListResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscode-list.interface';
import { PatientDiagnosisCodes } from 'app/shared/interfaces/auxilium/patient-center/patient-diagnosiscodes.interface';
import { PatientDocument } from 'app/shared/interfaces/auxilium/patient-center/patient-document.interface';
import { GetPatientEFirst } from 'app/shared/interfaces/auxilium/patient-center/patient-efirst.interface';
import {
    GetPatientEmergencyContact,
    PatientEmergencyContact,
} from 'app/shared/interfaces/auxilium/patient-center/patient-emergency-contacts.interface';
import { PatientNote } from 'app/shared/interfaces/auxilium/patient-center/patient-note.interface';
import { PatientOrder } from 'app/shared/interfaces/auxilium/patient-center/patient-order.interface';
import { PatientPayorsAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-add.interface';
import { PatientPayorsList } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-list.interface';
import { PayorObject } from 'app/shared/interfaces/auxilium/patient-center/patient-payors-update-rank.interface';
import { PatientPayors } from 'app/shared/interfaces/auxilium/patient-center/patient-payors.interface';
import { PatientPhysicianAdd } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians-add.interface';
import { PatientPhysicians } from 'app/shared/interfaces/auxilium/patient-center/patient-physicians.interface';
import { GetPatientPlaceOfServiceResponse } from 'app/shared/interfaces/auxilium/patient-center/patient-place-service.interface';
import {
    PatientSWODetails,
    PatientSWOInfo,
} from 'app/shared/interfaces/auxilium/patient-center/patient-prefilled-editable-swo.interface';
import {
    DropdownDisplay,
    GetDropdownDisplay,
} from 'app/shared/interfaces/auxilium/patient-center/patient-status.interface';
import { GetPatientZipCodeLookUp } from 'app/shared/interfaces/auxilium/patient-center/patient-zipcode-lookup.interface';
import { GetPatientResponse, Patient } from 'app/shared/interfaces/auxilium/patient-center/patient.interface';
import { PatientBalance } from 'app/shared/interfaces/auxilium/patient-center/patientbalances.interdace';
import { PatientEntity } from 'app/shared/interfaces/auxilium/patient-center/patiententity.entity';
import { PatientWorkOrders } from 'app/shared/interfaces/auxilium/patient-center/work-orders.interface';
import {
    GetPatientPortalUserResponse,
    PatientPortalUserDisplay,
} from 'app/shared/interfaces/auxilium/patient-portal/patient-portal-user.interface';
import {
    GetPayorOverrideResponse,
    PayorOverride,
} from 'app/shared/interfaces/auxilium/payor-center/payor-override.interface';
import { GetPayorResponse, Payor } from 'app/shared/interfaces/auxilium/payor-center/payor.interface';
import {
    GetPhysicianResponse,
    PhysicianDisplay,
} from 'app/shared/interfaces/auxilium/physician-center/physician.interface';
import { GetItemResponse, ItemDisplay } from 'app/shared/interfaces/auxilium/price-center/item.interface';
import { PriceInfoDisplay } from 'app/shared/interfaces/auxilium/price-center/price-Info.interface';
import {
    GetProofOfDeliveryResponse,
    PODSearchDetail,
    ProofOfDeliveryDetail,
} from 'app/shared/interfaces/auxilium/proof-of-delivery-center/proof-of-delivery.interface';
import { SaveProofOfDelivery } from 'app/shared/interfaces/auxilium/proof-of-delivery-center/save-proof-of-delivery.interface';
import {
    GetReferralResponse,
    ReferralDetails,
    ReferralDisplay,
    ReferralQuickSave,
} from 'app/shared/interfaces/auxilium/referral-center/referral.interface';
import {
    GetRetentionRateResponse,
    RetentionRate,
} from 'app/shared/interfaces/auxilium/retention-rate-center/retention-rate.interface';
import { GetSalesRepsResponse, SalesRepDisplay } from 'app/shared/interfaces/auxilium/sales-center/salesrep.interface';
import {
    GetShortcutResponse,
    ShortcutDisplay,
} from 'app/shared/interfaces/auxilium/shortcut-center/shortcut.interface';
import {
    GetValidationResponse,
    Validation,
} from 'app/shared/interfaces/auxilium/validation-center/validation.interface';
import { GetVendorsResponse, VendorDisplay } from 'app/shared/interfaces/auxilium/vendor-center/vendor.interface';
import { WorkOrderDisplay } from 'app/shared/interfaces/auxilium/work-order-center/work-order-center.interface';
import { GetZipCodesResponse, ZipCodeDisplay } from 'app/shared/interfaces/auxilium/zipcode-center/zipcode.interface';
import { ResetPassword } from 'app/shared/interfaces/user/credentials.interface';
import { GetMapListResponse, GetMapSalesRepsResponse } from 'app/shared/interfaces/user/map-center-responses.interface';
import { forkJoin, mergeMap, Observable } from 'rxjs';
import { GetAuditsResponse } from '../../shared/interfaces/auxilium/audit-center/audit.interface';
import { EOBPatientDisplay } from '../../shared/interfaces/auxilium/bill-center/eob-patients.interface';
import {
    GetRemits835Response,
    Remits835Display,
} from '../../shared/interfaces/auxilium/bill-center/remits-835.interface';
import { BillingEventsCenterResponse } from '../../shared/interfaces/auxilium/billing-events-center/billing-events-center.interfface';
import {
    CompanyDisplay,
    GetCompaniesResponse,
} from '../../shared/interfaces/auxilium/company-center/company.interface';
import { LocationBinDisplay } from '../../shared/interfaces/auxilium/inventory-center/location-bin-list.interface';
import { LocationCodeDisplay } from '../../shared/interfaces/auxilium/inventory-center/location-code-list.interface';
import { LocationList } from '../../shared/interfaces/auxilium/inventory-center/location-list.interface';
import { ItemPriceById } from '../../shared/interfaces/auxilium/inventory-center/price-by-id.interface';
import { PriceListItem } from '../../shared/interfaces/auxilium/inventory-center/price-list.interface';
import { VendorRecord } from '../../shared/interfaces/auxilium/inventory-center/vendor.interface';
import { NextDosRequest, NextDosResponse } from '../../shared/interfaces/auxilium/next-dos/next-dos.interface';
import { InsuranceInfoList } from '../../shared/interfaces/auxilium/patient-center/insurance-info.interface';
import { Audit } from '../../shared/interfaces/auxilium/patient-center/patient-audit.interface';
import { PatientChargesById } from '../../shared/interfaces/auxilium/patient-center/patient-charges-by-id.interface';
import { PatientCharges } from '../../shared/interfaces/auxilium/patient-center/patient-charges.interface';
import { PatientEventsBilling } from '../../shared/interfaces/auxilium/patient-center/patient-events-billing.interface';
import { PatientPaymentsAdjustmentsById } from '../../shared/interfaces/auxilium/patient-center/patient-payments-adjustments-by-id.interface';
import { PatientPaymentsAdjustments } from '../../shared/interfaces/auxilium/patient-center/patient-payments-adjustments.interface';
import { GetToPatientDefaultResponse } from '../../shared/interfaces/auxilium/patient-center/patient-to-patient-default.interface';
import { Backend } from './backend';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    calculateNextDos(payload: NextDosRequest): Observable<NextDosResponse> {
        const { lastDos, supplyDays } = payload;
        return this.http.get<NextDosResponse>(Backend.calculateNextDos(lastDos, supplyDays));
    }

    // ------------------------------------------------------------------------------------
    // ABBOTT CENTER
    // ------------------------------------------------------------------------------------
    getAbbottUsers() {
        return this.http.get<GetAbbottUserResponse>(Backend.getAbbottUsers);
    }
    getAbbottUser(Id: number) {
        return this.http.get<AbbottUserDisplay>(Backend.getAbbottUser(Id));
    }
    addAbbottUser(dto: AbbottUserDisplay) {
        return this.http.post<AbbottUserDisplay>(Backend.addAbbottUser, dto);
    }
    updateAbbottUser(dto: AbbottUserDisplay) {
        return this.http.post<AbbottUserDisplay>(Backend.updateAbbottUser, dto);
    }
    deleteAbbottUser(dto: AbbottUserDisplay) {
        return this.http.post<AbbottUserDisplay>(Backend.deleteAbbottUser, dto);
    }

    // ------------------------------------------------------------------------------------
    // ACCESS CENTER
    // ------------------------------------------------------------------------------------
    getAccessList(filter: string) {
        return this.http.get<GetAccessResponse>(Backend.getAccessList(filter));
    }
    getAccess(Id: number) {
        return this.http.get<AccessDisplay>(Backend.getAccess(Id));
    }
    addAccess(dto: AccessDisplay) {
        return this.http.post<AccessDisplay>(Backend.addAccess, dto);
    }
    deleteAccess(dto: AccessDisplay) {
        return this.http.post<AccessDisplay>(Backend.deleteAccess, dto);
    }
    resetPassword(dto: ResetPassword) {
        return this.http.post<void>(Backend.resetpassword, dto);
    }
    forgotPassword(dto: string) {
        return this.http.post<void>(Backend.forgotPassword, dto);
    }

    // ------------------------------------------------------------------------------------
    // ACCOUNT RECEIVABLES CENTER
    // ------------------------------------------------------------------------------------
    getARBillTypeDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.arbilltypedropdown);
    }

    // ------------------------------------------------------------------------------------
    // Bill CENTER
    // ------------------------------------------------------------------------------------
    getChargesReadyForClaims() {
        return this.http.get<GetChargeResponse>(Backend.getChargesReadyForClaims);
    }
    createclaimsfromcharges(data) {
        return this.http.post(Backend.createclaimfromcharge, data);
    }
    getclaimsreadyforvalidation() {
        return this.http.get<GetValidationsInformationResponse>(Backend.getclaimsreadyforvalidation);
    }
    prepareClaimsForValidation() {
        return this.http.get<GetValidationsInformationResponse>(Backend.prepareclaimsforvalidation);
    }
    createClaimsFromValidations(data) {
        return this.http.post(Backend.createClaimsFromValidations, data);
    }
    getHeldItemsReport() {
        return this.http.get<GetHeldItemsReportResponse>(Backend.gethelditemsReport);
    }

    getHeldItemDetails(claimId: number) {
        return this.http.get<GetHeldItemsReportResponse>(Backend.gethelditemdetails(claimId));
    }
    getListForClaimsFor837() {
        return this.http.get<GetClaimsFor837Response>(Backend.getListForClaimsFor837);
    }

    createClaimsFileFor837() {
        return this.http.post(Backend.createClaimsFileFor837, {}, { responseType: 'text' });
    }
    getBillDashboard(filter: string): Observable<Counter[]> {
        return this.http.get<Counter[]>(Backend.getBillDashboard(filter));
    }
    getBillCenterWorkOrders(filter: string) {
        return this.http.get<BillCenterWorkOrderDisplay[]>(Backend.getBillCenterWorkOrders(filter));
    }
    getAgingReports() {
        return this.http.get<GetAgingReportResponse>(Backend.getAgingReports);
    }
    getExplanationOfBenefits() {
        return this.http.get<GetRemits835Response>(Backend.getRemits835);
    }
    getEOBDetails(id: number) {
        return this.http.get<Remits835Display>(Backend.getEOBDetails(id));
    }
    getEOBById(id: number) {
        return this.http.get<EOBPatientDisplay>(Backend.getEOBById(id));
    }
    getEOB(id: number) {
        return this.http.get(Backend.getEOB(id), { responseType: 'text' });
    }
    getPatientEOB(eobId: number, refId: number) {
        return this.http.get(Backend.getPatientEOB(eobId, refId), { responseType: 'text' });
    }
    deleteExplanationOfBenefits(id: number): Observable<void> {
        return this.http.post<void>(Backend.deleteRemits835(id), {});
    }

    // ------------------------------------------------------------------------------------
    // BILLING EVENTS CENTER
    // ------------------------------------------------------------------------------------
    getAllEvents() {
        return this.http.get<BillingEventsCenterResponse>(Backend.getAllEvents);
    }
    getBillingEvents(filter: string) {
        return this.http.get<BillingEventsCenterResponse>(Backend.getBillingEvents(filter));
    }
    saveBillingEvent(data: any, filter: string) {
        return this.http.post<BillingEventsCenterResponse>(Backend.saveBillingEvent(filter), data);
    }
    getBillingEventContactNotes(patientId: number, refId: number): Observable<any> {
        return this.http.get(Backend.getBillingEventContactNotes(patientId, refId));
    }

    // ------------------------------------------------------------------------------------
    // BILLTYPE CENTER
    // ------------------------------------------------------------------------------------
    getbillTypes() {
        return this.http.get<GetBillTypeResponse>(Backend.getbillTypes);
    }
    savebillType(dto: BillTypeDisplay) {
        return this.http.post<BillTypeDisplay>(Backend.savebillType, dto);
    }
    deletebillType(dto: BillTypeDisplay) {
        return this.http.post<BillTypeDisplay>(Backend.deletebillType, dto);
    }

    // ------------------------------------------------------------------------------------
    // BRANCH CENTER
    // ------------------------------------------------------------------------------------
    getBranchList() {
        return this.http.get<GetBranchListResponse>(Backend.getBranchList);
    }

    // ------------------------------------------------------------------------------------
    // CHARGE CENTER
    // ------------------------------------------------------------------------------------
    getcharges() {
        return this.http.get<GetChargeResponse>(Backend.getcharges);
    }
    savecharge(dto: ChargeDisplay) {
        return this.http.post<ChargeDisplay>(Backend.savecharge, dto);
    }
    deletecharge(dto: ChargeDisplay) {
        return this.http.post<ChargeDisplay>(Backend.deletecharge, dto);
    }

    // ------------------------------------------------------------------------------------
    // Charges CENTER
    // ------------------------------------------------------------------------------------
    getChargesData() {
        return this.http.get<GetChargeResponse>(Backend.getChargesData);
    }
    postconfirmedworkorder(data) {
        return this.http.post(Backend.postconfirmedworkorder, data);
    }

    // ------------------------------------------------------------------------------------
    // CODE CENTER
    // ------------------------------------------------------------------------------------
    getAllCodes() {
        return this.http.get<GetCodesResponse>(Backend.getAllCodes);
    }
    saveCode(dto: CodeDisplay) {
        return this.http.post<CodeDisplay>(Backend.saveCode, dto);
    }
    deleteCode(dto: CodeDisplay) {
        return this.http.post<CodeDisplay>(Backend.deleteCode, dto);
    }

    // ------------------------------------------------------------------------------------
    // CODE CENTER
    // ------------------------------------------------------------------------------------
    getAllConfigurations() {
        return this.http.get<GetConfigurationResponse>(Backend.getAllConfigurations);
    }
    saveConfiguration(configuration: ConfigurationDisplay) {
        return this.http.post<ConfigurationDisplay>(Backend.saveConfiguration, configuration);
    }
    deleteConfiguration(id: ConfigurationDisplay) {
        return this.http.post<ConfigurationDisplay>(Backend.deleteConfiguration, id);
    }

    // ------------------------------------------------------------------------------------
    // COMPANY CENTER
    // ------------------------------------------------------------------------------------
    getCompany() {
        return this.http.get<GetCompaniesResponse>(Backend.getCompany);
    }
    getCompanyById(companyid: number) {
        return this.http.get<CompanyDisplay>(Backend.getCompanyById(companyid));
    }
    saveCompany(dto: CompanyDisplay) {
        return this.http.post<CompanyDisplay>(Backend.saveCompany, dto);
    }

    // ------------------------------------------------------------------------------------
    // COMM CENTER
    // ------------------------------------------------------------------------------------
    getEmail(emailId: Email['id']) {
        return this.http.get<Email>(Backend.email(emailId));
    }
    getEmails(days: number) {
        return this.http.get<GetEmailsResponse>(Backend.emails(days));
    }
    getEmailsByOwner() {
        return this.http.get<GetEmailsByOwnerResponse>(Backend.emailsByOwner);
    }
    getCompletedEmails() {
        return this.http.get<GetCompletedEmailsResponse>(Backend.completedEmails);
    }
    getDeletedEmails() {
        return this.http.get<GetDeletedEmailsResponse>(Backend.deletedEmails);
    }
    getMyEmails() {
        return this.http.get<GetEmailsByOwnerResponse>(Backend.myEmails);
    }
    getEmailsBySource(source: string) {
        return this.http.get<GetEmailsBySourceResponse>(Backend.getEmailsBySource(source));
    }
    getOwners() {
        return this.http.get<GetOwnersResponse>(Backend.owners);
    }
    getDocument(attachmentId: number) {
        return this.http.get(Backend.viewDocument(attachmentId), { responseType: 'blob' });
    }
    getNotes(emailId: number) {
        return this.http.get<Note[]>(Backend.notes(emailId));
    }
    addNote(note: Note) {
        return this.http.post<Note>(Backend.addNote, note);
    }
    getAttachments(emailId: number) {
        return this.http.get<Attachment[]>(Backend.attachments(emailId));
    }
    markMailAsComplete(emailId: Email['id']) {
        return this.http.post<void>(Backend.markMailAsComplete, { emailId });
    }
    markMailsAsComplete(emails: Array<number>) {
        return forkJoin(...emails.map(emailId => this.http.post<void>(Backend.markMailAsComplete, { emailId })));
    }
    deleteMail(emailId: Email['id']) {
        return this.http.post<void>(Backend.deleteMail, { emailId });
    }
    deleteMails(emails: Array<number>) {
        return forkJoin(...emails.map(emailId => this.http.post<void>(Backend.deleteMail, { emailId })));
    }
    reopenCompletedEmail(emailId: Email['id']) {
        return this.http.post<void>(Backend.reopenCompletedEmail, { emailId });
    }
    updateLabel(emailId: number, label: string) {
        return this.http.post<UpdateLabelResponse>(Backend.updateLabel, {
            id: emailId,
            label,
            currentUser: '',
        });
    }
    updateOwner(emailId: number, owner: string) {
        return this.http.post<UpdateOwnerResponse>(Backend.updateOwner, {
            id: emailId,
            newOwner: owner,
            currentUser: '',
        });
    }
    updateOwnerByEditGroup(emailIds: number[], owner: string): Observable<UpdateOwnerResponse[]> {
        const requests = emailIds.map(emailId =>
            this.http.post<UpdateOwnerResponse>(Backend.updateOwner, {
                id: emailId,
                newOwner: owner,
                currentUser: '',
            })
        );
        return forkJoin(requests);
    }
    emailGroupEdit(emailGroupEdit: EmailGroupEdit) {
        return this.http.post<void>(Backend.emailGroupEdit, {
            numbers: emailGroupEdit.numbers,
            owner: emailGroupEdit.owner,
            label: emailGroupEdit.label,
            duedate: emailGroupEdit.duedate,
            isOwnerClear: emailGroupEdit.isOwnerClear,
            isLabelClear: emailGroupEdit.isLabelClear,
            isDueDateClear: emailGroupEdit.isDueDateClear,
            currentUser: emailGroupEdit.currentUser,
        });
    }
    getTags(emailId: number) {
        return this.http.get<EmailTag[]>(Backend.tags(emailId));
    }
    addTag(emailId: number, tag: string) {
        return this.http.post<EmailTag>(Backend.addTag, {
            emailID: emailId,
            tag,
        });
    }
    deleteTag(emailId: number, tag: string) {
        return this.http.post<EmailTag>(Backend.deleteTag, {
            emailID: emailId,
            tag,
        });
    }
    createEmail(dto: CreateEmailDto) {
        return this.http.post<Email>(Backend.createEmail, dto);
    }

    // ------------------------------------------------------------------------------------
    // DEXCOM CENTER
    // ------------------------------------------------------------------------------------
    getDexcomUsers(filter: string) {
        return this.http.get<GetDexcomUserResponse>(Backend.getDexcomUsers);
    }
    getDexcomUser(Id: number) {
        return this.http.get<DexcomUserDisplay>(Backend.getDexcomUser(Id));
    }
    addDexcomUser(dto: DexcomUserDisplay) {
        return this.http.post<DexcomUserDisplay>(Backend.addDexcomUser, dto);
    }
    updateDexcomUser(dto: DexcomUserDisplay) {
        return this.http.post<DexcomUserDisplay>(Backend.updateDexcomUser, dto);
    }
    deleteDexcomUser(dto: DexcomUserDisplay) {
        return this.http.post<DexcomUserDisplay>(Backend.deleteDexcomUser, dto);
    }

    // ------------------------------------------------------------------------------------
    // EMPLOYEE CENTER
    // ------------------------------------------------------------------------------------
    getEmployees(filter: string) {
        return this.http.get<GetEmployeeResponse>(Backend.getEmployees(filter));
    }
    getEmployee(employeeid: EmployeeDisplay['id']) {
        return this.http.get<[EmployeeDisplay]>(Backend.getEmployee(employeeid));
    }
    saveEmployee(dto: EmployeeDisplay) {
        return this.http.post<EmployeeDisplay>(Backend.saveEmployee, dto);
    }
    deleteEmployee(dto: EmployeeDisplay) {
        return this.http.post<EmployeeDisplay>(Backend.deleteEmployee, dto);
    }
    getEmployeeDetails(patientId: EmployeeDisplay['id']) {
        return this.http.get<EmployeeDisplay>(Backend.getEmployeeDetails(patientId));
    }
    employeeSearch(dto: any) {
        return this.http.post<any>(Backend.employeeSearch, dto);
    }
    getProductDetails(productId: InventoryProductItem['id']) {
        return this.http.get<InventoryProductItem>(Backend.getProductDetails(productId));
    }
    getClassDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getClassDorpDown);
    }
    getShippingDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getShippingDorpDown);
    }
    getStatusDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getStatusDorpDown);
    }
    getMakeDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getMakeDorpDown);
    }
    getModelDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getModelDorpDown);
    }
    getManufacturerDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getManufacturerDorpDown);
    }
    getEmployeePic(patientId: EmployeeDisplay['id']) {
        return this.http.get<string[]>(Backend.getEmployeePic(patientId));
    }
    addEmployeeDetails(dto: EmployeeDisplay) {
        return this.http.post<EmployeeDisplay>(Backend.saveEmployeeDemographics, dto);
    }
    uploadEmployeePic(dto: any) {
        return this.http.post<number>(Backend.uploadEmployeePic, dto);
    }
    addEmployeeDemographics(dto: PatientEntity) {
        return this.http.post<PatientEntity>(Backend.saveEmployeeDemographics, dto);
    }
    addSecurity(dto: any) {
        return this.http.post(Backend.saveSecurity, dto);
    }
    addNewAccess(dto: any) {
        return this.http.post(Backend.addNewAccess, dto);
    }
    getEmployeeAccess(id: number) {
        return this.http.get<GetEmployeeSecurityResponse>(Backend.getEmployeeAccess(id));
    }
    saveEmployeeAccess(dto: EmployeeSecurityDisplay) {
        return this.http.post<EmployeeSecurityDisplay>(Backend.saveEmployeeAccess, dto);
    }
    deleteEmployeeAccess(dto: EmployeeSecurityDisplay) {
        return this.http.post<GetEmployeeSecurityResponse>(Backend.deleteEmployeeAccess, dto);
    }

    // ------------------------------------------------------------------------------------
    // HOTKEYS CENTER
    // ------------------------------------------------------------------------------------
    gethotKeys() {
        return this.http.get<GetHotKeysResponse>(Backend.gethotKeys);
    }
    savehotKeys(dto: HotKeysDisplay) {
        return this.http.post<HotKeysDisplay>(Backend.savehotKeys, dto);
    }
    deletehotKeys(dto: HotKeysDisplay) {
        return this.http.post<HotKeysDisplay>(Backend.deletehotKeys, dto);
    }

    // ------------------------------------------------------------------------------------
    // ICDCODE CENTER
    // ------------------------------------------------------------------------------------
    geticdcode() {
        return this.http.get<GetIcdCodeResponse>(Backend.geticdcode);
    }
    saveicdcode(dto: ICDCodeDisplay) {
        return this.http.post<ICDCodeDisplay>(Backend.saveicdcode, dto);
    }
    deleteicdcode(dto: ICDCodeDisplay) {
        return this.http.post<ICDCodeDisplay>(Backend.deleteicdcode, dto);
    }
    getIcdCodeById(id: string) {
        return this.http.get<ICDCodeDisplay>(Backend.getIcdCodeById(id));
    }

    // ------------------------------------------------------------------------------------
    // IDENTITY CENTER
    // ------------------------------------------------------------------------------------
    getUsers() {
        return this.http.get<GetIdentityResponse>(Backend.getUsers);
    }
    saveUser(dto: IdentityDisplay) {
        return this.http.post<IdentityDisplay>(Backend.saveUser, dto);
    }
    deleteUser(dto: IdentityDisplay) {
        return this.http.post<IdentityDisplay>(Backend.deleteUser, dto);
    }

    // ------------------------------------------------------------------------------------
    // INVENTORY CENTER
    // ------------------------------------------------------------------------------------

    getInventory(filter: string) {
        return this.http.get<InventoryProductItem[]>(Backend.getInventory(filter));
    }
    saveInventory(dto: InventoryProductItem) {
        return this.http.post<GetInventoryProductResponse>(Backend.saveInventory, dto);
    }
    updateInventory(dto: InventoryProductItem) {
        return this.http.post<GetInventoryProductResponse>(Backend.saveInventory, dto);
    }
    deleteInventory(dto: InventoryProductItem) {
        return this.http.post<InventoryProductItem>(Backend.deleteInventory, dto);
    }
    getPriceList(productId: PriceListItem['id']) {
        return this.http.get<PriceListItem[]>(Backend.getPriceList(productId));
    }
    getPriceById(priceId: number) {
        return this.http.get<ItemPriceById>(Backend.getPriceById(priceId));
    }
    savePriceById(dto: ItemPriceById) {
        return this.http.post<ItemPriceById>(Backend.savePriceById, dto);
    }
    getPriceCodeDropdown(): Observable<any[]> {
        return this.http.get<DropdownDisplay[]>(Backend.getPriceCodeDropdown);
    }
    getCMNFormsDropdown(): Observable<any[]> {
        return this.http.get<DropdownDisplay[]>(Backend.getCMNFormsDropdown);
    }
    getVendorList(productId: VendorRecord['id']) {
        return this.http.get<VendorRecord[]>(Backend.getVendorList(productId));
    }
    saveInventoryVendor(dto: VendorRecord) {
        return this.http.post(Backend.saveInventoryVendor, dto, { responseType: 'text' });
    }
    getVendorCodeDropdown(): Observable<any[]> {
        return this.http.get<DropdownDisplay[]>(Backend.getVendorCodeDropdown);
    }
    getLocationList(productId: LocationList['id'], location: string = '') {
        return this.http.get<LocationList[]>(Backend.getLocationList(productId, location));
    }
    getLocationBinDropdown(): Observable<any[]> {
        return this.http.get<LocationBinDisplay[]>(Backend.getLocationBinDropdown);
    }
    getLocationCodeDropdown(): Observable<any[]> {
        return this.http.get<LocationCodeDisplay[]>(Backend.getLocationCodeDropdown);
    }
    saveLocation(dto: LocationList) {
        return this.http.post<LocationList>(Backend.saveLocation, dto);
    }

    // ------------------------------------------------------------------------------------
    // JOB CENTER
    // ------------------------------------------------------------------------------------

    getJobs(types?: string[], statuses?: string[]): Observable<JobDisplay[]> {
        return this.http.get<JobDisplay[]>(Backend.getjobs, {
            params: {
                status: statuses || [],
                type: types || [],
            },
        });
    }
    getJob(id): Observable<Job> {
        return this.http.get<Job>(Backend.getjob(id));
    }
    updateJob(job): Observable<any> {
        return this.http.post(Backend.updatejob, job);
    }
    postJob(job): Observable<any> {
        return this.http.post(Backend.postjob, job);
    }
    deleteJob(id): Observable<any> {
        return this.http.post(Backend.deletejob, { id });
    }
    getJobHistory(id): Observable<JobHistory[]> {
        return this.http.get<JobHistory[]>(Backend.getjobhistory(id));
    }
    getJobHistoryDetailsById(historyId): Observable<JobHistoryDetailsDisplay[]> {
        return this.http.get<JobHistoryDetailsDisplay[]>(Backend.getJobhistoryDetailsById(historyId));
    }
    runNow(jobId): Observable<any> {
        return this.http.post(Backend.gerRunNow(jobId), jobId);
    }
    getShipWorkOrder(order): Observable<any[]> {
        return this.http.post<any[]>(Backend.shipworkorder, {
            patientid: order.patientid,
            flag: order.flag,
            response: order.response,
        });
    }
    deletePatientArHistory(dto: PatientArHistory) {
        return this.http.post<PatientArHistory>(Backend.deletePatientArHistory, dto);
    }
    getAmtAdjustedCode(): Observable<any[]> {
        return this.http.get<any[]>(Backend.AmtAdjustedCodedropdown);
    }
    getPrintStatusDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.printstatusdropdown);
    }
    getTranTypeDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.trantypedropdown);
    }
    getClaimTypeDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.claimtypedropdown);
    }
    getPwkTypeDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.pwktypedropdown);
    }
    getPwkMethodDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.pwkmethoddropdown);
    }
    getBillTO(patientid): Observable<any[]> {
        return this.http.get<any[]>(Backend.billto(patientid));
    }
    getPhysician(patientid): Observable<any[]> {
        return this.http.get<any[]>(Backend.Physician(patientid));
    }
    getIcdCode(patientid): Observable<any[]> {
        return this.http.get<any[]>(Backend.IcdCode(patientid));
    }
    getAnalytics(): Observable<any[]> {
        return this.http.get<any[]>(Backend.analytics);
    }
    getEventByStatusAndDateRange(status, range): Observable<any[]> {
        return this.http.get<any[]>(Backend.eventTracking, {
            params: { status: status, dateRangeOption: range },
        });
    }

    // ------------------------------------------------------------------------------------
    //  LICENSE CENTER
    // ------------------------------------------------------------------------------------
    getAllLicense(filter: string) {
        return this.http.get<LicenseInfo[]>(Backend.getAllLicense(filter));
    }
    getLicenseById(id: string) {
        return this.http.get<LicenseInfo>(Backend.getLicenseById(id));
    }
    saveLicense(dto: LicenseInfo) {
        return this.http.post<LicenseInfo>(Backend.saveLicense, dto);
    }
    deleteLicense(dto: LicenseInfo) {
        return this.http.post<LicenseInfo>(Backend.deleteLicense, dto);
    }
    getLicenseFolderById(id: string) {
        return this.http.get<LicenseFolder>(Backend.getLicenseFolderById(id));
    }

    // ------------------------------------------------------------------------------------
    // MAP CENTER
    // ------------------------------------------------------------------------------------

    getMapPoints(filter: string) {
        return this.http.get<GetMapListResponse>(Backend.getMapPoints(filter));
    }
    getMapCenterSalesReps() {
        return this.http.get<GetMapSalesRepsResponse>(Backend.salesreps);
    }

    // ------------------------------------------------------------------------------------
    // Intake CENTER
    // ------------------------------------------------------------------------------------

    getIntake(filter: string) {
        return this.http.get<GetIntakesResponse>(Backend.getIntake(filter));
    }

    // ------------------------------------------------------------------------------------
    // Compliance CENTER
    // ------------------------------------------------------------------------------------

    getCompliance(filter: string) {
        return this.http.get<GetCompliancesResponse>(Backend.getCompliance(filter));
    }

    // ------------------------------------------------------------------------------------
    // CareManagement CENTER
    // ------------------------------------------------------------------------------------

    getCareManagement(filter: string) {
        return this.http.get<GetCareManagementsResponse>(Backend.getCareManagement(filter));
    }

    // ------------------------------------------------------------------------------------
    // Audit CENTER
    // ------------------------------------------------------------------------------------

    getAudit(filter: string) {
        return this.http.get<GetAuditsResponse>(Backend.getAudit(filter));
    }
    // ------------------------------------------------------------------------------------
    // PATIENT CENTER
    // ------------------------------------------------------------------------------------
    getEmergencyContacts(patientId: number) {
        return this.http.get<GetPatientEmergencyContact>(Backend.getEmergencyContacts(patientId));
    }
    addEmergencyContact(dto: PatientEmergencyContact) {
        return this.http.post<PatientEmergencyContact>(Backend.addEmergencyContact, dto);
    }
    deleteEmergencyContact(dto: PatientEmergencyContact) {
        return this.http.post<any>(Backend.deleteEmergencyContact, dto);
    }
    getAutomatedEmails(patientId: number) {
        return this.http.get<GetPatientAutomatedEmail>(Backend.getAutomatedEmails(patientId));
    }
    getEFirst(patientId: number) {
        return this.http.get<GetPatientEFirst>(Backend.getEFirst(patientId));
    }
    addProcessShortcut(id: number, patientId: number) {
        const payload = {
            id: id,
            patientId: patientId,
        };
        return this.http.post<any>(Backend.saveSelectedProcessShortcut, payload);
    }
    sendFaxMessage(patientId: number, title: string, message: string) {
        const payload = {
            patientId,
            title,
            message,
        };
        return this.http.post<any>(Backend.sendFaxMessage, payload);
    }
    getDoctorDetails(patientId: number) {
        return this.http.get<any>(Backend.getDoctorDetails(patientId));
    }
    getReferCode(id: number) {
        return this.http.get<string>(Backend.getReferCode(id, 'AR1REFER'));
    }
    getItemCode(id: number) {
        return this.http.get<string>(Backend.getItemCode(id, 'AR1INVT'));
    }
    getPatients(filter: string) {
        return this.http.get<Patient>(Backend.getPatients(filter));
    }
    getPatientDetails(patientId: Patient['id']) {
        return this.http.get<Patient>(Backend.getPatientDetails(patientId));
    }
    getPatientWorkOrders(patientId: Patient['id']) {
        return this.http.get<PatientWorkOrders[]>(Backend.getPatientWorkOrders(patientId));
    }
    groupEdit(updateData: any) {
        return this.http.post<any[]>(Backend.groupEdit, updateData);
    }
    getPatientInsurance(patientId: Patient['id']) {
        return this.http.get<PatientWorkOrders[]>(Backend.getPatientInsurance(patientId));
    }
    getPatientPayors(patientId: Patient['id']) {
        return this.http.get<PatientPayors>(Backend.getPatientPayors(patientId));
    }
    getPatientPayor(patientId: Patient['id']) {
        return this.http.get<PatientPayors>(Backend.getPatientPayor(patientId));
    }
    getPatientPhysicians(patientId: Patient['id']) {
        return this.http.get<PatientPhysicians>(Backend.getPatientPhysicians(patientId));
    }
    getPatientDiagnosiscode(patientId: Patient['id']) {
        return this.http.get<PatientDiagnosisCodes>(Backend.getPatientdiagnosiscode(patientId));
    }
    getPatientDiagnosiscodeList() {
        return this.http.get<GetDiagnosisCodesListResponse>(Backend.getPatientdiagnosiscodeList);
    }
    getPatientPayorsList() {
        return this.http.get<PatientPayorsList>(Backend.getPatientPayorsList);
    }
    getPatientPhysiciansList() {
        return this.http.get<any>(Backend.getPatientPhysiciansList);
    }
    addNewPatientPayors(dto: PatientPayorsAdd) {
        return this.http.post<PatientPayorsAdd>(Backend.addPatientPayors, dto);
    }
    updatePatientPayorsRank(dto: PayorObject) {
        return this.http.post<PayorObject>(Backend.updatePatientPayors, dto);
    }
    addNewPatientPhysicians(dto: PatientPhysicianAdd) {
        return this.http.post<PatientPhysicianAdd>(Backend.addPatientPhysicians, dto);
    }
    addNewPatientDiagnosiscodes(dto: PatientDiagnosisCodeAdd) {
        return this.http.post<PatientDiagnosisCodeAdd>(Backend.addPatientDiagnosiscodes, dto);
    }
    getPatientDocuments(patientId: Patient['id']) {
        return this.http.get<PatientDocument[]>(Backend.getPatientDocuments(patientId));
    }
    getPatientCollectionDocuments(patientId: Patient['id']) {
        return this.http.get<PatientNote[]>(Backend.getPatientCollectionDocuments(patientId));
    }
    getPatientContactNotes(patientId: Patient['id']) {
        return this.http.get<PatientNote[]>(Backend.getPatientContactNotes(patientId));
    }
    getContactList() {
        return this.http.get<ContactTypeList[]>(Backend.ContactList);
    }
    getTaxonomy() {
        return this.http.get<PhysicianDisplay[]>(Backend.getTaxonomy);
    }
    getTaxonomycity() {
        return this.http.get<CompanyDisplay[]>(Backend.getTaxonomy);
    }
    getPatientOrderHistory(patientId: Patient['id']) {
        return this.http.get<PatientOrder[]>(Backend.getPatientOrderHistory(patientId));
    }
    getPatientOtherAddress(patientId: Patient['id']) {
        return this.http.get<PatientOtherAddress[]>(Backend.getPatientOtherAddress(patientId));
    }
    getPatientArHistory(patientId: Patient['id']) {
        return this.http.get<PatientArHistory[]>(Backend.getPatientArHistory(patientId));
    }
    getPatientInquiryChanges(patientId: Patient['id']) {
        return this.http.get<PatientArHistory[]>(Backend.getPatientInquiryChanges(patientId));
    }
    getPatientInquiryChangesById(patientId: Patient['id']) {
        return this.http.get<PatientArHistory>(Backend.getPatientInquiryChangesById(patientId));
    }
    getPatientCharges(patientId: Patient['id']) {
        return this.http.get<PatientCharges[]>(Backend.getPatientCharges(patientId));
    }
    getPatientChargesById(chargeId: number) {
        return this.http.get<PatientChargesById>(Backend.getPatientChargesById(chargeId));
    }
    savePatientChargesById(charge: PatientChargesById) {
        return this.http.post<PatientChargesById>(Backend.savePatientChargesById, charge);
    }
    groupEditCharges(updateData: any) {
        return this.http.post<PatientCharges[]>(Backend.groupEditCharges, updateData);
    }
    getPaymentTypeDropdown(): Observable<any[]> {
        return this.http.get<any>(Backend.getPaymentTypeDropdown);
    }
    getPatientArHistoryById(arHistoryId: number) {
        return this.http.get<PatientArHistoryById>(Backend.getPatientArHistoryById(arHistoryId));
    }
    savePatientArHistoryById(arHistorydata: PatientArHistoryById) {
        return this.http.post<any>(Backend.savePatientArHistoryById, arHistorydata);
    }
    saveInquiryChanges(dto: WorkOrderDisplay) {
        return this.http.post<WorkOrderDisplay>(Backend.saveInquiryChanges, dto);
    }
    groupEditInquiryChanges(updateData: any) {
        return this.http.post<WorkOrderDisplay[]>(Backend.groupEditInquiryChanges, updateData);
    }
    deleteAlternateAddress(dto: PatientOtherAddress) {
        return this.http.post<PatientOtherAddress>(Backend.patientOtherAddressDelete, dto);
    }
    viewPatientDocument(fileId: PatientDocument['id']) {
        return this.http.get<PatientDocument>(Backend.viewPatientDocument(fileId));
    }
    patientQuickSave(dto: Patient) {
        return this.http.post<Patient['id']>(Backend.patientQuickSave, dto);
    }
    patientSearch(dto: Patient) {
        return this.http.post<Patient>(Backend.patientSearch, dto);
    }
    faxIntoPatientRecord(dto: Patient) {
        return this.http.post<Patient>(Backend.faxIntoPatientRecord, dto);
    }
    patientDelete(dto: PatientEntity) {
        return this.http.post<PatientEntity>(Backend.patientDelete, dto);
    }
    patientOtherAddressSave(dto: PatientOtherAddress) {
        return this.http.post<PatientOtherAddress[]>(Backend.patientOtherAddressSave, dto);
    }
    patientOtherAddressDelete(dto: PatientOtherAddress) {
        return this.http.post<PatientOtherAddress[]>(Backend.patientOtherAddressDelete, dto);
    }
    patientUploadDocument(dto: PatientDocument[]) {
        return this.http.post<PatientDocument[]>(Backend.patientDocumentUpload, dto);
    }
    patientUpdateDocument(dto: PatientDocument[]) {
        return this.http.post<PatientDocument[]>(Backend.patientDocumentSave, dto);
    }
    patientContactNoteSave(dto: PatientNote) {
        return this.http.post<PatientNote[]>(Backend.patientContactNoteSave, dto);
    }
    patientCollectionNoteSave(dto: PatientNote) {
        return this.http.post<PatientNote[]>(Backend.patientCollectionNoteSave, dto);
    }
    addPatientDemographics(dto: PatientEntity) {
        return this.http.post<PatientEntity>(Backend.saveDemographics, dto);
    }
    addPatientchecklist(dto: PatientEntity) {
        return this.http.post<PatientEntity>(Backend.savechecklist, dto);
    }
    getPatientSalesRep() {
        return this.http.get<GetPatientResponse>(Backend.getPatientSalesRep);
    }
    getPatientIntake() {
        return this.http.get<GetPatientResponse>(Backend.getPatientIntake);
    }
    getPatientCatagory() {
        return this.http.get<GetPatientCategoryResponse>(Backend.getPatientCategory);
    }
    getPatientContactMethod() {
        return this.http.get<GetPatientCategoryResponse>(Backend.getPatientContactMethod);
    }
    getPatientStatus() {
        return this.http.get<GetDropdownDisplay>(Backend.getPatientStatus);
    }
    getPatientReferral() {
        return this.http.get<GetDropdownDisplay>(Backend.getPatientReferral);
    }
    getInactiveReason() {
        return this.http.get<GetDropdownDisplay>(Backend.getInactiveReason);
    }
    getPlaceOfService() {
        return this.http.get<GetPatientPlaceOfServiceResponse>(Backend.getPlaceOfService);
    }
    getStateCityBasedOnZipCode(zipCode) {
        return this.http.get<GetPatientZipCodeLookUp>(Backend.getStateCity(zipCode));
    }
    getpatientSensor(id) {
        return this.http.get<Patient>(Backend.getPatientsensor(id));
    }
    deletePatient(dto: PatientEntity) {
        return this.http.post<PatientEntity>(Backend.deletePatient, dto);
    }
    deletePatientPayors(dto: PatientPayors) {
        return this.http.post<PatientPayors>(Backend.deletePatientPayors, dto);
    }
    deletePatientPhysicians(dto: { id: number }) {
        return this.http.post<PatientPhysicians>(Backend.deletePatientPhysicians, dto);
    }
    deletePatientDiagnosiscode(dto: PatientDiagnosisCodes) {
        return this.http.post<PatientDiagnosisCodes>(Backend.deletePatientDiagnosiscode, dto);
    }
    getPatientReferal() {
        return this.http.get<GetReferralResponse>(Backend.getPatientsReferal);
    }
    deletePatientDocument(dto: PatientDocument) {
        return this.http.post<PatientDocument>(Backend.deletePatientDocument, dto);
    }
    getPatientValidations(patientId: number) {
        return this.http.get<Patient>(Backend.getPatientValidations(patientId));
    }
    getPatientBalance(patientId: number) {
        return this.http.get<PatientBalance>(Backend.getPatientBalance(patientId));
    }

    getPatietSWO(patientId: number) {
        return this.http.get<PatientSWOInfo>(Backend.getPatietSWO(patientId));
    }

    updatepatientSWO(dto: PatientSWODetails) {
        return this.http.post(Backend.updatepatientSWO, dto);
    }
    getAuthorizePrism(patientId: number) {
        return this.http.get<any>(Backend.getAuthorizePrism(patientId));
    }
    authorizePrism(patientId: number) {
        return this.http.post(Backend.authorizePrism(patientId), null);
    }
    getPatientCompliance(patientId: number) {
        return this.http.get<Compliance[]>(Backend.getPatientCompliance(patientId));
    }
    savePatientCompliance(compliance: Compliance) {
        return this.http.post<Compliance>(Backend.savePatientCompliance(), compliance);
    }
    getComplianceContactNotes(patientId: number, refId: number): Observable<any> {
        return this.http.get(Backend.getComplianceContactNotes(patientId, refId));
    }
    getPatientAuditContactNotes(patientId: number, refId: number): Observable<any> {
        return this.http.get(Backend.getPatientAuditContactNotes(patientId, refId));
    }
    deletePatientCompliance(dto: Compliance): Observable<void> {
        return this.http.post<void>(Backend.deletePatientCompliance, dto);
    }
    getPatientAudit(patientId: number): Observable<Audit[]> {
        return this.http.get<Audit[]>(Backend.getPatientAudit(patientId));
    }
    savePatientAudit(audit: Audit) {
        return this.http.post<Audit>(Backend.savePatientAudit(), audit);
    }

    // ------------------------------------------------------------------------------------
    // PATIENT CARE MANAGEMENT CENTER
    // ------------------------------------------------------------------------------------
    getPatientCareManagementRecords(patientId: number): Observable<PatientCareManagement[]> {
        return this.http.get<PatientCareManagement[]>(Backend.getPatientCareManagementRecords(patientId));
    }

    addPatientCareManagementRecord(dto: PatientCareManagement): Observable<PatientCareManagement> {
        return this.http.post<PatientCareManagement>(Backend.addPatientCareManagementRecord, dto);
    }
    getPatientPayorRank1(patientId: number) {
        return this.http.get<InsuranceInfoList>(Backend.getPatientPayorRank1(patientId));
    }

    deletePatientCareManagementRecord(dto: PatientCareManagement): Observable<void> {
        return this.http.post<void>(Backend.deletePatientCareManagementRecord, dto);
    }
    getCareManagementContactNotes(patientId: number, refId: number): Observable<any> {
        return this.http.get(Backend.getCareManagementContactNotes(patientId, refId));
    }
    addCareManagementNote(note: ContactNote): Observable<any> {
        return this.http.post(Backend.addCareManagementContactNotes, note);
    }
    addComplianceNote(note: ContactNote): Observable<any> {
        return this.http.post(Backend.addComplianceContactNotes, note);
    }
    addAuditNote(note: ContactNote): Observable<any> {
        return this.http.post(Backend.addAuditContactNotes, note);
    }
    getPatientPaymentsAdjustments(patientId: Patient['id']) {
        return this.http.get<PatientPaymentsAdjustments[]>(Backend.getPatientPaymentsAdjustments(patientId));
    }
    getPatientPaymentsAdjustmentsById(PaymentAdjustmentId: number) {
        return this.http.get<PatientPaymentsAdjustmentsById>(
            Backend.getPatientPaymentsAdjustmentsById(PaymentAdjustmentId)
        );
    }
    savePaymentAdjustment(paymentAdjustment: PatientPaymentsAdjustmentsById) {
        return this.http.post<PatientPaymentsAdjustmentsById>(Backend.savePaymentAdjustment, paymentAdjustment);
    }
    getToPatientDefault() {
        return this.http.get<GetToPatientDefaultResponse>(Backend.getToPatientDefault);
    }
    getPatientInsuranceRank2(patientId: number) {
        return this.http.get(Backend.getPatientInsuranceRank2(patientId), { responseType: 'text' });
    }

    getPatientEventsBillingRecords(patientId: number, eventType: string) {
        return this.http.get<PatientEventsBilling[]>(Backend.getPatientEventsBillingRecords(patientId, eventType));
    }
    addEventBillingNote(note: ContactNote): Observable<any> {
        return this.http.post(Backend.addEventBillingNote, note);
    }

    // ------------------------------------------------------------------------------------
    // PATIENT PORTAL CENTER
    // ------------------------------------------------------------------------------------
    getPatientPortalUsers(filter: string) {
        return this.http.get<GetPatientPortalUserResponse>(Backend.getPatientPortalUsers(filter));
    }
    getPatientPortalUser(Id: number) {
        return this.http.get<PatientPortalUserDisplay>(Backend.getPatientPortalUser(Id));
    }
    addPatientPortalUser(dto: PatientPortalUserDisplay) {
        return this.http.post<PatientPortalUserDisplay>(Backend.addPatientPortalUser, dto);
    }
    updatePatientPortalUser(dto: PatientPortalUserDisplay) {
        return this.http.post<PatientPortalUserDisplay>(Backend.updatePatientPortalUser, dto);
    }
    deletePatientPortalUser(dto: PatientPortalUserDisplay) {
        return this.http.post<PatientPortalUserDisplay>(Backend.deletePatientPortalUser, dto);
    }

    // ------------------------------------------------------------------------------------
    // PROOF OF DELIVERY CENTER
    // ------------------------------------------------------------------------------------
    getAllProofOfDelivery() {
        return this.http.get<ProofOfDeliveryDetail[]>(Backend.getAllProofOfDelivery);
    }
    saveProofOfDelivery(dto: SaveProofOfDelivery): Observable<SaveProofOfDelivery> {
        return this.http.post<SaveProofOfDelivery>(Backend.updateProofOfDelivery, dto);
    }
    ProofOfDeliverySearch(dto: PODSearchDetail) {
        return this.http.post<GetProofOfDeliveryResponse>(Backend.proofOfDeliverySearch, dto);
    }

    // ------------------------------------------------------------------------------------
    // PHYSICIAN CENTER
    // ------------------------------------------------------------------------------------
    getPhysicians(filter: string) {
        return this.http.get<GetPhysicianResponse>(Backend.getPhysicians(filter));
    }
    getPhysicianById(id: string) {
        return this.http.get<PhysicianDisplay>(Backend.getPhysicianById(id));
    }
    savePhysicians(dto: PhysicianDisplay) {
        return this.http.post<PhysicianDisplay>(Backend.savePhysician, dto);
    }
    deletePhysicians(phy: { id: number }) {
        return this.http.post<PhysicianDisplay>(Backend.deletePhysician, phy);
    }
    physicianQuickSave(dto: PhysicianDisplay) {
        return this.http.post<PhysicianDisplay['id']>(Backend.physicianQuickSave, dto);
    }

    // ------------------------------------------------------------------------------------
    // PRICE CENTER
    // ------------------------------------------------------------------------------------

    getAllPrice() {
        return this.http.get<GetItemResponse>(Backend.getAllPrice);
    }
    getItemPriceInfo(id: number) {
        return this.http.get<PriceInfoDisplay>(Backend.getPriceInfo(id));
    }
    deletePrice(price: { id: number }) {
        return this.http.post<ItemDisplay>(Backend.deletePrice, price);
    }
    saveItemPrice(dto: ItemDisplay) {
        return this.http.post<ItemDisplay>(Backend.savePrice, dto);
    }
    searchPrice(dto: ItemDisplay) {
        return this.http.post<ItemDisplay[]>(Backend.itemSearch, dto);
    }
    getItemPriceList(id) {
        return this.http.get<ItemDisplay[]>(Backend.itemPriceList(id));
    }

    // ------------------------------------------------------------------------------------
    // PAYOR CENTER
    // ------------------------------------------------------------------------------------
    payorQuickSave(dto: Payor) {
        return this.http.post<Payor['id']>(Backend.payorQuickSave, dto);
    }
    payorOverrideSave(dto: PayorOverride): Observable<PayorOverride> {
        return this.http.post<PayorOverride>(Backend.payorOverrideSave, dto);
    }
    addPayorBillInfo(dto: Payor) {
        return this.http.post<Payor>(Backend.saveBillInfo, dto);
    }
    addPayorBillOption(dto: Payor) {
        return this.http.post<Payor>(Backend.saveBillOption, dto);
    }
    addPayor837Data(dto: Payor) {
        return this.http.post<Payor>(Backend.save837Data, dto);
    }
    addPayor1500Data(dto: Payor) {
        return this.http.post<Payor>(Backend.save1500Data, dto);
    }
    getPayorDetails(id: number) {
        return this.http.get<Payor>(Backend.getPayorsId(id));
    }
    getPayorDetailsForWorkOrder(ids: number[]): Observable<Payor> {
        return forkJoin(ids.map(id => this.http.get<Payor>(Backend.getPayorsId(id)))).pipe(
            mergeMap(payors => payors) // Flatten the array of arrays into a single array
        );
    }
    getPayors() {
        return this.http.get<GetPayorResponse>(Backend.getPayors);
    }
    getPriceCodeDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getPriceCode);
    }
    getPrimaryBillDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getPrimaryBillForm);
    }
    getPayorTypeDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getPayorType);
    }
    getBoxOneDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getBoxOne);
    }
    getClaimIndicatorDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getClaimIndicator);
    }
    getClearinghouseDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getClearinghouse);
    }
    getFinancialClassDorpDown() {
        return this.http.get<CommonDropDown[]>(Backend.getFinancialClass);
    }
    getPayorOverrides(filter: string): Observable<GetPayorOverrideResponse> {
        return this.http.get<GetPayorOverrideResponse>(Backend.getPayorOverrides(filter));
    }
    updatePayorOverride(payorOverride: PayorOverride): Observable<number> {
        return this.http.put<number>(`${Backend.updatePayorOverride(payorOverride.id)}`, payorOverride);
    }
    deletePayorOverride(dto: PayorOverride): Observable<void> {
        return this.http.post<void>(Backend.deletePayorOverride, dto);
    }

    // ------------------------------------------------------------------------------------
    //REFERRAL CENTER
    // ------------------------------------------------------------------------------------
    getReferrals(filter: string) {
        return this.http.get<ReferralDisplay[]>(Backend.getReferrals(filter));
    }
    saveReferral(dto: ReferralDisplay) {
        return this.http.post<ReferralDisplay>(Backend.saveReferral, dto);
    }
    updateReferralDetails(dto: ReferralDetails) {
        return this.http.post<ReferralDetails>(Backend.saveReferral, dto);
    }
    deleteReferral(dto: ReferralDisplay) {
        return this.http.post<ReferralDisplay>(Backend.deleteReferral, dto);
    }
    getReferralDetail(id: string) {
        return this.http.get<ReferralDetails>(Backend.getReferralDetails(id));
    }
    getSalesRepDropDown() {
        return this.http.get<GetSalesRepsResponse>(Backend.getSalesRepDropDown);
    }
    referralQuickSave(dto: ReferralQuickSave) {
        return this.http.post(Backend.referralQuickSave, dto, { responseType: 'text' });
    }

    // ------------------------------------------------------------------------------------
    // SHORTCUT CENTER
    // ------------------------------------------------------------------------------------
    getAllShortcut() {
        return this.http.get<GetShortcutResponse>(Backend.getShortcut);
    }
    addShortcuts(shortcuts: GetShortcutResponse) {
        return this.http.post<GetShortcutResponse>(Backend.addShortcuts, shortcuts);
    }
    getSelectedShortcut(id: number) {
        return this.http.get<ShortcutDisplay>(Backend.getSelectedShortcut(id));
    }
    deleteShortcut(shortcut: ShortcutDisplay) {
        return this.http.post<ShortcutDisplay>(Backend.deleteShortcut, shortcut);
    }
    getShortcutBillTypeDropdown(): Observable<any[]> {
        return this.http.get<any[]>(Backend.getshortcutbilltypedropdown);
    }
    getShortcutItemCode(id: number) {
        return this.http.get<string>(Backend.getshortcutitemcode(id, 'AR1INVT'));
    }

    // ------------------------------------------------------------------------------------
    // REORDER CENTER
    // ------------------------------------------------------------------------------------
    getReorder(filter: string) {
        return this.http.get<GetReordersResponse>(Backend.getReorder(filter));
    }

    // ------------------------------------------------------------------------------------
    // REPORTING CENTER
    // ------------------------------------------------------------------------------------
    getReportingCenterPatients(filter: string) {
        return this.http.get<Patient>(Backend.getReportingCenterPatients(filter));
    }

    // ------------------------------------------------------------------------------------
    // RETENTION RATE CENTER
    // ------------------------------------------------------------------------------------
    getAllRetentionRate() {
        return this.http.get<GetRetentionRateResponse>(Backend.getRetentionRate);
    }
    addRetentionRate(dto: RetentionRate) {
        return this.http.post<RetentionRate>(Backend.addRetentionRate, dto);
    }
    deleteRetentionRate(dto: RetentionRate) {
        return this.http.post<any>(Backend.deleteRetentionRate, dto);
    }

    // ------------------------------------------------------------------------------------
    // SALES CENTER
    // ------------------------------------------------------------------------------------
    getSalesReps(filter: string) {
        return this.http.get<GetSalesRepsResponse>(Backend.getSalesReps(filter));
    }
    getBranch() {
        return this.http.get<GetBranchRepsResponse>(Backend.getBranch);
    }
    getSalesRep(salesrepid: SalesRepDisplay['id']) {
        return this.http.get<SalesRepDisplay>(Backend.getSalesRep(salesrepid));
    }
    saveSalesRep(dto: SalesRepDisplay) {
        return this.http.post<SalesRepDisplay>(Backend.saveSalesRep, dto);
    }
    saveBranch(dto: BranchRepDisplay) {
        return this.http.post<BranchRepDisplay>(Backend.saveBranch, dto);
    }
    deleteSalesRep(dto: SalesRepDisplay) {
        return this.http.post<SalesRepDisplay>(Backend.deleteSalesRep, dto);
    }
    deleteBranch(dto: BranchRepDisplay) {
        return this.http.post<BranchRepDisplay>(Backend.deleteBranch, dto);
    }

    // ------------------------------------------------------------------------------------
    // TERRITORY TRANSFER
    // ------------------------------------------------------------------------------------
    getTerritorySalesReps() {
        return this.http.get<GetPatientResponse>(Backend.getTerritorySalesReps);
    }
    getTerritoryCategory() {
        return this.http.get<GetPatientCategoryResponse>(Backend.getTerritoryCategory);
    }
    postTerritoryTransfer(territorytransfer): Observable<any> {
        return this.http.post(Backend.territorytransfer, territorytransfer);
    }

    // ------------------------------------------------------------------------------------
    // TRACKING
    // ------------------------------------------------------------------------------------
    getTrackingDetails(trackingnumber): Observable<any[]> {
        return this.http.get<any[]>(Backend.tracking + trackingnumber);
    }

    // ------------------------------------------------------------------------------------
    // User Center
    // ------------------------------------------------------------------------------------
    getUser(filter) {
        return this.http.get<any>(Backend.getUserDetails(filter));
    }
    getEmployeeId() {
        return this.http.get<any>(Backend.getEmployeeId);
    }

    // ------------------------------------------------------------------------------------
    // Validation CENTER
    // ------------------------------------------------------------------------------------
    getValidations() {
        return this.http.get<GetValidationResponse>(Backend.getValidations);
    }
    getValidationById(id: string) {
        return this.http.get<Validation>(Backend.getValidationById(id));
    }
    saveValidation(dto: Validation) {
        return this.http.post<Validation>(Backend.saveValidation, dto);
    }
    deleteValidation(phy: { id: number }) {
        return this.http.post<Validation>(Backend.deleteValidation, phy);
    }
    searchValidation() {
        return this.http.get<Validation>(Backend.searchValidation);
    }

    // ------------------------------------------------------------------------------------
    // VENDOR CENTER
    // ------------------------------------------------------------------------------------
    getVendors() {
        return this.http.get<GetVendorsResponse>(Backend.getVendor);
    }
    saveVendor(dto: VendorDisplay) {
        return this.http.post<VendorDisplay>(Backend.saveVendor, dto);
    }
    deleteVendor(dto: VendorDisplay) {
        return this.http.post<VendorDisplay>(Backend.deleteVendor, dto);
    }

    // ------------------------------------------------------------------------------------
    // Work Order Center
    // ------------------------------------------------------------------------------------
    getWorkOrders(filter: string) {
        return this.http.get<WorkOrderDisplay[]>(Backend.getWorkOrders(filter));
    }
    getWorkOrderDetails(workOrderid: WorkOrderDisplay['id']) {
        return this.http.get<WorkOrderDisplay>(Backend.getWorkOrder(workOrderid));
    }
    saveWorkOrder(dto: WorkOrderDisplay) {
        return this.http.post<WorkOrderDisplay>(Backend.saveWorkOrder, dto);
    }
    deleteWorOrder(dto: WorkOrderDisplay) {
        return this.http.post<WorkOrderDisplay>(Backend.deleteWorkOrder, dto);
    }
    deleteMultipleWorOrder(numbers: number[]) {
        const payload = {
            numbers,
        };
        return this.http.post<any>(Backend.deleteMultipleWorkOrder, payload);
    }
    getBatchEligibility(payload: { startDate: Date; endDate: Date }): Observable<any[]> {
        return this.http.post<any[]>(Backend.getBatchEligibility, payload);
    }
    processBatchEligibility(patientIds: number[]): Observable<{ patientId: number; isEligible: boolean }[]> {
        return this.http.post<{ patientId: number; isEligible: boolean }[]>(Backend.processBatchEligibility, {
            patientIds,
        });
    }
    wogroupEdit(updateData: any) {
        return this.http.post<any[]>(Backend.wogroupEdit, updateData);
    }

    // ------------------------------------------------------------------------------------
    // ZIPCODE CENTER
    // ------------------------------------------------------------------------------------
    getzipcodes() {
        return this.http.get<GetZipCodesResponse>(Backend.getzipcodes);
    }
    savezipcode(dto: ZipCodeDisplay) {
        return this.http.post<ZipCodeDisplay>(Backend.savezipcode, dto);
    }
    deletezipcode(dto: ZipCodeDisplay) {
        return this.http.post<ZipCodeDisplay>(Backend.deletezipcode, dto);
    }
}
