import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialAssistanceProgramComponent } from './financial-assistance-program.component';

describe('FinancialAssistanceProgramComponent', () => {
    let component: FinancialAssistanceProgramComponent;
    let fixture: ComponentFixture<FinancialAssistanceProgramComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FinancialAssistanceProgramComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FinancialAssistanceProgramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
