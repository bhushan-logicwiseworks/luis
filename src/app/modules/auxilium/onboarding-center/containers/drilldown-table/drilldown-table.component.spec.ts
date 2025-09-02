import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DrillDownTableComponent } from './drilldown-table.component';

describe('DrillDownTableComponent', () => {
    let component: DrillDownTableComponent;
    let fixture: ComponentFixture<DrillDownTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [DrillDownTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DrillDownTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
