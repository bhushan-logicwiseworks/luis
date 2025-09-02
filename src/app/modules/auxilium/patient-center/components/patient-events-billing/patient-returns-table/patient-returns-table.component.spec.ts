import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientReturnsTableComponent } from './patient-returns-table.component';

describe('PatientReturnsTableComponent', () => {
    let component: PatientReturnsTableComponent;
    let fixture: ComponentFixture<PatientReturnsTableComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [PatientReturnsTableComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientReturnsTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
