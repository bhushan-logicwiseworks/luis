import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCenterIconComponent } from './job-center-icon.component';

describe('JobCenterIconComponent', () => {
    let component: JobCenterIconComponent;
    let fixture: ComponentFixture<JobCenterIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobCenterIconComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobCenterIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
