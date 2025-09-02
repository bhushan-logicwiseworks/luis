import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VendorCenterIndividualFormComponent } from './vendor-center-individual-form.component';

describe('VendorCenterIndividualFormComponent', () => {
    let component: VendorCenterIndividualFormComponent;
    let fixture: ComponentFixture<VendorCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [VendorCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VendorCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
