import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientDocumentsComponent } from './patient-documents.component';

describe('PatientStepsComponent', () => {
    let component: PatientDocumentsComponent;
    let fixture: ComponentFixture<PatientDocumentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientDocumentsComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientDocumentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
