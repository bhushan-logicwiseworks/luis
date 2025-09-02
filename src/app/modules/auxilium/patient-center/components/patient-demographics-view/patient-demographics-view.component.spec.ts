import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDemographicsViewComponent } from './patient-demographics-view.component';

describe('PatientDemographicsViewComponent', () => {
    let component: PatientDemographicsViewComponent;
    let fixture: ComponentFixture<PatientDemographicsViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PatientDemographicsViewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientDemographicsViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
