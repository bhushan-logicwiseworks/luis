import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommCenterTableComponent } from './comm-center-table.component';

describe('CommCenterTableComponent', () => {
    let component: CommCenterTableComponent;
    let fixture: ComponentFixture<CommCenterTableComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CommCenterTableComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommCenterTableComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
