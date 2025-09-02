import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PatientPortalIndividualFormComponent } from './patient-portal-individual-form.component';

describe('PatientPortalIndividualFormComponent', () => {
    let component: PatientPortalIndividualFormComponent;
    let fixture: ComponentFixture<PatientPortalIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientPortalIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientPortalIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
