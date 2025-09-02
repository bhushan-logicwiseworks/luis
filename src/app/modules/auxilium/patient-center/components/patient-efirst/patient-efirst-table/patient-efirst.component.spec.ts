import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientEFirstComponent } from './patient-efirst.component';

describe('PatientEFirstComponent', () => {
    let component: PatientEFirstComponent;
    let fixture: ComponentFixture<PatientEFirstComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientEFirstComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientEFirstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
