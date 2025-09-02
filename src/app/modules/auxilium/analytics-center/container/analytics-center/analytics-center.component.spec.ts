import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsCenterComponent } from './analytics-center.component';

describe('AnalyticsCenterComponent', () => {
    let component: AnalyticsCenterComponent;
    let fixture: ComponentFixture<AnalyticsCenterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
    imports: [AnalyticsCenterComponent],
}).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AnalyticsCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
