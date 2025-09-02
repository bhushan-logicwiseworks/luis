import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxSelectDropdownComponent } from './aux-select-dropdown.component';

describe('AuxSelectDropdownComponent', () => {
    let component: AuxSelectDropdownComponent;
    let fixture: ComponentFixture<AuxSelectDropdownComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxSelectDropdownComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxSelectDropdownComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
