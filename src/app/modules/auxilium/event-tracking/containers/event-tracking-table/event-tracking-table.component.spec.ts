import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventTrackingTableComponent } from './event-tracking-table.component';

describe('EventTrackingTableComponent', () => {
    let component: EventTrackingTableComponent;
    let fixture: ComponentFixture<EventTrackingTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [EventTrackingTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventTrackingTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
