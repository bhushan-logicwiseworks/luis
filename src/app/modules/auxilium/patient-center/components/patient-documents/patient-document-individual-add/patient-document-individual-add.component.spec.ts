import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientDocumentIndividualAddComponent } from './patient-document-individual-add.component';

describe('PatientDocumentIndividualAddComponent', () => {
    let component: PatientDocumentIndividualAddComponent;
    let fixture: ComponentFixture<PatientDocumentIndividualAddComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientDocumentIndividualAddComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientDocumentIndividualAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
