import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'aux-source-chip',
    templateUrl: './aux-source-chip.component.html',
    styleUrls: ['./aux-source-chip.component.scss'],
    imports: [NgClass],
})
export class SourceChipComponent implements OnInit {
    @Input() label: string;

    constructor() {}

    ngOnInit(): void {}

    agInit(params: any): void {
        if (params.column.colId == 'isEnabled') {
            this.label = params.value == true ? 'TRUE' : 'FALSE';
        } else {
            this.label = params.value;
        }
    }

    getColor(label: any) {
        const upperLabel = String(label).toUpperCase();

        switch (upperLabel) {
            //
            // COMMCENTER CHIPS
            //
            case 'EMAIL':
                return ['bg-green-100', 'text-green-500'];
            case 'FORMSPREE':
                return ['bg-indigo-100', 'text-indigo-500'];
            case 'TASK':
                return ['bg-pink-100', 'text-pink-500'];
            case 'FAX':
                return ['bg-purple-200', 'text-purple-500'];
            case 'APP':
                return ['bg-red-200', 'text-red-500'];
            case 'TEXT':
                return ['bg-red-200', 'text-red-500'];
            case 'WOUND':
                return ['bg-yellow-200', 'text-yellow-500'];
            case 'VM':
                return ['bg-purple-200', 'text-purple-500'];
            case 'FAST':
                return ['bg-blue-200', 'text-blue-500'];
            case 'SALES':
                return ['bg-orange-200', 'text-orange-500'];
            case 'SELF':
                return ['bg-red-200', 'text-red-500'];
            //
            // REORDER CENTER CHIPS
            //
            case 'CURRENT':
                return ['bg-green-100', 'text-green-500'];
            case 'PASTDUE':
                return ['bg-yellow-200', 'text-yellow-500'];
            case 'EXPIRED':
                return ['bg-red-200', 'text-red-500'];
            //
            // APPLICATION CHIPS
            //
            case 'MEDA':
                return ['bg-green-100', 'text-green-500'];
            case 'PATIENTAPP':
                return ['bg-green-100', 'text-green-500'];
            case 'PATIENTPORTAL':
                return ['bg-green-100', 'text-green-500'];
            case 'REFERRALSOURCEPORTAL':
                return ['bg-green-200', 'text-green-500'];
            case 'SALESREPAPP':
                return ['bg-green-100', 'text-green-500'];
            //
            // CENTER CHIPS
            //
            case 'ABBOTT':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ACCESSCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ACCOUNTSRECEIVABLECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ADMINCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ANALYTICSCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'AUDITCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'BILLCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'BILLTYPECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'BRANCHCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'CAREMANAGEMENTCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'CODECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'COMMCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'COMPLIANCECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'CONFIGURATIONCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'DEXCOM':
                return ['bg-purple-100', 'text-purple-500'];
            case 'EMPLOYEECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'EVENTTRACKINGCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'HOTKEYSCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ICDCODECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'IDENTITYCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'INVENTORYCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'JOBCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'LICENSECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'MAPCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ONBOARDINGCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'PATIENTCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'PAYORCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'PHYSICIANCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'PRICECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'PROOFOFDELIVERYCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'REFERRALCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'REORDERCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'REPORTINGCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'SALESCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'SHORTCUTCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'VALIDATIONCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'VAULTCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'VENDORCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'WORKORDERCENTER':
                return ['bg-purple-100', 'text-purple-500'];
            case 'ZIPCODECENTER':
                return ['bg-purple-100', 'text-purple-500'];
            //
            // CATEGORY CHIPS
            //
            case 'CGM':
                return ['bg-green-100', 'text-green-500'];
            case 'ENTERAL':
                return ['bg-blue-100', 'text-blue-500'];
            case 'INCONTINENCE':
                return ['bg-orange-100', 'text-orange-500'];
            case 'OSTOMY':
                return ['bg-purple-200', 'text-purple-500'];
            case 'UROLOGY':
                return ['bg-pink-100', 'text-pink-500'];
            // case 'WOUND':
            //     return ['bg-yellow-100', 'text-yellow-500'];

            //
            // CATEGORY CHIPS
            //
            case 'SUCCESS':
                return ['bg-green-100', 'text-green-500'];
            case 'INFO':
                return ['bg-blue-100', 'text-blue-500'];
            case 'RUNNING':
                return ['bg-orange-200', 'text-orange-500'];
            case 'WARNING':
                return ['bg-yellow-200', 'text-yellow-500'];
            case 'ERROR':
                return ['bg-red-200', 'text-red-500'];
            case 'TRUE':
                return ['bg-green-100', 'text-green-500'];
            case 'FALSE':
                return ['bg-red-200', 'text-red-500'];
            //
            // UNKNOWN / MISCELANEOUS CHIPS
            //
            default:
                return ['bg-gray-100', 'text-gray-500'];
        }
    }
}
