import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpenArReportComponent } from './open-ar-report.component';

describe('OpenArReportComponent', () => {
    let component: OpenArReportComponent;
    let fixture: ComponentFixture<OpenArReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OpenArReportComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OpenArReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
