import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ZipCodeCenterIndividualFormComponent } from './zipcode-center-individual-form.component';

describe('ZipCodeCenterIndividualFormComponent', () => {
    let component: ZipCodeCenterIndividualFormComponent;
    let fixture: ComponentFixture<ZipCodeCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [ZipCodeCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ZipCodeCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
