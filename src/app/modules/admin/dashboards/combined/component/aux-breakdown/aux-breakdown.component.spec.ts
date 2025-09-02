import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxBreakdownComponent } from './aux-breakdown.component';

describe('AuxBreakdownComponent', () => {
    let component: AuxBreakdownComponent;
    let fixture: ComponentFixture<AuxBreakdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxBreakdownComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxBreakdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
