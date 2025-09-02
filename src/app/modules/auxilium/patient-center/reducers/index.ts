import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../../reducers';
import * as fromPatientCompliance from './paitent-compliance.reducer';
import * as fromPatientOtherAddress from './patient-alternate-address';
import * as fromPatientArHistory from './patient-ar-history.reducer';
import * as fromPatientAudit from './patient-audit.reducer';
import * as fromAutomatedEmails from './patient-automated-emails.reducer';
import * as fromPatientCareManagement from './patient-caremanagement.reducer'; // Import PatientCareManagement reducer
import * as fromPatientCenterDiagnosiscode from './patient-center-diagnosiscode.reducer';
import * as fromPatientCenterPayors from './patient-center-payors.reducer';
import * as fromPatientCenterPhysians from './patient-center-physicians.reducer';
import * as fromPatientSensor from './patient-center-sensor.reducer';
import * as fromPatientCenterTable from './patient-center-table.reducer';
import * as fromPatientCharges from './patient-charges.reducer';
import * as fromPatientChecklist from './patient-checklist.reducer';
import * as fromPatientCollectionNotes from './patient-collection-notes.reducer';
import * as fromPatientDemographics from './patient-demographics.reducer';
import * as fromPatientCenterDetails from './patient-details.reducer';
import * as fromPatientDocuments from './patient-documents.reducer';
import * as fromEFirst from './patient-efirst.reducer';
import * as fromEmergencyContact from './patient-emergency-contacts.reducer';
import * as fromPatientEventsBilling from './patient-events-billing.reducer';
import * as fromPatientInquiryChanges from './patient-inquiry-changes.reducer';
import * as fromPatientNotes from './patient-notes.reducer';
import * as fromPatientOrders from './patient-orders-history.reducer';
import * as fromPatientPaymentsAdjustments from './patient-payments-adjustments.reducer';
import * as fromPatientSWO from './patient-prefilled-editable-swo.reducer';
import * as fromPatientWorkOrder from './patient-work-order.reducer';
import * as fromQuickFax from './quick-fax-tool.reducer';

import { DateTime } from 'luxon';

export const featureKey = 'patient-center';

export interface PatientsState {
    // [fromPatient.patientsFeatureKey]: fromPatient.State;
    [fromPatientOrders.patientsFeatureKey]: fromPatientOrders.State;
    [fromPatientDocuments.patientsFeatureKey]: fromPatientDocuments.State;
    [fromPatientArHistory.patientsFeatureKey]: fromPatientArHistory.State;
    [fromPatientInquiryChanges.patientsFeatureKey]: fromPatientInquiryChanges.State;
    [fromPatientNotes.patientsFeatureKey]: fromPatientNotes.State;
    [fromPatientCollectionNotes.patientsFeatureKey]: fromPatientCollectionNotes.State;
    [fromPatientCenterTable.featureKey]: fromPatientCenterTable.State;
    [fromPatientCenterDetails.featureKey]: fromPatientCenterDetails.State;
    [fromPatientCenterPayors.featureKey]: fromPatientCenterPayors.State;
    [fromPatientCenterPhysians.featureKey]: fromPatientCenterPhysians.State;
    [fromPatientCenterDiagnosiscode.featureKey]: fromPatientCenterDiagnosiscode.State;
    [fromPatientOtherAddress.patientsFeatureKey]: fromPatientOtherAddress.State;
    [fromPatientWorkOrder.patientsFeatureKey]: fromPatientWorkOrder.State;
    [fromPatientDemographics.patientsFeatureKey]: fromPatientDemographics.State;
    [fromPatientChecklist.patientsFeatureKey]: fromPatientChecklist.State;
    [fromPatientSensor.featureKey]: fromPatientSensor.State;
    [fromQuickFax.featureKey]: fromQuickFax.State;
    [fromEmergencyContact.featureKey]: fromEmergencyContact.State;
    [fromAutomatedEmails.featureKey]: fromAutomatedEmails.State;
    [fromEFirst.featureKey]: fromEFirst.State;
    [fromPatientSWO.featureKey]: fromPatientSWO.State;
    [fromPatientCompliance.complianceFeatureKey]: fromPatientCompliance.State;
    [fromPatientAudit.AuditFeatureKey]: fromPatientAudit.State;
    [fromPatientCareManagement.featureKey]: fromPatientCareManagement.State; // Add PatientCareManagement state
    [fromPatientPaymentsAdjustments.patientsFeatureKey]: fromPatientPaymentsAdjustments.State;
    [fromPatientCharges.patientsFeatureKey]: fromPatientCharges.State;
    [fromPatientEventsBilling.featureKey]: fromPatientEventsBilling.State; // Add PatientEventsBilling state
}

