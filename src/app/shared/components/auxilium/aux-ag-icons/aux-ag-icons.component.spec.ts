import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxAgIconsComponent } from './aux-ag-icons.component';

describe('AuxAgIconsComponent', () => {
    let component: AuxAgIconsComponent;
    let fixture: ComponentFixture<AuxAgIconsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxAgIconsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxAgIconsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
