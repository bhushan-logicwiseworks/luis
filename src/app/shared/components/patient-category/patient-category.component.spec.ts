import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCategoryComponent } from './patient-category.component';

describe('PatientCategoryComponent', () => {
    let component: PatientCategoryComponent;
    let fixture: ComponentFixture<PatientCategoryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PatientCategoryComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PatientCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
