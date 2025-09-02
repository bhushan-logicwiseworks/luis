import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccessCenterTableComponent } from './access-center-table.component';

describe('AccessCenterTableComponent', () => {
    let component: AccessCenterTableComponent;
    let fixture: ComponentFixture<AccessCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [AccessCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
