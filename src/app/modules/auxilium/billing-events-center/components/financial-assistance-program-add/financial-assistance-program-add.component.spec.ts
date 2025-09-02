import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialAssistanceProgramAddComponent } from './financial-assistance-program-add.component';

describe('FinancialAssistanceProgramAddComponent', () => {
    let component: FinancialAssistanceProgramAddComponent;
    let fixture: ComponentFixture<FinancialAssistanceProgramAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FinancialAssistanceProgramAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(FinancialAssistanceProgramAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
