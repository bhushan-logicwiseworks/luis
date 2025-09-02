import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientWorkOrderComponent } from './patient-work-order.component';

describe('PatientWorkOrderComponent', () => {
    let component: PatientWorkOrderComponent;
    let fixture: ComponentFixture<PatientWorkOrderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [PatientWorkOrderComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientWorkOrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
