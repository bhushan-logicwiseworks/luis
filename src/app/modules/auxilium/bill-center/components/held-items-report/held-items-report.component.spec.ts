import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldItemsReportComponent } from './held-items-report.component';

describe('HeldItemsReportComponent', () => {
    let component: HeldItemsReportComponent;
    let fixture: ComponentFixture<HeldItemsReportComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [HeldItemsReportComponent],
}).compileComponents();

        fixture = TestBed.createComponent(HeldItemsReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
