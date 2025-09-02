import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccessCenterComponent } from './access-center.component';

describe('AccessCenterComponent', () => {
    let component: AccessCenterComponent;
    let fixture: ComponentFixture<AccessCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [AccessCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