export interface State extends fromRoot.State {
    [featureKey]: PatientsState;
}
export function reducers(state: PatientsState | undefined, action: Action) {
    return combineReducers({
        // [fromPatient.patientsFeatureKey]: fromPatient.reducer,
        [fromPatientOrders.patientsFeatureKey]: fromPatientOrders.reducer,
        [fromPatientDocuments.patientsFeatureKey]: fromPatientDocuments.reducer,
        [fromPatientArHistory.patientsFeatureKey]: fromPatientArHistory.reducer,
        [fromPatientInquiryChanges.patientsFeatureKey]: fromPatientInquiryChanges.reducer,
        [fromPatientNotes.patientsFeatureKey]: fromPatientNotes.reducer,
        [fromPatientCollectionNotes.patientsFeatureKey]: fromPatientCollectionNotes.reducer,
        [fromPatientCenterTable.featureKey]: fromPatientCenterTable.reducer,
        [fromPatientCenterDetails.featureKey]: fromPatientCenterDetails.reducer,
        [fromPatientCenterPayors.featureKey]: fromPatientCenterPayors.reducer,
        [fromPatientCenterPhysians.featureKey]: fromPatientCenterPhysians.reducer,
        [fromPatientCenterDiagnosiscode.featureKey]: fromPatientCenterDiagnosiscode.reducer,
        [fromPatientOtherAddress.patientsFeatureKey]: fromPatientOtherAddress.reducer,
        [fromPatientWorkOrder.patientsFeatureKey]: fromPatientWorkOrder.reducer,
        [fromPatientDemographics.patientsFeatureKey]: fromPatientDemographics.reducer,
        [fromPatientChecklist.patientsFeatureKey]: fromPatientChecklist.reducer,
        [fromPatientSensor.featureKey]: fromPatientSensor.reducer,
        [fromQuickFax.featureKey]: fromQuickFax.reducer,
        [fromEmergencyContact.featureKey]: fromEmergencyContact.reducer,
        [fromAutomatedEmails.featureKey]: fromAutomatedEmails.reducer,
        [fromEFirst.featureKey]: fromEFirst.reducer,
        [fromPatientSWO.featureKey]: fromPatientSWO.reducer,
        [fromPatientCompliance.complianceFeatureKey]: fromPatientCompliance.reducer,
        [fromPatientAudit.AuditFeatureKey]: fromPatientAudit.reducer,
        [fromPatientCareManagement.featureKey]: fromPatientCareManagement.reducer, // Add PatientCareManagement reducer
        [fromPatientPaymentsAdjustments.patientsFeatureKey]: fromPatientPaymentsAdjustments.reducer,
        [fromPatientCharges.patientsFeatureKey]: fromPatientCharges.reducer,
        [fromPatientEventsBilling.featureKey]: fromPatientEventsBilling.reducer,
    })(state, action);
}

const selectState = createFeatureSelector<State, PatientsState>(featureKey);

/**
 * PatientCenter Table Selectors
 */
export namespace PatientCenterTableSelectors {
    const selectPatientCenterTableState = createSelector(
        selectState,
        state => state[fromPatientCenterTable.featureKey]
    );

    export const selectLoading = createSelector(selectPatientCenterTableState, fromPatientCenterTable.selectLoading);
    export const selectError = createSelector(selectPatientCenterTableState, fromPatientCenterTable.selectError);
    export const selectPatients = createSelector(selectPatientCenterTableState, fromPatientCenterTable.selectPatients);
    export const selectPatient = createSelector(selectPatientCenterTableState, fromPatientCenterTable.selectPatient);
    export const selectPatientSearchShortcut = createSelector(
        selectPatientCenterTableState,
        fromPatientCenterTable.selectPatientSearchShortcut
    );
    export const selectPatientBalances = createSelector(
        selectPatientCenterTableState,
        fromPatientCenterTable.selectPatientBalances
    );
}

