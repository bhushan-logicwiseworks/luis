import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientOrderHistoryComponent } from './patient-order-history.component';

describe('PatientOrderHistoryComponent', () => {
    let component: PatientOrderHistoryComponent;
    let fixture: ComponentFixture<PatientOrderHistoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [PatientOrderHistoryComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientOrderHistoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
