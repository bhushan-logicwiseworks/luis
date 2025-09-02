import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesCenterIndividualFormComponent } from './sales-center-individual-form.component';

describe('SalesCenterIndividualFormComponent', () => {
    let component: SalesCenterIndividualFormComponent;
    let fixture: ComponentFixture<SalesCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [SalesCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
