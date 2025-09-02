import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BranchCenterTableComponent } from './branch-center-table.component';

describe('BranchCenterTableComponent', () => {
    let component: BranchCenterTableComponent;
    let fixture: ComponentFixture<BranchCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [BranchCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BranchCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
