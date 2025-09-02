import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IcdCodeCenterIndividualAddComponent } from './icdcode-center-individual-add.component';

describe('IcdCodeCenterIndividualAddComponent', () => {
    let component: IcdCodeCenterIndividualAddComponent;
    let fixture: ComponentFixture<IcdCodeCenterIndividualAddComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [IcdCodeCenterIndividualAddComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IcdCodeCenterIndividualAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
