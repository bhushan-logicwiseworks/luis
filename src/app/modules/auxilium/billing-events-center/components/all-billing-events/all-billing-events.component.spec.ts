import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllBillingEventsComponent } from './all-billing-events.component';

describe('AllBillingEventsComponent', () => {
    let component: AllBillingEventsComponent;
    let fixture: ComponentFixture<AllBillingEventsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AllBillingEventsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AllBillingEventsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
