import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent } from './patient-secondary-tertiary-appeals-denials-rejections-table.component';

describe('PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent', () => {
    let component: PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent;
    let fixture: ComponentFixture<PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientSecondaryTertiaryAppealsDenialsRejectionsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
