import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayorsListComponent } from './patient-payors-list.component';

describe('PatientPayorsListComponent', () => {
    let component: PatientPayorsListComponent;
    let fixture: ComponentFixture<PatientPayorsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPayorsListComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPayorsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
