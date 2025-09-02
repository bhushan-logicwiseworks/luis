import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingEventsNotesComponent } from './billing-events-notes.component';

describe('BillingEventsNotesComponent', () => {
    let component: BillingEventsNotesComponent;
    let fixture: ComponentFixture<BillingEventsNotesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BillingEventsNotesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BillingEventsNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
