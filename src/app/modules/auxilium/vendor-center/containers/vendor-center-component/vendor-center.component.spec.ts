import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VenderCenterComponent } from './vendor-center.component';

describe('VenderCenterComponent', () => {
    let component: VenderCenterComponent;
    let fixture: ComponentFixture<VenderCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [VenderCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VenderCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