/**
 * PatientCenter Details Selectors
 */
export namespace PatientCenterDetailsSelectors {
    export const selectPatientCenterDetailsState = createSelector(
        selectState,
        state => state[fromPatientCenterDetails.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectLoading
    );
    export const selectError = createSelector(selectPatientCenterDetailsState, fromPatientCenterDetails.selectError);
    export const selectPatientDetails = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientDetails
    );
    export const selectPatientSalesrep = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientSalesRep
    );
    export const selectPatientIntake = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientIntake
    );
    export const selectPatientCategory = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientCategory
    );
    export const selectPatientStatus = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientStatus
    );
    export const selectInactiveReason = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectInactiveReason
    );
    export const selectPatientReferral = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientReferral
    );
    export const selectPatientCityState = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientCityState
    );
    export const selectPatientContactMethod = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientContactMethod
    );
    export const selectReferrals = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientReferrals
    );

    export const selectReferralById = (referCode: string) =>
        createSelector(selectReferrals, referrals => referrals?.find(referral => referral.referCode === referCode));

    export const selectPlaceOfService = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPlaceOfService
    );
    export const selectPatientValidation = createSelector(
        selectPatientCenterDetailsState,
        fromPatientCenterDetails.selectPatientValidation
    );
}

/**
 * PatientCenter Payors Selectors
 */
export namespace PatientCenterPayorsSelectors {
    const selectPatientCenterPayorsState = createSelector(
        selectState,
        state => state[fromPatientCenterPayors.featureKey]
    );

    export const selectLoading = createSelector(selectPatientCenterPayorsState, fromPatientCenterPayors.selectLoading);
    export const selectLoadingPayor = createSelector(
        selectPatientCenterPayorsState,
        fromPatientCenterPayors.selectLoadingPayor
    );
    export const selectError = createSelector(selectPatientCenterPayorsState, fromPatientCenterPayors.selectError);
    export const selectPayors = createSelector(selectPatientCenterPayorsState, fromPatientCenterPayors.selectPayors);
    export const selectPayor = createSelector(selectPatientCenterPayorsState, fromPatientCenterPayors.selectPayor);
    export const selectPayorsList = createSelector(
        selectPatientCenterPayorsState,
        fromPatientCenterPayors.selectPayorsList
    );
}

/**
 * PatientCenter Physicians Selectors
 */
export namespace PatientCenterPhysiciansSelectors {
    const selectPatientCenterPhysiciansState = createSelector(
        selectState,
        state => state[fromPatientCenterPhysians.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientCenterPhysiciansState,
        fromPatientCenterPhysians.selectLoading
    );
    export const selectError = createSelector(
        selectPatientCenterPhysiciansState,
        fromPatientCenterPhysians.selectError
    );
    export const selectPhysicians = createSelector(
        selectPatientCenterPhysiciansState,
        fromPatientCenterPhysians.selectPhysicians
    );
    export const selectPhysiciansList = createSelector(
        selectPatientCenterPhysiciansState,
        fromPatientCenterPhysians.selectPhysiciansList
    );
}

/**
 * PatientCenter Diagnosiscodes Selectors
 */
export namespace PatientCenterDiagnosiscodesSelectors {
    const selectPatientCenterDiagnosiscodesState = createSelector(
        selectState,
        state => state[fromPatientCenterDiagnosiscode.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientCenterDiagnosiscodesState,
        fromPatientCenterDiagnosiscode.selectLoading
    );
    export const selectError = createSelector(
        selectPatientCenterDiagnosiscodesState,
        fromPatientCenterDiagnosiscode.selectError
    );
    export const selectdiagnosiscodesList = createSelector(
        selectPatientCenterDiagnosiscodesState,
        fromPatientCenterDiagnosiscode.selectdiagnosiscodesList
    );
    export const selectdiagnosiscodesListData = createSelector(
        selectPatientCenterDiagnosiscodesState,
        fromPatientCenterDiagnosiscode.selectdiagnosiscodesListData
    );
}

/**
 * Patient Orders Selectors
 */
export namespace PatientOrdersSelectors {
    const selectPatientOrdersState = createSelector(selectState, state => state[fromPatientOrders.patientsFeatureKey]);

