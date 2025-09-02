import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbbottCenterIndividualComponent } from './abbott-center-individual.component';

describe('AbbottCenterIndividualComponent', () => {
    let component: AbbottCenterIndividualComponent;
    let fixture: ComponentFixture<AbbottCenterIndividualComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AbbottCenterIndividualComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AbbottCenterIndividualComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
