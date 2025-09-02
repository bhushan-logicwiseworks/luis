import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PatientPortalTableComponent } from './patient-portal-table.component';

describe('PatientPortalTableComponent', () => {
    let component: PatientPortalTableComponent;
    let fixture: ComponentFixture<PatientPortalTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientPortalTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientPortalTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
