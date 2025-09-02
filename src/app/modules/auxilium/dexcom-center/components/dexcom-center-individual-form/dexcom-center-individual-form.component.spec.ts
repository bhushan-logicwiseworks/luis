import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DexcomCenterIndividualFormComponent } from './dexcom-center-individual-form.component';

describe('DexcomCenterIndividualFormComponent', () => {
    let component: DexcomCenterIndividualFormComponent;
    let fixture: ComponentFixture<DexcomCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [DexcomCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DexcomCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
