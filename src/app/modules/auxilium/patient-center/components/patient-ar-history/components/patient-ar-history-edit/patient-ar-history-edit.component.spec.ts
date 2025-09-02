import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientArHistoryEditComponent } from './patient-ar-history-edit.component';

describe('PatientArHistoryEditComponent', () => {
    let component: PatientArHistoryEditComponent;
    let fixture: ComponentFixture<PatientArHistoryEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientArHistoryEditComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientArHistoryEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
