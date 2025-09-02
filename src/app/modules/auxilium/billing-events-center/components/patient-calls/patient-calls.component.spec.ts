import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientCallsComponent } from './patient-calls.component';

describe('PatientCallsComponent', () => {
    let component: PatientCallsComponent;
    let fixture: ComponentFixture<PatientCallsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientCallsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientCallsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
