import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProofOfDeliveryIndividualFormComponent } from './proof-of-delivery-individual-form.component';

describe('ProofOfDeliveryIndividualFormComponent', () => {
    let component: ProofOfDeliveryIndividualFormComponent;
    let fixture: ComponentFixture<ProofOfDeliveryIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ProofOfDeliveryIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProofOfDeliveryIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
