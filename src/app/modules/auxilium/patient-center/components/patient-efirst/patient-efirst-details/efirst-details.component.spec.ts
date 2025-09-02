import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedEmailsDetailsComponent } from './automated-emails-details.component';

describe('AutomatedEmailsDetailsComponent', () => {
    let component: AutomatedEmailsDetailsComponent;
    let fixture: ComponentFixture<AutomatedEmailsDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AutomatedEmailsDetailsComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AutomatedEmailsDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
