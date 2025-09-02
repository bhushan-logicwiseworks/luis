import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProofOfDeliveryTableComponent } from './proof-of-delivery-table.component';

describe('ProofOfDeliveryTableComponent', () => {
    let component: ProofOfDeliveryTableComponent;
    let fixture: ComponentFixture<ProofOfDeliveryTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ProofOfDeliveryTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProofOfDeliveryTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
