import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IcdCodeCenterIndividualFormComponent } from './icdcode-center-individual-form.component';

describe('IcdCodeCenterIndividualFormComponent', () => {
    let component: IcdCodeCenterIndividualFormComponent;
    let fixture: ComponentFixture<IcdCodeCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IcdCodeCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IcdCodeCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
