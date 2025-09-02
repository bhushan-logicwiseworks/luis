import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryCenterIndividualFormComponent } from './inventory-center-individual-form.component';

describe('InventoryCenterIndividualFormComponent', () => {
    let component: InventoryCenterIndividualFormComponent;
    let fixture: ComponentFixture<InventoryCenterIndividualFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [InventoryCenterIndividualFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InventoryCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
