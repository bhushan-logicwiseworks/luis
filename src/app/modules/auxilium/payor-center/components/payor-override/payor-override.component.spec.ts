import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayorOverrideComponent } from './payor-override.component';

describe('PayorOverrideComponent', () => {
    let component: PayorOverrideComponent;
    let fixture: ComponentFixture<PayorOverrideComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PayorOverrideComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PayorOverrideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
