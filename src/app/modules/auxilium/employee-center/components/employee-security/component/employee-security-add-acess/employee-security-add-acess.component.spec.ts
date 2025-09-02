import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSecurityAddAcessComponent } from './employee-security-add-acess.component';

describe('EmployeeSecurityAddAcessComponent', () => {
    let component: EmployeeSecurityAddAcessComponent;
    let fixture: ComponentFixture<EmployeeSecurityAddAcessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [EmployeeSecurityAddAcessComponent],
}).compileComponents();

        fixture = TestBed.createComponent(EmployeeSecurityAddAcessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