    export const selectLoading = createSelector(selectPatientOrdersState, fromPatientOrders.selectLoading);
    export const selectError = createSelector(selectPatientOrdersState, fromPatientOrders.selectError);
    export const selectOrders = createSelector(selectPatientOrdersState, fromPatientOrders.selectOrders);
}
/**
 * Patient Other Address Selectors
 */
export namespace PatientOtherAddressSelectors {
    const selectPatientOtherAddressState = createSelector(
        selectState,
        state => state[fromPatientOtherAddress.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientOtherAddressState, fromPatientOtherAddress.selectLoading);
    export const selectError = createSelector(selectPatientOtherAddressState, fromPatientOtherAddress.selectError);
    export const selectAddress = createSelector(selectPatientOtherAddressState, fromPatientOtherAddress.selectaddress);
    export const selectPatientCityState = createSelector(
        selectPatientOtherAddressState,
        fromPatientOtherAddress.selectPatientCityState
    );
}
/**
 * Patient Work Order Selectors
 */
export namespace PatientWorkOrderSelectors {
    const selectPatientWorkOrderState = createSelector(
        selectState,
        state => state[fromPatientWorkOrder.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientWorkOrderState, fromPatientWorkOrder.selectLoading);
    export const selectError = createSelector(selectPatientWorkOrderState, fromPatientWorkOrder.selectError);
    export const selectworkOrder = createSelector(selectPatientWorkOrderState, fromPatientWorkOrder.selectworkorder);
    export const selectShipWorkOrder = createSelector(
        selectPatientWorkOrderState,
        fromPatientWorkOrder.selectShipWorkOrder
    );
    export const selectworkorderFilter = createSelector(
        selectPatientWorkOrderState,
        fromPatientWorkOrder.selectworkorderFilter
    );
    export const selectworkorderByFilter = createSelector(
        selectworkOrder,
        selectworkorderFilter,
        (workOrder, selectFilter) => {
            return workOrder.filter(obj =>
                selectFilter === fromPatientWorkOrder.SelectedWorkOrderFilter.billedItems
                    ? (obj.billType === 'Q' && obj.confirm === 'P') ||
                      (obj.billType === 'M' && obj.confirm === 'P') ||
                      (obj.billType === 'P' && obj.confirm === 'P') ||
                      (obj.billType === 'P' && obj.confirm === 'Y')
                    : obj.confirm === 'B'
            );
        }
    );
    export const selectBranch = createSelector(selectPatientWorkOrderState, fromPatientWorkOrder.selectBranch);
}

/**
 * Patient Documents Selectors
 */
export namespace PatientDocumentsSelectors {
    const selectPatientDocumentsState = createSelector(
        selectState,
        state => state[fromPatientDocuments.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientDocumentsState, fromPatientDocuments.selectLoading);
    export const selectError = createSelector(selectPatientDocumentsState, fromPatientDocuments.selectError);
    export const selectDocuments = createSelector(selectPatientDocumentsState, fromPatientDocuments.selectDocuments);
    export const selectDocument = createSelector(selectPatientDocumentsState, fromPatientDocuments.selectDocument);
    export const selectPreviewUrl = createSelector(selectPatientDocumentsState, fromPatientDocuments.selectPreviewUrl);
}
export namespace PatientArHistorySelectors {
    const selectPatientArHistoryState = createSelector(
        selectState,
        state => state[fromPatientArHistory.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientArHistoryState, fromPatientArHistory.selectLoading);
    export const selectError = createSelector(selectPatientArHistoryState, fromPatientArHistory.selectError);
    export const selectArHistory = createSelector(selectPatientArHistoryState, fromPatientArHistory.selectArHistory);
    export const selectArHistoryById = createSelector(
        selectPatientArHistoryState,
        fromPatientArHistory.selectArHistoryById
    );
    export const selectArBillType = createSelector(selectPatientArHistoryState, fromPatientArHistory.selectBillType);
    export const selectBranch = createSelector(selectPatientArHistoryState, fromPatientArHistory.selectBranch);
    export const selectAmtAdjustedCode = createSelector(
        selectPatientArHistoryState,
        fromPatientArHistory.selectAmtAdjustedCode
    );
}

export namespace PatientInquiryChangesSelectors {
    export const selectPatientInquiryChangesState = createSelector(
        selectState,
        state => state[fromPatientInquiryChanges.patientsFeatureKey]
    );

