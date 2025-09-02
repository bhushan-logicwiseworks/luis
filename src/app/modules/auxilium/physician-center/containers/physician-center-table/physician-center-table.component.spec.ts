import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PhysicianCenterTableComponent } from './physician-center-table.component';

describe('PhysicianCenterTableComponent', () => {
    let component: PhysicianCenterTableComponent;
    let fixture: ComponentFixture<PhysicianCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PhysicianCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhysicianCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
