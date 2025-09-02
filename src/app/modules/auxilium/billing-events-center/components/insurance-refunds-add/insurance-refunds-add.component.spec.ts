import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRefundsAddComponent } from './insurance-refunds-add.component';

describe('InsuranceRefundsAddComponent', () => {
    let component: InsuranceRefundsAddComponent;
    let fixture: ComponentFixture<InsuranceRefundsAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InsuranceRefundsAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(InsuranceRefundsAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
