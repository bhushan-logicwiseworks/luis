import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IdentityCenterIndividualFormComponent } from './identity-center-individual-form.component';

describe('IdentityCenterIndividualFormComponent', () => {
    let component: IdentityCenterIndividualFormComponent;
    let fixture: ComponentFixture<IdentityCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IdentityCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IdentityCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
