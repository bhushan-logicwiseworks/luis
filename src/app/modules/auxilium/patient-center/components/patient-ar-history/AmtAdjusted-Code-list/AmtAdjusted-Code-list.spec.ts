import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmtAdjustedCodeListComponent } from './AmtAdjusted-Code-list';

describe('AmtAdjustedCodeListComponent', () => {
    let component: AmtAdjustedCodeListComponent;
    let fixture: ComponentFixture<AmtAdjustedCodeListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AmtAdjustedCodeListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AmtAdjustedCodeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
