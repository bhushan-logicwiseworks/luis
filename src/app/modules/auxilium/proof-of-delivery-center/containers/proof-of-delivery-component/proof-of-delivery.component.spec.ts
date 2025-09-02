import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProofOfDeliveryComponent } from './proof-of-delivery.component';

describe('ProofOfDeliveryComponent', () => {
    let component: ProofOfDeliveryComponent;
    let fixture: ComponentFixture<ProofOfDeliveryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ProofOfDeliveryComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProofOfDeliveryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
