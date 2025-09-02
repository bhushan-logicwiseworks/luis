import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientAlternateAddressFormComponent } from './patient-alternate-address-form.component';

describe('PatientAlternateAddressFormComponent', () => {
    let component: PatientAlternateAddressFormComponent;
    let fixture: ComponentFixture<PatientAlternateAddressFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientAlternateAddressFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientAlternateAddressFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