    export const selectLoading = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectLoading
    );
    export const selectError = createSelector(selectPatientInquiryChangesState, fromPatientInquiryChanges.selectError);
    export const selectInquiryChanges = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectInquiryChanges
    );
    export const selectPrintStatus = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectPrintStatus
    );
    export const selectInquiryChangesId = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectInquiryChangesId
    );
    export const selectSalesRep = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectSalesRep
    );
    export const selectBillType = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectBillType
    );
    export const selectClaimType = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectClaimType
    );
    export const selectTranType = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectTranType
    );
    export const selectPwkMethod = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectPwkMethod
    );
    export const selectPwkType = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectPwkType
    );
    export const selectBillTo = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectBillTo
    );
    export const selectIcdCode = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectIcdCode
    );
    export const selectPhysician = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectPhysician
    );
    export const selectBranch = createSelector(
        selectPatientInquiryChangesState,
        fromPatientInquiryChanges.selectBranch
    );
}

/**
 * Patient Notes Selectors
 */
export namespace PatientNotesSelectors {
    const selectPatientNotesState = createSelector(selectState, state => state[fromPatientNotes.patientsFeatureKey]);

    export const selectLoading = createSelector(selectPatientNotesState, fromPatientNotes.selectLoading);
    export const selectError = createSelector(selectPatientNotesState, fromPatientNotes.selectError);
    export const selectNotes = createSelector(selectPatientNotesState, fromPatientNotes.selectNotes);
    export const selectContactType = createSelector(selectPatientNotesState, fromPatientNotes.contactType);
    export const selectNotesSorted = createSelector(selectNotes, notes =>
        notes?.sort((a, b) =>
            DateTime.fromISO(a.addDate.toString()) > DateTime.fromISO(b.addDate.toString()) ? -1 : 1
        )
    );
    export const selectContactTypeList = createSelector(selectPatientNotesState, fromPatientNotes.contactList);
}

/**
 * Patient Collection Notes Selectors
 */
export namespace PatientCollectionNotesSelectors {
    const selectPatientCollectionNotesState = createSelector(
        selectState,
        state => state[fromPatientCollectionNotes.patientsFeatureKey]
    );

    export const selectLoading = createSelector(
        selectPatientCollectionNotesState,
        fromPatientCollectionNotes.selectLoading
    );
    export const selectError = createSelector(
        selectPatientCollectionNotesState,
        fromPatientCollectionNotes.selectError
    );
    export const selectNotes = createSelector(
        selectPatientCollectionNotesState,
        fromPatientCollectionNotes.selectNotes
    );
    export const selectContactType = createSelector(
        selectPatientCollectionNotesState,
        fromPatientCollectionNotes.contactType
    );
    export const selectNotesSorted = createSelector(selectNotes, notes =>
        notes?.sort((a, b) =>
            DateTime.fromISO(a.addDate.toString()) > DateTime.fromISO(b.addDate.toString()) ? -1 : 1
        )
    );
    export const selectContactTypeList = createSelector(
        selectPatientCollectionNotesState,
        fromPatientCollectionNotes.contactList
    );
}

/**
 * Patient Demographics Selectors
 */
