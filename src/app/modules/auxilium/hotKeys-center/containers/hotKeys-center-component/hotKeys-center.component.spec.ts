import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HotKeysCenterComponent } from './hotKeys-center.component';

describe('HotKeysCenterComponent', () => {
    let component: HotKeysCenterComponent;
    let fixture: ComponentFixture<HotKeysCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [HotKeysCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HotKeysCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
