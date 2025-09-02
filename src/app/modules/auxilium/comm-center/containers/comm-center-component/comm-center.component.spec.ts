import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommCenterComponent } from './comm-center.component';

describe('CommCenterComponent', () => {
    let component: CommCenterComponent;
    let fixture: ComponentFixture<CommCenterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CommCenterComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommCenterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
