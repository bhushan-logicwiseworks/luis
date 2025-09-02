import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DexcomCenterComponent } from './dexcom-center.component';

describe('DexcomCenterComponent', () => {
    let component: DexcomCenterComponent;
    let fixture: ComponentFixture<DexcomCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [DexcomCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DexcomCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
