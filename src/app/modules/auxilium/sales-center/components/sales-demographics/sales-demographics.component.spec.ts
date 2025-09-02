import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDemographicsComponent } from './sales-demographics.component';

describe('SalesDemographicsComponent', () => {
    let component: SalesDemographicsComponent;
    let fixture: ComponentFixture<SalesDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [SalesDemographicsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(SalesDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
