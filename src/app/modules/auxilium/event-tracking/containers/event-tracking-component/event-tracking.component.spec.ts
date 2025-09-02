import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventTrackingComponent } from './event-tracking.component';

describe('EventTrackingComponent', () => {
    let component: EventTrackingComponent;
    let fixture: ComponentFixture<EventTrackingComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [EventTrackingComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventTrackingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
