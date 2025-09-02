import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxAgGridComponent } from './aux-ag-grid.component';

describe('AuxAgGridComponent', () => {
    let component: AuxAgGridComponent;
    let fixture: ComponentFixture<AuxAgGridComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxAgGridComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxAgGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
