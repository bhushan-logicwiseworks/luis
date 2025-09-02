import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobIndividualFormComponent } from './job-individual-form.component';

describe('JobIndividualFormComponent', () => {
    let component: JobIndividualFormComponent;
    let fixture: ComponentFixture<JobIndividualFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [JobIndividualFormComponent],
}).compileComponents();

        fixture = TestBed.createComponent(JobIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
