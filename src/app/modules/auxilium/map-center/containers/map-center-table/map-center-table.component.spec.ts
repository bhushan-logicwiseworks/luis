import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapListTableComponent } from './map-center-table.component';

describe('MapListTableComponent', () => {
    let component: MapListTableComponent;
    let fixture: ComponentFixture<MapListTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [MapListTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapListTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
