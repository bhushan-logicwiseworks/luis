import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeeCenterComponent } from './employee-center.component';

describe('EmployeeCenterComponent', () => {
    let component: EmployeeCenterComponent;
    let fixture: ComponentFixture<EmployeeCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [EmployeeCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmployeeCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
