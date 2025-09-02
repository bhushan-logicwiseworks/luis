import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPriceInformationComponent } from './item-price-information.component';

describe('ItemPriceInformationComponent', () => {
    let component: ItemPriceInformationComponent;
    let fixture: ComponentFixture<ItemPriceInformationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ItemPriceInformationComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ItemPriceInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
