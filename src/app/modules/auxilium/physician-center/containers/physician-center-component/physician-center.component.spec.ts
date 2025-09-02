import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PhysicianCenterComponent } from './physician-center.component';

describe('PhysicianCenterComponent', () => {
    let component: PhysicianCenterComponent;
    let fixture: ComponentFixture<PhysicianCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PhysicianCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PhysicianCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
