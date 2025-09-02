import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHistoryModalComponent } from './job-history-modal.component';

describe('JobHistoryModalComponent', () => {
    let component: JobHistoryModalComponent;
    let fixture: ComponentFixture<JobHistoryModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobHistoryModalComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobHistoryModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
