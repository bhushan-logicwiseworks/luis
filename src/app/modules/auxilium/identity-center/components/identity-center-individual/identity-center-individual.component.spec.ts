import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IdentityCenterIndividualComponent } from './identity-center-individual.component';

describe('IdentityCenterIndividualComponent', () => {
    let component: IdentityCenterIndividualComponent;
    let fixture: ComponentFixture<IdentityCenterIndividualComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IdentityCenterIndividualComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IdentityCenterIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
