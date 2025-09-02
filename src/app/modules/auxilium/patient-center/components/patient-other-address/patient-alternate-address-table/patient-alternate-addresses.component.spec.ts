import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAlternateAddressesComponent } from './patient-alternate-addresses.component';

describe('PatientAlternateAddressesComponent', () => {
    let component: PatientAlternateAddressesComponent;
    let fixture: ComponentFixture<PatientAlternateAddressesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientAlternateAddressesComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientAlternateAddressesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
