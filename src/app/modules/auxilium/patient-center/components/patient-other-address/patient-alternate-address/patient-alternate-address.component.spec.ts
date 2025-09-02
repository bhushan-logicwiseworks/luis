import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PatientAlternateAddressComponent } from './patient-alternate-address.component';

describe('PatientAlternateAddressComponent', () => {
    let component: PatientAlternateAddressComponent;
    let fixture: ComponentFixture<PatientAlternateAddressComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientAlternateAddressComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientAlternateAddressComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
