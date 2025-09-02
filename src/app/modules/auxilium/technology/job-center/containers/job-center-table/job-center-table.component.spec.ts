import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCenterTableComponent } from './job-center-table.component';

describe('JobCenterTableComponent', () => {
    let component: JobCenterTableComponent;
    let fixture: ComponentFixture<JobCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
