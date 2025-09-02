import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCenterComponent } from './price-center.component';

describe('PriceCenterComponent', () => {
    let component: PriceCenterComponent;
    let fixture: ComponentFixture<PriceCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PriceCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PriceCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
