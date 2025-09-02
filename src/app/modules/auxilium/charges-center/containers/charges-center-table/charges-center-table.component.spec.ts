import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesCenterTableComponent } from './charges-center-table.component';

describe('ChargesCenterTableComponent', () => {
    let component: ChargesCenterTableComponent;
    let fixture: ComponentFixture<ChargesCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ChargesCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ChargesCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
