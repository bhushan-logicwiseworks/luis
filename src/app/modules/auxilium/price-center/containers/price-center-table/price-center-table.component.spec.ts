import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCenterTableComponent } from './price-center-table.component';

describe('PriceCenterTableComponent', () => {
    let component: PriceCenterTableComponent;
    let fixture: ComponentFixture<PriceCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PriceCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PriceCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
