import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotKeysCenterTableComponent } from './hotKeys-center-table.component';

describe('HotKeysCenterTableComponent', () => {
    let component: HotKeysCenterTableComponent;
    let fixture: ComponentFixture<HotKeysCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [HotKeysCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotKeysCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
