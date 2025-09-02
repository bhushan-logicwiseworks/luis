import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenARReportAddComponent } from './open-ar-report-add.component';

describe('OpenARReportAddComponent', () => {
    let component: OpenARReportAddComponent;
    let fixture: ComponentFixture<OpenARReportAddComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OpenARReportAddComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OpenARReportAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
