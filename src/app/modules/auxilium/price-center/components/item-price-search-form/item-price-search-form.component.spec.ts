import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPriceSearchFormComponent } from './item-price-search-form.component';

describe('ItemPriceSearchFormComponent', () => {
    let component: ItemPriceSearchFormComponent;
    let fixture: ComponentFixture<ItemPriceSearchFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ItemPriceSearchFormComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ItemPriceSearchFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
