import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPatientWorkorderComponent } from './add-edit-patient-workorder.component';

describe('AddEditPatientWorkorderComponent', () => {
    let component: AddEditPatientWorkorderComponent;
    let fixture: ComponentFixture<AddEditPatientWorkorderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AddEditPatientWorkorderComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AddEditPatientWorkorderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
