import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetentionRateCenterTableComponent } from './retention-rate-center-table.component';

describe('RetentionRateCenterTableComponent', () => {
    let component: RetentionRateCenterTableComponent;
    let fixture: ComponentFixture<RetentionRateCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [RetentionRateCenterTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(RetentionRateCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
