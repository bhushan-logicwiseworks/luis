import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BillTypeCenterIndividualFormComponent } from './billType-center-individual-form.component';

describe('BillTypeCenterIndividualFormComponent', () => {
    let component: BillTypeCenterIndividualFormComponent;
    let fixture: ComponentFixture<BillTypeCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [BillTypeCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BillTypeCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
