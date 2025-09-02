import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientPayorsListDrawerComponent } from './patient-payors-list-drawer.component';

describe('PatientPayorsListDrawerComponent', () => {
    let component: PatientPayorsListDrawerComponent;
    let fixture: ComponentFixture<PatientPayorsListDrawerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientPayorsListDrawerComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientPayorsListDrawerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