export namespace PatientDemographicsSelectors {
    const selectPatientDemographicsState = createSelector(
        selectState,
        state => state[fromPatientDemographics.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientDemographicsState, fromPatientDemographics.selectLoading);
    export const selectError = createSelector(selectPatientDemographicsState, fromPatientDemographics.selectError);
    export const selectdemographics = createSelector(
        selectPatientDemographicsState,
        fromPatientDemographics.selectdemographics
    );
    export const selectReferCode = createSelector(
        selectPatientDemographicsState,
        fromPatientDemographics.selectReferCode
    );
    export const selectBranch = createSelector(selectPatientDemographicsState, fromPatientDemographics.selectBranch);
    export const selectauthPrism = createSelector(
        selectPatientDemographicsState,
        fromPatientDemographics.selectauthPrism
    );
}

/**
 * Patient Checklist Selectors
 */
export namespace PatientChecklistSelectors {
    const selectPatientChecklistState = createSelector(
        selectState,
        state => state[fromPatientChecklist.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientChecklistState, fromPatientChecklist.selectLoading);
    export const selectError = createSelector(selectPatientChecklistState, fromPatientChecklist.selectError);
    export const selectchecklist = createSelector(selectPatientChecklistState, fromPatientChecklist.selectChecklist);
}

/**
 * Patient Sensor Selectors
 */
export namespace PatientSensorSelectors {
    const selectPatientSensorState = createSelector(selectState, state => state[fromPatientSensor.featureKey]);

    export const selectLoading = createSelector(selectPatientSensorState, fromPatientSensor.selectLoading);
    export const selectError = createSelector(selectPatientSensorState, fromPatientSensor.selectError);
    export const selectSensor = createSelector(selectPatientSensorState, fromPatientSensor.selectPatientSensor);
}

/**
 * Quick Fax Tool Selectors
 */
export namespace QuickFaxSelectors {
    const selectQuickFaxState = createSelector(selectState, state => state[fromQuickFax.featureKey]);

    export const selectLoading = createSelector(selectQuickFaxState, fromQuickFax.selectLoading);
    export const selectDoctorDetails = createSelector(selectQuickFaxState, fromQuickFax.selectDoctorDetails);
}

/**
 * Emergency Contacts Selectors
 */
export namespace EmergencyContactsSelectors {
    const selectEmergencyContactsState = createSelector(selectState, state => state[fromEmergencyContact.featureKey]);

    export const selectLoading = createSelector(selectEmergencyContactsState, fromEmergencyContact.selectLoading);
    export const selectEmergencyContacts = createSelector(
        selectEmergencyContactsState,
        fromEmergencyContact.selectEmergencyContacts
    );
    export const selectPatientCityState = createSelector(
        selectEmergencyContactsState,
        fromEmergencyContact.selectPatientCityState
    );
}

/**
 * Automated Emails Selectors
 */
export namespace AutomatedEmailsSelectors {
    const selectAutomatedEmailsState = createSelector(selectState, state => state[fromAutomatedEmails.featureKey]);

    export const selectLoading = createSelector(selectAutomatedEmailsState, fromAutomatedEmails.selectLoading);
    export const selectAutomatedEmails = createSelector(
        selectAutomatedEmailsState,
        fromAutomatedEmails.selectAutomatedEmails
    );
}

/**
 * EFirst Selectors
 */
export namespace EFirstSelectors {
    const selectEFirstState = createSelector(selectState, state => state[fromEFirst.featureKey]);

    export const selectLoading = createSelector(selectEFirstState, fromEFirst.selectLoading);
    export const selectPatientEFirst = createSelector(selectEFirstState, fromEFirst.selectPatientEFirst);
}

/**
 * Patient SWO Selectors
 */
export namespace PatientSWOSelectors {
    const selectPatientSWOState = createSelector(selectState, state => state[fromPatientSWO.featureKey]);

