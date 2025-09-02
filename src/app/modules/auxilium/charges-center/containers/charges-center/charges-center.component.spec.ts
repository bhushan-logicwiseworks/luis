import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesCenterComponent } from './charges-center.component';

describe('ChargesCenterComponent', () => {
    let component: ChargesCenterComponent;
    let fixture: ComponentFixture<ChargesCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ChargesCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ChargesCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
