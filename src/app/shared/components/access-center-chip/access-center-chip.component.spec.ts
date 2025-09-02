import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCenterChipComponent } from './access-center-chip.component';

describe('AccessCenterChipComponent', () => {
    let component: AccessCenterChipComponent;
    let fixture: ComponentFixture<AccessCenterChipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AccessCenterChipComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AccessCenterChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
