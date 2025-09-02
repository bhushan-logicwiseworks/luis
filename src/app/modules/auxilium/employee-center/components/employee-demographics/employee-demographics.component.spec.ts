import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDemographicsComponent } from './employee-demographics.component';

describe('EmployeeDemographicsComponent', () => {
    let component: EmployeeDemographicsComponent;
    let fixture: ComponentFixture<EmployeeDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [EmployeeDemographicsComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
