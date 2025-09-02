import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntakeCenterComponent } from './intake-center.component';

describe('IntakeCenterComponent', () => {
    let component: IntakeCenterComponent;
    let fixture: ComponentFixture<IntakeCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [IntakeCenterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(IntakeCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
