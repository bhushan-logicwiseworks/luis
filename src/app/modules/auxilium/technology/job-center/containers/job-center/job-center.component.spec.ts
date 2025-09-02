import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCenterComponent } from './job-center.component';

describe('JobCenterComponent', () => {
    let component: JobCenterComponent;
    let fixture: ComponentFixture<JobCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
