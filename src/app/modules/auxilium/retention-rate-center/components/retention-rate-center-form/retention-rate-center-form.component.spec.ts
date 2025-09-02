import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionRateCenterFormComponent } from './retention-rate-center-form.component';

describe('RetentionRateCenterFormComponent', () => {
    let component: RetentionRateCenterFormComponent;
    let fixture: ComponentFixture<RetentionRateCenterFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [RetentionRateCenterFormComponent],
}).compileComponents();

        fixture = TestBed.createComponent(RetentionRateCenterFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
