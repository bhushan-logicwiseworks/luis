import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofOfDeliverySearchComponent } from './proof-of-delivery-search.component';

describe('ProofOfDeliverySearchComponent', () => {
    let component: ProofOfDeliverySearchComponent;
    let fixture: ComponentFixture<ProofOfDeliverySearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ProofOfDeliverySearchComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ProofOfDeliverySearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
