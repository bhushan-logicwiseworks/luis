import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapListSidenavComponent } from './map-center.component';

describe('MailSidenavComponent', () => {
    let component: MapListSidenavComponent;
    let fixture: ComponentFixture<MapListSidenavComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [MapListSidenavComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MapListSidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
