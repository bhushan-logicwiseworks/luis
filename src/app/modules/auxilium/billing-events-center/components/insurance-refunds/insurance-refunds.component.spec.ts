import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceRefundsComponent } from './insurance-refunds.component';

describe('InsuranceRefundsComponent', () => {
    let component: InsuranceRefundsComponent;
    let fixture: ComponentFixture<InsuranceRefundsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InsuranceRefundsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InsuranceRefundsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
