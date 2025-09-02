import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDemographicsComponent } from './company-demographics.component';

describe('CompanyDemographicsComponent', () => {
    let component: CompanyDemographicsComponent;
    let fixture: ComponentFixture<CompanyDemographicsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CompanyDemographicsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(CompanyDemographicsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
