import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDemographicsComponent } from './validation-demographics.component';

describe('ValidationDemographicsComponent', () => {
    let component: ValidationDemographicsComponent;
    let fixture: ComponentFixture<ValidationDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ValidationDemographicsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ValidationDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
