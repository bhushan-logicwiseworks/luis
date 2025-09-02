import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxLineChartComponent } from './aux-line-chart.component';

describe('AuxLineChartComponent', () => {
    let component: AuxLineChartComponent;
    let fixture: ComponentFixture<AuxLineChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AuxLineChartComponent],
}).compileComponents();

        fixture = TestBed.createComponent(AuxLineChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
