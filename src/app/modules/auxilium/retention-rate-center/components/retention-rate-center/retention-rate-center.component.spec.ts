import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionRateCenterComponent } from './retention-rate-center.component';

describe('RetentionRateCenterComponent', () => {
    let component: RetentionRateCenterComponent;
    let fixture: ComponentFixture<RetentionRateCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [RetentionRateCenterComponent],
}).compileComponents();

        fixture = TestBed.createComponent(RetentionRateCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
