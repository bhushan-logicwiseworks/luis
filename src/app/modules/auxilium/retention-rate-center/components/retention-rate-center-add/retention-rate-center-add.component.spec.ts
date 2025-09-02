import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionRateCenterAddComponent } from './retention-rate-center-add.component';

describe('RetentionRateCenterAddComponent', () => {
    let component: RetentionRateCenterAddComponent;
    let fixture: ComponentFixture<RetentionRateCenterAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [RetentionRateCenterAddComponent],
}).compileComponents();

        fixture = TestBed.createComponent(RetentionRateCenterAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
