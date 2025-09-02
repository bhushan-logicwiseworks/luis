import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItdashboardKpiComponent } from './itdashboard-kpi.component';

describe('ItdashboardKpiComponent', () => {
    let component: ItdashboardKpiComponent;
    let fixture: ComponentFixture<ItdashboardKpiComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [ItdashboardKpiComponent],
}).compileComponents();

        fixture = TestBed.createComponent(ItdashboardKpiComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
