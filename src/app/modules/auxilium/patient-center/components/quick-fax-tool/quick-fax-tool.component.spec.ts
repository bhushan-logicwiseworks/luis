import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFaxToolComponent } from './quick-fax-tool.component';

describe('QuickFaxToolComponent', () => {
    let component: QuickFaxToolComponent;
    let fixture: ComponentFixture<QuickFaxToolComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [QuickFaxToolComponent],
}).compileComponents();

        fixture = TestBed.createComponent(QuickFaxToolComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
