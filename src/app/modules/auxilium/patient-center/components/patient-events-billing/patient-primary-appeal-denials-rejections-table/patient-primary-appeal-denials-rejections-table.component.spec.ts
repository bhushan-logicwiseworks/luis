import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientPrimaryAppealDenialsRejectionsTableComponent } from './patient-primary-appeal-denials-rejections-table.component';

describe('PatientPrimaryAppealDenialsRejectionsTableComponent', () => {
    let component: PatientPrimaryAppealDenialsRejectionsTableComponent;
    let fixture: ComponentFixture<PatientPrimaryAppealDenialsRejectionsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientPrimaryAppealDenialsRejectionsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientPrimaryAppealDenialsRejectionsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
