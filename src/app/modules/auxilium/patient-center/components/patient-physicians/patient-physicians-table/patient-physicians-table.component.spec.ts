import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPhysiciansTableComponent } from './patient-physicians-table.component';

describe('PatientPhysiciansTableComponent', () => {
    let component: PatientPhysiciansTableComponent;
    let fixture: ComponentFixture<PatientPhysiciansTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPhysiciansTableComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPhysiciansTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
