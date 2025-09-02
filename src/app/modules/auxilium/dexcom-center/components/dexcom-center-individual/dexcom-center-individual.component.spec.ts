import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DexcomCenterIndividualComponent } from './dexcom-center-individual.component';

describe('DexcomCenterIndividualComponent', () => {
    let component: DexcomCenterIndividualComponent;
    let fixture: ComponentFixture<DexcomCenterIndividualComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [DexcomCenterIndividualComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DexcomCenterIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