    export const selectLoading = createSelector(selectPatientSWOState, fromPatientSWO.selectLoading);
    export const selectError = createSelector(selectPatientSWOState, fromPatientSWO.selectError);
    export const selectPatientSWOInfo = createSelector(selectPatientSWOState, fromPatientSWO.selectPatientSWOInfo);
}

/**
 * Patient Compliance Selectors
 */
export namespace PatientComplianceSelectors {
    const selectPatientComplianceState = createSelector(
        selectState,
        state => state[fromPatientCompliance.complianceFeatureKey]
    );
    export const selectLoading = createSelector(selectPatientComplianceState, fromPatientCompliance.selectLoading);
    export const selectError = createSelector(selectPatientComplianceState, fromPatientCompliance.selectError);
    export const selectCompliances = createSelector(
        selectPatientComplianceState,
        fromPatientCompliance.selectCompliances
    );
    export const selectContactNotes = createSelector(
        selectPatientComplianceState,
        fromPatientCompliance.selectContactNotes
    );
}

/**
 * Patient Care Management Selectors
 */
export namespace PatientCareManagementSelectors {
    const selectPatientCareManagementState = createSelector(
        selectState,
        state => state[fromPatientCareManagement.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientCareManagementState,
        fromPatientCareManagement.selectLoading
    );
    export const selectError = createSelector(selectPatientCareManagementState, fromPatientCareManagement.selectError);
    export const selectRecords = createSelector(
        selectPatientCareManagementState,
        fromPatientCareManagement.selectRecords
    );
    export const selectContactNotes = createSelector(
        selectPatientCareManagementState,
        fromPatientCareManagement.selectContactNotes
    );

    export const selectOwners = createSelector(
        selectPatientCareManagementState,
        fromPatientCareManagement.selectOwners
    );

    export const selectOwnersLoading = createSelector(
        selectPatientCareManagementState,
        fromPatientCareManagement.selectOwnersLoading
    );
    export const selectPayorRank1 = createSelector(
        selectPatientCareManagementState,
        fromPatientCareManagement.selectPayorRank1
    );
}

/**
 * Patient Events Billing Selectors
 */
export namespace PatientEventsBillingSelectors {
    const selectPatientEventsBillingState = createSelector(
        selectState,
        state => state[fromPatientEventsBilling.featureKey]
    );

    export const selectLoading = createSelector(
        selectPatientEventsBillingState,
        fromPatientEventsBilling.selectLoading
    );
    export const selectError = createSelector(selectPatientEventsBillingState, fromPatientEventsBilling.selectError);
    export const selectBillingEvents = createSelector(
        selectPatientEventsBillingState,
        fromPatientEventsBilling.selectBillingEvents
    );
    export const selectContactNotes = createSelector(
        selectPatientEventsBillingState,
        fromPatientEventsBilling.selectContactNotes
    );
}

/**
 * Patient Audit Center Selectors
 */

export namespace PatientAuditSelectors {
    const selectPatientAuditState = createSelector(selectState, state => state[fromPatientAudit.AuditFeatureKey]);
    export const selectLoading = createSelector(selectPatientAuditState, fromPatientAudit.selectLoading);
    export const selectError = createSelector(selectPatientAuditState, fromPatientAudit.selectError);
    export const selectAudits = createSelector(selectPatientAuditState, fromPatientAudit.selectAudits);
    export const selectContactNotes = createSelector(selectPatientAuditState, fromPatientAudit.selectContactNotes);
}

/**
 * Patient Payments Adjustments Selectors
 */
export namespace PatientPaymentAdjustmentsSelectors {
    const selectPatientPaymentsAdjustmentsState = createSelector(
        selectState,
        state => state[fromPatientPaymentsAdjustments.patientsFeatureKey]
    );

    export const selectLoading = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectLoading
    );
    export const selectError = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectError
    );
    export const selectPaymentAdjustments = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectPaymentAdjustments
    );
    export const selectPaymentAdjustmentById = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectPaymentAdjustmentsById
    );
    export const selectPaymentTypeDropdown = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectPaymentTypeDropdown
    );
    export const selectToPatientDefault = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectToPatientDefault
    );
    export const selectInsuranceRank2 = createSelector(
        selectPatientPaymentsAdjustmentsState,
        fromPatientPaymentsAdjustments.selectInsuranceRank2
    );
}

export namespace PatientChargesSelectors {
    const selectPatientChargesState = createSelector(
        selectState,
        state => state[fromPatientCharges.patientsFeatureKey]
    );

    export const selectLoading = createSelector(selectPatientChargesState, fromPatientCharges.selectLoading);
    export const selectError = createSelector(selectPatientChargesState, fromPatientCharges.selectError);
    export const selectPatientCharges = createSelector(
        selectPatientChargesState,
        fromPatientCharges.selectPatientCharges
    );
    export const selectPatientChargesById = createSelector(
        selectPatientChargesState,
        fromPatientCharges.selectPatientChargesById
    );
}
