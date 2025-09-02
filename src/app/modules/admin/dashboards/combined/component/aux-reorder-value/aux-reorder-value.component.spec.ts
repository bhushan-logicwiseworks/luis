import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxReorderValueComponent } from './aux-reorder-value.component';

describe('AuxReorderValueComponent', () => {
    let component: AuxReorderValueComponent;
    let fixture: ComponentFixture<AuxReorderValueComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxReorderValueComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxReorderValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
