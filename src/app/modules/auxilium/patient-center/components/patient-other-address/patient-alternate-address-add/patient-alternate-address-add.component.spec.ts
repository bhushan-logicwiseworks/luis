import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientAlternateAddressAddComponent } from './patient-alternate-address-add.component';

describe('PatientAlternateAddressAddComponent', () => {
    let component: PatientAlternateAddressAddComponent;
    let fixture: ComponentFixture<PatientAlternateAddressAddComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientAlternateAddressAddComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientAlternateAddressAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
