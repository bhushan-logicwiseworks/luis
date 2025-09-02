import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTrackingIndividualComponent } from './event-tracking-individual.component';

describe('EventTrackingIndividualComponent', () => {
    let component: EventTrackingIndividualComponent;
    let fixture: ComponentFixture<EventTrackingIndividualComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [EventTrackingIndividualComponent],
}).compileComponents();

        fixture = TestBed.createComponent(EventTrackingIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
