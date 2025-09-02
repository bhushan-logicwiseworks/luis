import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTechComponent } from './line-chart-tech.component';

describe('LineChartTechComponent', () => {
    let component: LineChartTechComponent;
    let fixture: ComponentFixture<LineChartTechComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [LineChartTechComponent],
}).compileComponents();

        fixture = TestBed.createComponent(LineChartTechComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
