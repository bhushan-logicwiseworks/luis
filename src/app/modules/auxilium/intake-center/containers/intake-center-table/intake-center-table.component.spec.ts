import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeCenterTableComponent } from './intake-center-table.component';

describe('IntakeCenterTableComponent', () => {
    let component: IntakeCenterTableComponent;
    let fixture: ComponentFixture<IntakeCenterTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IntakeCenterTableComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(IntakeCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
