import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CodeCenterIndividualFormComponent } from './code-center-individual-form.component';

describe('CodeCenterIndividualFormComponent', () => {
    let component: CodeCenterIndividualFormComponent;
    let fixture: ComponentFixture<CodeCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CodeCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodeCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
