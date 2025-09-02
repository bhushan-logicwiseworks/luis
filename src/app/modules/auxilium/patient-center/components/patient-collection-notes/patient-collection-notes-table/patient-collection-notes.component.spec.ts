import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCollectionNotesComponent } from './patient-collection-notes.component';

describe('PatientCollectionNotesComponent', () => {
    let component: PatientCollectionNotesComponent;
    let fixture: ComponentFixture<PatientCollectionNotesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
    imports: [PatientCollectionNotesComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientCollectionNotesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
