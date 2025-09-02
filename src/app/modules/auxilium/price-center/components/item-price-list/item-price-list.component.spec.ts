import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPriceListComponent } from './item-price-list.component';

describe('ItemPriceListComponent', () => {
    let component: ItemPriceListComponent;
    let fixture: ComponentFixture<ItemPriceListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ItemPriceListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ItemPriceListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
