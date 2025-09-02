import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbottCenterIndividualFormComponent } from './abbott-center-individual-form.component';

describe('AbbottCenterIndividualFormComponent', () => {
    let component: AbbottCenterIndividualFormComponent;
    let fixture: ComponentFixture<AbbottCenterIndividualFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AbbottCenterIndividualFormComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AbbottCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
