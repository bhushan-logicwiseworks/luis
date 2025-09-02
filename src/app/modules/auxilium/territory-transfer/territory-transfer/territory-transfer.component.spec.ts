import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritoryTransferComponent } from './territory-transfer.component';

describe('TerritoryTransferComponent', () => {
    let component: TerritoryTransferComponent;
    let fixture: ComponentFixture<TerritoryTransferComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [TerritoryTransferComponent],
}).compileComponents();

        fixture = TestBed.createComponent(TerritoryTransferComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
