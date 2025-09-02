import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PatientDocumentIndividualComponent } from './patient-document-individual.component';

describe('PatientDocumentIndividualComponent', () => {
    let component: PatientDocumentIndividualComponent;
    let fixture: ComponentFixture<PatientDocumentIndividualComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientDocumentIndividualComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientDocumentIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
