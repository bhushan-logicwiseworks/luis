import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicianDemographicsComponent } from './physician-demographics.component';

describe('PhysicianDemographicsComponent', () => {
    let component: PhysicianDemographicsComponent;
    let fixture: ComponentFixture<PhysicianDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [PhysicianDemographicsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(PhysicianDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
