import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PatientPortalIndividualComponent } from './patient-portal-individual.component';

describe('PatientPortalIndividualComponent', () => {
    let component: PatientPortalIndividualComponent;
    let fixture: ComponentFixture<PatientPortalIndividualComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientPortalIndividualComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientPortalIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
