import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCenterChipComponent } from './job-center-chip.component';

describe('JobCenterChipComponent', () => {
    let component: JobCenterChipComponent;
    let fixture: ComponentFixture<JobCenterChipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobCenterChipComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobCenterChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
