import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldItemDetailsComponent } from './held-item-details.component';

describe('HeldItemDetailsComponent', () => {
    let component: HeldItemDetailsComponent;
    let fixture: ComponentFixture<HeldItemDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [HeldItemDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(HeldItemDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
