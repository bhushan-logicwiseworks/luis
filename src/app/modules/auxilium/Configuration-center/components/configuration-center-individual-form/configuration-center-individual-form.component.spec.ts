import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationCenterIndividualFormComponent } from './configuration-center-individual-form.component';

describe('ConfigurationCenterIndividualFormComponent', () => {
    let component: ConfigurationCenterIndividualFormComponent;
    let fixture: ComponentFixture<ConfigurationCenterIndividualFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ConfigurationCenterIndividualFormComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ConfigurationCenterIndividualFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
