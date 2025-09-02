import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSourceChipComponent } from './email-source-chip.component';

describe('EmailSourceChipComponent', () => {
    let component: EmailSourceChipComponent;
    let fixture: ComponentFixture<EmailSourceChipComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [EmailSourceChipComponent],
}).compileComponents();

        fixture = TestBed.createComponent(EmailSourceChipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
