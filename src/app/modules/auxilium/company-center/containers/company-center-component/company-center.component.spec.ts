import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BranchCenterComponent } from './company-center.component';

describe('BranchCenterComponent', () => {
    let component: BranchCenterComponent;
    let fixture: ComponentFixture<BranchCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [BranchCenterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BranchCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
