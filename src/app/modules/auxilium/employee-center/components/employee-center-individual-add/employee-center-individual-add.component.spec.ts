import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EmployeeCenterIndividualAddComponent } from './employee-center-individual-add.component';

describe('NewSalesCenterIndividualComponent', () => {
    let component: EmployeeCenterIndividualAddComponent;
    let fixture: ComponentFixture<EmployeeCenterIndividualAddComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [EmployeeCenterIndividualAddComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeCenterIndividualAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
