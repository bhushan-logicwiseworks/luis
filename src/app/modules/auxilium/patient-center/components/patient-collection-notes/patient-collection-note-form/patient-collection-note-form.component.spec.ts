import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PatientCollectionNoteFormComponent } from './patient-collection-note-form.component';

describe('PatientCollectionNoteFormComponent', () => {
    let component: PatientCollectionNoteFormComponent;
    let fixture: ComponentFixture<PatientCollectionNoteFormComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [PatientCollectionNoteFormComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PatientCollectionNoteFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
