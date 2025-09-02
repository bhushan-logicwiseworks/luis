import { Component, OnInit } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Router } from '@angular/router';
import { TitleService } from '../../services/title.service';

@Component({
    selector: 'ac-patient-onboarding-dialog',
    templateUrl: './patient-onboarding-dialog.component.html',
    styleUrls: ['./patient-onboarding-dialog.component.scss'],
    imports: [MatSelectionList],
})
export class PatientOnboardingDialogComponent implements OnInit {
    title: string;
    checklistItems: any[] = [
        'Initial Patient Contact Attempt',
        'Patient Contact Attempt #2',
        'Patient Contact Attempt #3',
        'Patient Interview',
        'Insurance Verified',
        'Completed PWO Received',
        'Qualifying Notes Received',
    ].map(e => [e, Math.random() > 0.5]);

    constructor(
        private router: Router,
        private titleService: TitleService
    ) {}

    ngOnInit(): void {
        // Set title
        this.title = this.router.url.split('/')[4];
        this.titleService.setValue(this.title);
    }
}
