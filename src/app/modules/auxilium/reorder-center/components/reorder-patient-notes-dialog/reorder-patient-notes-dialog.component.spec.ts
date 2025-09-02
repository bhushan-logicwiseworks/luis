import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderPatientNotesDialogComponent } from './reorder-patient-notes-dialog.component';

describe('ReorderPatientNotesDialogComponent', () => {
    let component: ReorderPatientNotesDialogComponent;
    let fixture: ComponentFixture<ReorderPatientNotesDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ReorderPatientNotesDialogComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ReorderPatientNotesDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
