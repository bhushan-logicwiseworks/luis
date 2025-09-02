import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorDemographicsComponent } from './payor-demographics.component';

describe('PayorCenterBillInfoComponent', () => {
    let component: PayorDemographicsComponent;
    let fixture: ComponentFixture<PayorDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PayorDemographicsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PayorDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
