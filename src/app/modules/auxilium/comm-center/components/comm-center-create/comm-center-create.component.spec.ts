import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommCenterCreateComponent } from './comm-center-create.component';

describe('CommCenterCreateComponent', () => {
    let component: CommCenterCreateComponent;
    let fixture: ComponentFixture<CommCenterCreateComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
    imports: [CommCenterCreateComponent],
}).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommCenterCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
