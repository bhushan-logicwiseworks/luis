import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionRateCenterComponentComponent } from './retention-rate-center-component.component';

describe('RetentionRateCenterComponentComponent', () => {
    let component: RetentionRateCenterComponentComponent;
    let fixture: ComponentFixture<RetentionRateCenterComponentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [RetentionRateCenterComponentComponent],
}).compileComponents();

        fixture = TestBed.createComponent(RetentionRateCenterComponentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
