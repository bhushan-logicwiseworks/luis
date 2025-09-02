import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplanationOfBenefitsComponent } from './explanation-of-benefits.component';

describe('ExplanationOfBenefitsComponent', () => {
    let component: ExplanationOfBenefitsComponent;
    let fixture: ComponentFixture<ExplanationOfBenefitsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ExplanationOfBenefitsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ExplanationOfBenefitsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
