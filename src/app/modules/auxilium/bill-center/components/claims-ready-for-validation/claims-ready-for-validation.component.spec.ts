import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsReadyForValidationComponent } from './claims-ready-for-validation.component';

describe('ClaimsReadyForValidationComponent', () => {
    let component: ClaimsReadyForValidationComponent;
    let fixture: ComponentFixture<ClaimsReadyForValidationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ClaimsReadyForValidationComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ClaimsReadyForValidationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
