import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistoryDetailsComponent } from './job-history-details.component';

describe('JobHistoryDetailsComponent', () => {
    let component: JobHistoryDetailsComponent;
    let fixture: ComponentFixture<JobHistoryDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobHistoryDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobHistoryDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
